import { BehrainClient } from "@/service/client"
import type { NextApiRequest, NextApiResponse } from "next"


async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new BehrainClient(req, res)

  const name = req.query.name as string
  if (req.method === "GET") {
    await getCoachDetails(name)
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function getCoachDetails(name: string) {
    try {
      const response = await client.coach.getCoachDetail(name as string)
     
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
      res.status(500).end()
    }
  }
}

export default handler
