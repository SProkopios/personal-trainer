import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { CUSTOMER_URL, ONETRAINING_URL } from './constants';
import AddCustomer from './AddCustomer';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import { CSVLink } from 'react-csv';

//Displays the customer list
export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const [columnDefs] = useState([
        {field: 'firstname', sortable: true, filter: true, width: 140},
        {field: 'lastname', sortable: true, filter: true, width: 180},
        {field: 'streetaddress', sortable: true, filter: true, width: 280},
        {field: 'postcode', sortable: true, filter: true, width: 130},
        {field: 'city', sortable: true, filter: true, width: 180},
        {field: 'email', sortable: true, filter: true, width: 200},
        {field: 'phone', sortable: true, filter: true, width: 150},
        {filter: false, sortable: false, width: 170, cellRenderer: rowData => <AddTraining addTraining={addTraining} customer={rowData.data}/>},
        {filter: false, sortable: false, width: 100, cellRenderer: rowData => <EditCustomer updateCustomer={updateCustomer} customer={rowData.data}/>},
        { cellRenderer: params => 
            <Button size="small" color="error" onClick={() => deleteCustomer(params)}>
              Delete
            </Button>, 
            width: 120
          }
    ])

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = () => {
        fetch(CUSTOMER_URL)
        .then(response => response.json())
        .then(data=> setCustomers(data.content))
        .catch(err => console.error(err))
    };

    //Data to export in CSV
    const csvExport = () => {
        const csvData = customers.map((customer) => {
          const { firstname, lastname, email, phone, streetaddress, city, postcode } = customer;
          return [firstname, lastname, email, phone, streetaddress, city, postcode];
        });
        return csvData;
      };

      //Deletes the customer
    const deleteCustomer = (params) => {
        if (window.confirm('are you sure about that?'))
            fetch(params.data.links[0].href, { method: 'DELETE'})
            .then(response => {
                if (response.ok) {
                    setMessage("Deleted succefully!");
                    setOpen(true);
                    getCustomers();
                }
                else
                    alert('Something wong in deletion: ' + response.status);
            })
            .catch(err => console.error(err))
    }

    // Adds new training for a customer
    const addTraining = (training) => {
        if (window.confirm('are you sure about that?'))
            fetch(ONETRAINING_URL, { 
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(training)
            })
            .then(response => {
                if (response.ok) {
                    setMessage("Training added succefully!")
                    setOpen(true);
                    getCustomers();
                }
                else
                    alert('Something wong in adding the training : ' + response.status);
            })
            .catch(err => console.error(err))
    }

    //Adding a customer
    const addCustomer = (customer) => {
        fetch(CUSTOMER_URL, {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok)
                getCustomers();
            else
            alert("Something wong");

        })
        .catch(err => console.error(err))
    }

    // Updating or Editing the customer
    const updateCustomer = (customer, link) => {
        console.log(link)
        fetch(link, {
            method: 'PUT',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok)
                getCustomers();
            else
            alert("Something wong");

        })
        .catch(err => console.error(err))
    }

    return(
        <>
            
            <AddCustomer addCustomer={addCustomer} />
            <div className='ag-theme-material'
             style={{height: 750, width: '90%', margin: 'auto'}}
             >
                <AgGridReact 
                pagination={true}
                paginationPageSize={15}
                rowData={customers}
                columnDefs={columnDefs}/>
            </div>
            <Snackbar 
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={message} 
            />
            <CSVLink data={csvExport()} filename={"customersCSV.csv"}>
                Download CSV
            </CSVLink>
        </>
    );
}
