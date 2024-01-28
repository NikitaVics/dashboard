import ky from "ky"
import { User } from "../types"

const getTotalBookings = async (httpClient: typeof ky) => {
  return httpClient.get(`Management/BookingManagement/totalBookingsToday`).json<User>()
}

export default getTotalBookings

