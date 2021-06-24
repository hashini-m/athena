import React, {FC, useState} from "react";
import {DataGrid} from '@material-ui/data-grid';

interface Props {
    values: any;
}

const columns = [
    {field: 'employee', headerName: 'Employee', width: 180, editable: false},
    {field: 'team', headerName: 'Team', width: 100, editable: false},
    {
        field: 'date',
        headerName: 'Date',
        type: 'date',
        width: 180,
        editable: false,
    },
    {
        field: 'startTime',
        headerName: 'Start Time',
        type: 'dateTime',
        width: 220,
        editable: true,
    },
    {
        field: 'endTime',
        headerName: 'End Time',
        type: 'dateTime',
        width: 220,
        editable: true,
    },
];

const EmployeeTable: FC<Props> = (props) => {
    const {values} = props;
    const [tableData, setTableData] = useState<any[]>(values.map((e: any) => ({
        'id': e.id,
        'employee': e.email,
        'team': e.team,
        'date': e.date,
        'startTime': e.startTime,
        'endTime': e.endTime,
    })));


    return (
        <div style={{height: 300, width: '100%'}}>
            <DataGrid rows={tableData} columns={columns}/>
        </div>
    );
}

export default EmployeeTable;