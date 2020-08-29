import { LISTEN_TO_CURRENT_USER_PROFILE, LISTEN_TO_SELECTED_USER_PROFILE , LISTEN_TO_USER_PHOTOS, LISTEN_TO_USER_EVENTS, LISTEN_TO_FOLLOWERS, LISTEN_TO_FOLLOWINGS} from "./profileConstants";

export function listenToCurrentUserProfile(profile){

    return {

        type : LISTEN_TO_CURRENT_USER_PROFILE,
        payload : profile
    }
}

export function listenToSelectedUserProfile(profile){


    return {

        type : LISTEN_TO_SELECTED_USER_PROFILE,
        payload : profile
    }
}

export function listenToSelectedUserPhotos(photos){

    return {

        type : LISTEN_TO_USER_PHOTOS,
        payload : photos
    }
}

export function listenToUserEvents(events){

    return {

        type : LISTEN_TO_USER_EVENTS,
        payload : events
    }
}

export function listenToFollowers(followers){

    console.log(followers);
    return{

        type : LISTEN_TO_FOLLOWERS,
        payload: followers
    }
}

export function listenToFollowings(followings){
    console.log(followings);
    return{

        type : LISTEN_TO_FOLLOWINGS,
        payload : followings
    }
}