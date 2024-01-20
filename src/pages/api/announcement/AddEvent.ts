import { BehrainClient } from "@/service/client"
import {  CourtMaintainence, ErrorResponse } from "@/service/types"
import { HTTPError } from "ky"
import type { NextApiRequest, NextApiResponse } from "next"



async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new BehrainClient(req, res)
  if (req.method === "POST") {
    await createEvent(req.body)
  } else {
    res.status(405).end("Not Found")
  }
  async function createEvent(params: CourtMaintainence) {
    try {
      const response = await client.announcement.AddEvent(params)
      res.status(200).json(response)
    } catch (error) {
        console.log(error)
      if (error instanceof HTTPError && error.response.status === 400) {
        const errorResponse: ErrorResponse = await error.response.json()
        const { messages } = errorResponse
        res.status(400).json({
          error: { messages },
          status: 400,
        })
      }
    }
  }
}

export default handler
