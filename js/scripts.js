const peliApi = "https://api.themoviedb.org/3/search/movie?api_key=44cf37b45eec4ba388f87fa29194c3e1&language=es-ES&query=";
const peliImg = "https://image.tmdb.org/t/p/w300/"

function init() {
  // Al iniciar la ventana
  document.getElementById('cerrarSesion').addEventListener("click", borrarCookie);
  document.getElementById('iniciarSesion').addEventListener("click", iniciarSesion);
  //document.querySelector(`input[type="button"]`).addEventListener("click",buscar);
  document.getElementById('search').addEventListener("click", buscar);
  document.getElementById('MeGusta').addEventListener("click", favoritos);
  cargarTendencias();
  comprobarBotones();

}

function cookie(nombre) {

  let corte = document.cookie.split(nombre + "=")[1];
  let cookie;
   if(corte !== undefined){

     if(corte.indexOf(';') !== -1) {
        cookie = corte.substring(0, corte.indexOf(';'));
      }else{
        cookie = corte.substring(0, corte.length);
      }
      return cookie;
  }
}

function buscar() {
  $.ajax({
    url: 'js/comprobarCookie.php',
    success: function(data) {
      if (data == "no") {
        noLogin();

      } else {
        siLogin();
      }

    }
  });

}

function favoritos() {
  $.ajax({
    url: 'js/comprobarCookie.php',
    success: function(data) {
      if (data == "no") {
        alert("Tienes que estar registrado");
        comprobarBotones();

      } else {
        $.ajax({
          url: 'js/favoritos.php',
          success: function(data) {
            //console.log(JSON.parse(data));
            var bd = JSON.parse(data);
            bd.forEach(peli => {
              //console.log("0",peli)
              var urlPeli ="https://api.themoviedb.org/3/movie/"+peli.idPeli+"?api_key=44cf37b45eec4ba388f87fa29194c3e1&language=es-ES";

              var tituloDiv = document.getElementById("tituloDiv");
              tituloDiv.innerText = "MI LISTA";
              var div = document.getElementById("cuadrados");
              div.innerHTML = '';
              var divD = document.getElementById("paraDatos");
              divD.innerHTML = '';

              //fetch para recorrer la llamada a la api para recorrer y obtener las peliculas
              fetch(urlPeli).then(response => {
                return response.json();

              }).then(pelicula => {
                  //console.log("1", pelicula)
                  var titulo = pelicula.original_title;
                  var img = peliImg + pelicula.poster_path;
                  var sinopsi = pelicula.overview;
                  var lanzamiento = pelicula.release_date;
                  var votacion = pelicula.vote_average;
                  var id = pelicula.id;
                  var divCuadrados = document.getElementById("cuadrados");
                  var actores = "";
                  var genero = pelicula.genres;

                  divCuadrados.innerHTML += `<div class="col-lg-4 col-sm-6 mb-4">
                  <div class="portfolio-item">
                    <a class="portfolio-link" data-toggle="modal" href="#portfolioModal` + id + `">
                      <div class="portfolio-hover">
                        <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                      </div>
                      <img class="img-fluid" src="` + peliImg + pelicula.poster_path + `" alt="" />
                    </a>
                    <div class="portfolio-caption">
                      <div class="portfolio-caption-heading">` + pelicula.original_title + `</div>
                      <div class="portfolio-caption-subheading text-muted">` + pelicula.vote_average + `</div>
                    </div>
                  </div>
                </div>`;

                  const datosF = "https://api.themoviedb.org/3/movie/" + pelicula.id + "/credits?api_key=44cf37b45eec4ba388f87fa29194c3e1";

                  fetch(datosF).then(response => {
                    return response.json();

                  }).then(respuesta => {
                    respuesta.cast.forEach(actor => {
                      actores += actor.name + "-" + actor.character + ",";

                    });

                  }).then(() => {

                      divD.innerHTML += portafolio(id, titulo, img, sinopsi, actores, lanzamiento, genero);

                    })

                });

              });


          }
        });

      }

    }
  });

}

