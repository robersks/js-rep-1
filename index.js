// referencia a tbody de la tabla
const tablaBody = document.querySelector('#tablaBody');

// URL del API
const url = 'https://650cf20447af3fd22f681060.mockapi.io/registro/registros';

// leer la tabla del API
fetch(url)
    .then(response => response.json())
    .then(data => {
        // Recorre los datos y agrega cada registro a la tabla
        data.forEach(registro => {
            const { id, valor, tipo } = registro; // Extraer los valores de cada registro
            const fila = `
                <tr>
                    <td>${id}</td>
                    <td>${valor}</td>
                    <td>${tipo}</td>
                    <td>
                        <button  id="${id}" class="btnEditar">
                            Editar
                        </button>
                    </td>
                    <td>
                        <button  id="${id}" class="btnEliminar">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `;
            tablaBody.innerHTML += fila; // Agrega la fila a la tabla
        });

        //boton eliminar
        const botonEliminar = document.querySelectorAll(".btnEliminar");
        botonEliminar.forEach(registroEspecifico => {
            registroEspecifico.addEventListener("click", () => {
                funeliminarRegistro(registroEspecifico.id);
            });
        });

        // boton editar
        const botonEditar = document.querySelectorAll(".btnEditar");
        botonEditar.forEach(registroEspecifico => {
            registroEspecifico.addEventListener("click", () => {
                dialog.showModal();
                editarDato(registroEspecifico.id);
            });
        });

    })

    .catch(err => console.error(err));



// Enviar a la api
const formulario = document.querySelector("#registroFormulario");
formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    let fila = Object.fromEntries(new FormData(e.target));
    let config = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(fila)
    };
    let resp = await (await fetch(url, config)).json();
    location.reload();
});

// Funcion eliminar registro
const funeliminarRegistro = async (id) => {
    let config = {
        method: "DELETE",
        headers: { "content-type": "application/json" }
    };
    let resp = await (await fetch(url + `/${id}`, config)).json();
    location.reload();
};


// Funcion editar registro 
const dialog = document.querySelector("dialog");
const editarFormulario = document.querySelector("#frmEditar");
const editarDato = (id) => {
    editarFormulario.addEventListener("submit", async (e) => {
        e.preventDefault();
        let fila = Object.fromEntries(new FormData(e.target));
        let config = {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(fila)
        };
        let resp = await (await fetch(url + `/${id}`, config)).json();
        dialog.close();
        location.reload();
    })
};


// Obtener el botón de cerrar y el cuadro de diálogo
const cerrarBoton = document.getElementById('cerrarCuadroDialogo');
const cuadroDialogo = document.querySelector('.cuadroDialogo');

// Agregar un evento de clic al botón de cerrar
cerrarBoton.addEventListener('click', () => {
  cuadroDialogo.close(); // Cierra el cuadro de diálogo
});