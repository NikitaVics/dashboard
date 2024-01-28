import ky from "ky"
import { User, getMember } from "../types"

const bookingDetails = async (httpClient: typeof ky,{searchTerm,bookingDate}:getMember) => {
  return httpClient.get(`Management/BookingManagement/BookingDetails`,{
    searchParams: {
      searchTerm: searchTerm,
      bookingDate:bookingDate
    } as unknown as string,
  }).json<User>()
}

export default bookingDetails


