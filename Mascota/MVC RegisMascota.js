// MODEL

class Mascota {
    constructor(id, nombre, raza, edad, peso, vacunas, alergias, medicamentos, alimentos) {
        this.id = id;
        this.nombre = nombre;
        this.raza = raza;
        this.edad = edad;
        this.peso = peso;
        this.vacunas = vacunas;
        this.alergias = alergias;
        this.medicamentos = medicamentos;
        this.alimentos = alimentos;
    }

    actualizarDatos({ nombre, raza, edad, peso, vacunas, alergias, medicamentos, alimentos }) {
        if (nombre) this.nombre = nombre;
        if (raza) this.raza = raza;
        if (edad) this.edad = edad;
        if (peso) this.peso = peso;
        if (vacunas) this.vacunas = vacunas;
        if (alergias) this.alergias = alergias;
        if (medicamentos) this.medicamentos = medicamentos;
        if (alimentos) this.alimentos = alimentos;
    }
}

class MascotaModel {
    constructor() {
        this.mascotas = [];
    }

    registrarMascota(mascota) {
        this.mascotas.push(mascota);
    }

    editarMascota(id, datos) {
        const mascota = this.mascotas.find(mascota => mascota.id === id);
        if (mascota) {
            mascota.actualizarDatos(datos);
        }
    }

    eliminarMascota(id) {
        this.mascotas = this.mascotas.filter(mascota => mascota.id !== id);
    }
}

// VIEW

class MascotaView {
    constructor() {
        this.listaMascotas = document.getElementById('mascotas-lista');
    }

    mostrarMascota(mascota, onEdit, onDelete) {
        const mascotaDiv = document.createElement('div');
        mascotaDiv.classList.add('mascota');

        mascotaDiv.innerHTML = `
            <p><strong>ID:</strong> ${mascota.id}</p>
            <p><strong>Nombre:</strong> ${mascota.nombre}</p>
            <p><strong>Raza:</strong> ${mascota.raza}</p>
            <p><strong>Edad:</strong> ${mascota.edad}</p>
            <p><strong>Peso:</strong> ${mascota.peso}</p>
            <p><strong>Vacunas:</strong> ${mascota.vacunas}</p>
            <p><strong>Alergias:</strong> ${mascota.alergias}</p>
            <p><strong>Medicamentos:</strong> ${mascota.medicamentos}</p>
            <p><strong>Alimentos:</strong> ${mascota.alimentos}</p>
        `;

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => onEdit(mascota.id));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => onDelete(mascota.id));

        buttonsDiv.appendChild(editButton);
        buttonsDiv.appendChild(deleteButton);

        mascotaDiv.appendChild(buttonsDiv);
        this.listaMascotas.appendChild(mascotaDiv);
    }

    mostrarListaMascotas(mascotas, onEdit, onDelete) {
        this.listaMascotas.innerHTML = '';
        mascotas.forEach(mascota => this.mostrarMascota(mascota, onEdit, onDelete));
    }

    mostrarMensaje(mensaje) {
        alert(mensaje);
    }
}

class MascotaController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.mostrarListaMascotas(this.model.mascotas, this.editarMascota.bind(this), this.eliminarMascota.bind(this));

        document.getElementById('registrar').addEventListener('click', () => this.registrarMascota());
    }

    registrarMascota() {
        const nombre = document.getElementById('nombre').value;
        const raza = document.getElementById('raza').value;
        const edad = document.getElementById('edad').value;
        const peso = document.getElementById('peso').value;
        const vacunas = document.getElementById('vacunas').value;
        const alergias = document.getElementById('alergias').value;
        const medicamentos = document.getElementById('medicamentos').value;
        const alimentos = document.getElementById('alimentos').value;

        if (nombre && raza && edad && peso && vacunas && alergias && medicamentos && alimentos) {
            const nuevaMascota = new Mascota(Date.now(), nombre, raza, parseInt(edad), parseFloat(peso), vacunas, alergias, medicamentos, alimentos);
            this.model.registrarMascota(nuevaMascota);
            this.view.mostrarListaMascotas(this.model.mascotas, this.editarMascota.bind(this), this.eliminarMascota.bind(this));
            this.view.mostrarMensaje("Mascota registrada exitosamente.");
        } else {
            this.view.mostrarMensaje("Por favor, completa todos los campos.");
        }
    }

    editarMascota(id) {
        const mascota = this.model.mascotas.find(mascota => mascota.id === id);
        if (mascota) {
            const nombre = prompt("Editar nombre:", mascota.nombre) || mascota.nombre;
            const raza = prompt("Editar raza:", mascota.raza) || mascota.raza;
            const edad = prompt("Editar edad:", mascota.edad) || mascota.edad;
            const peso = prompt("Editar peso:", mascota.peso) || mascota.peso;
            const vacunas = prompt("Editar vacunas:", mascota.vacunas) || mascota.vacunas;
            const alergias = prompt("Editar alergias:", mascota.alergias) || mascota.alergias;
            const medicamentos = prompt("Editar medicamentos:", mascota.medicamentos) || mascota.medicamentos;
            const alimentos = prompt("Editar alimentos:", mascota.alimentos) || mascota.alimentos;

            this.model.editarMascota(id, { nombre, raza, edad, peso, vacunas, alergias, medicamentos, alimentos });
            this.view.mostrarListaMascotas(this.model.mascotas, this.editarMascota.bind(this), this.eliminarMascota.bind(this));
            this.view.mostrarMensaje("Mascota editada exitosamente.");
        }
    }

    eliminarMascota(id) {
        this.model.eliminarMascota(id);
        this.view.mostrarListaMascotas(this.model.mascotas, this.editarMascota.bind(this), this.eliminarMascota.bind(this));
        this.view.mostrarMensaje("Mascota eliminada exitosamente.");
    }
}

// Inicialización del modelo, vista y controlador
const model = new MascotaModel();
const view = new MascotaView();
const controller = new MascotaController(model, view);
