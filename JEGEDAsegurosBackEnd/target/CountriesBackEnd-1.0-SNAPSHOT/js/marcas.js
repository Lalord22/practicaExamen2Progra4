class Marcas {
    constructor() {
        this.state = {
            entities: [], // Initialize entities as an empty array
            mode: '', // Initialize mode
        };
        this.dom = this.render();
        this.modal = new bootstrap.Modal(this.dom.querySelector('#modal'));
        this.dom.querySelector("#create").addEventListener('click', () => this.makenew()); // Use arrow function to maintain the context
        this.dom.querySelector("#registerMarcas").addEventListener('click', () => this.registerMarcas());

    }

    render() {
        const html = `
      <div id="marcas">
        <div id="list" class="container">
          <div class="card bg-light">
            <h4 class="card-title mt-3 text-center">Marcas</h4>
            <div class="card-body mx-auto w-75">
              <form id="form">
                    <div class="btn-group me-2">
                      <button type="button" class="btn btn-primary" id="create">Agregar</button>
                    </div>
              </form>

              <div class="table-responsive" style="max-height: 300px; overflow: auto">
                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Descripcion</th>
                    </tr>
                  </thead>
                  <tbody id="listbody"></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
        
    <div id="modal" class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <img class="img-circle" id="img_logo" src="images/logo3.png" style="max-width: 100px; max-height: 100px" alt="logo">
            <h5 class="modal-title">Registar Marca</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <form id="marcaForm">
              <div class="mb-3">
                <label for="description" class="form-label">Descripcion</label>
                <textarea class="form-control" id="description" rows="1" required></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" id="registerMarcas">Registar</button>
          </div>
        </div>
      </div>
    </div>
    `;
        const marcasContainer = document.createElement('div');
        marcasContainer.innerHTML = html;
        return marcasContainer;
    }

    list() {
        const request = new Request(`${backend}/marcas`, {method: 'GET', headers: {}});
        (async () => {
            try {
                const response = await fetch(request);
                if (!response.ok) {
                    errorMessage(response.status);
                    return;
                }
                const marcas = await response.json();
                this.state.entities = marcas; // Update entities in the state
                const listing = this.dom.querySelector("#listbody");
                listing.innerHTML = "";
                this.state.entities.forEach(e => this.row(listing, e));
            } catch (error) {
                console.error('Error fetching marcas:', error);
            }
        })();
    }

    row(list, m) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${m.id}</td>
      <td>${m.descripcion}</td>`;
        list.append(tr);
    }

    makenew() {
        this.modal.show();
    }

    registerMarcas() {
        const descriptionInput = this.dom.querySelector("#description");

        // Get the values from the input fields
        const descripcion = descriptionInput.value.trim();

        // Validate the input
        if (!descripcion) {
          // Show an error message or handle validation as needed
          return;
        }

        // Create a new marca object
        const newMarca = {
          descripcion,
        };
        descriptionInput.value = "";

        // Send the new marca object to the backend using fetch
        const request = new Request(`${backend}/marcas/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMarca),
        });

        fetch(request)
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to register marca');
            }
            // If the marca was successfully registered, refresh the list
            this.list();
          })
          .catch(error => {
            console.error('Error registering marca:', error);
            // Handle the error as needed (e.g., show an error message)
          });

        // Close the modal
        this.modal.hide();
      }


    add() {
        // TODO: Validate data, load into entity, invoke backend for adding
        this.list();
        this.reset();
        this.modal.hide();
    }

    // Other methods (load, reset, emptyEntity, update, validate) can be added here
}

// Usage example:
const marcasTable = new Marcas();
document.body.appendChild(marcasTable.dom);
marcasTable.list(); // Call list() to fetch and display the polizas

