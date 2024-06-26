import { BehrainClient } from "@/service/client"
import {  AnnouncementProps, ErrorResponse } from "@/service/types"
import { HTTPError } from "ky"
import type { NextApiRequest, NextApiResponse } from "next"



async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new BehrainClient(req, res)
  if (req.method === "PUT") {
    await DeleteSchedule(req.body)
  } else {
    res.status(405).end("Method Not Allowed")
  }

  async function DeleteSchedule(params: AnnouncementProps) {
    try {
      const response = await client.announcement.DeleteSchedule(params)
      res.status(200).json(response)
    } catch (error) {
      if (error instanceof HTTPError && error.response.status === 400) {
        const errorResponse: ErrorResponse = await error.response.json()
        const { messages } = errorResponse
        res.status(400).json({
          error: { messages },
          status: 400,
        })
      } else {
        res.status(403).end
      }
    }
  }
}

export default handler
