import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState, useEffect } from 'react';
import { TRAINING_URL } from './constants';

//Displays calendar
export default function Calendar() {

    const [training, setTraining] = useState([]);

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch(TRAINING_URL)
        .then(response => response.json())
        .then(data=>  setTraining(data))
        .catch(err => console.error(err))
    };
    
    //displays the trainings in calendar
    const events = training.map((train) => {
        const { date, duration, activity, customer} = train;
        const customersname = customer.firstname;
        const parsedDate = new Date(date);
        const endDate = new Date(parsedDate.getTime() + duration * 60000); 
        return {
            title: activity,
            start: parsedDate,
            end: endDate,
            extendedProps: {customersname: customersname},
        };
    });

    return (
        <div className="App">
            <div className="calendar">
                <FullCalendar
                    events={events}
                    headerToolbar={{
                        center: 'dayGridMonth,timeGridWeek,timeGridDay',}}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                />
            </div>
        </div>
      );
}

