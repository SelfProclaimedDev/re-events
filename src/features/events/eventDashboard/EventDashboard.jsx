import React, { useState, Fragment, useEffect } from 'react'
import { Grid, Button, Loader } from 'semantic-ui-react';
import EventList from './EventList';
import { useSelector, useDispatch } from 'react-redux';
import EventListItemPlaceholder from './EventListItemPaceholder';
import EventFilters from './EventFilters';
import { listenToEventsFromFirestore } from '../../../app/firestore/firestoreService';
import { listenToEvents, fetchEvents, clearEvents } from '../eventActions';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import EventsFeed from './EventsFeed';


const EventDashboard = () => {
    const limit = 2;
    const {events, moreEvents} = useSelector(state => state.event);
    const {loading} = useSelector(state => state.async);
    const [loadingInitial , setLoadingInitial] = useState(false);
    const {authenticated} = useSelector(state => state.auth);
    const [lastDocSnapshot , setLastDocSnapshot ] = useState(null);
    const dispatch =useDispatch();
    const [predicate , setPredicate] = useState(new Map([
        ['startDate' , new Date()],
        ['filter' , 'all']
    ]));

    function handleSetPredicate(key, value){
        dispatch(clearEvents());
        setLastDocSnapshot(false);
        setPredicate(new Map(predicate.set(key, value)));
    }
    
    // useFirestoreCollection({
    //     query: () => listenToEventsFromFirestore(predicate),
    //     data : events => dispatch(listenToEvents(events)),
    //     deps: [dispatch, predicate]
    // })

    useEffect(() => {
        setLoadingInitial(true);
        dispatch(fetchEvents(predicate, limit)).then((lastVisible) => {
            setLastDocSnapshot(lastVisible)
        })
        setLoadingInitial(false);

        return () => {

            dispatch(clearEvents());
        }
    }, [dispatch, predicate])
    
    function handleFetchNextEvents(){

        dispatch(fetchEvents(predicate, limit, lastDocSnapshot)).then((lastVisible) => {
            setLastDocSnapshot(lastVisible)
    })
}
    return (
        
        <Grid>
            <Grid.Column width={10}>
            { loadingInitial &&
                <Fragment>
                   <EventListItemPlaceholder/>
                   <EventListItemPlaceholder/> 
                </Fragment>
            }
                <EventList events={events} getNextEvents={handleFetchNextEvents} loading={loading} moreEvents={moreEvents}/>
                
                
            </Grid.Column>

            <Grid.Column width={6}>
            {authenticated && 
                <EventsFeed/>
            }
                <EventFilters predicate={predicate} setPredicate={handleSetPredicate} loading={loading}/>
            </Grid.Column>

            <Grid.Column width={10}>
                <Loader active={loading}/>
            </Grid.Column>
        </Grid>
    )
}

export default EventDashboard;
