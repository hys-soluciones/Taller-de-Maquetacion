/* Utilizamos la tecnica de funciones anonimas auto ejecutables*/
/* ********** Menu ********** */

/* ************************************ */
/* Version Movil */
/* ********** Menu ********** */
((d) => {
  /* llamamos el menu-btn con querySel.. y lo guardamos en 
esta variable btnMenu */
  const $btnMenu = d.querySelector(".menu-btn"),
    $menu = d.querySelector(".menu");
  /* Programamos el evento */
  $btnMenu.addEventListener("click", (e) => {
    /* Dentro del boton del menu que esta en la variable btnMenu al primer elemento hijo que en este caso es el svg de las barras, entra a su lista de clases e intercambia la clase none*/
    $btnMenu.firstElementChild.classList.toggle("none");
    /* Dentro del boton del menu que esta en la 
variable btnMenu el ultimo elemento hijo que 
en este caso es el svg de la X, entra a 
su lista de clases e intercambia la clase 
none*/
    $btnMenu.lastElementChild.classList.toggle("none");
    /* Dentro del boton del menu que esta en la 
variable btnMenu su lista de clases e intercambia la clase is-active, que permite mostrar u ocultar la lista del menu
*/
    $menu.classList.toggle("is-active");
  });
  /* Tecnica de la delegacion de eventos */
  /* Designamos el clik a un elemento superior en este caso el document*/
  d.addEventListener("click", (e) => {
    /* si el elemento que origino el clik no es un enlace dentro del menu retorna false */
    if (!e.target.matches(".menu a")) return false;
    /* Pero si lo es retorna lo siguiente */
    $btnMenu.firstElementChild.classList.remove(
      "none"
    ); /* Al svg barras quitale la clase none */
    $btnMenu.lastElementChild.classList.add(
      "none"
    ); /* Al svg de la X ponle la clase none */
    $menu.classList.remove(
      "is-active"
    ); /* y quitale is-active para que desaparesca el menu */
  });
})(document);

/* ********** ContactForm ********** */
((d) => {
  const $form = d.querySelector(".contact-form"),
    $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contact-form-response");

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    $loader.classList.remove("none");
    fetch("https://formsubmit.co/ajax/your@email.com", {
      method: "POST",
      body: new FormData(e.target),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
        location.hash = "#gracias";
        $form.reset();
      })
      .catch((err) => {
        console.log(err);
        let message =
          err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
        $response.querySelector(
          "h3"
        ).innerHTML = `Error ${err.status}: ${message}`;
      })
      .finally(() => {
        $loader.classList.add("none");
        setTimeout(() => {
          location.hash = "#close";
        }, 3000);
      });
  });
})(document);
