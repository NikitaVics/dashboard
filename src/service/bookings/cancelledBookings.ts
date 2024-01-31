import ky from "ky"
import { User } from "../types"

const getCancelledBookings = async (httpClient: typeof ky) => {
  return httpClient.get(`Management/BookingManagement/totalCancelledBookingsToday`).json<User>()
}

export default getCancelledBookings
