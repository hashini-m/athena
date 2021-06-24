import { Card, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#fdfdff",
    },
    pageHeader: {
        padding: theme.spacing(3),
        // display: "flex",
        marginBottom: theme.spacing(2),
    },
    pageTitle: {
        paddingLeft: theme.spacing(4),
        "& .MuiTypography-subtitle2": {
            opacity: "0.6",
        },
    },
}));

export default function PageHeader(props: any) {
    const classes = useStyles();
    const { title, subTitle } = props;

    return (
        <div>
            <Paper square className={classes.root}>
                <div className={classes.pageHeader}>
                    {/* <Card className={classes.pageIcon}>{icon}</Card> */}
                    <div className={classes.pageTitle}>
                        <Typography variant="h6" component="div">
                            {title}
                        </Typography>
                        <Typography variant="subtitle2" component="div">
                            {subTitle}
                        </Typography>
                    </div>
                </div>
            </Paper>
        </div>
    );
}
