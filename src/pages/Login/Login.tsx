import React from "react";
import { Redirect } from "react-router-dom";
import { AzureAD, LoginType, AuthenticationState } from "react-aad-msal";
import { authProvider } from "../../core";
import store from "../../redux/store"
import { APP_CONFIGS, APP_ROUTES } from "../../utilities/constants";
import styles from "./Login.module.scss"
import { acenturaLogo } from "../../assets/images";
import { AppCopyright, MsLoginButton } from "../../components";
import { userActions } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const AuthorizeUser: React.FC<{ accountInfo: any }> = props => {
    const dispatch = useDispatch();
    const authorizedUser = useSelector((state: any) => state.user.authorizedUser)

    React.useEffect(() => {
        dispatch(userActions.authorizeUser(props.accountInfo.account.userName));
    }, [props.accountInfo])

    return (
        <React.Fragment>
            <div className={styles.loginNotification}>
                {
                    !!authorizedUser.isLoading &&
                    <p className={styles.isAuthorizing}>Authorizing...</p>
                }

                {(!!authorizedUser.data && authorizedUser.data.isAuthorized) && <Redirect to={APP_ROUTES.DASHBOARD} />}
            </div>
        </React.Fragment>
    )
}

const Login = () => {
    console.log('APP ENV', APP_CONFIGS.APP_ENV)
    const options = authProvider.getProviderOptions();
    options.loginType = LoginType.Redirect;
    authProvider.setProviderOptions(options);

    return (
        <section className={`${styles.container} content-padding container layout-row layout-wrap layout-align-center center`}>
            <section className={`${styles.login} layout-row`}>
                <aside className={styles.loginRandomImage} />
                <aside className={styles.loginActions}>
                    <img className={styles.logo} src={acenturaLogo} />
                    <h1>Welcome to Olympus</h1>
                    <p>Olympus is the internal application portfolio of Acentura.</p>
                    <AzureAD provider={authProvider} reduxStore={store}>
                        {
                            // @ts-ignore
                            ({ login, authenticationState, error, accountInfo }) => {
                                switch (authenticationState) {
                                    case AuthenticationState.Authenticated:
                                        return (
                                            <React.Fragment>
                                                <AuthorizeUser accountInfo={accountInfo} />
                                                <MsLoginButton disabled={true} login={login} />
                                            </React.Fragment>
                                        );
                                    case AuthenticationState.Unauthenticated:
                                        return (
                                            <React.Fragment>
                                                <div className={styles.loginNotification} />
                                                <MsLoginButton login={login} />
                                            </React.Fragment>
                                        );
                                    case AuthenticationState.InProgress:
                                        return (
                                            <React.Fragment>
                                                <div className={styles.loginNotification} />
                                                <MsLoginButton login={login} />
                                            </React.Fragment>
                                        );
                                }
                            }
                        }
                    </AzureAD>
                    <div className={styles.loginFooter}>
                        <AppCopyright />
                    </div>
                </aside>
            </section>
        </section>
    )
}

export default Login;
