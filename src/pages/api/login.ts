import { BehrainClient } from "@/service/client";
import { ErrorResponse } from "@/service/types";
import Cookies from "cookies";
import { HTTPError } from "ky";
import { NextApiRequest, NextApiResponse } from "next";

interface LoginResponse {
  result: {
    token: string;
    // Add other properties if needed
  };
}

async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  const cookie = new Cookies(req, res);
  try {
    const client = new BehrainClient(req, res, {
      authRequired: false,
    });
    const body = req.body;

    if (!body) {
      res.status(401).end();
      return;
    }

    const { result } = (await client.auth.login(
      body
    )) as unknown as LoginResponse;
    const access_token = result.token;
    const date = new Date();
    // Cookie expiry time for 24hrs
    const expiryTime = date.setTime(date.getTime() + 23 * 59 * 59 * 1000);

    const tokenWithBearer = `Bearer ${access_token}`;

    await cookie.set("access_token", tokenWithBearer, {
      expires: new Date(expiryTime),
    });

    res.status(200).json({ message: "Login Successfully" });
  } catch (error) {
    if (error instanceof HTTPError && error.response.status === 400) {
      const errorResponse: ErrorResponse = await error.response.json();
      const { messages } = errorResponse;
      res.status(400).json({
        error: { messages },
        status: 400,
      });
    }
  }
}

export default loginHandler;