//funcion de buscar cuando el usuario no esta con la sesion iniciada
function noLogin() {
  const nombre = document.getElementById("nomPelicula").value;
  //eleccion para ver si cargo tendencias o el usuario esta en busca de alguna pelicula especifica
  if (nombre == "") {
    cargarTendencias();
  } else {
    var tituloDiv = document.getElementById("tituloDiv");
    tituloDiv.innerText = nombre;
    const nombreF = nombre.split(' ').join('+');
    var div = document.getElementById("cuadrados");
    div.innerHTML = '';
    var divD = document.getElementById("paraDatos");
    divD.innerHTML = '';
    const buscar = peliApi + nombreF;
    //fetch para recorrer la llamada a la api para recorrer y obtener las peliculas
    fetch(buscar).then(response => {
      return response.json();

    }).then(respuesta => {
      console.log(respuesta);

      respuesta.results.forEach(pelicula => {
        if(pelicula.poster_path != null){

        var titulo = pelicula.original_title;
        var img = peliImg + pelicula.poster_path;
        var sinopsi = pelicula.overview;
        var lanzamiento = pelicula.release_date;
        var votacion = pelicula.vote_average;
        var id = pelicula.id;
        var divCuadrados = document.getElementById("cuadrados");
        var actores = "";

        var idGenero = pelicula.genre_ids[0];
        //console.log(idGenero);
        divCuadrados.innerHTML += `<div class="col-lg-4 col-sm-6 mb-4">
    <div class="portfolio-item">
      <a class="portfolio-link" data-toggle="modal" href="#portfolioModal` + id + `">
        <div class="portfolio-hover">
          <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
        </div>
        <img class="img-fluid" src="` + peliImg + pelicula.poster_path + `" alt="" />
      </a>
      <div class="portfolio-caption">
        <div class="portfolio-caption-heading">` + pelicula.original_title + `</div>
        <div class="portfolio-caption-subheading text-muted">` + pelicula.vote_average + `</div>
      </div>
    </div>
  </div>`;

        const datosF = "https://api.themoviedb.org/3/movie/" + pelicula.id + "/credits?api_key=44cf37b45eec4ba388f87fa29194c3e1";
        const datosG = "https://api.themoviedb.org/3/genre/movie/list?api_key=44cf37b45eec4ba388f87fa29194c3e1&language=es-ES";
        var genero = "";

        fetch(datosF).then(response => {
          return response.json();

        }).then(respuesta => {
          respuesta.cast.forEach(actor => {
            actores += actor.name + "-" + actor.character + ",";

          });

        }).then(() => {
          fetch(datosG).then(response => {
            return response.json();

          }).then(respuesta => {
            respuesta.genres.forEach(gen => {
              if (gen.id == idGenero) {
                genero = gen.name;
                //console.log(genero);
              }
            });

          }).then(() => {
            divD.innerHTML += `
     <div class="portfolio-modal modal fade" id="portfolioModal` + id + `" tabindex="-1" role="dialog" aria-hidden="true">
       <div class="modal-dialog">
         <div class="modal-content">
           <!--<div class="close-modal" data-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>-->
           <div class="container">
             <div class="row justify-content-center">
               <div class="col-lg-8">
                 <div class="modal-body">
                   <h2 class="text-uppercase">` + titulo + `</h2>
                   <img class="img-fluid" src="` + img + `" alt="" />
                   <p>` + sinopsi + `</p>
                   <p>` + actores + `</p>
                   <ul class="list-inline">
                     <li>Fecha de lanzamiento: ` + lanzamiento + `</li>
                     <li>Genero: ` + genero + `</li>
                     <li>ID: ` + id + `</li>
                   </ul>
                   <button class="btn btn-primary" data-dismiss="modal" type="button"><i class="fas fa-times mr-1"></i>Close Project</button>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
     `;
          })
        });


      }
      });

    });
  }
}

function comprobarBotones() {
  $.ajax({
    url: 'js/comprobarCookie.php',
    success: function(data) {
      if (data == "no") {
        console.log("no sesion iniciada");
        document.getElementById('cerrarSesion').disabled = true;
        document.getElementById('MeGusta').disabled = true;
        document.getElementById('saludo').innerText = "MAICFILMS";

      } else {
        document.getElementById('iniciarSesion').disabled = true;
        document.getElementById('cerrarSesion').disabled = false;
        document.getElementById('MeGusta').disabled = false;
        var nombre = cookie("nombreCookie");
        document.getElementById('saludo').innerText = nombre;
      }

    }
  });

}
//funcion de buscar cuando el usuario esta con la sesion iniciada

