import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from "./eventConstants";

const { sampleData } = require("../../app/api/sampleData");

const initialState = {

    events : sampleData
}

export default function eventReducer(state = initialState , {type , payload}){


    switch (type){

        case CREATE_EVENT:
            return {

                ...state,
                events : [...state.events , payload]
            }

        case UPDATE_EVENT:
            return {

                ...state,
                events: state.events.map(event => event.id === payload.id ? payload : event)
            }

        case DELETE_EVENT:
            return{

                ...state,
                events: state.events.filter(evt => evt.id !== payload )
            }

        default:
            return state
    }
}