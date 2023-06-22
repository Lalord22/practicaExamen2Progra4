class Preguntas {
    constructor() {
        this.state = {
            entities: [], // Initialize entities as an empty array
            mode: '',
        };
        this.dom = this.render();

        this.dom.querySelector('#registerLink').addEventListener('click', () => renderAgregarModal(":)"));

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
                                    <a class="nav-link" id="search" href="#" data-bs-toggle="modal">
                                            <img src="images/search.png" alt="Info" style="width: 25px; height: 25px; margin-left: 10px; " />
                                    </a>
                                            <a id="registerLink" class="btn btn-info btn-block" style="margin-bottom: 15px; background-color: #005b99; color: white; border: none;" href="#">Regístrese aquí</a>
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
              Escriba el topic antes de buscar
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

function renderAgregarModal(message, callback) {
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
    modalTitle.textContent = 'Agregar nueva Pregunta'; // Title of the modal

    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';

    const form = document.createElement('form');

    // Question input
    const questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionInput.className = 'form-control';
    questionInput.placeholder = 'Pregunta';
    questionInput.required = true;

    // Topic input
    const topicInput = document.createElement('input');
    topicInput.type = 'text';
    topicInput.className = 'form-control';
    topicInput.placeholder = ' Topic';
    topicInput.required = true;

    // Option 1 input
    const option1Input = document.createElement('input');
    option1Input.type = 'text';
    option1Input.className = 'form-control';
    option1Input.placeholder = 'Primera opcion';
    option1Input.required = true;

    // Option 2 input
    const option2Input = document.createElement('input');
    option2Input.type = 'text';
    option2Input.className = 'form-control';
    option2Input.placeholder = 'Segunda opcion';
    option2Input.required = true;

    // Option 3 input
    const option3Input = document.createElement('input');
    option3Input.type = 'text';
    option3Input.className = 'form-control';
    option3Input.placeholder = 'Tercera opcion';
    option3Input.required = true;

    const modalRadio = document.createElement('h6');
    modalRadio.className = 'modal-title';
    modalRadio.id = 'confirmationModalLabel';
    modalRadio.textContent = 'Seleccione cual opcion es la respuesta correcta'; // Title of the modal

    // Radio buttons for selecting the correct option
    const optionRadio1 = document.createElement('input');
    optionRadio1.type = 'radio';
    optionRadio1.name = 'correctOption';
    optionRadio1.value = option1Input.value;

    const optionRadio2 = document.createElement('input');
    optionRadio2.type = 'radio';
    optionRadio2.name = 'correctOption';
    optionRadio2.value = option2Input.value;

    const optionRadio3 = document.createElement('input');
    optionRadio3.type = 'radio';
    optionRadio3.name = 'correctOption';
    optionRadio3.value = option3Input.value;

    // Label for the radio buttons
    const optionLabel1 = document.createElement('label');
    optionLabel1.textContent = 'Marcar Correcta';
    const optionLabel2 = document.createElement('label');
    optionLabel2.textContent = 'Marcar Correcta';
    const optionLabel3 = document.createElement('label');
    optionLabel3.textContent = 'Marcar Correcta';

    // Create a container div for option 1
    const optionContainer1 = document.createElement('div');
    optionContainer1.className = 'option-container';

    // Set the display property of optionContainer1 to "flex"
    optionContainer1.style.display = 'flex';

    // Append option 1 input and radio button to the container div
    optionContainer1.appendChild(option1Input);
    optionContainer1.appendChild(optionRadio1);

    // Create a container div for option 2
    const optionContainer2 = document.createElement('div');
    optionContainer2.className = 'option-container';

    // Set the display property of optionContainer2 to "flex"
    optionContainer2.style.display = 'flex';

    // Append option 2 input and radio button to the container div
    optionContainer2.appendChild(option2Input);
    optionContainer2.appendChild(optionRadio2);

    // Create a container div for option 3
    const optionContainer3 = document.createElement('div');
    optionContainer3.className = 'option-container';

    // Set the display property of optionContainer3 to "flex"
    optionContainer3.style.display = 'flex';

    // Append option 3 input and radio button to the container div
    optionContainer3.appendChild(option3Input);
    optionContainer3.appendChild(optionRadio3);

    // Append the option containers and labels to the form
    form.appendChild(questionInput);
    form.appendChild(topicInput);
    form.appendChild(modalRadio);
    form.appendChild(optionContainer1);
    form.appendChild(optionLabel1);
    form.appendChild(optionContainer2);
    form.appendChild(optionLabel2);
    form.appendChild(optionContainer3);
    form.appendChild(optionLabel3);

    modalBody.appendChild(form);

    const modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';

    const confirmButton = document.createElement('button');
    confirmButton.type = 'button';
    confirmButton.className = 'btn btn-primary';
    confirmButton.textContent = 'Accept';

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
  const pregunta = questionInput.value;
  const topic = topicInput.value;
  const option1 = option1Input.value;
  const option2 = option2Input.value;
  const option3 = option3Input.value;
  
  const selectedOption = Array.from(document.querySelectorAll('input[name="correctOption"]')).find(option => option.checked);
  
  if (selectedOption) {
    const respuesta = selectedOption.previousSibling.value; // Get the value of the selected radio button

    confirmationModal.hide();

    // Create the request body object
    const nuevaPregunta = {
      pregunta: pregunta,
      topic: topic,
      respuesta1: option1,
      respuesta2: option2,
      respuesta3: option3,
    };

    const nuevaRespuesta = {
      respuesta: respuesta
    };

    const requestBody = {
      pregunta: nuevaPregunta,
      respuesta: nuevaRespuesta
    };

    // Make the HTTP POST request
    fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/preguntas/nuevaPregunta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        if (response.ok) {
          // Return the response data
          return response.json();
        } else {
          throw new Error('Error occurred while adding the question');
        }
      })
      .then(data => {
        // Handle the response data
        console.log(data);
        // Call the list() function or perform any other necessary actions
        this.list();
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });
  } else {
    alert('Please select the correct option');
  }
});



    // Remove the modal from the DOM when hidden
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
}
