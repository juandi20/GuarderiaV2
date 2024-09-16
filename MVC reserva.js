//model
class
reserva{
    constructor(fechainico,fechafin,hora,disponibilidad,acomodacion){
     this.fechainico = fechainico;
     this.fechafin = fechafin;
     this.hora = hora;
     this.disponibilidad = disponibilidad;
     this.acomodacion = acomodacion;
    }
}
 
// Vista
class Vista {
    constructor() {
        this.formulario = document.getElementById('reservaForm');
        this.mensaje = document.getElementById('mensaje');
    }

    obtenerDatosFormulario() {
        return {
            fechainico: document.getElementById('fechainicio').value,
            fechafin: document.getElementById('fechafin').value,
            hora: document.getElementById('hora').value,
            disponibilidad: document.getElementById('disponibilidad').value,
            acomodacion: document.getElementById('acomodacion').value
        };
    }

    mostrarMensaje(mensaje) {
        this.mensaje.textContent = mensaje;
    }

    vincularFormulario(accion) {
        this.formulario.addEventListener('submit', (evento) => {
            evento.preventDefault();
            accion();
        });
    }
}

// Controlador
class Controlador {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
        this.vista.vincularFormulario(this.reservar.bind(this));
    }

    reservar() {
        const datos = this.vista.obtenerDatosFormulario();
        const reserva = new this.modelo(datos.nombre, datos.fechainicio, datos.fechafin, datos.hora, datos.disponibilidad, datos.acomodacion);
    }
}

// Inicialización
const modelo = reserva;
const vista = new Vista();
const controlador = new
 Controlador(modelo,vista);