//@ts-check

document.addEventListener('DOMContentLoaded', onDOMLoaded)

function onDOMLoaded() {
    
const formulario = document.getElementById('formulario')
const inputArticulo = document.getElementById('inputArticulo')
const botonAdd = document.getElementById('botonAnadir')
const botonNuevaLista = document.getElementById('botonReset')


formulario?.addEventListener('submit', onSubmit)
inputArticulo?.addEventListener('onKeyUp', onKeyUp)
botonAdd?.addEventListener('click', onAddClick)
botonNuevaLista?.addEventListener('click', onNewListClick)

loadShoppingList()

}

/** @param {Event} e 
 * @listener formulario.submit
 */
function onSubmit(e) {
    e.preventDefault()
}

/** @param {Event} e */
function onKeyUp(e){
    e.preventDefault()
}

/** @param {Event} e  */
function onAddClick(e){
    e.preventDefault()
}

/** @param {Event} e  */
function onNewListClick(e){
    e.preventDefault()
}

function loadShoppingList(){

}