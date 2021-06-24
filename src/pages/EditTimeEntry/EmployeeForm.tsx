import { Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { TextField, makeStyles } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import SearchAutoComplete from "./SearchAutoComplete";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiFormControl-root": {
            // width: "80%",
            margin: theme.spacing(1),
        },
        "& > *": {
            margin: theme.spacing(1),
        },
    },
}));

const EmployeeForm = () => {
    const [values, setValues] = useState({
        //form values
        id: 0,
        email: "",
        teamId: "",
        fromDate: null,
        toDate: null,
    });

    const classes = useStyles();

    return (
        <>
            <form className={classes.root}>
                <Grid container>
                    <Grid item xs={6}>
                        <SearchAutoComplete />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                value={values.fromDate}
                                placeholder="dd/MM/yyyy"
                                onChange={(date: any) => {
                                    setValues({ ...values, fromDate: date });
                                    console.log(date);
                                }}
                            />
                            <Typography style={{ padding: "15px" }}>
                                <b>TO</b>
                            </Typography>
                            <DatePicker
                                placeholder="dd/MM/yyyy"
                                value={values.toDate}
                                format="dd/MM/yyyy"
                                onChange={(date: any) => {
                                    setValues({ ...values, toDate: date });
                                    console.log(date);
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.root}>
                            <Button variant="contained" color="primary">
                                Search
                            </Button>
                            <Button variant="contained">Reset</Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
            {/* <EmployeeTable /> */}
        </>
    );
}

export default EmployeeForm;
