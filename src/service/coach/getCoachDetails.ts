import ky from "ky"
import { AddCoachProps } from "../types"



const getCoachDetail = async (httpClient: typeof ky, param: string) => {
  return httpClient.get(`Management/Coach/details/${param}`).json<AddCoachProps>()
}

export default getCoachDetail
