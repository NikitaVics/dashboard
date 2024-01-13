import ky from "ky"
import { MemberProps } from "../types"



const getCancelledBookings = async (httpClient: typeof ky, param: string) => {
  return httpClient.get(`ManagementMember/${param}/cancelled-booking-count`).json<MemberProps>()
}

export default getCancelledBookings
