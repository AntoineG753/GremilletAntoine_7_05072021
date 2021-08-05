


const initial_state = {
    connected: false,
}
function connectedReducer(state = initial_state, action) { // on passe deux parametre, l'etat initial + action pour les action
    switch(action.type) {
        case 'connected':

            return {connected: true} 

        default:
            return state
    }
    
}



export default connectedReducer;
















