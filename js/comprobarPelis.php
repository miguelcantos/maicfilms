<?php
require_once '../LoginRegister/js/baseDatos.php';
$idBuscar = $_POST['id'];
$idusuario = $_COOKIE ["nombreCookie2"];
//echo $idusuario;
//$numero = intval($idBuscar);

$sql = "SELECT * FROM valoraciones WHERE idUsu=2 AND idPeli = $idBuscar";

$result = mysqli_query($conn,$sql);
//$result2 = mysqli_fetch_array($result);

$i=0;
$rawdata=[];
while($row = mysqli_fetch_array($result)){
        $rawdata[] = $row;
        $i++;

}
echo json_encode($rawdata);
?>
