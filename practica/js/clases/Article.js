// @ts-check

export class Article {
    
    /** @type {number} id */
     id

     /** @type {string} name */
     name

     /** @type {boolean} comprado */
     comprado


     /** 
      * @param {number} id 
      * @param {string} name
      */
    constructor(id, name,){
        this.id = id
        this.name = name
        this.comprado = false
    }

    toggle(){
        this.comprado = !this.comprado
    }
}