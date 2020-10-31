<?php 

date_default_timezone_set('America/Sao_Paulo');
header('Content-type: text/html; charset=utf-8');
session_start();
include_once( "conexao.php" );

$produtos = ( $_GET[ 'produtos' ] );
$tipo = ( $_GET[ 'entrega' ] );
$nome = ( $_GET[ 'nome' ] );
$tel = $_GET[ 'tel' ];
$cidade = $_GET['cidade'];
$rua = ( $_GET[ 'rua' ] );
$numero = ( $_GET[ 'numero' ] );
$ref = ( $_GET[ 'ref' ] );
$bairro = $_GET[ 'bairro' ];
$pagamento = $_GET['pagamento'];
$total = $_GET[ 'total' ];
$troco = $_GET['troco'];
$contato = $_GET['contato'];

$partes = explode(",", $produtos);
$count = count($partes);
if($count == 1){
  list($produto_titulo, $produto_quant, $produto_preco, $produto_obs) = explode(":", $partes[0]);
  $produto = $produto_quant . 'X ' . $produto_titulo . ' --> R$' . $produto_preco . ' Obs: ' . $produto_obs;
} else if ($count > 1){
  $produto = '';
  for($i = 0; $i < $count; $i++){
    list($produto_titulo, $produto_quant, $produto_preco, $produto_obs) = explode(":", $partes[$i]);
    if($produto == ''){
      $produto = $produto_quant . 'X ' . $produto_titulo . ' --> R$' . $produto_preco . ' Obs: ' . $produto_obs;
    } else {
      $produto = $produto . ' | ' . $produto_quant . 'X ' . $produto_titulo . ' --> R$' . $produto_preco . ' Obs: ' . $produto_obs;
    }
  }
}

if($tipo == 'receber'){
  if($ref == ''){
    $endereco = 'Rua: ' . $rua . ', ' . $numero . ' | ' . $cidade . ', ' . 'Bairro - ' . $bairro;
  } else {
    $endereco = 'Rua: ' . $rua . ', ' . $numero . ' | ' . $cidade . ', ' . 'Bairro - ' . $bairro . ' | ' . 'Referência: ' . $ref;
  }
  if($pagamento == 'dinheiro'){
    if($troco == ''){
      $pagamento_troco = $pagamento;
    } else {
      $pagamento_troco = $pagamento . ' (R$' . $troco . ')';
    }
  } else {
    $pagamento_troco = 'Cartão de ' . $pagamento;
  }
} else {
  $endereco = 'Retirar no Estabelecimento';
  $pagamento_troco = 'No estabelecimento';
}

$ultimo_id = "SELECT MAX(ID) FROM restaurante_compras";
$query_id = mysqli_query($conexao, $ultimo_id) or die ("Impossível encontrar IDs no banco de dados");
$fetch_id = mysqli_fetch_array($query_id);
$id = (int)$fetch_id[0];
$id = $id + 1;

$codigo = hash('crc32', $id);

$sql = "INSERT INTO restaurante_compras (id, codigo, tipo, nome, telefone, endereco, produtos, total, pagamento) VALUES ('', '$codigo', '$tipo', '$nome', '$tel', '$endereco', '$produto', '$total', '$pagamento_troco')";
mysqli_query($conexao, $sql) or die ("Não foi possível cadastrar a compra");

// MENSAGEM DO WHATS
$topo = '%F0%9F%93%8C%20Pedido%20' . $id;
$espaco = '%0A%0A';
$pro = '';
$p = explode("|", $produto);
$p_count = count($p);
if($p_count == 1){
  $pro = $p[0];
} else if ($p_count > 1){
  for($i = 0; $i < $count; $i++){
    if($pro == ''){
      $pro = $p[0];
    } else {
      $pro = $pro . '%0A' . $p[$i];
    }
  }
}

$replace = str_replace('Obs:', '%0A%20%20%20-%20%2AObs%3A%2A%20', $pro);

$separador = '--------------';
$total_pedido = '%2ATotal%20do%20Pedido%3A%20R%24%20' . $total . '%2A';
$dados = '%F0%9F%91%A4%20' . $nome . '%0A%F0%9F%93%9E%20' . $tel . '%0A%F0%9F%93%8D%20' . $endereco;

$mensagem = 'https://api.whatsapp.com/send/?phone=' . $contato . '&text=' . $topo . $espaco . $replace . $espaco . $separador . '%0A' . $total_pedido . '%0A%F0%9F%92%B5%20Pagamento%3A%20' . ucfirst($pagamento_troco) . $espaco . '%2ACliente%3A%2A' . '%0A' . $separador . '%0A' . $dados;

header("location: $mensagem");
?>