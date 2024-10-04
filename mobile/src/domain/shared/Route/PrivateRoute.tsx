import type { FC } from "react";
import {
  Redirect,
  Route,
  type RouteComponentProps,
  type RouteProps,
} from "react-router-dom";

import { useAuthServices } from "src/domain/auth/contexts/AuthServices/useAuthServices";

export const PrivateRoute: FC<
  Omit<RouteProps, "render"> & { component: FC<RouteComponentProps> }
> = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuthServices();

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Redirect to="/auth" />
      }
    />
  );
};
