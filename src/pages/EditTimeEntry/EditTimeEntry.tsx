import { Paper, makeStyles } from "@material-ui/core";
import React from "react";
import { AppLayout } from "../../components";
import EmployeeForm from "./EmployeeForm";
import PageHeader from "./PageHeader";

const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
}));

const EditTimeEntry = () => {
    const classes = useStyles();

    return (
        <>
            <AppLayout>
                <PageHeader
                    title="Manage Time Entries"
                    subTitle="Editing Time Entries by HR"
                />
                <Paper className={classes.pageContent} elevation={0}>
                    <EmployeeForm />
                </Paper>
            </AppLayout>
        </>
    );
}

export default EditTimeEntry;
