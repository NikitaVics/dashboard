import ky from "ky"
import { User } from "../types"

const bookingDetails = async (httpClient: typeof ky) => {
  return httpClient.get(`Management/BookingManagement/BookingDetails`).json<User>()
}

export default bookingDetails


