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
        tr.addEventListener('click', () => {
            this.muestraLasOpcionesDeLaPregunta(pregunta);
        });

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

        const existingOpcionesContainer = document.getElementById('opciones');
        if (existingOpcionesContainer) {
            existingOpcionesContainer.remove(); // Remove any existing opcionesContainer
        }

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

                // Create an object with the pregunta and optionValue
                const data = {
                    pregunta: pregunta,
                    respuesta: optionValue
                };

                // Send the data to your RESTful service
                fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/preguntas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                        .then(response => {
                            if (response.ok) {
                                return response.json(); // Extract the response data
                            } else {
                                console.log('Submit failed.');
                                // Handle failed submission if needed
                            }
                        })
                        .then(responseData => {
                            console.log('Response:', responseData); // Log the response data for debugging purposes

                            if (responseData === true) {
                                console.log('Submit successful!');
                                this.list();
                                opcionesContainer.remove();
                                renderConfirmationModal('Correct!', () => {
                                    // Code to execute when confirmed

                                });
                            } else if (responseData === false) {
                                console.log('Incorrect answer.');
                                this.list();
                                opcionesContainer.remove();
                                renderConfirmationModal('Incorrect!', () => {
                                    // Code to execute when confirmed

                                });
                                // Handle incorrect answer if needed
                            } else {
                                console.log('Unexpected response.');
                                // Handle unexpected response if needed
                            }
                        })
                        .catch(error => {
                            console.log('Submit error:', error);
                            // Handle error if needed
                        });
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

    renderCorrectAnswerModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';

        const content = document.createElement('div');
        content.className = 'modal-content';

        const message = document.createElement('p');
        message.textContent = 'Correct!';

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.addEventListener('click', () => {
            modal.remove(); // Remove the modal from the DOM
        });

        content.appendChild(message);
        content.appendChild(closeButton);
        modal.appendChild(content);

        document.body.appendChild(modal);
    }

}

// Initialize the Preguntas class
const preguntas = new Preguntas();

// Append the rendered DOM to the document body
document.body.appendChild(preguntas.dom);

// Call the list() method to populate the table with data
preguntas.list();
function renderConfirmationModal(message, callback) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'confirmationModal';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'confirmationModalLabel');
    modal.setAttribute('aria-hidden', 'true');

    const modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';

    const modalTitle = document.createElement('h5');
    modalTitle.className = 'modal-title';
    modalTitle.id = 'confirmationModalLabel';
    modalTitle.textContent = '';   //   <---- El titulo del pop up

    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    modalBody.textContent = message;

    const modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';

    const confirmButton = document.createElement('button');
    confirmButton.type = 'button';
    confirmButton.className = 'btn btn-primary';
    confirmButton.textContent = 'Aceptar';


    modalFooter.appendChild(confirmButton);
    modalHeader.appendChild(modalTitle);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    document.body.appendChild(modal);

    // Show the modal
    const confirmationModal = new bootstrap.Modal(modal);
    confirmationModal.show();

    // Handle confirm button click
    confirmButton.addEventListener('click', () => {
        confirmationModal.hide();
        if (typeof callback === 'function') {
            callback();
        }
    });

    // Remove the modal from the DOM when hidden
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
}