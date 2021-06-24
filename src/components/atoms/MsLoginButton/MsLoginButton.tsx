import React from "react";
import { microsoftLogo } from "../../../assets/images";
import styles from "./MsLoginButton.module.scss"

const MsLoginButton:
    React.FC<{
        login: () => void;
        disabled?: boolean
    }> = (props) => {
        return (
            <div className={styles.loginBtn}>
                <button
                    disabled={props.disabled}
                    onClick={props.login}
                    className={styles.microsoftLoginBtn}>
                    <img src={microsoftLogo} />
                Sign in with Microsoft
            </button>
            </div>
        )
    }

export default MsLoginButton;