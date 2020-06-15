<?php
require_once 'baseDatos.php';

//datos informacion
$nombreUsu=$_POST['nombreUsu'];
$pass=$_POST['password'];


//Lanzar consultas
$sql = "SELECT idUsu, nombre, nomUsu, password FROM usuarios WHERE nomUsu = '$nombreUsu' and password='$pass'";

$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_array($result);

  if($row != null){
    $datoCookie= $row;
    $cookie_name="nombreCookie";
    $cookie_value = $datoCookie['nomUsu'];
    setcookie($cookie_name, $cookie_value, time() + (43200), "/");
    $cookie_name2="nombreCookie2";
    $cookie_value2 = $datoCookie['idUsu'];
    setcookie($cookie_name2, $cookie_value2, time() + (43200), "/");

    echo "Inicio de sesion correcto";

  }else{
      echo"Usuario o Password son incorrectos!";
  }

//mysqli_close($conn);

?>
