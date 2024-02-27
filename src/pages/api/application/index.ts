import { BehrainClient } from "@/service/client";
import { getMember } from "@/service/types";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new BehrainClient(req, res);
  if (req.method === "GET") {
    await getApplication();
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getApplication() {
    try {
      const { searchTerm = "" } = req.query;
      const params = {
        searchTerm: searchTerm as string,
      } as getMember;
      const response = await client.application.getApplication(params);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(401).end();
    }
  }
}

export default handler;