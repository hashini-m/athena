import {Grid, Select, Typography, MenuItem} from "@material-ui/core";
import React, {useState, useEffect, useCallback} from "react";
import {TextField, makeStyles} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {DatePicker, KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import SearchAutoComplete from "./SearchAutoComplete";
import axios from "axios";
import EmployeeTable from "./EmployeeTable";
import moment from 'moment'

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

type Team = {
    id: number;
    name: string;
}

const EmployeeForm = () => {
    const [values, setValues] = useState({
        //form values
        email: "",
        teamId: null,
        fromDate: (new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000))).toLocaleDateString(),
        toDate: new Date(new Date().getTime() - (2 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
    });
    const [teams, setTeams] = useState<Team[]>();
    const [tableData, setTableData] = useState<any[]>();

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = useCallback(async () => {
        await axios.get("http://localhost:3004/teams")
            .then((res: any) => {
                setTeams(
                    res.data.map((e: any) => ({
                        id: e.id,
                        name: e.description,
                    }))
                );
            })
            .catch(e => console.error('Error: ' + e));
    }, []);

    const search = useCallback(async () => {
        console.log('values obj: ' + JSON.stringify(values));
        await axios.get(`http://localhost:3004/users`, {
            params: {
                values
            }
        })
            .then((res: any) => {
                setTableData(res.data);
            })
            .catch(e => console.error('Error: ' + e));
    }, [values]);

    const classes = useStyles();

    const formatDate = (date: any) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const validateDate = (date: any) => {
        const selectedDate = new Date(date);
        const today = new Date();
        return !(selectedDate.getDate() > today.getDate()) && (today.getDate() - selectedDate.getDate()) >= 2;
    }

    return (
        <>
            <form className={classes.root}>
                <Grid container>
                    <Grid item xs={6}>
                        <SearchAutoComplete value={values.email}
                                            onSearchChange={(value) => setValues({...values, email: value})}/>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.teamId}
                            onChange={(value: any) => {
                                setValues({...values, teamId: value.target.value});
                            }}
                        >
                            {teams !== undefined && teams?.length > 0 ? teams.map((e: Team) => (
                                <MenuItem value={e.id}>{e.name}</MenuItem>
                            )) : <div/>}
                        </Select>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Typography style={{padding: "15px"}}>
                                <b>FROM</b>
                            </Typography>
                            <DatePicker
                                value={values.fromDate}
                                format="dd/MM/yyyy"
                                onChange={(date: any) => {
                                    validateDate(date) ?
                                        setValues({
                                            ...values,
                                            fromDate: formatDate(date)
                                        }) : alert('From-date must be smaller than 2 days from today');
                                    console.log(date);
                                }}
                            />
                            <Typography style={{padding: "15px"}}>
                                <b>TO</b>
                            </Typography>
                            <DatePicker
                                value={values.toDate}
                                format="dd/MM/yyyy"
                                onChange={(date: any) => {
                                    validateDate(date) ?
                                        setValues({
                                            ...values,
                                            toDate: formatDate(date)
                                        }) : alert('To-date must be smaller than 2 days from today');
                                    console.log(date);
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.root}>
                            <Button variant="contained" color="primary" onClick={() => search()}>
                                Search
                            </Button>
                            <Button variant="contained" onClick={() => {
                                setValues({
                                    email: "",
                                    teamId: null,
                                    fromDate: (new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000))).toLocaleDateString(),
                                    toDate: new Date(new Date().getTime() - (2 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
                                });
                                setTableData(undefined);
                            }}>Reset</Button>
                        </div>
                    </Grid>
                </Grid>
                {tableData != undefined && tableData?.length > 0 ? <EmployeeTable values={tableData}/> : <div/>}
            </form>
            {/* <EmployeeTable /> */}
        </>
    );
}

export default EmployeeForm;
