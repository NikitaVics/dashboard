import ky from "ky";

import { User, getMember } from "../types";

const getApplication = async (
  httpClient: typeof ky,
  { searchTerm }: getMember
) => {
  return httpClient
    .get(`Management/Application/members`, {
      searchParams: {
        searchTerm: searchTerm,
      } as unknown as string,
    })
    .json<User>();
};


export default getApplication;
