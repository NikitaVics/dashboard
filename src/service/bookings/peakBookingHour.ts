import ky from "ky"
import { User } from "../types"

const getPeakBookingHour = async (httpClient: typeof ky) => {
  return httpClient.get(`Management/BookingManagement/BookingPerSlotForDayOrYesterday`).json<User>()
}

export default getPeakBookingHour

