import ky from "ky"
import { User, getMember } from "../types"

const bookingDetails = async (httpClient: typeof ky,{bookerName,fromBookingDate,toBookingDate}:getMember) => {
  return httpClient.get(`Management/BookingManagement/BookingDetails`,{
    searchParams: {
      bookerName: bookerName,
      fromBookingDate : fromBookingDate,
      toBookingDate : toBookingDate
    } as unknown as string,
  }).json<User>()
}

export default bookingDetails


