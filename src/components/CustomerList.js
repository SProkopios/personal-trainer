import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { data } from 'react-dom-factories';

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);

    const [columnDefs] = useState([
        {field: 'firstname', sortable: true, filter: true},
        {field: 'lastname', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true, width: 300},
        {field: 'postcode', sortable: true, filter: true, width: 150},
        {field: 'city', sortable: true, filter: true, width: 200},
        {field: 'email', sortable: true, filter: true, width: 300},
        {field: 'phone', sortable: true, filter: true, width: 250}
    ])

    useEffect(() => {
        fetch("http://traineeapp.azurewebsites.net/api/customers")
        .then(response => response.json())
        .then(data=> setCustomers(data.content))
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
                rowData={customers}
                columnDefs={columnDefs}/>
            </div>
        </>
    );
}
