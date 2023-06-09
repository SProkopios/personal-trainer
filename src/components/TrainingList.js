import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import dayjs from "dayjs";
import Button from '@mui/material/Button';
import { TRAINING_URL } from './constants';
import { ONETRAINING_URL } from './constants';
import { CSVLink } from 'react-csv';


// Displays list of trainings
export default function TrainingList() {
    const [training, setTraining] = useState([]);
    const [open, setOpen] = useState(false);

    const [columnDefs] = useState([
        {field: 'date', sortable: true, filter: true, valueFormatter: params => dayjs(params.value).format('DD/MM/YYYY HH:mm')},
        {field: 'duration', sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true, width: 300},
        {field: 'customer.firstname', sortable: true, filter: true, width: 300},
        { cellRenderer: params => 
            <Button size="small" color="error" onClick={() => deleteTraining(params)}>
              Delete
            </Button>, 
            width: 120}
    ])

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch(TRAINING_URL)
        .then(response => response.json())
        .then(data=>  {setTraining(data);
        console.log(data)})
        .catch(err => console.error(err))
    };

    // Data to export in CSV
    const csvExport = () => {
        const csvData = training.map((train) => {
          const { date, duration, activity, customer} = train;
          const customersname = customer.firstname;
          return [date, duration, activity, customersname];
        });
        return csvData;
      };

      //Deleting the training
    const deleteTraining = (params) => {
        if (window.confirm('are you sure about that?'))
            fetch(ONETRAINING_URL + params.data.id, { method: 'DELETE'})
            .then(response => {
                if (response.ok) {
                    setOpen(true);
                    getTrainings();
                }
                else
                    alert('Something wong in deletion: ' + response.status);
            })
            .catch(err => console.error(err))
    }

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
            <CSVLink data={csvExport()} filename={"trainingCSV.csv"}>
                Download CSV
            </CSVLink>
        </>
    );
}