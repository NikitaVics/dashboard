import { BehrainClient } from "@/service/client";
import { ErrorResponse, getAnnouncementProps } from "@/service/types";
import { HTTPError } from "ky";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new BehrainClient(req, res);
  if (req.method === "GET") {
    await getAnnouncement();
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getAnnouncement() {
    try {
      const { announcementType = "" } = req.query;
      const params = {
        announcementType: announcementType as string,
      } as getAnnouncementProps;
      const response = await client.announcement.getAnnouncement(params);
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof HTTPError && error.response.status === 400) {
        const errorResponse: ErrorResponse = await error.response.json();
        const { errorMessage } = errorResponse;
        res.status(400).json({
          error: { errorMessage },
          status: 400,
        });
      }
    }
  }
}

export default handler;
