// app.js

class Mascota {
    constructor(id, nombre, raza, edad, peso) {
        this.id = id;
        this.nombre = nombre;
        this.raza = raza;
        this.edad = edad;
        this.peso = peso;
        this.checkIn = null;
        this.checkOut = null;
    }

    realizarCheckIn(fecha) {
        this.checkIn = fecha;
    }

    realizarCheckOut(fecha) {
        if (this.checkIn) {
            this.checkOut = fecha;
        } else {
            throw new Error("No se puede realizar el check-out sin un check-in previo.");
        }
    }

    obtenerEstado() {
        return this.checkOut ? 'Check-out realizado' : 'En el establecimiento';
    }
}

class MascotaModel {
    constructor() {
        this.mascotas = [];
    }

    registrarMascota(mascota) {
        this.mascotas.push(mascota);
    }

    buscarMascota(id) {
        return this.mascotas.find(mascota => mascota.id === id);
    }

    realizarCheckIn(id, fecha) {
        const mascota = this.buscarMascota(id);
        if (mascota) {
            mascota.realizarCheckIn(fecha);
        } else {
            throw new Error("Mascota no encontrada.");
        }
    }

    realizarCheckOut(id, fecha) {
        const mascota = this.buscarMascota(id);
        if (mascota) {
            mascota.realizarCheckOut(fecha);
        } else {
            throw new Error("Mascota no encontrada.");
        }
    }
}


class MascotaView {
    constructor() {
        this.listaMascotas = document.getElementById('mascotas-lista');
    }

    mostrarMascota(mascota) {
        const mascotaDiv = document.createElement('div');
        mascotaDiv.classList.add('mascota');
        
        mascotaDiv.innerHTML = `
            <p><strong>ID:</strong> ${mascota.id}</p>
            <p><strong>Nombre:</strong> ${mascota.nombre}</p>
            <p><strong>Raza:</strong> ${mascota.raza}</p>
            <p><strong>Estado:</strong> ${mascota.obtenerEstado()}</p>
        `;
        
        this.listaMascotas.appendChild(mascotaDiv);
    }

    mostrarListaMascotas(mascotas) {
        this.listaMascotas.innerHTML = '';
        mascotas.forEach(mascota => this.mostrarMascota(mascota));
    }

    mostrarMensaje(mensaje) {
        alert(mensaje);
    }
}


class MascotaController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Mostrar lista inicial de mascotas
        this.view.mostrarListaMascotas(this.model.mascotas);

        // Configurar listeners
        document.getElementById('check-in').addEventListener('click', () => this.realizarCheckIn());
        document.getElementById('check-out').addEventListener('click', () => this.realizarCheckOut());
    }

    realizarCheckIn() {
        const id = document.getElementById('id-mascota').value;
        const fecha = new Date().toLocaleString();

        try {
            this.model.realizarCheckIn(id, fecha);
            this.view.mostrarListaMascotas(this.model.mascotas);
            this.view.mostrarMensaje(`Check-in realizado para la mascota con ID ${id}.`);
        } catch (error) {
            this.view.mostrarMensaje(error.message);
        }
    }

    realizarCheckOut() {
        const id = document.getElementById('id-mascota').value;
        const fecha = new Date().toLocaleString();

        try {
            this.model.realizarCheckOut(id, fecha);
            this.view.mostrarListaMascotas(this.model.mascotas);
            this.view.mostrarMensaje(`Check-out realizado para la mascota con ID ${id}.`);
        } catch (error) {
            this.view.mostrarMensaje(error.message);
        }
    }
}

// Inicialización del modelo, vista y controlador
const model = new MascotaModel();
const view = new MascotaView();
const controller = new MascotaController(model, view);
