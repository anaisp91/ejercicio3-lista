//@ts-check
import { Store } from "./store/store.js"
import { LocalStorage } from "./clases/LocalStorage.js"
import { FabricaArticles } from "./clases/Article.js"
import { ShoppingListController } from "./controllers/ShoppingListControler.js"


document.addEventListener('DOMContentLoaded', onDOMLoaded)

function onDOMLoaded() {
    
const storage = new LocalStorage('shopping-list')
const store = new Store(storage)
const fabrica = new FabricaArticles()
const controller = new ShoppingListController(store, fabrica)

controller.init()

}

