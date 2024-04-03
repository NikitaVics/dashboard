import { BehrainClient } from "@/service/client"
import {  getMember } from "@/service/types"
import type { NextApiRequest, NextApiResponse } from "next"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new BehrainClient(req, res)
  if (req.method === "GET") {
    await getCoach()
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function getCoach() {
    try {
      const { searchTerm = "" } = req.query
      const params = {
        searchTerm: searchTerm as string,
      } as getMember
      const response = await client.coach.getCoach(params)
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
      res.status(403).end()
    }
  }
}

export default handler
