import React , {useState} from 'react'
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import EventForm from '../eventForm/EventForm';
import {sampleData} from '../../../app/api/sampleData';

const EventDashboard = ({formOpen,setFormOpen, selectEvent, selectedEvent}) => {

    const [events, setEvents] = useState(sampleData);
    

    function handleCreateEvent(event){

        setEvents([...events, event]);


    }

    function handleUpdateEvent(updatedEvent){

        setEvents(events.map(evt => evt.id === updatedEvent.id ? updatedEvent : evt));
        selectEvent(null);
        
    }


    function handleDeleteEvent(deleteEvent){

        setEvents(events.filter(evt => evt.id !== deleteEvent.id));
    }

    return (
        
        <Grid>
            <Grid.Column width={10}>
                <EventList events={events} selectEvent={selectEvent} deleteEvent={handleDeleteEvent}/>
            </Grid.Column>

            <Grid.Column width={6}>
                {formOpen && <EventForm key={selectedEvent ? selectedEvent.id : null} setFormOpen={setFormOpen} setEvents={setEvents} 
                createEvent={handleCreateEvent} selectedEvent={selectedEvent} updateEvent={handleUpdateEvent}/>}
            </Grid.Column>
        </Grid>
    )
}

export default EventDashboard;
