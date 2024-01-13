import ky from "ky"

import { ReportProps } from "../types"

const exportCourtReports = async (httpClient: typeof ky, { bookingDate,court }: ReportProps,) => {
 
  return httpClient.get(`Management/ReportBoard/Download Court Report`, {
    searchParams: {
      bookingDate: bookingDate,
      court : court
    } as unknown as string,
  })
}

export default exportCourtReports
