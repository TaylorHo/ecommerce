<?php
header('Content-type: text/html; charset=utf-8');
define('HOST', '');
define('USUARIO', '');
define('SENHA', '');
define('DB', '');

$conexao = mysqli_connect(HOST, USUARIO, SENHA, DB) or die ('Não foi possível conectar');

?>