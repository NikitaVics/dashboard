import ky from "ky"

import { ReportProps } from "../types"

const exportCoachReports = async (httpClient: typeof ky, { bookingDate,coach }: ReportProps,) => {
 
  return httpClient.get(`Management/ReportBoard/Download Coach Report`, {
    searchParams: {
      bookingDate: bookingDate,
      coach : coach
    } as unknown as string,
  })
}

export default exportCoachReports
