const INITIAL_PUBLICATIONS_STATE = {
    publications: []
}


function publicationReducer (sate = INITIAL_PUBLICATIONS_STATE, action) {
    switch(action.type) {
        case 'LOADPUBLICATIONS':
            return {
                publications: action.payload
            }
    }
}


export default publicationReducer;