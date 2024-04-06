import { BehrainClient } from "@/service/client";
import { getMember } from "@/service/types";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new BehrainClient(req, res);
  if (req.method === "GET") {
    await getMembers();
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getMembers() {
    try {
      const { namefilter = "" } = req.query;
      const params = {
        namefilter: namefilter as string,
      } as getMember;
      const response = await client.members.getMembersList(params);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      // res.status(401).end();
    }
  }
}

export default handler;
