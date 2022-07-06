// variables
const carrito = document.querySelector('#carrito');
const   contenedorCarrito = document.querySelector('#lista-carrito tbody');
const   vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const   listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito=[];

//eventos
cargarEventListener();
function cargarEventListener(){
    //cuando agregas un curso presionando boton "Agregar al Carrito"
    listaCursos.addEventListener('click',agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click',eliminarCurso);

    // vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito=[];// resetea el arreglo
        limpiarHTML();//eliminamos todo el HTML
    })
}



//funciones
function agregarCurso(e){
    e.preventDefault();//si un elemento tiene como defecto un enlace, no tiene efecto
    // console.log('presionando en cursos');
    // console.log(e.target.classList); //para ver que clase estamos presionando
    if (e.target.classList.contains('agregar-carrito')) {
        // cursoSeleccionado: traversing, selecciona elementos padres
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
    }
}

//elimiona un curso del carrito
function eliminarCurso(e){
    //console.log(e.target.classList);//para saber la clase a que le damos clic
    if (e.target.classList.contains('borrar-curso')){
        //obtener el valor del id del objeto
        // console.log(e.target.getAttribute('data-id'));
        const cursoId = e.target.getAttribute('data-id');

        //eliminar del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        console.log(articulosCarrito);
        carritoHTML();// iterar sobre el carrito y mostrar su HTML
    }
}


// lee el contenido del HTML al que dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
    // console.log(curso);

    // crear un objeto con el contendio del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    // Revisa si un elemento ya existe en el carrito
    //.some permite verficiar si un elemento existe
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe){
        // actualizamos la cantidad
         const  cursos = articulosCarrito.map ( curso => {
             if (curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
             }else{
                return curso; //retorna los objetos que no son los duplicados
             }
         });
         articulosCarrito = [...cursos];
    }else{
        // agregamos el curso al carrito
        //agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito,infoCurso];
    }

    

    console.log(articulosCarrito);
    carritoHTML();
}

// muestra el carrito de compra en el HTML
function carritoHTML(){
    //limpiar HTML
    limpiarHTML();
    // recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso=>{
        //destructuring - desestructuración
        const {imagen, titulo, precio, id, cantidad}=curso;
        const row = document.createElement('tr');
        row.innerHTML=`
            <td> 
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td> 
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        //agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

// ELimina los cursos del tbody
function limpiarHTML(){
    //forma lenta
    // contenedorCarrito.innerHTML='';

    //forma rapida 
    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}