import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import dayjs, { Dayjs } from "dayjs"

export default function TrainingList() {
    const [training, setTraining] = useState([]);

    const [columnDefs] = useState([
        {field: 'date', sortable: true, filter: true, valueFormatter: params => dayjs(params.value).format('DD/MM/YYYY')},
        {field: 'duration', sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true, width: 300},
        {field: 'customer.firstname', sortable: true, filter: true, width: 300}
    ])

    useEffect(() => {
        fetch("https://traineeapp.azurewebsites.net/gettrainings")
        .then(response => response.json())
        .then(data=>  setTraining(data))
        .catch(err => console.error(err))
    }, []);

    return(
        <>
            <div className='ag-theme-material'
             style={{height: 750, width: '90%', margin: 'auto'}}
             >
                <AgGridReact
                pagination={true}
                paginationPageSize={15}
                rowData={training}
                columnDefs={columnDefs}/>
            </div>
        </>
    );
}