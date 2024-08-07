class App {

    dom;
    modal; // login modal
    registrationModal; // registration modal

    state; // state variables: if any

    preguntas; //

    constructor() {
        this.state = {};
        this.dom = this.render();
        this.modal = new bootstrap.Modal(this.dom.querySelector('#modal'));
        this.dom.querySelector('#apply').addEventListener('click', e => this.login());
        this.renderBodyFiller(); //Cuando la pagina se abre por primera vez, esto imprime el body del website
        this.renderMenuItems(); // Esto carga las opciones en el banner
        this.preguntas = new Preguntas();

    }

    render = () => {
        const html = `
      ${this.renderMenu()}
      ${this.renderBody()}
      ${this.renderFooter()}
      ${this.renderModal()}
    `; //renderMenu esta relacionado al banner

        var rootContent = document.createElement('div');
        rootContent.id = 'app';
        rootContent.innerHTML = html;
        return rootContent;
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

    renderBodyFiller = () => {  //homepage
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
    }
    ;
            renderMenuItems = () => {
        var html = '';
        if (globalstate.user === null) {
            html += `
      <li class="nav-item" >
        <a class="nav-link" id="infoLink" href="#" data-bs-toggle="modal">
          <img src="images/info.png" alt="Info" style="width: 25px; height: 25px; " />
        </a>
      </li>
      <li class="nav-item" >
        <a class="nav-link" id="loginLink" href="#" data-bs-toggle="modal">
          <img src="images/login.png" alt="Login" style="width: 25px; height: 25px; " />
        </a>
      </li>
      
    `;
        } else {

            html += `
        <li class="nav-item" >
            <a class="nav-link" id="infoLink" href="#" data-bs-toggle="modal">
                <img src="images/info.png" alt="Info" style="width: 25px; height: 25px; " />
            </a>
        </li>
        <li class="nav-item" >
            <a class="nav-link" id="questionLink" href="#" data-bs-toggle="modal">
          <img src="images/question.png" alt="Info" style="width: 25px; height: 25px; " />
        </a>
      </li>
              
      
    
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

        this.dom.querySelector("#app>#menu #menuItems #questionLink")?.addEventListener('click', () => {
            // Call the renderBodyFiller method to generate the body filler content HTML
            const infoFormHTML = this.preguntasShow();

            // Replace the body content, excluding the banner, with the body filler content HTML
            document.querySelector('#app > #body > .left-half > .mission').innerHTML = infoFormHTML;
        });

        this.dom.querySelector("#app>#menu #menuItems #logoutLink")?.addEventListener('click', e => this.logout());

        this.dom.querySelector("#registerLink")?.addEventListener('click', e => this.registrationModal.show());
        if (globalstate.user !== null) {
            switch (globalstate.user.rol) {
                case 'CLI':
                    this.preguntasShow();
                    break;
            }
        }
    }

    preguntasShow = () => {
        this.dom.querySelector('#app>#body').replaceChildren(this.preguntas.dom);
        this.preguntas.list();
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

        // Clear everything else in the body except the container element
        const container = document.querySelector('#root');
        document.body.innerHTML = '';
        document.body.appendChild(container);

        // Call the loaded function to initialize the app and render the components
        loaded();
    }

}





