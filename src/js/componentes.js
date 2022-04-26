
import { Todo } from '../classes'

import { todoList } from '../index'

//referencias en el html


const divTodoList = document.querySelector( '.todo-list' );
const txtinput = document.querySelector( '.new-todo' );
const btnBorrar = document.querySelector( '.clear-completed' );
const ulfiltros = document.querySelector( '.filters' );
const anchorfiltros = document.querySelectorAll( '.filtro' );



export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
		<div class="view">
			<input class="toggle" type="checkbox" ${ ( todo.completado ) ? 'checked' : '' }>
			<label>${ todo.tarea }</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;


    const div = document.createElement( 'div' );
    div.innerHTML = htmlTodo;


    divTodoList.append( div.firstElementChild )



    return div
}

//eventos


txtinput.addEventListener( 'keyup', (evento) =>{

    if( event.keyCode === 13 && txtinput.value.length > 0 ){

        
        const nuevoTodo = new Todo( txtinput.value )
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml( nuevoTodo );

        txtinput.value = '';
         
    };
} );


divTodoList.addEventListener( 'click',(evento) =>{
    const nombreElemento = event.target.localName; 
    
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id')

    if( nombreElemento.includes( 'input' ) ){
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle( 'completed' )

    }else if( nombreElemento.includes( 'button' ) ){ //hay que borrar el elemento

        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );

    }

} );


btnBorrar.addEventListener( 'click', ()=>{

    todoList.eliminarCompletados();

    for( let i = divTodoList.children.length-1; i>=0; i-- ){
        
        const elemento = divTodoList.children[i];

        if( elemento.classList.contains( 'completed' ) ){

            divTodoList.removeChild( elemento );
        };
            

    };


} );


ulfiltros.addEventListener( 'click', ( evento ) =>{
    
    const filtro = event.target.text;

    if( !filtro ){ return; }

    anchorfiltros.forEach( elem => elem.classList.remove( 'selected' ) );
    event.target.classList.add( 'selected' )



    for( const  elemento of divTodoList.children ){


        elemento.classList.remove( 'hidden' );
        const completado = elemento.classList.contains( 'completed' );

        switch( filtro ){
            case 'Pendientes':
                if( completado ){
                    elemento.classList.add( 'hidden' )
                }
            break;
            
            case 'Completados':
                if( !completado ){
                    elemento.classList.add( 'hidden' )
                }
            break;
        
        }

    }


} )




