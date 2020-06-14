<?php
    // Datos de la base de datos
    $servidor = "localhost";
    $usuario = "root";
    $password = "";
    $basededatos = "proyectomaicfilms";

    $conn = new mysqli($servidor, $usuario, $password, $basededatos);

    // creación de la conexión a la base de datos con mysql_connect()
    $conexion = mysqli_connect( $servidor, $usuario, $password ) or die ("No se ha podido conectar al servidor");

    // Selección del a base de datos a utilizar
    $db = mysqli_select_db( $conexion, $basededatos ) or die ( "No se ha podido conectar a la base de datos" );


?>


                
