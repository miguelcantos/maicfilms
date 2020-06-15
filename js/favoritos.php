<?php
require_once '../LoginRegister/js/baseDatos.php';
$idusuario = $_COOKIE ["nombreCookie2"];
//echo $idusuario;
//$numero = intval($idBuscar);

$sql = "SELECT * FROM valoraciones WHERE idUsu=$idusuario AND fav=1";

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
