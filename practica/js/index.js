//@ts-check
//import { Store } from "./store/store.js"
import { createState, reducer } from "./store/redux-store.js"
import { ShoppingListController } from "./controllers/ShoppingListController.js"
//import { LocalStorage } from "./clases/LocalStorage.js"
//import { FabricaArticles } from "./clases/Article.js"



document.addEventListener('DOMContentLoaded', onDOMLoaded)

function onDOMLoaded() {
    
//const storage = new LocalStorage('shopping-list')
//const store = new Store(storage)
//const fabrica = new FabricaArticles()
//const controller = new ShoppingListController(store, fabrica)

//controller.init()

//crear lla store Redux
const store = createState(reducer)

//creaer controller
const controller = new ShoppingListController(store)

//arranca app
controller.init()

}


