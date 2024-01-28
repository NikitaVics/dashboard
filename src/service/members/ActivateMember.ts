import ky from "ky"
import { MemberProps } from "../types"



const ActivateMember = async (
  httpClient: typeof ky,
  params: MemberProps,
) => {
  const id = params.memberId
  return httpClient
    .post(`Management/Member/${id}/toggle-status`, {
      json: params,
    })
    .json()
}

export default ActivateMember
