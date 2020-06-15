<?php
require_once '../LoginRegister/js/baseDatos.php';
$pass = "12345";
$numero = 1;
$nombreUsu = "jc";

$sql = "SELECT idUsu, nombre, nomUsu, password FROM usuarios WHERE nomUsu = '$nombreUsu' and password='$pass'";
$result = mysqli_query($conn,$sql);

$i=0;
$rawdata=[];
$row = mysqli_fetch_array($result);

if($row != null){
    echo "Sesion INICIADA";
}else{
  echo "sesion no iniciada";

}

?>
