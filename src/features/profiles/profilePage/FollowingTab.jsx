import React, { useState } from 'react'
import { Grid, Header, Button, Tab, Card } from 'semantic-ui-react';
import ProfileCard from './ProfileCard';
import { useDispatch, useSelector } from 'react-redux';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import { getFollowersCollection, getFollowingCollection } from '../../../app/firestore/firestoreService';
import { listenToFollowers, listenToFollowings } from '../profileActions';

export default function FollowingTab({profile, activeTab}) {

    const dispatch = useDispatch();
    const {followers , followings} = useSelector(state => state.profile);

    useFirestoreCollection({

        query : activeTab === 3 
        ? () => getFollowersCollection(profile.id) 
        : () => getFollowingCollection(profile.id)
        ,
        data : data => activeTab === 3 ? dispatch(listenToFollowers(data)) : dispatch(listenToFollowings(data)),
        deps:[activeTab, dispatch] 

    })
    return (
        
        <Tab.Pane>
            <Grid>
            <Grid.Column width={16}>
                <Header floated='left' icon='user' content={activeTab === 3 ? 'Followers' : 'Followings'} />
                
            </Grid.Column>
        
            <Grid.Column width={16}>
               <Card.Group itemsPerRow={5}>

                    {activeTab === 3 && followers.map(follower =>
                        <ProfileCard profile={follower} key={follower.id}/>

                        )}

                    {activeTab === 4 && followings.map(following =>
                            <ProfileCard profile={following} key={following.id}/>
                        )}
                    
               </Card.Group> 
            </Grid.Column>
            </Grid>
        
        </Tab.Pane>
        
    )
}
