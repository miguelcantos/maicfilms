<?php
require_once 'baseDatos.php';

//datos informacion
$nombre=$_POST['nombre'];
$nombreUsu=$_POST['nombreUsu'];
$password=$_POST['password'];
$email=$_POST['email'];

//Lanzar consultas
$sql = "INSERT INTO usuarios (nombre,nomUsu,password,email) VALUES ('$nombre', '$nombreUsu', '$password', '$email')";

if (mysqli_query($conn, $sql)) {
      echo "Nuevo usuario creado correctamente";
} else {
    echo "Error:" . $sql . "<br>" . mysqli_error($conn);
}

//mysqli_close($conn);

?>
