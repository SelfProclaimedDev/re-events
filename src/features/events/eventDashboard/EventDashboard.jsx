import React, { useState } from 'react'
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import { useSelector, useDispatch } from 'react-redux';
import EventListItemPlaceholder from './EventListItemPaceholder';
import EventFilters from './EventFilters';
import { listenToEventsFromFirestore } from '../../../app/firestore/firestoreService';
import { listenToEvents } from '../eventActions';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';


const EventDashboard = () => {

    const {events} = useSelector(state => state.event);
    const {loading} = useSelector(state => state.async);
    const dispatch =useDispatch();
    const [predicate , setPredicate] = useState(new Map([
        ['startDate' , new Date()],
        ['filter' , 'all']
    ]));

    function handleSetPredicate(key, value){

        setPredicate(new Map(predicate.set(key, value)));
    }
    
    useFirestoreCollection({
        query: () => listenToEventsFromFirestore(predicate),
        data : events => dispatch(listenToEvents(events)),
        deps: [dispatch, predicate]
    })
    
    return (
        
        <Grid>
            <Grid.Column width={10}>
            { loading &&
                <>
                   <EventListItemPlaceholder/>
                   <EventListItemPlaceholder/> 
                </>
            }
                <EventList events={events}/>
            </Grid.Column>

            <Grid.Column width={6}>
                <EventFilters predicate={predicate} setPredicate={handleSetPredicate} loading={loading}/>
            </Grid.Column>
        </Grid>
    )
}

export default EventDashboard;
