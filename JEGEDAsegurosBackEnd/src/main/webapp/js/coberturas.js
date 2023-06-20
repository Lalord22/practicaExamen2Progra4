class Coberturas {
     constructor() {
        this.state = {
            entities: [], // Initialize entities as an empty array
            mode: '', // Initialize mode
        };
        this.dom = this.render();
        this.modal = new bootstrap.Modal(this.dom.querySelector('#modal'));
        this.dom.querySelector("#create").addEventListener('click', () => this.makenew());
        this.dom.querySelector("#registerCoberturas").addEventListener('click', () => {
          const categoriaSelect = this.dom.querySelector('#categoriaSelect');
          const categoriaId = categoriaSelect.value;
          this.registerCoberturas(categoriaId);
        });
    }

    render() {
  const html = `
    <div id="coberturas">
      <div id="list" class="container">
        <div class="card bg-light">
          <h4 class="card-title mt-3 text-center">Coberturas</h4>
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
                    <th scope="col">Precio Minimo</th>
                    <th scope="col">Precio Porcentual</th>
                    <th scope="col">Categoria</th>
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
            <h5 class="modal-title">Registrar Cobertura</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form id="modalForm">
            <div class="modal-body">
              <div class="mb-3">
                <label for="categoriaSelect" class="form-label">Categoría</label>
                <select id="categoriaSelect" class="form-select">
                  <!-- Categories options will be populated dynamically -->
                </select>
              </div>
              <div class="mb-3">
                <label for="descriptionInput" class="form-label">Descripción</label>
                <input type="text" id="descriptionInput" class="form-control">
              </div>
              <div class="mb-3">
                <label for="costoMinimoInput" class="form-label">Costo Minimo</label>
                <input type="text" id="costoMinimoInput" class="form-control">
              </div>
              <div class="mb-3">
                <label for="costoPorcentualInput" class="form-label">Costo Porcentual</label>
                <input type="text" id="costoPorcentualInput" class="form-control">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button id="registerCoberturas" type="button" class="btn btn-primary" data-bs-dismiss="modal" >Registrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  const coberturasContainer = document.createElement('div');
  coberturasContainer.innerHTML = html;
  return coberturasContainer;
}


    
    getCategoriaById(coverageId) {
  const request = new Request(`${backend}/categorias/${coverageId}`, { method: 'GET', headers: {} });
  return fetch(request)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch categoria by ID');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching categoria by ID:', error);
      throw error;
    });
}



    list() {
        const request = new Request(`${backend}/coberturas`, {method: 'GET', headers: {}});
        (async () => {
            try {
                const response = await fetch(request);
                if (!response.ok) {
                    errorMessage(response.status);
                    return;
                }
                const coberturas = await response.json();
                this.state.entities = coberturas; // Update entities in the state
                const listing = this.dom.querySelector("#listbody");
                listing.innerHTML = "";
                this.state.entities.forEach(e => this.row(listing, e));
                const cobertura = e;
                const categoria = await this.getMarcaById(coberturas.id);
                cobertura.categoria = categoria;
                this.row(listing, cobertura);
            } catch (error) {
                console.error('Error fetching modelos:', error);
            }
        })();
    }


    row(list, co) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${co.id}</td>
      <td>${co.descripcion}</td>
      <td>${co.costoMinimo}</td>
      <td>${co.costoPorcentual}</td>
      <td>${co.categoria.descripcion}</td>`;
        list.append(tr);
    }

makenew() {
  const categoriaSelect = this.dom.querySelector('#categoriaSelect');
  categoriaSelect.innerHTML = ''; // Clear existing options

  // Fetch categorias from the endpoint
  fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/categorias')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch categorias');
      }
      return response.json();
    })
    .then((categorias) => {
      // Populate category options
      categorias.forEach((categoria) => {
        const option = document.createElement('option');
        option.value = categoria.id;
        option.textContent = categoria.descripcion;
        categoriaSelect.appendChild(option);
      });

      // Display the modal
      this.modal.show();

    })
    .catch((error) => {
      console.error('Error fetching categorias:', error);
    });
}





   registerCoberturas(categoryId) {
  const descriptionInput = this.dom.querySelector('#descriptionInput');
  const costoMinimoInput = this.dom.querySelector('#costoMinimoInput');
  const costoPorcentualInput = this.dom.querySelector('#costoPorcentualInput');
  const description = descriptionInput.value;
  const costoMinimo = costoMinimoInput.value;
  const costoPorcentual = costoPorcentualInput.value;

  const newCobertura = {
    categoria: {
                id: categoryId
            },  
    descripcion: description,
    costoMinimo: costoMinimo,
    costoPorcentual: costoPorcentual,
  };

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCobertura),
  };

  fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/coberturas/register', requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to add cobertura');
      }
       this.list(); // Refresh the coberturas list after adding a new one
      return response.json();
    })
    .catch((error) => {
      console.error('Error adding cobertura:', error);
    });
}


}

// Usage example:
const coberturasTable = new Coberturas();
document.body.appendChild(coberturasTable.dom);
coberturasTable.list();
