import React, { useEffect } from 'react';
import { Header, Segment, Feed } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFeedRef, firebaseObjectsToArrays } from '../../../app/firestore/firebaseService';
import { listenToFeed } from '../../profiles/profileActions';
import EventFeedItem from './EventFeedItem';

export default function EventsFeed() {


    const dispatch = useDispatch();
    const {feed} = useSelector(state => state.profile);


    useEffect(() => {

        getUserFeedRef().on('value' , snapshot => {
            if(!snapshot.exists) return;

            const feed = firebaseObjectsToArrays(snapshot.val())?.reverse();
            dispatch(listenToFeed(feed));
        })

        return () => {
            getUserFeedRef().off();
        }
    }, [dispatch])


    const image = '/assets/user.png';
    const date = '3 days ago';
    const summary = 'Diana joined an event'

    return (
        
        <>

            <Header attached color='teal' icon='newspaper' content='News Feed'/>
            <Segment attached='bottom'>
                <Feed>
                    {feed?.map(post => (

                        <EventFeedItem post={post} key={post.id}/>

                    ))}
                </Feed>
            </Segment>

        </>

    )
}
