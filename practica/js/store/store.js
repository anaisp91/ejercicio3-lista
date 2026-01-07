// @ts-check

import { Article } from "../clases/Article";
 import { LocalStorage } from "../clases/LocalStorage";


 export class Store {

    /** @type {Article[]} items */
    #items
    /** @type {LocalStorage} storage */
    #storage
    /** @type {Array<(items:Article[]) => void>} */
    #listeners


     
    /** @param {LocalStorage} storage  */
    constructor(storage) {
        this.#storage = storage;
        this.#items = this.#storage.getItems();
        this.#listeners = []
    }

    //LECTURA DE ESTADO

    getArticles(){
        return this.#items
    }

    //SUBSCIPCION A CAMBIOS

    /** @param {(items: Article[]) => void} listener  */
    subscribe(listener){
        this.#listeners.push(listener)
    }

    //NOTIFICACION DE CAMBIOS A LOS SUBSCIRPTORES

    notify(){
        for(const listener of this.#listeners){
            listener(this.#items)
        }
    }


    //MUTACIONES DE ESTADO

    /** @param {Article} item  */
    addArticle(item){
        this.#items.push(item)
        this.#storage.setItems(this.#items)
        this.#persist()
    }

    /** @param {number} id */
    removeArticleById(id){
        this.#items = this.#items.filter(item => item.id !== id)
        this.#storage.setItems(this.#items)
        this.#persist()
    }

    /** @param {number} id  */
    toggleArticle(id){
        const article = this.#items.find(item => item.id === id)
        if(article){
            article.toggle()
            this.#storage.setItems(this.#items)
        }
        this.#persist()

    }

    clear(){
        this.#items = []
        this.#storage.clear()
        this.notify()
    }

    //METODO PRIVADO 

    #persist(){
        this.#storage.setItems(this.#items)
        this.notify()
    }
   
 }
 
 