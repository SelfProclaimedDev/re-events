import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {formatDistance} from 'date-fns';
import { Feed } from 'semantic-ui-react';

export default function EventFeedItem({post}) {

    let summary;
    
    switch(post.code){
        case 'joined-event':
            summary= (

                <Fragment>
                    <Link to={`profile/${post.userUid}`}>{post.displayName} </Link> 
                     has signed up to <Link to={`/events/${post.eventId}`}>{post.title}</Link>
                </Fragment>
            );
            break;
        case 'left-event':
            summary= (
    
                <Fragment>
                    <Link to={`profile/${post.userUid}`}>{post.displayName} </Link> 
                      has cancelled their place on <Link to={`/events/${post.eventId}`}>{post.title}</Link>
                </Fragment>
                );
            break;

        default:
            summary = 'No event to display'
            break;
    }
    
    return(

        <Feed.Event>
            <Feed.Label image={post.photoURL}/>
            <Feed.Content>
                <Feed.Date>{formatDistance(new Date(post.date) , new Date())} ago</Feed.Date>
                <Feed.Summary>{summary}</Feed.Summary>
            </Feed.Content>
        </Feed.Event>
    )
}
