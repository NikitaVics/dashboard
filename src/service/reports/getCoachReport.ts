import ky from "ky"

import { ReportProps, User } from "../types"

const getCoachReports = async (httpClient: typeof ky, { bookingDate,coach }: ReportProps,) => {
 
  return httpClient.get(`Management/ReportBoard/Coach Report`, {
    searchParams: {
      bookingDate: bookingDate,
      coach : coach
    } as unknown as string,
  }).json<User>()
}

export default getCoachReports
