import React from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteEvent } from '../eventActions';
import { format } from 'date-fns';

function EventListItem({event}) {

    
    const dispatch = useDispatch();
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src={event.hostPhotoURL}/>
                        <Item.Content>
                            <Item.Header content={event.title}/>
                                <Item.Description>
                                    Hosted by <Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link> 
                                </Item.Description>    
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>

            <Segment>
                <span>
                    <Icon name='clock'/>{format(event.date, 'MMMM d, yyyy h:mm a')} |
                    <Icon name='marker'/>{event.venue.address}
                </span>
            
            </Segment>

            <Segment secondary>
                <List horizontal>
                    {
                            event.attendees.map(attendee => (

                                <EventListAttendee key={attendee.id} attendee={attendee}/>
                            ))

                    }
                </List>
            </Segment>
            

            <Segment clearing>
                <span>{event.description}</span>
                
                <Button as={Link} to={`/events/${event.id}`} color='teal' floated='right' content='View'/>
                <Button onClick={() => dispatch(deleteEvent(event.id))} color='red' floated='right' content='Delete'/>
            </Segment>
        </Segment.Group>
    )
}


export default EventListItem;