//@ts-check

import { Article } from "./Article.js";

export class LocalStorage {

    /** @param {string} name  */

    constructor (name) {
        this.name = name
       
    }

    getItems(){
        const items = localStorage.getItem(this.name)
        return items ?JSON.parse(items) : []
    }

    /** @param {Article[]} items  */
    setItems (items){
        localStorage.setItem(this.name, JSON.stringify(items))
    }

    clear(){
        localStorage.removeItem(this.name)
    }
}