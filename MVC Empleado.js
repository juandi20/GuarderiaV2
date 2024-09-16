//Modelo
class empleado {
    constructor(nombre,documento, celular) {
      this.nombre = nombre;
      this.documento = documento;
      this.celular = celular;
    }
  }

  //Vista

  class VehicleView {
    constructor() {
    
      this.nombreInput = document.getElementById("nombre-empleado");
      this.documentoInput = document.getElementById("documento");
      this.celularInput = document.getElementById("celular");
    }
  }   