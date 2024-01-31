import { BehrainClient } from "@/service/client";
import { ErrorResponse, MemberProps } from "@/service/types";
import { HTTPError } from "ky";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new BehrainClient(req, res);
  if (req.method === "POST") {
    await ActivateApplication(req.body);
  } else {
    res.status(405).end("Method Not Allowed");
  }

  async function ActivateApplication(params: MemberProps) {
    try {
      const response = await client.application.update(params);
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof HTTPError && error.response.status === 400) {
        const errorResponse: ErrorResponse = await error.response.json();
        const { messages } = errorResponse;
        res.status(400).json({
          error: { messages },
          status: 400,
        });
      } else {
        res.status(400).end;
      }
    }
  }
}

export default handler;
