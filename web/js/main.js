let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.querySelectorAll(".btn-book").forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    const nombre = this.dataset.nombre;
    const precio = parseFloat(this.dataset.precio);

    carrito.push({ nombre, precio });
    localStorage.setItem("carrito", JSON.stringify(carrito));

    Swal.fire({
      position: "top-end",
      title: 'Agregado al carrito',
      text: `${nombre} fue agregado por $${precio}`,
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    });
  });
});

function verCarrito() {
  if (carrito.length === 0) {
    Swal.fire({
      position: "top-end",
      title: 'Tu carrito está vacío',
      icon: 'info',
      confirmButtonText: 'OK'
    });
    return;
  }

  let htmlCarrito = "<ul style='text-align:left; padding-left:0'>";
  let total = 0;

  carrito.forEach((item, index) => {
    htmlCarrito += `
      <li style="margin-bottom: 10px; list-style: none;">
        <strong>${item.nombre}</strong> - $${item.precio}
        <button onclick="eliminarDelCarrito(${index})" style="margin-left:10px; background:red; color:white; border:none; border-radius:5px; padding:2px 6px; cursor:pointer;">❌</button>
      </li>`;
    total += item.precio;
  });

  htmlCarrito += `</ul><hr><strong>Total: $${total}</strong>`;

  Swal.fire({
    title: '🛍️ Tu carrito',
    html: htmlCarrito,
    showCancelButton: true,
    confirmButtonText: '🛒 Realizar compra',
    cancelButtonText: 'Seguir comprando',
    focusConfirm: false,
    preConfirm: () => {
      carrito = [];
      localStorage.removeItem("carrito");

      Swal.fire({
        title: '¡Compra realizada con éxito!',
        text: 'Gracias por tu compra. Pronto recibirás un correo con los detalles.',
        icon: 'success',
        confirmButtonText: 'Cerrar',
        position: "top-end",
        timer: 2500
      });
    }
  });
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  verCarrito();
}

function vaciarCarrito() {
  Swal.fire({
    title: '¿Vaciar carrito?',
    text: 'Esto eliminará todos los items del carrito.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, vaciar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = [];
      localStorage.removeItem("carrito");

      Swal.fire({
        title: 'Carrito vaciado',
        icon: 'success',
        position: "top-end",
        timer: 1500,
        showConfirmButton: false
      });
    }
  });
}

fetch("./js/tours.json")
  .then(response => response.json())
  .then(tours => {
    const container = document.getElementById("cards-tour");

    tours.forEach(tour => {
      const article = document.createElement("article");
      article.classList.add("box-cards-tour");
      article.innerHTML = `
        <img src="${tour.imagen}" alt="${tour.nombre}" class="img-cards-tour">
        <div>
          <h2 class="h2-card">${tour.nombre}</h2>
          ${tour.descripcion}
          <div class="enquire-price-area">
            <div class="enquire-button">
              <div><a href="contact.html">Enquire!</a></div>
              <p>
                Flight return<br>
                10 nights hotel 4 stars<br>
                Excursions included<br>
                Package for 2 person
              </p>
            </div>
            <div class="price-button">
              <p>
                <u>PRICE:</u><br><br>
                <span style="color: red; font-size: 25px">Now: $${tour.precio}</span>
              </p>
              <div>
                <a href="#" class="btn-book" data-nombre="${tour.nombre}" data-precio="${tour.precio}">Book NOW!</a>
              </div>
            </div>
          </div>
        </div>
      `;
      container.prepend(article);
    });

    document.querySelectorAll(".btn-book").forEach(btn => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        const nombre = this.dataset.nombre;
        const precio = parseFloat(this.dataset.precio);

        carrito.push({ nombre, precio });
        localStorage.setItem("carrito", JSON.stringify(carrito));

        Swal.fire({
          position: "top-end",
          title: 'Agregado al carrito',
          text: `${nombre} fue agregado por $${precio}`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      });
    });
  })
  .catch(error => {
    console.error("Error al cargar el tour desde JSON:", error);
  });
