
import { BehrainClient } from "@/service/client"
import { getAnnouncementProps } from "@/service/types"
import type { NextApiRequest, NextApiResponse } from "next"


async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new BehrainClient(req, res)
  if (req.method === "GET") {
    await getAnnouncement()
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function getAnnouncement() {
    try {
      const { announcementType = "" } = req.query
      const params = {
        announcementType: announcementType as string,
      } as getAnnouncementProps
      const response = await client.announcement.getAnnouncement(params)
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
      res.status(401).end()
    }
  }
}

export default handler
