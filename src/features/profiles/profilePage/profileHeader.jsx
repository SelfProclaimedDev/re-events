import React, { useState } from 'react'
import { Segment, Grid, Item, Header, Statistic, Divider, Reveal, Button } from 'semantic-ui-react'
import { toast } from 'react-toastify';
import { followUser, unfollowUser } from '../../../app/firestore/firestoreService';

export default function ProfileHeader({profile, isCurrentUser}) {

    const [loading, setLoading] = useState(false);

    async function handleFollowUser(){
        setLoading(true);

        try{
           await followUser(profile);
        }
        catch(error){
            toast.error(error.message);
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    async function handleUnfollowUser(){
        setLoading(true);

        try{
           await unfollowUser(profile);
        }
        catch(error){
            toast.error(error.message);
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar circular size='small' src={ profile.photoURL || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1' style={{display: 'block', marginBottom:10}} 
                                content={profile.displayName}/>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>

                <Grid.Column width={4}>
                    <Statistic.Group>
                        <Statistic label='Followers' value={10}/>
                        <Statistic label='Following' value={5}/>
                    </Statistic.Group>


                    {!isCurrentUser &&
                    <>

                    <Divider/>
                    <Reveal animated='move'>
                        <Reveal.Content visible style={{width : '100%'}}>
                            <Button fluid color='teal' content='Following'/>
                        </Reveal.Content>

                        <Reveal.Content hidden style={{width : '100%'}}>
                            <Button basic fluid onClick={handleFollowUser} 
                            loading={loading} color='green' content='Follow'/>
                        </Reveal.Content>
                    </Reveal>
                    <Button basic fluid onClick={handleUnfollowUser} 
                    loading={loading} color='red' content='Unfollow'/>

                    </>
                    }
                    
                </Grid.Column>
            </Grid>
        </Segment>

    )
}
