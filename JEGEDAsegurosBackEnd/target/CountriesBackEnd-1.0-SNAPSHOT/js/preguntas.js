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

    row(list, p) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${p.pregunta}</td>
      <td>${p.topic}</td>
        `;

        // Agrega el evento de clic a la fila de la tabla
        tr.addEventListener('click', () => this.showPolizaPopup(p));

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
