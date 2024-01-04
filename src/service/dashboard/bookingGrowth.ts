import ky from "ky"
import { User } from "../types"

const getBookingGrowth = async (httpClient: typeof ky) => {
  return httpClient.get(`Management/Dashboard/monthly-booking growth`).json<User>()
}

export default getBookingGrowth
