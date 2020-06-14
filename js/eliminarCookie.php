<?php
if(isset($_COOKIE ["nombreCookie"]) && isset($_COOKIE ["nombreCookie2"])){
    setcookie("nombreCookie", '',time() - (43200), "/");
    setcookie("nombreCookie2", '',time() - (43200), "/");
}

?>
