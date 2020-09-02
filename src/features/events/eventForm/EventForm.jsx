/* global google */
import React, { useState } from 'react';
import { Segment, Header , Button, Confirm } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listenToSelectedEvent } from '../eventActions';
import { Formik , Form  } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MyPlaceInput from '../../../app/common/form/MyPlaceInput';
import { listenToEventFromFirestore, updateEventsInFirestore, addEventToFirestore, cancelEventToggle } from '../../../app/firestore/firestoreService';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { toast } from 'react-toastify';

function EventForm({match , history }) {

    
    const dispatch = useDispatch();
    const {selectedEvent} = useSelector(state => state.event);
    const {loading, error} = useSelector(state => state.async);
    const [loadingCancel , setLoadingCancel] = useState(false);
    const [confirmOpen , setConfirmOpen] = useState(false);
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

    async function handleCancelToggle(event){

        setConfirmOpen(false);
        setLoadingCancel(true);
        try{
            await cancelEventToggle(event);
            setLoadingCancel(false);
        }
        catch(error){
            setLoadingCancel(true);
            toast.error(error.message);
        }
    }

    useFirestoreDoc({

        query : () => listenToEventFromFirestore(match.params.id),
        data : event => dispatch(listenToSelectedEvent(event)),
        deps : [match.params.id, dispatch],
        shouldExecute : !!match.params.id
    })

    if (loading) return (<LoadingComponent content='Loading event...'/>);
    if(error) return <Redirect to='/error'/>;

    return (
        <Segment clearing style={{zindex : 0}}>
            <Formik
                initialValues = {initialValues}
                validationSchema = {validationSchema}
                onSubmit={async (values, {setSubmitting} )=> {

                    try{

                        selectedEvent
                        ? 
                        await updateEventsInFirestore(values)
                        :
                        await addEventToFirestore(values);
                        setSubmitting(false);
                        history.push('/events');
                    }
                    catch(error){

                        toast.error(error.message);
                        setSubmitting(false);
                    }
                   
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
                
                    {selectedEvent &&
                    <Button 
                    loading={loadingCancel}
                    type='button'
                    floated='left' 
                    color = {selectedEvent.isCancelled ? 'green' : 'red' }
                    content = { selectedEvent.isCancelled ? 'Reactivate Event' : 'Cancel Event'}
                    onClick={() => setConfirmOpen(true)}
                    />
                    
                    }
                    
                    <Button  
                    type='submit' 
                    loading={isSubmitting} 
                    color ='teal'
                    positive
                    disabled= {!isValid || !dirty || isSubmitting}
                    floated='right'
                    content='Submit'/>
                    <Button as={Link} to='/events' disabled={isSubmitting} floated='right' content='Cancel'/>
                 </Form>

            )}
               
            </Formik>

            <Confirm
            
            content={selectedEvent?.isCancelled ? 'This will reactivate the event - are you sure?' :
                    'This will cancel the event - are you sure?'}
            open ={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={() => handleCancelToggle(selectedEvent)}
            />
        </Segment>
    );
}

export default EventForm;