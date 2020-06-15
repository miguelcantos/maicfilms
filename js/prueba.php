<?php
require_once '../LoginRegister/js/baseDatos.php';
$idBuscar = 862;
$numero = 1;
$idusuario = 3;

$sql1="SELECT * FROM valoraciones WHERE idUsu=$idusuario AND idPeli = $idBuscar";
$result1 = mysqli_query($conn,$sql1);

$i=0;
$rawdata=[];
$row = mysqli_fetch_array($result1);

if($row == null){
    $stmt = $conn->prepare("INSERT INTO valoraciones (idPeli, idUsu, fav) VALUES ( ?, ?, ?)");
    $stmt -> bind_param('sss', $idBuscar, $idusuario, $numero );
    $stmt -> execute();
?>
<script>
    alert("Hemos creado tu valoracion");
</script>
<?php
}else{

  $sql="Update valoraciones Set fav=$numero WHERE idUsu=$idusuario AND idPeli=$idBuscar";
  $result = mysqli_query($conn,$sql);
  echo $result;
}
?>
