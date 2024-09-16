// Model
class cliente {
    constructor(id, nombreCompleto, documento, celular, ciudad, email, direccion) {
      this.id = id;
      this.nombreCompleto = nombreCompleto;
      this.documento = documento;
      this.ciudad = ciudad;
      this.direccion = direccion;
      this.celular = celular;
      this.email = email;
      
    }
  }

    // View
class UsuarioView {
    constructor() {
      this.usuarioForm = document.getElementById('formulario-usuario');
      this.nombreInput = document.getElementById('nombre');
      this.documentoInput = document.getElementById('documento');
      this.ciudadInput = document.getElementById('ciudad');
      this.direccionInput = document.getElementById('direccion');
      this.celularInput = document.getElementById('celular');
      this.emailInput = document.getElementById('email');
    }
}    