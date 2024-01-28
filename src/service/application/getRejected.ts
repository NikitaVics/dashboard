import ky from "ky";
import { User } from "../types";

const getRejected = async (httpClient: typeof ky) => {
  return httpClient
    .get(`Management/Application/rejected-count`)
    .json<User>();
};

export default getRejected;
