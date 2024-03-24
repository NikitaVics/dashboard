import ky from "ky"

import { ReportProps } from "../types"

const exportCoachReports = async (httpClient: typeof ky, { fromBookingDate,toBookingDate,coach }: ReportProps,) => {
 
  return httpClient.get(`Management/ReportBoard/Download Coach Report`, {
    searchParams: {
      fromBookingDate: fromBookingDate,
      toBookingDate : toBookingDate,
      coach : coach
    } as unknown as string,
  })
}

export default exportCoachReports
