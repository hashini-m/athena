import {ENV_DEV} from "./environment.dev"
import {ENV_PROD} from "./environment.prod";
import {ENV_QA} from "./environment.qa";

export interface ENV_VARIABLES {
    APP_ENV: string,
    API_BASE: string,
    AUTHORITY: string,
    CLIENT_ID: string,
    REDIRECT_URL: string
}

// DEFAULT PROD ENV VARIABLES
let ENV = ENV_PROD

// DEV ENV VARIABLES
if(process.env.REACT_APP_ENV === 'dev') {
    ENV = ENV_DEV
}
// QA ENV VARIABLES
if(process.env.REACT_APP_ENV === 'qa') {
    ENV = ENV_QA
}

export default ENV
