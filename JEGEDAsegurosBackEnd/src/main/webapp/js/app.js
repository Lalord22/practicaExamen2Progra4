class App {

    dom;
    modal; // login modal
    registrationModal; // registration modal
    updateModal

    state; // state variables: if any

    preguntas; //
    clientes;
    marcas;
    modelos;
    categorias;
    coberturas;

    constructor() {
        this.state = {};
        this.dom = this.render();
        this.modal = new bootstrap.Modal(this.dom.querySelector('#modal'));
        this.registrationModal = new bootstrap.Modal(this.dom.querySelector('#registerModal'));
        this.updateModal = new bootstrap.Modal(this.dom.querySelector('#updateModal'));
        this.dom.querySelector('#apply').addEventListener('click', e => this.login());
        this.dom.querySelector('#registerLink').addEventListener('click', e => this.openRegistrationModal());
        this.renderBodyFiller(); //Cuando la pagina se abre por primera vez, esto imprime el body del website
        this.renderMenuItems(); // Esto carga las opciones en el banner
        this.preguntas = new Preguntas();
        this.marcas = new Marcas();
        this.modelos = new Modelos();
        this.categorias = new Categorias();
        this.coberturas = new Coberturas();
        this.clientes = new Clientes();

        this.dom.querySelector('#registrationForm').addEventListener('submit', e => {
            e.preventDefault(); // Prevent the default form submission behavior
            this.register(); // Call the register method when the form is submitted
        });


    }

    render = () => {
        const html = `
      ${this.renderMenu()}
      ${this.renderBody()}
      ${this.renderFooter()}
      ${this.renderModal()}
      ${this.renderRegistrationModal()}
      ${this.renderUpdateModal()}
    `; //renderMenu esta relacionado al banner

        var rootContent = document.createElement('div');
        rootContent.id = 'app';
        rootContent.innerHTML = html;
        return rootContent;
    }

    renderUpdateModal = () => {
        return `
      <div id="updateModal" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Actualizar Informacion</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="updateForm">
              <div class="modal-body">
                <div class="input-group mb-3">
                  <span class="input-group-text">Nombre</span>
                  <input type="text" class="form-control" id="updateNombre" name="nombre">
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text">Clave</span>
                  <input type="password" class="form-control" id="updateApellido" name="apellido">
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text">Teléfono</span>
                  <input type="text" class="form-control" id="updateTelefono" name="telefono">
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text">Numero de Tarjeta</span>
                  <input type="text" class="form-control" id="updateDireccion" name="direccion">
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text">Email</span>
                  <input type="email" class="form-control" id="updateEmail" name="email">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="submit" class="btn btn-primary">Actualizar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
    }

    renderMenu = () => {   //banner
        return `
      <nav id="menu" class="navbar navbar-expand-lg p-0 navbar-dark bg-black">
        <div class="container-fluid">
          <a class="navbar-brand  font-italic font-weight-light  text-info" href="#">
            <div>Questions?</div>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuCollapse">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div id="menuCollapse" class="collapse navbar-collapse">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0" id='menuItems'>
            </ul>
          </div>
        </div>
      </nav>
    `;
    }

    renderBody = () => {
        return `
      <div id="body">   
      </div>
    `;
    }

    renderFooter = () => {
        return `
      <footer id="footer" class="bg-black text-white mt-4 w-100 fixed-bottom">
        <div class="container-fluid py-2">
          <div class="row">
            <div class="col-md-2"><h5>Total Soft Inc.</h5></div>
            <div class="col-md-7"><h4>
              <i class="fab fa-twitter"></i>
              <i class="fab fa-facebook"></i>
              <i class="fab fa-instagram"></i></h4>
            </div>
            <div class="col-md-3 text-right small align-self-end">©2023 Tsf, Inc.</div>
          </div>
        </div>
      </footer>
    `;
    }

    renderModal = () => {
        return `
      <div id="modal" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div class="d-flex align-items-center">
                <h5 class="modal-title mb-0">Login</h5>
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="form">
              <div class="modal-body">
                <div class="input-group mb-3">
                  <span class="input-group-text">Id</span>
                  <input type="text" class="form-control" id="identificacion" name="identificacion">
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text">Clave</span>
                  <input type="password" class="form-control" id="clave" name="clave">
                </div>
              </div>
              <div class="modal-footer">
                <button id="apply" type="button" class="btn btn-primary" id="apply">Login</button>
              </div>
                <span style="font-style: italic; margin-left: 2em; color: #555;">No tiene cuenta? ...</span>
                <a id="registerLink" class="btn btn-info btn-block" style="margin-bottom: 15px; background-color: #005b99; color: white; border: none;" href="#">Regístrese aquí</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
    }

    renderRegistrationModal = () => {
        return `
      <div id="registerModal" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Cliente</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="registrationForm">
              <div class="modal-body">
                <div class="input-group mb-3">
                  <span class="input-group-text">Id</span>
                  <input type="text" class="form-control" id="registrationId" name="cedula">
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text">Name</span>
                  <input type="text" class="form-control" id="registrationName" name="nombre">
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text">Email</span>
                  <input type="email" class="form-control" id="registrationEmail" name="correo">
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text">Phone Number</span>
                  <input type="text" class="form-control" id="registrationTelefono" name="telefono">
                </div>
                 <div class="input-group mb-3">
                  <span class="input-group-text">Credit Card</span>
                  <input type="text" class="form-control" id="registrationDatosTarjeta" name="datosTarjeta">
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text">Password</span>
                  <input type="password" class="form-control" id="registrationPassword" name="clave">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="submit" class="btn btn-primary">Registar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
    }

  renderBodyFiller = () => {
  var html = `
    <div id='bodyFiller' style='margin-left: 10%; margin-top:40px; width: 80%; text-align: center; font-size: 1.5em'>
      <div class="banner" style="background-color: lightblue;">
        <h1>Welcome</h1>
      </div>
      <div class="left-half" style="background-color: gray;">
        
          <h2>We are a non-profit training company</h2>
        
      </div>
      
    </div>
  `;
  this.dom.querySelector('#app>#body').replaceChildren();
  this.dom.querySelector('#app>#body').innerHTML = html;
}

renderLogin = () => {
  var html = `
    <br>
    <div id="loginForm">
      <div id="loginForm" style="border: 1px solid #ccc; padding: 20px; border-radius: 5px; text-align: center; margin: 0 auto; max-width: 400px;">
  <h5 class="modal-title mb-0">Login</h5>
  <form id="form">
    <div class="input-group mb-3">
      <span class="input-group-text">Id</span>
      <input type="text" class="form-control" id="identificacion" name="identificacion">
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">Clave</span>
      <input type="password" class="form-control" id="clave" name="clave">
    </div>
    <button id="apply" type="button" class="btn btn-primary" id="apply">Login</button>
   </form>
</div>

    </div>
  `;
  return html;
};



    renderMenuItems = () => {
        var html = '';
        if (globalstate.user === null) {
            html +=  `
      <li class="nav-item" style="display: flex; justify-content: flex-end;>
        <a class="nav-link" id="infoLink" href="#" data-bs-toggle="modal">
          <img src="images/info.png" alt="Info" style="width: 25px; height: 25px; " />
        </a>
      </li>
      <li class="nav-item" style="display: flex; justify-content: flex-end;>
        <a class="nav-link" id="loginLink" href="#" data-bs-toggle="modal">
          <img src="images/login.png" alt="Login" style="width: 25px; height: 25px; " />
        </a>
      </li>
      
    `;
        } else {
            if (globalstate.user.tipo === 1) {
                html += `
        <li class="nav-item" style="display: flex; justify-content: flex-end;>
            <a class="nav-link" id="infoLink" href="#" data-bs-toggle="modal">
                <img src="images/info.png" alt="Info" style="width: 25px; height: 25px; " />
            </a>
        </li>
                
      `;
            }
            html += `
    
      <li class="nav-item">
  <a class="nav-link" id="logoutLink" href="#" data-bs-toggle="modal">
    <img src="images/logout.png" alt="Logout" style="width: 25px; height: 25px;">
     (User : ${globalstate.user.cedula})
  </a>
       </li>

    `;
        }
        this.dom.querySelector('#app>#menu #menuItems').replaceChildren();
        this.dom.querySelector('#app>#menu #menuItems').innerHTML = html;
        this.dom.querySelector("#app>#menu #menuItems #preguntas")?.addEventListener('click', e => this.preguntasShow());
        this.dom.querySelector("#app>#menu #menuItems #addCobertura")?.addEventListener('click', e => this.coberturasShow());
        this.dom.querySelector("#app>#menu #menuItems #addCategoria")?.addEventListener('click', e => this.categoriasShow());
        this.dom.querySelector("#app>#menu #menuItems #addModelo")?.addEventListener('click', e => this.modelosShow());
        this.dom.querySelector("#app>#menu #menuItems #addMarca")?.addEventListener('click', e => this.marcasShow());
        this.dom.querySelector("#app>#menu #menuItems #displayClientes")?.addEventListener('click', e => this.clientesShow());
        this.dom.querySelector("#app>#menu #menuItems #loginLink")?.addEventListener('click', () => {
  // Call the renderLogin method to generate the login form HTML
  const loginFormHTML = this.renderLogin();
  
  // Replace the body content, excluding the banner, with the login form HTML
  document.querySelector('#app > #body').innerHTML = loginFormHTML;
  
  document.querySelector('#apply').addEventListener('click', this.login);
});
       this.dom.querySelector("#app>#menu #menuItems #infoLink")?.addEventListener('click', () => {
  // Call the renderBodyFiller method to generate the body filler content HTML
  const infoFormHTML = this.renderBodyFiller();

  // Replace the body content, excluding the banner, with the body filler content HTML
  document.querySelector('#app > #body > .left-half > .mission').innerHTML = infoFormHTML;
});

        this.dom.querySelector("#app>#menu #menuItems #logoutLink")?.addEventListener('click', e => this.logout());
        this.dom.querySelector("#app>#menu #menuItems #updateLink")?.addEventListener('click', e => this.updateInfo());
        this.dom.querySelector("#registerLink")?.addEventListener('click', e => this.registrationModal.show());
        if (globalstate.user !== null) {
            switch (globalstate.user.rol) {
                case 'CLI':
                    this.preguntasShow();  //cambiar aca para mostrar preguntas
                    break;
            }
        }
    }

    preguntasShow = () => {
        this.dom.querySelector('#app>#body').replaceChildren(this.preguntas.dom);
        this.preguntas.list();
    }

    marcasShow = () => {
        this.dom.querySelector('#app>#body').replaceChildren(this.marcas.dom);
        this.marcas.list();
    }

    modelosShow = () => {
        this.dom.querySelector('#app>#body').replaceChildren(this.modelos.dom);
        this.modelos.list();
    }

    categoriasShow = () => {
        this.dom.querySelector('#app>#body').replaceChildren(this.categorias.dom);
        this.categorias.list();
    }

    coberturasShow = () => {
        this.dom.querySelector('#app>#body').replaceChildren(this.coberturas.dom);
        this.coberturas.list();
    }

    clientesShow = () => {
        this.dom.querySelector('#app>#body').replaceChildren(this.clientes.dom);
        this.clientes.list();
    }

    login = async () => {
        const candidate = {
            cedula: this.dom.querySelector("#identificacion").value,
            clave: this.dom.querySelector("#clave").value,
        };

        try {
            const response = await fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(candidate),
            });

            if (response.ok) {
                const user = await response.json();
                globalstate.user = user;
                this.modal.hide();
                this.resetLoginForm();
                this.renderMenuItems();
            } else if (response.status === 401) {
                alert("Credenciales inválidas. Por favor, verifique su Id y Clave.");
            } else {
                alert("Ocurrió un error al iniciar sesión. Por favor, intente nuevamente más tarde.");
            }
        } catch (error) {
            console.log(error);
            alert("Ocurrió un error al iniciar sesión. Por favor, intente nuevamente más tarde.");
        }
    }

    reset = () => {
        const bodyElement = this.dom.querySelector('#app>#body');
        bodyElement.innerHTML = '';
    }
    
    resetLoginForm = () => {
      this.dom.querySelector("#identificacion").value = '';
      this.dom.querySelector("#clave").value = '';
    }


    logout = () => {
        globalstate.user = null;
        this.reset();
        this.renderMenuItems();
        this.renderBodyFiller();
    }

    openRegistrationModal = () => {
        this.modal.hide();
        this.registrationModal.show();
    }

    register = async () => {
        const registrationForm = this.dom.querySelector('#app>#registerModal #registrationForm');
        const formData = new FormData(registrationForm);

        const usuarioData = {
            cedula: document.getElementById("registrationId").value,
            clave: document.getElementById("registrationPassword").value,
            tipo: 1
        };

        const clienteData = {
            cedula: document.getElementById("registrationId").value,
            nombre: document.getElementById("registrationName").value,
            telefono: document.getElementById("registrationTelefono").value,
            correo: document.getElementById("registrationEmail").value,
            datosTarjeta: document.getElementById("registrationDatosTarjeta").value,
            usuario: {
                cedula: document.getElementById("registrationId").value,
                clave: document.getElementById("registrationPassword").value,
                rol: "CLI",
                tipo: 1,
                username: document.getElementById("registrationId").value
            }
        };

        try {
            const usuarioResponse = await fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/usuarios/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarioData)
            });

            if (usuarioResponse.ok) {
                const clienteResponse = await fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/clientes/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(clienteData)
                });

                if (clienteResponse.ok) {
                    // Registration successful for both Usuario and Cliente
                    alert('Registration successful. You can now log in with your credentials.');
                    this.registrationModal.hide();
                    this.modal.show(); // Show the login modal after successful registration
                } else if (clienteResponse.status === 409) {
                    // Cliente already exists
                    alert('A cliente with the same ID already exists. Please check your information.');
                } else {
                    // Registration failed for Cliente
                    alert('An error occurred during cliente registration. Please try again later.');
                }
            } else if (usuarioResponse.status === 409) {
                // Usuario already exists
                alert('A usuario with the same ID already exists. Please check your information.');
            } else {
                // Registration failed for Usuario
                alert('An error occurred during usuario registration. Please try again later.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred during registration. Please try again later.');
        }
    }

    registrationModalShow = () => {
        this.registrationModal.show();
    }

    updateInfo = async () => {
        const updateForm = this.dom.querySelector('#updateForm');

        try {
            // Make an HTTP GET request to fetch the client data for the currently logged-in client
            const response = await fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/clientes/cliente');
            if (!response.ok) {
                throw new Error('Failed to fetch client data');
            }

            const data = await response.json();

            // Populate the update form with the retrieved client data
            updateForm.querySelector('#updateNombre').value = data.nombre;
            updateForm.querySelector('#updateApellido').value = data.usuario.clave;
            updateForm.querySelector('#updateTelefono').value = data.telefono;
            updateForm.querySelector('#updateDireccion').value = data.datosTarjeta;
            updateForm.querySelector('#updateEmail').value = data.correo;

            // Show the update modal
            this.updateModal.show();
        } catch (error) {
            console.error('Error fetching client data:', error);
        }

        // Remove any existing event listeners from the form submission
        updateForm.removeEventListener('submit', this.updateCliente);

        // Add a new event listener to the form submission
        updateForm.addEventListener('submit', e => {
            e.preventDefault(); // Prevent the default form submission behavior
            this.updateCliente(); // Call the updateCliente method when the form is submitted
        });
    }

    updateCliente = async () => {
  const updateForm = this.dom.querySelector('#updateModal #updateForm');
  const formData = new FormData(updateForm);

  // Check if any of the required form fields are empty
  if (
    formData.get('nombre').trim() === '' ||
    formData.get('apellido').trim() === '' ||
    formData.get('telefono').trim() === '' ||
    formData.get('direccion').trim() === '' ||
    formData.get('email').trim() === ''
  ) {
    alert('Please fill in all the required fields.');
    return;
  }

  try {
    // Make an HTTP GET request to fetch the client data for the currently logged-in client
    const response = await fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/clientes/cliente');
    if (!response.ok) {
      throw new Error('Failed to fetch client data');
    }

    const data = await response.json();

    const usuarioData = {
      cedula: data.usuario.cedula,
      clave: formData.get('apellido'),
      tipo: data.usuario.tipo
    };

    const clienteData = {
      cedula: data.cedula,
      nombre: formData.get('nombre'),
      telefono: formData.get('telefono'),
      datosTarjeta: formData.get('direccion'),
      correo: formData.get('email'),
      usuario: {
        cedula: data.usuario.cedula,
        username: data.usuario.username
      }
    };

    // Send clienteData to the server for update
    const updateResponse = await fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/clientes/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(clienteData)
    });

    if (updateResponse.ok) {
      // Update successful
      const usuarioResponse = await fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/usuarios/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioData)
      });
      if (usuarioResponse.ok) {
        alert('Update successful.');
        this.updateModal.hide();
      } else {
        // Update failed for usuario
        alert('An error occurred during the usuario update. Please try again later.');
      }
    } else {
      // Update failed for cliente
      alert('An error occurred during the cliente update. Please try again later.');
    }
  } catch (error) {
    console.error('Error during update:', error);
    alert('An error occurred during the update. Please try again later.');
  }
};



}



