import ky from "ky"
import { MemberProps } from "../types"



const getSuccessBookings = async (httpClient: typeof ky, param: string) => {
  return httpClient.get(`Management/Member/${param}/successful-booking-count`).json<MemberProps>()
}

export default getSuccessBookings
