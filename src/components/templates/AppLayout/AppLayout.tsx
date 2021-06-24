import React from "react";
import Cookies from 'universal-cookie';
import { AzureAD } from "react-aad-msal";
import styles from "./AppLayout.module.scss";
import { acenturaLogo } from "../../../assets/images"
import { APP_CONFIGS } from "../../../utilities/constants";
import { authProvider } from "../../../core";
import store from "../../../redux/store"

const AppLayout: React.FC<{
    children: React.ReactNode
}> = props => {

    const cookies = new Cookies();
    let userData = cookies.get(APP_CONFIGS.USER_DATA_COOKIE);
    userData = JSON.parse(atob(userData))

    return (
        <React.Fragment>
            <AzureAD provider={authProvider} reduxStore={store}>
                {
                    // @ts-ignore
                    ({ logout }) => {
                        return (
                            <div className={`layout-row ${styles.authorizedContainer}`}>
                                <aside className={`layout-row ${styles.sideNavigation}`}>
                                    <aside className={styles.navBar}>
                                        <div className={styles.menuBox}>
                                            <a className={styles.menuIcon}>
                                                <span></span>
                                            </a>
                                        </div>
                                        <div className={`cursorPointer ${styles.profile}`}>
                                            <span className={`${styles.infoCircle} layout-row layout-align-center center`}>
                                                <sup>##</sup>
                                            </span>
                                            <div className={styles.infoMenu}>
                                                <p className={styles.name}>Full Name</p>
                                                <span className={styles.email}>{userData.email}</span>
                                                <a>My Profile</a>
                                                <a>Help</a>
                                                <a className={styles.signOut} onClick={() => { logout() }}>Sign Out</a>

                                            </div>
                                        </div>
                                    </aside>
                                    <aside className={styles.navBarContent}>
                                        <div className={styles.contentGroup}>
                                            <img className={styles.logo} src={acenturaLogo} />
                                            <h1>Olympus Athena</h1>

                                            <a className={styles.navLink}>
                                                {/* <span className="material-icons-outlined">local_activity</span> */}
                                                Dashboard
                                            </a>
                                            <a className={styles.navLink}>
                                                {/* <span className="material-icons-outlined">local_activity</span> */}
                                                Manage Time Entries
                                            </a>

                                        </div>
                                    </aside>
                                </aside>
                                <aside className={styles.content}>
                                    {props.children}
                                </aside>
                            </div>
                        )
                    }
                }
            </AzureAD>
        </React.Fragment>
    )
}

export default AppLayout;