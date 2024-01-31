import ky from "ky"
import { MemberProps } from "../types"



const rejected = async (
  httpClient: typeof ky,
  params: MemberProps,
) => {
  const memberId = params.memberId
  return httpClient
    .post(`Management/Application/reject/${memberId}`, {
      json: params,
    })
    .json()
}

export default rejected
