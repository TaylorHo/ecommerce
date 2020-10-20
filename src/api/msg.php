<?php 

// ?produtos=1:Produto%2001:1:19.50:,2:Produto%2002:1:19.50:&nome=Taylor%20Hoffmann&tel=51989582215&cidade=Morro%20Reuter&rua=Rua%20Nova%20Esperan%C3%A7a&ref=Refer%C3%AAncia&bairro=Batatenthal&pagamento=dinheiro&entrega=receber&total=41.00&troco=20

date_default_timezone_set('America/Sao_Paulo');
header('Content-type: text/html; charset=utf-8');
session_start();
include_once( "conexao.php" );

$produtos = ( $_GET[ 'produtos' ] );
$nome = ( $_GET[ 'nome' ] );
$tel = $_GET[ 'tel' ];
$cidade = $_GET['cidade'];
$rua = ( $_GET[ 'rua' ] );
$ref = ( $_GET[ 'ref' ] );
$bairro = $_GET[ 'bairro' ];
$pagamento = $_GET['pagamento'];
$entrega = ( $_GET[ 'entrega' ] );
$total = $_GET[ 'total' ];
$troco = $_GET['troco'];

echo $produtos;
?>