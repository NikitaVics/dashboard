import ky from "ky"

import { ReportProps, User } from "../types"

const getCourtReports = async (httpClient: typeof ky, { bookingDate,court }: ReportProps,) => {
 
  return httpClient.get(`Management/ReportBoard/Court Report`, {
    searchParams: {
      bookingDate: bookingDate,
      court : court
    } as unknown as string,
  }).json<User>()
}

export default getCourtReports
