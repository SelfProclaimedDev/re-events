import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { increment, decrement } from './testReducer';
import { openModal } from '../../app/common/modals/modalReducer';
import TestPlaceInputs from './TestPlaceInputs';
import TestMap from './TestMap';



export default function SandBox() {
    
    const dispatch = useDispatch();
    const data = useSelector(state => state.test.data);
    const { loading } = useSelector(state => state.async);
    const [target , setTarget] = useState();

    const defaultProps = {
        center: {
          lat:  0 ,
          lng: 0 
        },
        zoom: 11
      };

      const [location , setLocation] = useState(defaultProps);

      function handleSetLocation(latLng){

        setLocation({...location, center:{lat:latLng.lat , lng:latLng.lng}})
      }
    return (
        <>
            
            <h1>Testing 123</h1>
            <h3>The data is:{data}</h3>
            <Button name='increment' onClick={(e) => {dispatch(increment(10)); setTarget(e.target.name)}} content='Increment'
             color='green' loading={loading && target === 'increment'}/>
            <Button name='decrement' onClick={(e) => {dispatch(decrement(5)); setTarget(e.target.name)}} content='Decrement' color='red' loading={loading && target === 'decrement'}/>
            <Button onClick={() => dispatch(openModal({modalType:'TestModal', modalProps:{data}}))} content='Open Modal' color='teal'/>
            <div style={{marginTop:15}}>
            <TestPlaceInputs setLocation={handleSetLocation}/>
            <TestMap location={location}/>
            </div>
        </>
    )
}

