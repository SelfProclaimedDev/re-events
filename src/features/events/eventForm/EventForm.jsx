import React, { useState } from 'react'
import { Segment, Header, Form, Button } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateEvent, createEvent } from '../eventActions';

function EventForm({match , history }) {

    const selectedEvent = useSelector(state => state.event.events.find(evt => evt.id === match.params.id));
    const initialValues = selectedEvent ?? {

        title:'',
        category:'',
        description:'',
        city:'',
        venue:'',
        date:''
    }
    const [values , setValues] = useState(initialValues);
    const dispatch = useDispatch();
    

    function handleFormSubmit(){

        selectedEvent ? dispatch(updateEvent({...selectedEvent, ...values})) :
        dispatch(createEvent({...values, id:cuid(), hostedBy:'Bob', attendees:[], hostPhotoURL: '/assets/user.png'}));
        history.push('/events');
        
    }

    function handleFormChange(e){
        const {name, value} = e.target;
        setValues({...values, [name]: value}); 
    }

    return (
        <Segment clearing>
            <Header content={ selectedEvent? 'Editing the event':'Create new event'} />
            <Form onSubmit={handleFormSubmit}>
                <Form.Field>
                    <input name='title' type='text' placeholder='Event title' value={values.title} 
                    onChange={handleFormChange}/>
                </Form.Field>

                <Form.Field>
                    <input name='category' type='text' placeholder='Category' value={values.category} 
                    onChange={handleFormChange}/>
                </Form.Field>

                <Form.Field>
                    <input name='description' type='text' placeholder='Description' value={values.description} 
                    onChange={handleFormChange}/>
                </Form.Field>

                <Form.Field>
                    <input name='city' type='text' placeholder='City' value={values.city} 
                    onChange={handleFormChange}/>
                </Form.Field>

                <Form.Field>
                    <input name='venue' type='text' placeholder='Venue' value={values.venue} 
                    onChange={handleFormChange}/>
                </Form.Field>

                <Form.Field>
                    <input name='date' type='date' placeholder='Date' value={values.date} 
                    onChange={handleFormChange}/>
                </Form.Field>
                <Button  type='submit' floated='right' positive content='Submit'/>
                <Button as={Link} to='/events' floated='right' content='Cancel'/>
            </Form>
        </Segment>
    );
}

export default EventForm;