import { combineReducers } from 'redux';


const initialState = {
    vehicleList: []
};

const updateReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LIST_UPDATE':
            return{
                vehicleList: action.payload
            }
        default:
            return state
    }
}

export default combineReducers({ vehicleList: updateReducer })