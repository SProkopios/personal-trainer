import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Home from './Home';
import React, { useState, useRef } from 'react';
import CustomerList from './CustomerList';
import TrainingList from './TrainingList';

export default function TabList() {

    const [value, setValue] = useState('one');

    const changeTab = (event, value) => {
        setValue(value);
    };

    return(
        <div>
            <Tabs value={value} onChange={changeTab}>
                <Tab value="one" label="Home" />
                <Tab value="two" label="Customerlist" />
                <Tab value="three" label="Traininglist" />
            </Tabs>
            {value === 'one' && <div><Home /></div>}
            {value === 'two' && <div><CustomerList /></div>}
            {value === 'three' && <div><TrainingList /></div>}
        </div>
    );
}