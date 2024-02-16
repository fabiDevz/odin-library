let listaLibros = [];

/* Formulario y sus inputs*/
const formulario = document.getElementById('formulario');
const inputTitulo = document.getElementById('input-titulo');
const inputAutor = document.getElementById('input-autor');
const inputPaginas = document.getElementById('input-paginas');
const inputEstado = document.getElementById('input-checkbox');

/* Elementos HTML */
const tablaLibros = document.getElementById('books-table');

/* Objetos */
function Libro(titulo, autor, paginas, estado){
    this.titulo = titulo;
    this.autor = autor;
    this.paginas = paginas;
    this.estado = estado;
    this.info =  function () {
        console.log(this.titulo + ' cuyo autor es '+this.autor + ' con '+this.paginas+' páginas ')
    } ;
}

/* Eventos */

formulario.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const libro = new Libro(
        inputTitulo.value,
        inputAutor.value,
        inputPaginas.value,
        inputEstado.checked
    );
    
    agregarLibro(libro);
    formulario.reset();
    
})

/* Funciones */

function agregarLibro(libroNuevo)
{
    listaLibros.push(libroNuevo);
    mostrarLibros();
}

function mostrarLibros()
{
    limpiarHTML();

    listaLibros.forEach(libro => {
        let {titulo, autor, paginas, estado} = libro;
        
        var tbody = tablaLibros.getElementsByTagName('tbody')[0];
        var fila = tbody.insertRow(); 

        celdaTitulo = fila.insertCell(0);
        celdaAutor = fila.insertCell(1);
        celdaPaginas = fila.insertCell(2);
        celdaEstado = fila.insertCell(3);
        celdaEliminar = fila.insertCell(4);

        celdaTitulo.innerHTML = titulo;
        celdaAutor.innerHTML = autor;
        celdaPaginas.innerHTML = paginas;

        const btnCheck = document.createElement('button');
        btnCheck.onclick = (event) => cambioEstado(event);
        btnCheck.textContent = estado ? "Si" : "No";
        btnCheck.style.backgroundColor = estado ? 'green' : 'blue';
        btnCheck.classList.add('btn-read-status');
        celdaEstado.appendChild(btnCheck);

        const btnEliminar = document.createElement('button');
        btnEliminar.onclick = () => eliminarLibro(titulo,autor);
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.classList.add('btn-delete-book');
        celdaEliminar.appendChild(btnEliminar);
        
    });

}

function limpiarHTML(){

    var tbody = tablaLibros.getElementsByTagName('tbody')[0];
    while(tbody.firstChild)
    {
        tbody.removeChild(tbody.firstChild);
    }
}

function cambioEstado(event) {
    const btn = event.target; // Obtenemos una referencia al botón que disparó el evento
    const nuevoEstado = btn.textContent === "Si" ? false : true; // Cambiamos el estado opuesto al actual
    btn.textContent = nuevoEstado ? "Si" : "No"; // Cambiamos el texto del botón
    btn.style.backgroundColor = nuevoEstado ? 'green' : 'blue'; // Cambiamos el color de fondo del botón
}

function eliminarLibro(titulo, autor)
{
    listaLibros = listaLibros.filter( libro => libro.titulo != titulo || libro.autor != autor);
    mostrarLibros();
}

