import { BehrainClient } from "@/service/client";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new BehrainClient(req, res);
  if (req.method === "GET") {
    await getTotalMembers();
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getTotalMembers() {
    try {
      const response = await client.dashboard.totalMembers();
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(403).end();
    }
  }
}

export default handler;
