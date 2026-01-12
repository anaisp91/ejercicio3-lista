//@ts-check
/**
 * @type {Object}
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