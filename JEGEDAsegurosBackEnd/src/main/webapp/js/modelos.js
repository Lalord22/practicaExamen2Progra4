class Modelos {
  constructor() {
    this.state = {
      entities: [], // Initialize entities as an empty array
      mode: '', // Initialize mode
    };
    this.dom = this.render();
    this.modal = new bootstrap.Modal(this.dom.querySelector('#modal'));
    this.dom.querySelector("#create").addEventListener('click', () => this.makenew());
    this.dom.querySelector("#registerModelos").addEventListener('click', () => {
      const marcaSelect = this.dom.querySelector('#marcaSelect');
      const marcaId = marcaSelect.value;
      this.registerModelos(marcaId);
    });
  }

  render() {
    const html = `
      <div id="modelos">
      <div id="list" class="container">
        <div class="card bg-light">
          <h4 class="card-title mt-3 text-center">Modelos</h4>
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
                    <th scope="col">Descripción</th>
                    <th scope="col">Auto</th>
                    <th scope="col">Marca</th>
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
            <h5 class="modal-title">Registrar Modelo</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form id="modeloForm" enctype="multipart/form-data">
            <div class="modal-body">
              <div class="mb-3">
                <label for="marcaSelect" class="form-label">Marca</label>
                <select id="marcaSelect" class="form-select">
                  <!-- Marcas options will be populated dynamically -->
                </select>
              </div>
              <div class="mb-3">
                <label for="descriptionInput" class="form-label">Descripción</label>
                <input type="text" id="descriptionInput" class="form-control">
              </div>
              <div class="mb-3">
                <label for="imageInput" class="form-label">Imagen</label>
                <input type="file" id="imageInput" class="form-control" accept="image/*">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" id="registerModelos" data-bs-dismiss="modal">Registrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    `;
    const modelosContainer = document.createElement('div');
    modelosContainer.innerHTML = html;
    return modelosContainer;
  }

  getMarcaById(marcaId) {
    const request = new Request(`${backend}/modelos/${marcaId}`, { method: 'GET', headers: {} });
    return fetch(request)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch marca by ID');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching marca by ID:', error);
        throw error;
      });
  }

  list() {
        const request = new Request(`${backend}/modelos`, {method: 'GET', headers: {}});
        (async () => {
            try {
                const response = await fetch(request);
                if (!response.ok) {
                    errorMessage(response.status);
                    return;
                }
                const modelos = await response.json();
                this.state.entities = modelos; // Update entities in the state
                const listing = this.dom.querySelector("#listbody");
                listing.innerHTML = "";
                this.state.entities.forEach(e => this.row(listing, e));
                const modelo = e;
                const marca = await this.getMarcaById(modelos.id);
               modelo.marca = marca;
                this.row(listing, modelo);
            } catch (error) {
                console.error('Error fetching modelos:', error);
            }
        })();
    }

  row(list, mo) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${mo.id}</td>
      <td>${mo.descripcion}</td>
      <td><img class="carro" src="${backend}/modelos/${mo.id}/carro"></td>
      <td>${mo.marca.descripcion}</td>`;
    list.append(tr);
  }

  makenew() {
    const marcaSelect = this.dom.querySelector('#marcaSelect');
    marcaSelect.innerHTML = ''; // Clear existing options

    // Fetch marcas from the endpoint
    fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/marcas')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch marcas');
        }
        return response.json();
      })
      .then((marcas) => {
        // Populate marca options
        marcas.forEach((marca) => {
          const option = document.createElement('option');
          option.value = marca.id;
          option.textContent = marca.descripcion;
          marcaSelect.appendChild(option);
        });

        // Display the modal
        this.modal.show();

      })
      .catch((error) => {
        console.error('Error fetching marcas:', error);
      });
  }

  registerModelos(marcaId) {
  const descriptionInput = this.dom.querySelector('#descriptionInput');
  const imageInput = this.dom.querySelector('#imageInput');
  const description = descriptionInput.value.trim();

  const newModelo = {
    marca: {
      id: marcaId
    },
    descripcion: description,
  };

  const registerRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newModelo),
  };

  fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/modelos/register', registerRequestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to add modelo');
      }
      return this.fetchLastModelo(); // Return the promise from fetchLastModelo()
    })
    .then(() => {
      
    })
    .catch((error) => {
      console.error('Error adding modelo:', error);
    });
}


  

  fetchLastModelo() {
  return fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/modelos/last')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch last modelo');
      }
      return response.json();
    })
    .then((lastModelo) => {
      return this.addAuto(parseInt(lastModelo.id), this.dom.querySelector('#imageInput').files[0]);
    })
    .then(() => {
      this.list();
    })
    .catch((error) => {
      console.error('Error fetching last modelo:', error);
    });
}

addAuto(modeloId, file) {
  const formData = new FormData();
  formData.append('carro', file, 'carro.png'); // Set the filename as 'carro.png'

  const requestOptions = {
    method: 'POST',
    body: formData,
  };

  return fetch(`http://localhost:8080/JEGEDAsegurosBackEnd/api/modelos/${modeloId}/carro`, requestOptions)
    .then((response) => {
      if (response.status === 204) {
        // Request succeeded but no content in the response
        return Promise.resolve();
      } else if (!response.ok) {
        throw new Error('Failed to add image');
      }
    })
    .catch((error) => {
      console.error('Error adding image:', error);
    });
}






  // Other methods (load, reset, emptyEntity, update, validate) can be added here
}

const modelosTable = new Modelos();
document.body.appendChild(modelosTable.dom);
modelosTable.list(); // Call list() to fetch and display the modelos
