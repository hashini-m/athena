import ENV from "../../.env/index";

export const APP_CONFIGS = {
    APP_OWNER: 'Acentura Inc',
    APP_ENV: ENV.APP_ENV,
    API_BASE: ENV.API_BASE,
    // AD Authentication
    AUTHORITY: ENV.AUTHORITY,
    CLIENT_ID: ENV.CLIENT_ID,
    REDIRECT_URL: ENV.REDIRECT_URL,
    // User Cookie
    USER_DATA_COOKIE: 'ADLAthenaUser',
}
