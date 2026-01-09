// @ts-check
import { Store } from "../store/store";
import { Article, FabricaArticles } from "../clases/Article";

//CONEXION DEL DOM CON LA STORE Y CONTROLA LAS ACCIONES DEL USUARIO

export class ShoppingListController {
    
   //1.DEPENDENCIAS
   /** @type {Store}  */
   store
   /** @type {FabricaArticles} */
   fabrica

   //3.DOM DECLARACION

   /** @type {HTMLFormElement} */
   // @ts-ignore
   formulario!
   /** @type {HTMLInputElement} */
   // @ts-ignore
   inputArticulo!
   /** @type {HTMLButtonElement} */
   // @ts-ignore
   botonAdd!
   /** @type {HTMLButtonElement} */
   // @ts-ignore
   botonNuevaLista!
   /** @type {HTMLUListElement} */
   // @ts-ignore
   lista!
   
   //3.CONSTRUCTOR
   
    /**
     * @param {Store} store
     * @param {FabricaArticles} fabrica
     */
   constructor(store, fabrica){
    this.store = store
    this.fabrica = fabrica
   }

   //4.CICLO DE VIDA

    init(){

        this.cacheDOM()
        this.bindEvents()
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

        //crea articulo
        const articulo = this.fabrica.newArticle(nombre)

        //store se encarga de añadir-guardar
        this.store.addArticle(articulo)

        //reseteamos input
        this.inputArticulo.value = ''

        //renderizamos-luego sera NOTIFY
        this.render()


    }

    /** @param {Event} e  */

    onAddClick(e){
        e.preventDefault()

        this.onSubmit(e)


    }

    /** @param {Event} e  */
    onNewListClick(e){

        this.store.clear()
        this.render()

    }

    //6.RENDER

    render(){

        const listaArticulos = this.store.getArticles()

        this.lista.innerHTML = '' // limpiamos lista para no duplicar contenido

        listaArticulos.forEach((item => {

            const li = document.createElement('li')
            li.textContent = item.name

            this.lista.appendChild(li)

            
        }))

        
    }
}

