// @ts-check
import { addArticle, removeArticleById, toggleArticle, clear } from "../store/redux-store.js"


//CONEXION DEL DOM CON LA STORE Y CONTROLA LAS ACCIONES DEL USUARIO

export class ShoppingListController {
    
   //1.DEPENDENCIAS
   /** @type {{dispatch: Function,getState: Function, subscribe: Function}}  */
   store
   

   //3.DOM DECLARACION

   /** @type {HTMLFormElement} */
   // @ts-ignore
   formulario
   /** @type {HTMLInputElement} */
   // @ts-ignore
   inputArticulo
   /** @type {HTMLButtonElement} */
   // @ts-ignore
   botonAdd
   /** @type {HTMLButtonElement} */
   // @ts-ignore
   botonNuevaLista
   /** @type {HTMLUListElement} */
   // @ts-ignore
   lista
   
   //3.CONSTRUCTOR
   
    /**
     * @param {{dispatch: Function,getState: Function, subscribe: Function}} store
     */
   constructor(store){
    this.store = store
    
   }

   //4.CICLO DE VIDA

    init(){
        
        
        this.cacheDOM()
        this.bindEvents()
        //subscribimos a la redux: cuando cambiua estado renderizamos
        this.store.subscribe(() => this.render())
        //render inicial
        this.render()

    }

    cacheDOM(){

        const formulario = document.getElementById('formulario')
        const inputArticulo = document.getElementById('inputArticulo')
        const botonAdd = document.getElementById('botonAnadir')
        const botonNuevaLista = document.getElementById('botonReset')
        const lista = document.getElementById('listaArticulos')

        if (
            !(formulario instanceof HTMLFormElement) ||
            !(inputArticulo instanceof HTMLInputElement) ||
            !(botonAdd instanceof HTMLButtonElement) ||
            !(botonNuevaLista instanceof HTMLButtonElement) ||
            !(lista instanceof HTMLUListElement)
        ) {
            throw new Error('Error al cargar el DOM')
        }

        this.formulario = formulario
        this.inputArticulo =inputArticulo
        this.botonAdd = botonAdd
        this.botonNuevaLista = botonNuevaLista
        this.lista = lista

    }

    bindEvents(){

        this.formulario.addEventListener(
            'submit',
            this.onSubmit.bind(this)
        )
        
        this.botonAdd.addEventListener(
            'click',
            this.onAddClick.bind(this)
        )

        this.botonNuevaLista.addEventListener(
            'click',
            this.onNewListClick.bind(this)
        )

        this.lista.addEventListener(
            'click',
            this.onListClick.bind(this)
        )



    }

    //5.HANDLERS
    
    /** @param {Event} e  */

    onSubmit(e){
        //evita comportamiento de navegador
        e.preventDefault()

        //lee el input trim evita strings vacios
        const nombre = this.inputArticulo.value.trim()

        //evita logica innecesaria
        if(!nombre) return

        /*//crea articulo
        const articulo = this.fabrica.newArticle(nombre)

        //store se encarga de añadir-guardar
        this.store.addArticle(articulo)
        */
        //redux: describimos que ha pasado
        this.store.dispatch(addArticle(nombre))

        //reseteamos input
        this.inputArticulo.value = ''

        //renderizamos-luego sera NOTIFY
       //this.render() YA LO GESTIONA LA STORE CON SUBS/NOTIFY


        


    }

    /** @param {Event} e  */

    onAddClick(e){
        e.preventDefault()

        this.onSubmit(e)


    }

    /** @param {Event} e  */
    onNewListClick(e){
        e.preventDefault()
        //accion clara redux
        this.store.dispatch(clear())
       //this.render() YA LO GESTIONA LA STORE
       

    }


    /** @param {Event} e  */
    onListClick(e){
       
       //NUEVO onListClick

       //aseguramos que target es un Elemento
       if (!(e.target instanceof HTMLElement)) return

       //leemos accion toggle || delete
       const action = e.target.dataset.action
       if (!action)return

       //buascamos el li mas cercano
       const li = e.target.closest('li')
       if (!li) return

       //leemos id y comprobamos
       const idAttr = li.dataset.id
       if(!idAttr) {
        throw new Error ('El li no tiene data-id')
       }

       //Convertimos a numero y comprobamos
       const id = Number(idAttr)
       if (Number.isNaN(id)) return

       //Ejecutamos una accion

       switch (action) {
         case 'toggle': 
             this.store.dispatch(toggleArticle(id))
             break
        case 'delete':
            this.store.dispatch(removeArticleById(id))
            break

       }
       
       
      //this.render() YA LO GESTIONA LA STORE
       
    }

    //6.RENDER

    render(){

        //const listaArticulos = this.store.getArticles()

        //redux
        const items = this.store.getState()
        this.lista.innerHTML = '' // limpiamos lista para no duplicar contenido

        /**  */
        items.forEach((/** @type {{id: number, comprado: boolean, name: string}} */ item) => {

            const li = document.createElement('li')
            li.dataset.id = String(item.id)

            if (item.comprado){
                li.classList.add('comprado')
            }

            const newInput = document.createElement('input')

            newInput.type = 'checkbox'
            newInput.dataset.action = 'toggle'
            newInput.checked = item.comprado

            const span = document.createElement('span')
            span.textContent = item.name

            const botonArticulo = document.createElement('button')
            botonArticulo.type = 'button'
            botonArticulo.textContent = 'Borrar'
            botonArticulo.dataset.action = 'delete'
            


            li.appendChild(newInput)
            li.appendChild(span)
            li.appendChild(botonArticulo)


            this.lista.appendChild(li)

            
        })
    }
}

