import ky from "ky"
import { User } from "../types"

const getCancelled = async (httpClient: typeof ky) => {
  return httpClient.get(`Management/BookingManagement/CancelledBookingsToday`).json<User>()
}

export default getCancelled

