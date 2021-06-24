import React from "react";
import styles from "./PrimaryButton.module.scss";

const PrimaryButton: React.FC<{
    label: string;
    disabled?: boolean;
    onClick?: () => void
}> = props => {

    return(
        <button
            disabled={props.disabled}
            onClick={props.onClick}
            className={styles.button}>
            {props.label}
        </button>
    )
}

export default PrimaryButton;
