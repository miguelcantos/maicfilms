<?php
require_once '../LoginRegister/js/baseDatos.php';
$idBuscar = $_POST['id'];
$numero = $_POST['numero'];
$idusuario = $_COOKIE ["nombreCookie2"];

$sql1="SELECT * FROM valoraciones WHERE idUsu=$idusuario AND idPeli = $idBuscar";
$result1 = mysqli_query($conn,$sql1);

$i=0;
$rawdata=[];
$row = mysqli_fetch_array($result1);

if($row == null){
    $stmt = $conn->prepare("INSERT INTO valoraciones (idPeli, idUsu, visto) VALUES ( ?, ?, ?)");
    $stmt -> bind_param('sss', $idBuscar, $idusuario, $numero );
    $stmt -> execute();
    echo "Hemos creado tu valoracion";
}else{

  $sql="Update valoraciones Set visto=$numero WHERE idUsu=$idusuario AND idPeli=$idBuscar";
  $result = mysqli_query($conn,$sql);
  echo $result;

}
?>
