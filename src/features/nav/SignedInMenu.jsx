import React from 'react';
import { Menu , Image, Dropdown } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { signOutFirebase } from '../../app/firestore/firebaseService';

function SignedInMenu() {

    const history = useHistory();
    const {currentUser} = useSelector(state => state.auth);

    async function handleSignOut(){

        try{
            history.push('/');
            await signOutFirebase();
            
        }
        catch(error){
            toast.error(error.message);
        }

    }

    return (
        <Menu.Item position='right'>
            <Image avatar spaced='right' src={ currentUser.photoURL ||'/assets/user.png'}/>
            <Dropdown pointing='top left' text={currentUser.displayName}>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to='createEvent' text='Create Event' icon='plus'/>
                    <Dropdown.Item text='My Profile' icon='user'/>
                    <Dropdown.Item as={Link} to='/account' text='My Account' icon='settings'/>
                    <Dropdown.Item  onClick={() =>handleSignOut()} text='Sign Out' icon='power'/>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Item>
    )
}

export default SignedInMenu;