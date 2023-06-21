class Preguntas {
    constructor() {
        this.state = {
            entities: [], // Initialize entities as an empty array
            mode: '',
        };
        this.dom = this.render();
        this.modal = new bootstrap.Modal(this.dom.querySelector('#modal'));
    
        this.dom.querySelector('#search').addEventListener('click', () => this.search());
    }

    render() {
        const html = `
    <div id="polizas">
      <div id="list" class="container">
        <div class="card bg-light">
          <h4 class="card-title mt-3 text-center">Polizas</h4>
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
      <div id="modal" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <img class="img-circle" id="img_logo" src="images/logo.png" style="max-width: 50px; max-height: 50px" alt="logo">
              <span style='margin-left:4em;font-weight: bold;'>Poliza</span>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="modal-form">
              <div class="modal-body">
                <div class="mb-3">
                  <label for="selectModelo" class="form-label">Modelo</label>
                  <select id="selectModelo" class="form-select">
                    <!-- Options will be populated dynamically based on selected marca -->
                  </select>
                </div>
                <div class="mb-3">
                  <label for="placa" class="form-label">Placa</label>
                  <input type="text" class="form-control" id="placa" required>
                </div>
                <div class="mb-3">
                  <label for="valorAsegurado" class="form-label">Valor Asegurado</label>
                  <input type="text" class="form-control" id="valorAsegurado" required>
                </div>
                <div class="mb-3">
                  <label for="anno" class="form-label">Año de Fabricación</label>
                  <input type="number" class="form-control" id="anno" required>
                </div>
                <div class="mb-3">
                  <label for="plazoPago" class="form-label">Plazo de Pago</label>
                  <select id="plazoPago" class="form-select" required>
                    <option value="Trimestral">Trimestral</option>
                    <option value="Semestral">Semestral</option>
                    <option value="Anual">Anual</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="fechaInicio" class="form-label">Fecha de Inicio</label>
                  <input type="date" class="form-control" id="fechaInicio" required>
                </div>
                <div class="mb-3">
            <label class="form-label">Coberturas</label>
            <div id="checkboxGroup">
              <!-- Checkboxes will be populated dynamically -->
            </div>
          </div>
              </div>
              <div class="modal-footer">
                <button id="apply" type="button" class="btn btn-primary">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
        const polizasContainer = document.createElement('div');
        polizasContainer.innerHTML = html;

       

        return polizasContainer;
    }

    list() {
        const request = new Request(`${backend}/polizas/cliente`, {method: 'GET', headers: {}});
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

    row(list, p) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.numeroPlaca}</td>
        `;
        
         // Agrega el evento de clic a la fila de la tabla
        tr.addEventListener('click', () => this.showPolizaPopup(p));

        list.append(tr);
    }

   showAddModal() {
  // Reset modal form inputs
  const modalForm = this.dom.querySelector('#modal-form');
  modalForm.reset();

  // Fetch the highest Poliza ID from the backend
  fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/polizas/highestID')
    .then((response) => {
      if (!response.ok) {
        errorMessage(response.status);
        throw new Error('Failed to fetch highest Poliza ID');
      }
      return response.json();
    })
    .then((highestId) => {
      // Calculate the new Poliza ID by incrementing the highest ID value by 1
      const newPolizaId = highestId + 1;

      // Fetch modelos from the database
      const requestModelos = new Request(`${backend}/modelos`, { method: 'GET', headers: {} });

      fetch(requestModelos)
        .then(async (responseModelos) => {
          if (!responseModelos.ok) {
            errorMessage(responseModelos.status);
            return;
          }

          const modelos = await responseModelos.json();

          // Create a map to store the unique combination of marca and modelos
          const marcaModeloMap = new Map();

          // Group modelos by marca
          modelos.forEach((modelo) => {
            const marcaId = modelo.marca.id;
            if (!marcaModeloMap.has(marcaId)) {
              marcaModeloMap.set(marcaId, {
                marcaDescripcion: modelo.marca.descripcion,
                modelos: [],
              });
            }
            marcaModeloMap.get(marcaId).modelos.push(modelo);
          });

          // Populate selectModelo dropdown with modelos and their marca
          const selectModelo = modalForm.querySelector('#selectModelo');
          selectModelo.innerHTML = '';
          modelos.forEach((modelo) => {
            const optionModelo = document.createElement('option');
            optionModelo.value = modelo.id;
            optionModelo.textContent = `${modelo.descripcion} - ${modelo.marca.descripcion}`;
            selectModelo.appendChild(optionModelo);
          });

          // Fetch coberturas from the database
         const requestCoberturas = new Request(`${backend}/coberturas`, { method: 'GET', headers: {} });

          return fetch(requestCoberturas);
        })
          .then(async (responseCoberturas) => {
            if (!responseCoberturas.ok) {
              errorMessage(responseCoberturas.status);
              return;
            }

            const coberturas = await responseCoberturas.json();

            // Group coberturas by categoria
            const coberturasByCategoria = new Map();
            coberturas.forEach((cobertura) => {
              const categoriaId = cobertura.categoria.id;
              if (!coberturasByCategoria.has(categoriaId)) {
                coberturasByCategoria.set(categoriaId, {
                  categoriaDescripcion: cobertura.categoria.descripcion,
                  coberturas: [],
                });
              }
              coberturasByCategoria.get(categoriaId).coberturas.push(cobertura);
            });

            // Populate checkbox group with coberturas grouped by categoria
            const checkboxGroup = modalForm.querySelector('#checkboxGroup');
            checkboxGroup.innerHTML = '';
            coberturasByCategoria.forEach((categoria, categoriaId) => {
              const categoriaDiv = document.createElement('div');
              categoriaDiv.classList.add('categoria-div');

              const categoriaTitle = document.createElement('h4');
              categoriaTitle.textContent = categoria.categoriaDescripcion;
              categoriaDiv.appendChild(categoriaTitle);

              categoria.coberturas.forEach((cobertura) => {
                const checkbox = document.createElement('div');
                checkbox.innerHTML = `
                  <input type="checkbox" id="cobertura_${cobertura.id}" value="${cobertura.id}">
                  <label for="cobertura_${cobertura.id}">${cobertura.descripcion}</label>
                  <div>Costo Minimo: ${cobertura.costoMinimo}</div>
                  <div>Costo Porcentual: ${cobertura.costoPorcentual}</div>
                  <!-- Add additional attributes as needed -->
                `;
                categoriaDiv.appendChild(checkbox);
              });

              checkboxGroup.appendChild(categoriaDiv);
            });

          // Fetch cliente information from the server
          fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/clientes/cliente')
            .then((responseCliente) => {
              if (!responseCliente.ok) {
                errorMessage(responseCliente.status);
                return;
              }

              return responseCliente.json();
            })
            .then((cliente) => {
              // Show the modal
              this.modal.show();

              // Bind the createPoliza method to the "Registrar" button click event
              const registrarButton = modalForm.querySelector('#apply');
              registrarButton.addEventListener('click', () => {
                const selectModelo = modalForm.querySelector('#selectModelo');
                const modeloSelected = selectModelo.value;
                const placaInput = modalForm.querySelector('#placa');
                const valorAseguradoInput = modalForm.querySelector('#valorAsegurado');
                const annoInput = modalForm.querySelector('#anno');
                const plazoPagoSelect = modalForm.querySelector('#plazoPago');
                const fechaInicioInput = modalForm.querySelector('#fechaInicio');

                // Create an array of selected coberturas
                const coberturasCheckboxList = modalForm.querySelectorAll('input[type="checkbox"]:checked');
                const coberturaIds = Array.from(coberturasCheckboxList).map((checkbox) => checkbox.value);

                // Fetch the selected coberturas from the database
                const fetchCoberturas = coberturaIds.map((coberturaId) => {
                  const requestCobertura = new Request(`${backend}/coberturas/${coberturaId}`, {
                    method: 'GET',
                    headers: {},
                  });
                  return fetch(requestCobertura).then((response) => response.json());
                });

                // Fetch the selected modelo from the database
                const requestModelo = new Request(`${backend}/modelos/${modeloSelected}`, { method: 'GET', headers: {} });

                Promise.all([fetch(requestModelo), ...fetchCoberturas])
                  .then(async ([responseModelo, ...selectedCoberturas]) => {
                    if (!responseModelo.ok) {
                      errorMessage(responseModelo.status);
                      return;
                    }

                    const modelo = await responseModelo.json();

                    // Create a new poliza object from the form data
                    const newPoliza = {
                      id: newPolizaId, // Set the new Poliza ID
                      modelo: modelo,
                      numeroPlaca: placaInput.value,
                      valorAsegurado: parseFloat(valorAseguradoInput.value),
                      anno: annoInput.value,
                      plazoPago: plazoPagoSelect.value,
                      fechaInicio: fechaInicioInput.value,
                      coberturas: selectedCoberturas,
                      cliente: cliente,
                    };

                    // Fetch the costoTotal from the backend
                    const requestCostoTotal = new Request(`${backend}/polizas/calcular`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(newPoliza),
                    });

                    return fetch(requestCostoTotal)
                      .then((responseCostoTotal) => {
                        if (!responseCostoTotal.ok) {
                          errorMessage(responseCostoTotal.status);
                          throw new Error('Failed to calculate costoTotal');
                        }
                        return responseCostoTotal.json();
                      })
                      .then((costoTotal) => {
                        // Add the costoTotal to the poliza object
                        newPoliza.costoTotal = costoTotal;

                        // Call the createPoliza method with the new poliza object
                        this.createPoliza(newPoliza);
                      })
                      .catch((error) => {
                        console.error('Error calculating costoTotal:', error);
                      });
                  })
                  .catch((error) => {
                    errorMessage(error.message);
                  });
              });
            })
            .catch((error) => {
              errorMessage(error.message);
            });
        })
        .catch((error) => {
          errorMessage(error.message);
        });
    })
    .catch((error) => {
      errorMessage(error.message);
    });
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

  const request = new Request(`${backend}/polizas/findByPlaca/${searchInput}`, {
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


   


    createPoliza(poliza) {
  // Show summary popup
  this.showSummaryPopup(poliza)
    .then((confirmed) => {
      if (confirmed) {
        // User confirmed, proceed with creating the poliza
        const request = new Request(`${backend}/polizas/agregar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(poliza),
        });

        fetch(request)
          .then((response) => {
            if (!response.ok) {
              errorMessage(response.status);
              throw new Error('Failed to create poliza');
            }

            // Send the poliza as JSON to the agregarPolizaCobertura endpoint
            const coberturaRequest = new Request('http://localhost:8080/JEGEDAsegurosBackEnd/api/polizas/agregarPolizaCobertura', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(poliza),
            });

            fetch(coberturaRequest)
              .then((coberturaResponse) => {
                if (!coberturaResponse.ok) {
                  errorMessage(coberturaResponse.status);
                  throw new Error('Failed to add poliza cobertura');
                }

                this.modal.hide();
                this.list(); // Refresh the polizas list after creating a new poliza

                // Close all modals
                this.closeAllModals();
              })
              .catch((error) => {
                console.error('Error adding poliza cobertura:', error);
              });
          })
          .catch((error) => {
            console.error('Error creating poliza:', error);
          });
      } else {
        // User canceled, do nothing
      }
    })
    .catch((error) => {
      console.error('Error showing summary popup:', error);
    });
}


closeAllModals() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach((modal) => {
    const bsModal = bootstrap.Modal.getInstance(modal);
    if (bsModal) {
      bsModal.hide();
    }
  });
}

  showPolizaPopup(poliza) {
  // Create the HTML content of the popup with the poliza details
  const html = `
    <div class="modal fade" id="poliza-modal" tabindex="-1" role="dialog" aria-labelledby="poliza-modal-label" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="poliza-modal-label">Detalles de la Póliza</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>ID: ${poliza.id}</p>
            <p>Placa: ${poliza.numeroPlaca}</p>
            <p>Año: ${poliza.anno}</p>
            <p>Valor Asegurado: ${poliza.valorAsegurado}</p>
            <p>Plazo de Pago: ${poliza.plazoPago}</p>
            <p>Fecha de Inicio: ${poliza.fechaInicio}</p>
            <p>Modelo: ${poliza.modelo.descripcion}</p>
            <p>Marca: ${poliza.modelo.marca.descripcion}</p>
            <p>Coberturas:</p>
            <ul id="coberturas-list"></ul>
          </div>
        </div>
      </div>
    </div>
  `;

  // Add the popup to the DOM
  const polizaPopup = document.createElement('div');
  polizaPopup.innerHTML = html;
  document.body.appendChild(polizaPopup);

  // Fetch the coberturas of the poliza
  fetch(`http://localhost:8080/JEGEDAsegurosBackEnd/api/coberturas/poliza/${poliza.id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch coberturas');
      }
      return response.json();
    })
    .then((coberturas) => {
      // Get the coberturas list element
      const coberturasList = polizaPopup.querySelector('#coberturas-list');

      // Iterate through the fetched coberturas and create list items
      coberturas.forEach((cobertura) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${cobertura.descripcion} - Costo Minimo: ${cobertura.costoMinimo}, Costo Porcentual: ${cobertura.costoPorcentual}`;
        coberturasList.appendChild(listItem);
      });

      // Show the popup
      const modal = new bootstrap.Modal(polizaPopup.querySelector('.modal'));
      modal.show();

      // Get the close button of the modal
      const closeButton = polizaPopup.querySelector('.modal-header .close');

      // Add a click event to the close button to hide the modal
      closeButton.addEventListener('click', () => {
        modal.hide();
      });

      // Remove the popup from the DOM when it is hidden
      polizaPopup.querySelector('.modal').addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(polizaPopup);
      });
    })
    .catch((error) => {
      console.error('Error fetching coberturas:', error);
    });
}


    showSummaryPopup(data) {
        return new Promise((resolve, reject) => {
            const html = `
      <div class="modal fade" id="summary-modal" tabindex="-1" role="dialog" aria-labelledby="summary-modal-label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="summary-modal-label">Summary</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="close-button">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p><strong>Modelo:</strong> ${data.modelo.descripcion}</p>
              <p><strong>Placa:</strong> ${data.numeroPlaca}</p>
              <p><strong>Valor Asegurado:</strong> ${data.valorAsegurado}</p>
              <p><strong>Año de Fabricación:</strong> ${data.anno}</p>
              <p><strong>Plazo de Pago:</strong> ${data.plazoPago}</p>
              <p><strong>Fecha de Inicio:</strong> ${data.fechaInicio}</p>
               <p><strong>Costo Total:</strong> ${data.costoTotal}</p>
            </div>
            <div class="modal-footer">
              <button id="cancel-button" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button id="confirm-button" type="button" class="btn btn-primary">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    `;
            const summaryPopup = document.createElement('div');
    summaryPopup.innerHTML = html;

    // Show the summary popup
    const summaryModal = new bootstrap.Modal(summaryPopup.querySelector('#summary-modal'));
    summaryModal.show();
    
    

    // Add event listener to the confirm button
    const confirmButton = summaryPopup.querySelector('#confirm-button');
    confirmButton.addEventListener('click', () => {
      summaryModal.hide();
      resolve(true); // User confirmed
      cleanup(); // Clean up the popup element from the DOM
    });

    // Add event listener to the cancel button
    const cancelButton = summaryPopup.querySelector('#cancel-button');
    cancelButton.addEventListener('click', () => {
      this.closeAllModals();
      summaryModal.hide();
      resolve(false); // User canceled
      cleanup(); // Clean up the popup element from the DOM
    });
    
     const closeButton = summaryPopup.querySelector('#close-button');
    closeButton.addEventListener('click', () => {
      this.closeAllModals();
      summaryModal.hide();
      resolve(false); // User canceled
      cleanup(); // Clean up the popup element from the DOM
    });

    // Cleanup function
    const cleanup = () => {
      confirmButton.removeEventListener('click', cleanup);
      cancelButton.removeEventListener('click', cleanup);
      summaryModal.dispose(); // Dispose the modal
      summaryPopup.remove(); // Remove the popup element from the DOM
    };

    // Cleanup when the modal is hidden
    summaryModal._element.addEventListener('hidden.bs.modal', cleanup);

    document.body.appendChild(summaryPopup);
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
