//@ts-check
/**
 * @type {Array<{id:number, name:string, comprado:boolean}>}
 */
const INITIAL_STATE = []

//ACCCIONES POSIBLES

/** @param {string} name  */
export function addArticle(name){
    return {
        type: 'ADD_ARTICLE',
        payload: {
            name
        }
    }
}

/** @param {number} id  */
export function removeArticleById(id){
    return {
        type: 'REMOVE_ARTICLE',
        payload: {
            id
        }
    }
}

/** @param {number} id  */
export function toggleArticle(id){
    return {
        type: 'TOGGLE_ARTICLE',
        payload: {
            id
        }
    }
}

export function clear(){
    return {
        type: 'CLEAR_LIST'

    }
}

//REDUCER

/**
 * 
 * @param {typeof INITIAL_STATE} state 
 * @param {{type: string, payload?:any}} action 
 */
export function reducer (state = INITIAL_STATE, action){

    switch(action.type){
        
        case 'ADD_ARTICLE' : {
            const newArticle = {
                id: Date.now(),
                name: action.payload.name,
                comprado: false
            }
            return [...state, newArticle]
        }
        case 'TOGGLE_ARTICLE': {
            return state.map(item=>  //modifica 
                item.id === action.payload.id
                  ? {...item, comprado: !item.comprado}
                  : item
            )
        }
        case 'REMOVE_ARTICLE': {
            return state.filter(item => item.id !==action.payload.id) //elimina
        }
        case 'CLEAR_LIST': {
            return []
        }
        default: 
            return state
    }

}



//create state

/**
 * 
 * @param {typeof reducer} reducer 
 */

export function createState(reducer){

    /** @type {typeof INITIAL_STATE} state */
    let state     

    /** @type {Array<()=> void>} listeners */
    const listeners = []  

    function getState(){
        return state
    }

    /** @param {{type: string, payload?:any}} action */

    function dispatch(action){
        state = reducer(state, action)
        listeners.forEach(listener=> listener())
    }


    /**  @param {*} listener */
   function subscribe(listener){
        listeners.push(listener)
   }


    //INICIALIZACION DE ESTADO

    dispatch({ type: '@@INIT'})

    return {
        getState,
        dispatch,
        subscribe
    }



}

