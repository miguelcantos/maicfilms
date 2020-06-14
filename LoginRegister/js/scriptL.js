function cambios(){
  console.log("Dentro de Cambios");
    var cambio = document.getElementById('cambio').innerText;
    var sub1 = document.getElementById('confirmar');
    var sub2 = document.getElementById('cambio');
    var divCampos = document.getElementById('divCampos');

    if(cambio == "Registrate"){
      divCampos.innerHTML=`
          <div class="form-group">
          <input type="text" class="form-control" placeholder="Nombre" id="nombreUsu" required>
          </div>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Nombre de usuario" id="nomUsu" required>
          </div>
          <div class="form-group">
            <input type="password" class="form-control" placeholder="********" id="pass" required>
          </div>
          <div class="form-group">
            <input type="email" class="form-control" placeholder="miguel@miguel.com" id="email" required>
          </div>`;

      sub1.innerText="Registrate";
      sub2.innerText="Iniciar Sesion";

    }else{
      divCampos.innerHTML=`
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Nombre de usuario" id="nomUsu" required>
          </div>
          <div class="form-group">
            <input type="password" class="form-control" placeholder="*****" id="pass" required>
          </div>`;

      sub1.innerText= "Iniciar Sesion";
      sub2.innerText= "Registrate";

    }
}

function consultas(){
        var boton = $('#confirmar').text();
        console.log(boton);

        if (boton == "Registrate") {
          console.log("Opcion Registro");
          var nombre = $('#nombreUsu').val();
          var nombreUsu = $('#nomUsu').val();
          var password = $('#pass').val();
          var email = $('#email').val();

          $.ajax({
              type: 'POST',
              url: "js/registrate.php",
              data: {
                   nombre:nombre,
                   nombreUsu:nombreUsu,
                   password:password,
                   email:email
              },
              success: function(resultado){
                  console.log(resultado);
                  if(resultado == "Nuevo usuario creado correctamente"){
                    location.reload();
                  }else{
                    alert("No te has registrado correctamente");
                  }


              }

          });

        } else {
          console.log("Opcion Iniciar Sesion");
          var nombreUsu = $('#nomUsu').val();
          var password = $('#pass').val();

          $.ajax({
              type: 'POST',
              url: "js/login.php",
              data: {
                   nombreUsu:nombreUsu,
                   password:password
              },
              success: function(resultado){
                  console.log(resultado);

                  if(resultado == "Inicio de sesion correcto"){
                      location.replace("../index.html");

                  }else{
                    alert("No has iniciado sesion CORRECTAMENTE");
                  }


              }

          });
        }


};


function init(){

    // Al iniciar la ventana
    //document.getElementById('confirmar').addEventListener("click",cambios);
    document.getElementById('cambio').addEventListener("click",cambios);
    //document.getElementById('confirmar').addEventListener("click",consultas);
    $("#confirmar").click(consultas);
}
window.onload=init;
