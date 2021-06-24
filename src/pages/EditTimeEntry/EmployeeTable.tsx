import React, {FC, useCallback, useState} from "react";
import {DataGrid} from '@material-ui/data-grid';
import moment from "moment";

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
        'startTime': new Date(e.date + ' ' + e.startTime),
        'endTime': new Date(e.date + ' ' + e.endTime),
    })));

    const handleEditCellChange = useCallback(
        ({id, field, props}: any) => {
            if (tableData.find(x => x.id == id).date != moment(new Date()).format('dd/MM/yyyy')) {
                alert("Only time can be changed");
                return (tableData.find(x => x.id == id).endTime);
            }
        },
        [],
    );

    return (
        <div style={{height: 320, width: '100%'}}>
            <DataGrid rows={tableData} columns={columns} onEditCellChange={handleEditCellChange}/>
        </div>
    );
}

export default EmployeeTable;