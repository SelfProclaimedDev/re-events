const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

export function openModal(payload){

    return{

        type : OPEN_MODAL,
        payload : payload
    }
}

export function closeModal(payload){

    return{

        type : CLOSE_MODAL,
        payload : payload
    }
}

const initialState = null;

export default function modalReducer(state= initialState , {type , payload}){

    switch(type) {

        case OPEN_MODAL:
            
            const {modalType , modalProps} = payload;
            console.log(payload);
            return {modalType, modalProps};
            

        case CLOSE_MODAL:
            return null;

        default:
            return state;
    }
}