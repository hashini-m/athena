import React, {FC} from "react";
import { DataGrid } from '@material-ui/data-grid';

interface Props {
    values: any;
}

const columns = [
    {field: 'name', headerName: 'Name', width: 180, editable: true},
    {field: 'age', headerName: 'Age', type: 'number', editable: true},
    {
        field: 'dateCreated',
        headerName: 'Date Created',
        type: 'date',
        width: 180,
        editable: true,
    },
    {
        field: 'lastLogin',
        headerName: 'Last Login',
        type: 'dateTime',
        width: 220,
        editable: true,
    },
];

const rows = [
    {
        id: 1,
        name: 'Bruce Wayne',
        age: 25,
        dateCreated: '2021-06-12',
        lastLogin: '2021-06-25',
    },
    {
        id: 2,
        name: 'Bruce Wayne',
        age: 36,
        dateCreated: '2021-06-12',
        lastLogin: '2021-06-25',
    },
    {
        id: 3,
        name: 'Bruce Wayne',
        age: 19,
        dateCreated: '2021-06-12',
        lastLogin: '2021-06-25',
    },
    {
        id: 4,
        name: 'Bruce Wayne',
        age: 28,
        dateCreated: '2021-06-12',
        lastLogin: '2021-06-25',
    },
    {
        id: 5,
        name: 'Bruce Wayne',
        age: 23,
        dateCreated: '2021-06-12',
        lastLogin: '2021-06-25',
    },
];

const EmployeeTable: FC<Props> = (props) => {
    return (
        <div style={{height: 300, width: '100%'}}>
            <DataGrid rows={rows} columns={columns}/>
        </div>
    );
}

export default EmployeeTable;