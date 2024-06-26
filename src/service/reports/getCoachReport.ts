import ky from "ky"

import { ReportProps, User } from "../types"

const getCoachReports = async (httpClient: typeof ky, { fromBookingDate,coach,toBookingDate }: ReportProps,) => {
 
  return httpClient.get(`Management/ReportBoard/Coach Report`, {
    searchParams: {
      fromBookingDate: fromBookingDate,
      toBookingDate : toBookingDate,
      coach : coach
    } as unknown as string,
  }).json<User>()
}

export default getCoachReports
