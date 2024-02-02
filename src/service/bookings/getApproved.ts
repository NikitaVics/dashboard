import ky from "ky";
import { User } from "../types";

const getApproved = async (httpClient: typeof ky) => {
  return httpClient.get(`ManagementApplication/approved-count`).json<User>();
};

export default getApproved;
