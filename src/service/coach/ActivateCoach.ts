import ky from "ky"
import { AddCoachProps } from "../types"



const ActivateCoach = async (
  httpClient: typeof ky,
  params: AddCoachProps,
) => {
  const id = params.coachId
  return httpClient
    .put(`Management/Coach/togglestatus/${id}`, {
      json: params,
    })
    .json()
}

export default ActivateCoach
