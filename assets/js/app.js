let listaEmpleados = [];

const objEmpleado = {
    id:'',
    cc: '',
    nombres: '',
    email: '',
    roles: '',
    email: '',
}

let editando = false;

const formulario = document.querySelector('#formulario');
const documentoInput = document.querySelector('#cc');
const nombreInput = document.querySelector('#nombres');
const emailInput = document.querySelector('#email');
const rolesInput = document.querySelector('#roles');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(documentoInput.value === '' || nombreInput.value === ''||emailInput.value === '' ||rolesInput.value === '' ) {
        alert('Todos os campos devem ser preenchidos');
        return;
    }

    if(editando) {
        editarEmpleado();
        editando = false;
    } else {
        objEmpleado.id = Date.now();
        objEmpleado.cc = documentoInput.value;
        objEmpleado.nombres = nombreInput.value;
        objEmpleado.email = emailInput.value;
        objEmpleado.roles = rolesInput.value;

        agregarEmpleado();
    }
}

function agregarEmpleado() {

    listaEmpleados.push({...objEmpleado});

    mostrarEmpleados();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objEmpleado.id = '';
    objEmpleado.cc = '';
    objEmpleado.nombres = '';
    objEmpleado.email = '';
    objEmpleado.roles = '';
}

function mostrarEmpleados() {
    limpiarHTML();

    const divEmpleados = document.querySelector('.div-empleados');
    
    listaEmpleados.forEach(empleado => {
        const {id, cc,  nombres, email, roles} = empleado;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${cc} - ${nombres} - ${email} -${roles} -`;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
    });
}

function cargarEmpleado(empleado) {
    const {id, cc, nombres, email, roles} = empleado;

    documentoInput.value = cc;
    nombreInput.value = nombres;
    emailInput.value = email;
    rolesInput.value = roles;

    objEmpleado.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Atualizar';
    
    editando = true;
}

function editarEmpleado() {

    objEmpleado.cc = documentoInput.value;
    objEmpleado.nombres = nombreInput.value;
    objEmpleado.email = emailInput.value;
    objEmpleado.roles = rolesInput.value;

    listaEmpleados.map(empleado => {

        if(empleado.id === objEmpleado.id) {
            empleado.id = objEmpleado.id;
            empleado.cc = objEmpleado.cc;
            empleado.nombres = objEmpleado.nombres;
            empleado.email = objEmpleado.email;
            empleado.roles = objEmpleado.roles;

        }

    });

    limpiarHTML();
    mostrarEmpleados();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Adicionar';
    
    editando = false;
}

function eliminarEmpleado(id) {

    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);

    limpiarHTML();
    mostrarEmpleados();
}

function limpiarHTML() {
    const divEmpleados = document.querySelector('.div-empleados');
    while(divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}