import React from "react";
import { Redirect, Route } from "react-router-dom";
import { AzureAD, AuthenticationState } from "react-aad-msal";
import store from "../redux/store";
import { authProvider } from "../core/AuthProvider";
import { APP_ROUTES } from "../utilities/constants";

// @ts-ignore
const PrivateRoute = ({ Component, ...rest }) => {
    return (
        <AzureAD provider={authProvider} reduxStore={store}>
            {
                // @ts-ignore
                ({ authenticationState }) => {
                    if (authenticationState === AuthenticationState.Authenticated) {
                        return (
                            <Route
                                {...rest}
                                render={(props) => {
                                    return <Component {...props} />;
                                }}
                            />
                        )
                    } else {
                        return (
                            <Route
                                {...rest}
                                render={(props) => {
                                    return (
                                        <Redirect
                                            to={{ pathname: APP_ROUTES.ROOT, state: { from: props.location } }}
                                        />
                                    );
                                }}
                            />
                        )
                    }
                }
            }
        </AzureAD>
    )
}

export default PrivateRoute;