function siLogin() {

  const nombre = document.getElementById("nomPelicula").value;
  //eleccion para ver si cargo tendencias o el usuario esta en busca de alguna pelicula especifica
  if (nombre == "") {
    cargarTendencias();

  } else {
    var tituloDiv = document.getElementById("tituloDiv");
    tituloDiv.innerText = nombre;
    const nombreF = nombre.split(' ').join('+');
    var div = document.getElementById("cuadrados");
    div.innerHTML = '';
    var divD = document.getElementById("paraDatos");
    divD.innerHTML = '';
    const buscar = peliApi + nombreF;

    //fetch para recorrer la llamada a la api para recorrer y obtener las peliculas
    fetch(buscar).then(response => {
      return response.json();

    }).then(respuesta => {
      //console.log(respuesta);

      respuesta.results.forEach(pelicula => {
        if(pelicula.poster_path != null){
        var titulo = pelicula.original_title;
        var img = peliImg + pelicula.poster_path;
        var sinopsi = pelicula.overview;
        var lanzamiento = pelicula.release_date;
        var votacion = pelicula.vote_average;
        var id = pelicula.id;
        var divCuadrados = document.getElementById("cuadrados");
        var actores = "";
        var idGenero = pelicula.genre_ids[0];

        divCuadrados.innerHTML += `<div class="col-lg-4 col-sm-6 mb-4">
        <div class="portfolio-item">
          <a class="portfolio-link" data-toggle="modal" href="#portfolioModal` + id + `">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
            </div>
            <img class="img-fluid" src="` + peliImg + pelicula.poster_path + `" alt="" />
          </a>
          <div class="portfolio-caption">
            <div class="portfolio-caption-heading">` + pelicula.original_title + `</div>
            <div class="portfolio-caption-subheading text-muted">` + pelicula.vote_average + `</div>
          </div>
        </div>
      </div>`;

        const datosF = "https://api.themoviedb.org/3/movie/" + pelicula.id + "/credits?api_key=44cf37b45eec4ba388f87fa29194c3e1";
        const datosG = "https://api.themoviedb.org/3/genre/movie/list?api_key=44cf37b45eec4ba388f87fa29194c3e1&language=es-ES";
        var genero = "";

        fetch(datosF).then(response => {
          return response.json();

        }).then(respuesta => {
          respuesta.cast.forEach(actor => {
            actores += actor.name + "-" + actor.character + ",";

          });

        }).then(() => {

          fetch(datosG).then(response => {
            return response.json();

          }).then(respuesta => {
            respuesta.genres.forEach(gen => {
              if (gen.id == idGenero) {
                genero = gen.name;
                //console.log(genero);
              }
            });

          }).then(() => {

            divD.innerHTML += portafolio(id, titulo, img, sinopsi, actores, lanzamiento, genero);

          })

        });
      }
      });

    });

  }

  //evento para el boton
}



function portafolio(id, titulo, img, sinopsi, actores, lanzamiento, genero) {
  var claseLike = "noLike btn btn-primary";
  var claseVer = "noVer btn btn-primary";
  var solucion = "";
  $.ajax({
    type: 'POST',
    url: 'js/comprobarPelis.php',
    data: {
      id: id
    },
    success: function(data) {
      var bd = JSON.parse(data);
      let peli;
      //console.log(bd);
      if (bd.length > 0) {
        peli = bd[0];
        //console.log(JSON.parse(data));
        //console.log(peli);
        if (peli.fav == "1" && peli.visto == "1") {
          //console.log("1-1");
          claseLike = "like btn btn-primary";
          claseVer = "ver btn btn-primary";
          //console.log(claseLike + "," + claseVer);
        } else if (peli.fav == "1") {
          //console.log("1-0");
          claseLike = "like btn btn-primary";
          claseVer = "noVer btn btn-primary";
        } else if (peli.visto == "1") {
          //console.log("0-1");

          claseLike = "noLike btn btn-primary";
          claseVer = "ver btn btn-primary";
        } else {
          //console.log("0-0");

          claseLike = "noLike btn btn-primary";
          claseVer = "noVer btn btn-primary";
        }

      } else {
        //console.log("fuera");
        claseLike = "noLike btn btn-primary";
        claseVer = "noVer btn btn-primary";
      }

    }
  });

  solucion = `
  <div class="portfolio-modal modal fade" id="portfolioModal` + id + `" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog">
  <div class="modal-content">
  <!--<div class="close-modal" data-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>-->
  <div class="container">
  <div class="row justify-content-center">
  <div class="col-lg-8">
  <div class="modal-body">
    <h2 class="text-uppercase">` + titulo + `</h2>
    <img class="img-fluid" src="` + img + `" alt="" />
    <p>` + sinopsi + `</p>
    <p>` + actores + `</p>
    <ul class="list-inline">
      <li>Fecha de lanzamiento: ` + lanzamiento + `</li>
      <li>Genero: ` + genero + `</li>
      <li>ID: ` + id + `</li>
    </ul>
    <button id="` + id + `" onclick="cambiarLike(` + id + `)" class="` + claseLike + `" type="button"><i class="fa fa-heart"></i></button>
    <button id="` + id + `ver"  onclick="cambiarVer(` + id + `)" class="` + claseVer + `" type="button"><i class="fa fa-eye"></i></button>
    <button class="btn btn-primary" data-dismiss="modal" type="button"><i class="fas fa-times mr-1"></i>Close Project</button>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  `;
  return solucion;


}
//metodo para hacer la llamada para marcar una pelicula si la quiero marcar en favorito
function cambiarLike(id) {
  var botonLike = document.getElementById(id);

  if (botonLike.className == "noLike btn btn-primary") {
    var numero = 1;
    $.ajax({
      type: 'POST',
      url: 'js/cambiarLike.php',
      data: {
        numero: numero,
        id: id
      },
      success: function(result) {
        if (result.trim() == 1) {
          botonLike.className = "like btn btn-primary"
        }
      }

    });

  } else {
    var numero = 0;
    $.ajax({
      type: 'POST',
      url: 'js/cambiarLike.php',
      data: {
        numero: numero,
        id: id
      },
      success: function(result) {
        if (result.trim() == 1) {
          botonLike.className = "noLike btn btn-primary"
        }
      }

    });
  }

}

