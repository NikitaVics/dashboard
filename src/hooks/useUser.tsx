import { CustomError } from "@/pages/_app";
import { User } from "@/service/types";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import useSWR from "swr";

export type UserContext = {
  user?: User;
  error?: Error | CustomError;
  isLoading: boolean;
};

export type UserProviderProps = React.PropsWithChildren<{
  user?: User;
}>;

const missingUserProvider = "You forgot to wrap your app in <UserProvider>";

export const UserContext = React.createContext<UserContext>({
  get user(): never {
    throw new Error(missingUserProvider);
  },
  get error(): never {
    throw new Error(missingUserProvider);
  },
  get isLoading(): never {
    throw new Error(missingUserProvider);
  },
});

/**
 * The `useUser` hook, which will get you the {@link User} object from the server-side session.
 */
export type UseUser = () => UserContext;

export const useUser: UseUser = () =>
  React.useContext<UserContext>(UserContext);

export type UserProvider = (
  props: UserProviderProps
) => React.ReactElement<UserContext>;

const publicApiRoutes = ["/login"];

function UserProvider({
  children,
}: UserProviderProps): React.ReactElement<UserContext> {
  const router = useRouter();
  const shouldFetch = !publicApiRoutes.some(
    (path) => router.asPath?.includes(path)
  );

  const { data: user, error } = useSWR<User>(shouldFetch ? "" : null);

  const isLoading = !error;

  return (
    <Fragment>
      <UserContext.Provider value={{ user, error, isLoading }}>
        {children}
      </UserContext.Provider>
    </Fragment>
  );
}

export default UserProvider;
