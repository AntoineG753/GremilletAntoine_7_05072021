import {createStore} from 'redux';


const initial_state = {
    connected: false,
}
export function connectedReducer(state = initial_state, action) { // on passe deux parametre, l'etat initial + action pour les action
    switch(action.type) {
        case 'connected' :

            return {...state, connected: true }

        default:
            return state
    }
    
}
 const store = createStore(connectedReducer)


export default store;
















