/* global google */
import React from 'react';
import { Segment, Header , Button } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateEvent, createEvent } from '../eventActions';
import { Formik , Form  } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MyPlaceInput from '../../../app/common/form/MyPlaceInput';

function EventForm({match , history }) {

    const dispatch = useDispatch();
    const selectedEvent = useSelector(state => state.event.events.find(evt => evt.id === match.params.id));
    const initialValues = selectedEvent ?? {

        title:'',
        category:'',
        description:'',
        city:{
            address:'',
            latLng: null
        },
        venue:{
            address:'',
            latLng: null
        },
        date:''
    }

    const validationSchema = Yup.object({

        title : Yup.string().required('You must provide a title'),
        category : Yup.string().required('You must provide a category'),
        description : Yup.string().required(),
        city : Yup.object().shape({
            address : Yup.string().required('City is required')
        }),
        venue : Yup.object().shape({
            address : Yup.string().required('Venue is required')
        }),
        date : Yup.string().required()
    });



    return (
        <Segment clearing style={{zindex : 0}}>
            <Formik
                initialValues = {initialValues}
                validationSchema = {validationSchema}
                onSubmit={values => {
                    selectedEvent ? 
                    dispatch(updateEvent({...selectedEvent, ...values})) 
                    :
                    dispatch(createEvent({...values, id:cuid(), hostedBy:'Bob', attendees:[], hostPhotoURL: '/assets/user.png'}));
                    history.push('/events');
                }}
            >

            {({isSubmitting, dirty , isValid, values}) => (

                <Form className='ui form'>
                    <Header sub color='teal' content='Event Details'/>
                    <MyTextInput name='title' placeholder='Event Title'/>
                    <MySelectInput name='category' placeholder='Category'/>
                    <MyTextArea name='description' placeholder='Description' rows={3}/>
                    <Header sub color='teal' content='Event Location Details'/>
                    <MyPlaceInput name='city' placeholder='City' />
                    <MyPlaceInput 
                    name='venue' 
                    disabled = {!values.city.latLng}
                    placeholder='Venue'
                    options = {{
                        location : new google.maps.LatLng(values.city.latLng),
                        radius: 1000,
                        types: ['establishment']
                    }}
                    />
                    <MyDateInput name='date' placeholderText='Event Date' timeFormat='HH:mm' showTimeSelect
                    timeCaption='time' dateFormat='MMMM d, yyyy h:mm a' />
                
                    <Button  
                    type='submit' 
                    loading={isSubmitting} 
                    disabled= {!isValid || !dirty || isSubmitting}
                    floated='right' 
                    positive 
                    content='Submit'/>
                    <Button as={Link} to='/events' disabled={isSubmitting} floated='right' content='Cancel'/>
                 </Form>

            )}
               
            </Formik>
        </Segment>
    );
}

export default EventForm;