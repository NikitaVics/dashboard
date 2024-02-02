import ky from "ky"
import { BookingsProps } from "../types"



const bookingDetail = async (httpClient: typeof ky, param: string) => {
  return httpClient.get(`Management/BookingManagement/View Booking-Detail`,{
    searchParams : {
      bookingId : param
    }
  }).json<BookingsProps>()
}

export default bookingDetail

