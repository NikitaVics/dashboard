import ky from "ky"
import { AddCoachProps } from "../types"


const AddCoach = async (
  httpClient: typeof ky,
  params: AddCoachProps,
) => {
  return httpClient
    .post(`Management/Coach`, {
      json: {
        firstName : params.firstName,
        lastName : params.lastName,
        email : params.email,
        phoneNumber : params.phoneNumber,
        gender : params.gender,
        experience : params.experience,
        image : params.image
      }
    })
    .json()
}

export default AddCoach
