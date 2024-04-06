import ky from "ky"
import { User } from "../types"

const getaveragePeakBookingHour = async (httpClient: typeof ky) => {
  return httpClient.get(`Management/BookingManagement/peakDailyBookingPerMonth`).json<User>()
}

export default getaveragePeakBookingHour

