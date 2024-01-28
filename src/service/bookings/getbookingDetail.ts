import ky from "ky"
import { BookingsProps } from "../types"



const bookingDetail = async (httpClient: typeof ky, param: string) => {
  return httpClient.get(`Booking/GetConfirmedBooking/${param}`).json<BookingsProps>()
}

export default bookingDetail

