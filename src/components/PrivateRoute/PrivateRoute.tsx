import React, { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuthContext } from "../../features/auth/AuthContextProvider";
import { Box, CircularProgress } from "@mui/material";

type Tprops = {
  children?: React.ReactNode;
} & RouteProps;

export const PrivateRoute: FC<Tprops> = ({ children, ...rest }) => {
  const { isAuthenticate } = useAuthContext();
  if (isAuthenticate === null) {
    return (
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticate ? children : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
      }}
    />
  );
};
