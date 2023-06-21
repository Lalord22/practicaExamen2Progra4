class Preguntas {
    constructor() {
        this.state = {
            entities: [], // Initialize entities as an empty array
            mode: '',
        };
        this.dom = this.render();


        this.dom.querySelector('#search').addEventListener('click', () => this.search());
    }

    render() {
        const html = `
        <br>
        <div id="polizas" style="float: left; width: 50%;">
            <div id="list" class="container">
                <div class="card bg-light">
                    <br>
                    <div class="card-body mx-auto w-75">
                        <form id="form">
                            <div class="input-group mb-3">
                                <span class="input-group-text">Topic</span>
                                <input id="name" type="text" class="form-control">
                                <div class="btn-toolbar">
                                    <div class="btn-group me-2">
                                        <button type="button" class="btn btn-primary" id="search">Buscar</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div class="table-responsive" style="max-height: 300px; overflow: auto">
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Question</th>
                                        <th scope="col">Topic</th>
                                    </tr>
                                </thead>
                                <tbody id="listbody"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
        const polizasContainer = document.createElement('div');
        polizasContainer.innerHTML = html;
        return polizasContainer;
    }

    list() {
        const request = new Request(`${backend}/preguntas`, {method: 'GET', headers: {}});
        (async () => {
            try {
                const response = await fetch(request);
                if (!response.ok) {
                    errorMessage(response.status);
                    return;
                }
                const polizas = await response.json();
                this.state.entities = polizas; // Update entities in the state
                const listing = this.dom.querySelector('#listbody');
                listing.innerHTML = '';
                this.state.entities.forEach((e) => this.row(listing, e));
            } catch (error) {
                console.error('Error fetching polizas:', error);
            }
        })();
    }

    row(list, pregunta) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${pregunta.pregunta}</td>
      <td>${pregunta.topic}</td>
        `;

        // Agrega el evento de clic a la fila de la tabla
        tr.addEventListener('click', function () {
            this.muestraLasOpcionesDeLaPregunta(pregunta);
        }.bind(this));

        list.append(tr);
    }

    search() {
        const searchInput = this.dom.querySelector('#name').value;

        if (searchInput.trim() === '') {
            // Display an error message in a modal if the searchInput is empty
            const errorMessageModal = document.createElement('div');
            errorMessageModal.innerHTML = `
      <div class="modal fade" id="error-modal" tabindex="-1" role="dialog" aria-labelledby="error-modal-label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="error-modal-label">Error</h5>
            </div>
            <div class="modal-body">
              Ingrese un número de placa.
            </div>
          </div>
        </div>
      </div>
    `;
            document.body.appendChild(errorMessageModal);

            // Show the error modal
            const modal = new bootstrap.Modal(errorMessageModal.querySelector('.modal'));
            modal.show();

            // Remove the error modal from the DOM after it is closed
            errorMessageModal.querySelector('.modal').addEventListener('hidden.bs.modal', () => {
                document.body.removeChild(errorMessageModal);
            });

            return;
        }

        const request = new Request(`${backend}/preguntas/buscaTopic/${searchInput}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        (async () => {
            try {
                const response = await fetch(request);
                if (!response.ok) {
                    errorMessage(response.status);
                    return;
                }
                const polizas = await response.json();
                const listing = this.dom.querySelector('#listbody');
                listing.innerHTML = '';
                polizas.forEach((p) => this.row(listing, p));
            } catch (error) {
                console.error('Error searching polizas:', error);
            }
        })();
    }

    muestraLasOpcionesDeLaPregunta(pregunta) {
    console.log('muestraLasOpcionesDeLaPregunta called!');

    const html = `
        <div id="opciones" style="float: right; width: 50%;">
            <table class="table table-striped">
                <tbody>
                    <tr>
                        <th>Description:</th>
                        <td>${pregunta.pregunta}</td>
                    </tr>
                    <tr>
                        <th>Topic:</th>
                        <td>${pregunta.topic}</td>
                    </tr>
                    <tr>
                        <th>Options:</th>
                        <td>
                            <label>
                                <input type="radio" name="option" value="${pregunta.respuesta1}">
                                ${pregunta.respuesta1}
                            </label>
                            <label>
                                <input type="radio" name="option" value="${pregunta.respuesta2}">
                                ${pregunta.respuesta2}
                            </label>
                            <label>
                                <input type="radio" name="option" value="${pregunta.respuesta3}">
                                ${pregunta.respuesta3}
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="button" class="btn btn-primary" id="submit">Submit</button>
            <button type="button" class="btn btn-secondary" id="close">Close</button>
        </div>
    `;

    const opcionesContainer = document.createElement('div');
    opcionesContainer.innerHTML = html;
    document.body.appendChild(opcionesContainer);

    // Attach event listener to the submit button
    const submitButton = opcionesContainer.querySelector('#submit');
    submitButton.addEventListener('click', () => {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            const optionValue = selectedOption.value;
            console.log('Selected option:', optionValue);
            // Handle submit action here with the selected option
            // You can add your own logic or call a function to handle the submit action
        } else {
            console.log('No option selected.');
        }
    });

    // Attach event listener to the close button
    const closeButton = opcionesContainer.querySelector('#close');
    closeButton.addEventListener('click', () => {
        opcionesContainer.remove(); // Remove the opcionesContainer from the DOM
    });
}




}

// Usage example:
const polizasTable = new Polizas();
document.body.appendChild(polizasTable.dom);
polizasTable.list(); // Call list() to fetch and display the polizas

// Apply button click event listener
polizasTable.dom.querySelector('#apply').addEventListener('click', () => {
    const selectModelo = polizasTable.dom.querySelector('#selectModelo');
    const placaInput = polizasTable.dom.querySelector('#placaInput');
    const valorInput = polizasTable.dom.querySelector('#valorInput');
    const yearInput = polizasTable.dom.querySelector('#yearInput');
    const plazoInput = polizasTable.dom.querySelector('#plazoInput');
    const startDateInput = polizasTable.dom.querySelector('#startDateInput');

    // Create a new poliza object from the form data
    const newPoliza = {
        modelo: selectModelo.value,
        numeroPlaca: placaInput.value,
        valorAsegurado: valorInput.value,
        anno: yearInput.value,
        plazoPago: plazoInput.value,
        fechaInicio: startDateInput.value,
    };




    polizasTable.createPoliza(newPoliza);
});
