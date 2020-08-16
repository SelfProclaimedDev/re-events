import React from 'react';
import { Grid } from 'semantic-ui-react';
import ProfileHeader from './profileHeader';
import ProfileContent from './profileContent';
import { useDispatch, useSelector } from 'react-redux';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { getUserProfile } from '../../../app/firestore/firestoreService';
import { listenToSelectedUserProfile } from '../profileActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
export default function ProfilePage({match}){

    const dispatch = useDispatch();
    const {selectedUserProfile} = useSelector(state => state.profile);
    const {currentUser} = useSelector(state => state.auth);
    const {loading , error} = useSelector(state => state.async);

    useFirestoreDoc({
        query : () => getUserProfile(match.params.id),
        data : profile => dispatch(listenToSelectedUserProfile(profile)),
        deps : [dispatch , match.params.id]
    })

    if((!selectedUserProfile && loading) || (!selectedUserProfile && !error)) return <LoadingComponent/>
    return(

        <Grid>
            <Grid.Column width={16}>
                <ProfileHeader profile={selectedUserProfile} 
                isCurrentUser={currentUser.uid === selectedUserProfile.id}/>
                <ProfileContent profile={selectedUserProfile}
                isCurrentUser={currentUser.uid === selectedUserProfile.id}/>
            </Grid.Column>
        </Grid>
    )
}