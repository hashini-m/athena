import React from "react";
import {Route} from "react-router-dom";

// @ts-ignore
const PublicRoute = ({Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render={(props) => {
                return <Component {...props} />;
            }}
        />
    )
}

export default PublicRoute;
