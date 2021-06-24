import {Grid, Select, Typography, MenuItem} from "@material-ui/core";
import React, {useState, useEffect, useCallback} from "react";
import {TextField, makeStyles} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import SearchAutoComplete from "./SearchAutoComplete";
import axios from "axios";
import EmployeeTable from "./EmployeeTable";

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
        id: 0,
        email: "",
        teamId: null,
        fromDate: null,
        toDate: null,
    });
    const [teams, setTeams] = useState<Team[]>();

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

    const classes = useStyles();

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
                                    setValues({...values, fromDate: date});
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
                                    setValues({...values, toDate: date});
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
                <EmployeeTable values={'ss'} />
            </form>
            {/* <EmployeeTable /> */}
        </>
    );
}

export default EmployeeForm;
