import { BehrainClient } from "@/service/client";
import { AddCoachProps, ErrorResponse } from "@/service/types";
import { HTTPError } from "ky";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new BehrainClient(req, res);
  if (req.method === "POST") {
    await createCoach(req.body);
  } else {
    res.status(405).end("Not Found");
  }
  async function createCoach(params: AddCoachProps) {
    try {
      const response = await client.coach.AddCoach(params);
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof HTTPError && error.response.status === 500) {
        const errorResponse: ErrorResponse = await error.response.json();
        const { messages } = errorResponse;
        res.status(500).json({
          error: { messages },
          status: 500,
        });
      }
    }
  }
}

export default handler;
