import ky from "ky"

import { ReportProps, User } from "../types"

const getCourtReports = async (httpClient: typeof ky, { fromBookingDate,toBookingDate,court }: ReportProps,) => {
 
  return httpClient.get(`Management/ReportBoard/Court Report`, {
    searchParams: {
      fromBookingDate: fromBookingDate,
      toBookingDate : toBookingDate,
      court : court
    } as unknown as string,
  }).json<User>()
}

export default getCourtReports
