// @ts-check

import { Article, FabricaArticles } from "../clases/Article";
 import { LocalStorage } from "../clases/LocalStorage";


 export class Store {

    /** @type {Article[]} items */

    #items

    /** @type {LocalStorage} storage */

    #storage


     /** @param {LocalStorage} storage  */

    constructor(storage) {
        this.#storage = storage;
        this.#items = this.#storage.getItems();
    }

    getArticles(){
        return this.#items
    }

    /** @param {Article} item  */
    addArticle(item){
        this.#items.push(item)
        this.#storage.setItems(this.#items)
    }

    /** @param {*} id */
    removeArticleById(id){
        this.#items = this.#items.filter(item => item.id !== id)
        this.#storage.setItems(this.#items)
    }

    clear(){
        this.#items = []
        this.#storage.clear()
    }
   
 }
 