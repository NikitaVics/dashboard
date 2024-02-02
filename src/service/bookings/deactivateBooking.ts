import ky from "ky"
import {  BookingsProps } from "../types"



const DeActivateBooking = async (
  httpClient: typeof ky,
  params: BookingsProps,
) => {
  const id = params.bookingId
  return httpClient
    .put(`Management/BookingManagement/cancelBooking/${id}`, {
      json: params
    })
    // .json()
}

export default DeActivateBooking
