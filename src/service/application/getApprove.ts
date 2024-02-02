import ky from "ky";
import { User } from "../types";

const getApprove = async (httpClient: typeof ky) => {
  return httpClient.get(`Management/Application/approved-count`).json<User>();
};

export default getApprove;