//metodo para hacer la llamada para marcar una pelicula si la he visto
function cambiarVer(id) {
  var botonLike = document.getElementById(id + "ver");
  //console.log(botonLike);
  if (botonLike.className == "noVer btn btn-primary") {
    var numero = 1;
    $.ajax({
      type: 'POST',
      url: 'js/cambiarVer.php',
      data: {
        numero: numero,
        id: id
      },
      success: function(result) {
        if (result.trim() == 1) {
          botonLike.className = "ver btn btn-primary"
        }
      }

    });

  } else {
    var numero = 0;
    $.ajax({
      type: 'POST',
      url: 'js/cambiarVer.php',
      data: {
        numero: numero,
        id: id
      },
      success: function(result) {
        if (result.trim() == 1) {
          botonLike.className = "noVer btn btn-primary"
        }
      }

    });
  }

}


//esta funcion tiene la funcionabilidad de cargar las tendencias al arrancar las paginas y de cargar las tendencias al no buscar ninguna palabra
function cargarTendencias() {
  var tituloDiv = document.getElementById("tituloDiv");
  tituloDiv.innerText = "TENDENCIAS"
  var tendencias = "https://api.themoviedb.org/3/trending/all/day?api_key=44cf37b45eec4ba388f87fa29194c3e1&language=es-ES";

  $.ajax({
    url: 'js/comprobarCookie.php',
    success: function(data) {
      if (data == "no") {

        var div = document.getElementById("cuadrados");
        div.innerHTML = '';
        var divD = document.getElementById("paraDatos");
        divD.innerHTML = '';

        fetch(tendencias).then(response => {
          return response.json();

        }).then(respuesta => {
          //console.log(respuesta);

          respuesta.results.forEach(pelicula => {

            var titulo = "";
            if (!pelicula.original_title) {
              titulo = pelicula.name;
            } else {
              titulo = pelicula.original_title;
            }

            var img = peliImg + pelicula.poster_path;
            var sinopsi = pelicula.overview;
            var lanzamiento = pelicula.release_date;
            var votacion = pelicula.vote_average;
            var id = pelicula.id;
            var divCuadrados = document.getElementById("cuadrados");
            var actores = "";
            var idGenero = pelicula.genre_ids[0];
            //console.log(idGenero);

            divCuadrados.innerHTML += `<div class="col-lg-4 col-sm-6 mb-4">
          <div class="portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal` + id + `">
              <div class="portfolio-hover">
                <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
              </div>
              <img class="img-fluid" src="` + peliImg + pelicula.poster_path + `" alt="" />
            </a>
            <div class="portfolio-caption">
              <div class="portfolio-caption-heading">` + titulo + `</div>
              <div class="portfolio-caption-subheading text-muted">` + votacion + `</div>
            </div>
          </div>
        </div>`;

            const datosF = "https://api.themoviedb.org/3/movie/" + pelicula.id + "/credits?api_key=44cf37b45eec4ba388f87fa29194c3e1";
            const datosG = "https://api.themoviedb.org/3/genre/movie/list?api_key=44cf37b45eec4ba388f87fa29194c3e1&language=es-ES";
            var genero = "";

            fetch(datosF).then(response => {
              return response.json();

            }).then(respuesta => {
              respuesta.cast.forEach(actor => {
                actores += actor.name + "-" + actor.character + ",";

              });

            }).then(() => {
              fetch(datosG).then(response => {
                return response.json();

              }).then(respuesta => {
                respuesta.genres.forEach(gen => {
                  if (gen.id == idGenero) {
                    genero = gen.name;
                    //console.log(genero);
                  }
                });

              }).then(() => {
                divD.innerHTML += `
           <div class="portfolio-modal modal fade" id="portfolioModal` + id + `" tabindex="-1" role="dialog" aria-hidden="true">
             <div class="modal-dialog">
               <div class="modal-content">
                 <!--<div class="close-modal" data-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>-->
                 <div class="container">
                   <div class="row justify-content-center">
                     <div class="col-lg-8">
                       <div class="modal-body">
                         <h2 class="text-uppercase">` + titulo + `</h2>
                         <img class="img-fluid" src="` + img + `" alt="" />
                         <p>` + sinopsi + `</p>
                         <p>` + actores + `</p>
                         <ul class="list-inline">
                           <li>Fecha de lanzamiento: ` + lanzamiento + `</li>
                           <li>Genero: ` + genero + `</li>
                           <li>ID: ` + id + `</li>

                         </ul>
                         <button class="btn btn-primary" data-dismiss="modal" type="button"><i class="fas fa-times mr-1"></i>Close Project</button>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
           `;
              })
            });


/////////////////////////////
          });

        });
      } else {
        var div = document.getElementById("cuadrados");
        div.innerHTML = '';
        var divD = document.getElementById("paraDatos");
        divD.innerHTML = '';

        fetch(tendencias).then(response => {
          return response.json();

        }).then(respuesta => {
          //console.log(respuesta);

          respuesta.results.forEach(pelicula => {

            var titulo = "";
            if (!pelicula.original_title) {
              titulo = pelicula.name;
            } else {
              titulo = pelicula.original_title;
            }

            var img = peliImg + pelicula.poster_path;
            var sinopsi = pelicula.overview;
            var lanzamiento = pelicula.release_date;
            var votacion = pelicula.vote_average;
            var id = pelicula.id;
            var divCuadrados = document.getElementById("cuadrados");
            var actoress = " ";
            var idGenero = pelicula.genre_ids[0];
            //console.log(idGenero);

            divCuadrados.innerHTML += `<div class="col-lg-4 col-sm-6 mb-4">
          <div class="portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal` + id + `">
              <div class="portfolio-hover">
                <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
              </div>
              <img class="img-fluid" src="` + peliImg + pelicula.poster_path + `" alt="" />
            </a>
            <div class="portfolio-caption">
              <div class="portfolio-caption-heading">` + titulo + `</div>
              <div class="portfolio-caption-subheading text-muted">` + votacion + `</div>
            </div>
          </div>
        </div>`;

            const datosF = "https://api.themoviedb.org/3/movie/" + pelicula.id + "/credits?api_key=44cf37b45eec4ba388f87fa29194c3e1";
            const datosG = "https://api.themoviedb.org/3/genre/movie/list?api_key=44cf37b45eec4ba388f87fa29194c3e1&language=es-ES";
            var genero = "";

            fetch(datosF).then(response => {
              return response.json();

            }).then(respuesta => {

                respuesta.cast.forEach(actor => {

                  actoress += actor.name + "-" + actor.character + ",";

                });

            }).then(() => {
              fetch(datosG).then(response => {
                return response.json();

              }).then(respuesta => {
                respuesta.genres.forEach(gen => {
                  if (gen.id == idGenero) {
                    genero = gen.name;
                    //console.log(genero);
                  }
                });

              }).then(() => {
                divD.innerHTML += portafolio(id, titulo, img, sinopsi, actoress, lanzamiento, genero);;

              });
            });



          });

        });

        //////////////
      }

    }
  });

}

function borrarCookie() {
  $.ajax({
    url: 'js/eliminarCookie.php',
    success: function(data) {
      console.log('Cookie eliminada');
      document.getElementById('cerrarSesion').disabled = true;
      document.getElementById('MeGusta').disabled = true;
      document.getElementById('iniciarSesion').disabled = false;
      document.getElementById('saludo').innerText = "MAICFILMS";
    }
  });
}

function iniciarSesion() {
  $.ajax({
    url: 'js/comprobarCookie.php',
    success: function(data) {
      //console.log(data);
      if (data == "no") {
        location.replace("LoginRegister/index.html");

      } else {
        console.log("Ya tienes sesion iniciada");
      }

    }
  });
}


window.onload = init;
