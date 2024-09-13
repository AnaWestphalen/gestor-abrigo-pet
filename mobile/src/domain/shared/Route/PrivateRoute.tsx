import type { FC, ReactElement } from "react";
import { Redirect, Route, type RouteProps } from "react-router-dom";
import { useAuthServices } from "src/domain/auth/contexts/AuthServices/useAuthServices";

export const PrivateRoute: FC<
  Omit<RouteProps, "render"> & { children: ReactElement }
> = ({ children, ...rest }) => {
  const { currentUser } = useAuthServices();

  return (
    <Route
      {...rest}
      render={() => (currentUser ? children : <Redirect to="/auth" />)}
    />
  );
};
