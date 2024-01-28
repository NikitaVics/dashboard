import ky from "ky"
import { User } from "../types"

const CancelBooking = async (httpClient: typeof ky) => {
  return httpClient.get(`Management/BookingManagement/totalCancelledBookingsToday`).json<User>()
}

export default CancelBooking
