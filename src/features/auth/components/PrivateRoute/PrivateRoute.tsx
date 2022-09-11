import React, { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuthContext } from "../../AuthContextProvider";
import { Box, CircularProgress } from "@mui/material";

type Tprops = {
  children: React.ReactNode;
} & RouteProps;

export const PrivateRoute: FC<Tprops> = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated === null) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticated ? children : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
      }}
    />
  );
};
