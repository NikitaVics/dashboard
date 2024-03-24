import ky from "ky"

import { ReportProps } from "../types"

const exportCourtReports = async (httpClient: typeof ky, { fromBookingDate,toBookingDate,court }: ReportProps,) => {
 
  return httpClient.get(`Management/ReportBoard/Download Court Report`, {
    searchParams: {
      fromBookingDate: fromBookingDate,
      toBookingDate : toBookingDate,
      court : court
    } as unknown as string,
  })
}

export default exportCourtReports
