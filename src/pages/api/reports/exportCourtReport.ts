import { BehrainClient } from "@/service/client";
import { ReportProps } from "@/service/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new BehrainClient(req, res);

  if (req.method === "GET") {
    await ExportCourt();
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function ExportCourt() {
    try {
      const { fromBookingDate = "",toBookingDate="", court = "" } = req.query;
      const params = {
        fromBookingDate: fromBookingDate as string,
        toBookingDate: toBookingDate as string,
        court: court as string,
      } as ReportProps;

      const response = await client.reports.exportCourtReports(params);

      if (!response.ok) {
        res.status(response.status).json({ error: "Internal Server Error" });
        return;
      }

      res.setHeader(
        "Content-Disposition",
        "attachment; filename=CourtReports.xlsx"
      );
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      if (response.body !== null) {
         // eslint-disable-next-line
        //@ts-ignore
        const readableStream = Readable.from(response.body);

        readableStream.pipe(res);
      } else {
        res.status(204).end();
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default handler;
