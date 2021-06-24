import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import {APP_CONFIGS} from "../utilities/constants";

// Msal Configurations
console.log(APP_CONFIGS.REDIRECT_URL)
const config = {
    auth: {
        authority: APP_CONFIGS.AUTHORITY,
        clientId: APP_CONFIGS.CLIENT_ID,
        postLogoutRedirectUri:APP_CONFIGS.REDIRECT_URL,
        redirectUri: APP_CONFIGS.REDIRECT_URL,

        validateAuthority: true,
        navigateToLoginRequestUrl: true
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
    }
};

// Authentication Parameters
const authenticationParameters = {
    scopes: [
        "openid"
    ]
}

// Options
const options = {
    loginType: LoginType.Redirect,
    tokenRefreshUri: window.location.origin + '/auth.html'
}

// @ts-ignore
export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)
