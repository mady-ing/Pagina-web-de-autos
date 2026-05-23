const autos = [
    {
        marca: "Nissan",
        modelo: "Versa",
        año: 2020,
        precio: "$180,000",
        imagen: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2"
    },
    {
        marca: "Toyota",
        modelo: "Corolla",
        año: 2019,
        precio: "$200,000",
        imagen: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2"
    },
    {
        marca: "Honda",
        modelo: "Civic",
        año: 2018,
        precio: "$190,000",
        imagen: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d"
    }
];

const contenedor = document.getElementById("autos");
const busqueda = document.getElementById("busqueda");
const precioMax = document.getElementById("precioMax");
const anioMin = document.getElementById("anioMin");

function filtrar() {
    let resultado = autos;

    if (busqueda.value) {
        resultado = resultado.filter(a =>
            a.marca.toLowerCase().includes(busqueda.value.toLowerCase())
        );
    }

    if (precioMax.value) {
        resultado = resultado.filter(a =>
            parseInt(a.precio.replace(/\D/g, '')) <= precioMax.value
        );
    }

    if (anioMin.value) {
        resultado = resultado.filter(a =>
            a.año >= anioMin.value
        );
    }

    mostrarAutos(resultado);
}

busqueda.addEventListener("input", filtrar);
precioMax.addEventListener("input", filtrar);
anioMin.addEventListener("input", filtrar);

function mostrarAutos(lista) {
    contenedor.innerHTML = "";

    lista.forEach(auto => {
        contenedor.innerHTML += `
      <div class="auto-card" onclick='verDetalle(${JSON.stringify(auto)})'>
        <img src="${auto.imagen}">
        <div class="auto-info">
          <h3>${auto.marca} ${auto.modelo}</h3>
          <p>Año: ${auto.año}</p>
          <p><strong>${auto.precio}</strong></p>
          <button onclick="contactar('${auto.marca} ${auto.modelo}')">
            Contactar por WhatsApp
          </button>
        </div>
      </div>
    `;
    });
}
function verDetalle(auto) {
    localStorage.setItem("autoSeleccionado", JSON.stringify(auto));
    window.location.href = "detalle.html";
}

function contactar(auto) {
    const mensaje = `Hola, vi este auto en tu página: ${auto}. ¿Sigue disponible?`;
    window.open(`https://wa.me/524251408474?text=${encodeURIComponent(mensaje)}`);
}

busqueda.addEventListener("input", e => {
    const valor = e.target.value.toLowerCase();
    const filtrados = autos.filter(a =>
        a.marca.toLowerCase().includes(valor)
    );
    mostrarAutos(filtrados);
});

mostrarAutos(autos);