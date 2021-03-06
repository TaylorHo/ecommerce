<?php
abstract class ClassConexao{
  protected function conectaDB() {
    try{
      $Con=new PDO("mysql:host=host;dbname=dbname", "user", "pass");
      return $Con;
    } catch (PDOException $Erro){
      echo $Erro->getMessage();
    }
  }
}

class ClassProdutos extends ClassConexao{

  public function exibeProdutos(){
    $BFetch=$this->conectaDB()->prepare("select * from tablename");
    $BFetch->execute();

    $J=[];
    $I=0;

    while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
      $J[$I]=[
        "id"=>$Fetch['id'],
        "titulo"=>$Fetch['titulo'],
        "foto"=>$Fetch['foto'],
        "preco"=>$Fetch['preco'],
        "detalhes"=>$Fetch['detalhes'],
        "categoria"=>$Fetch['categoria']
      ];

      $I++;
    }

    header("Access-Control-Allow-Origin:*");
    header("Content-type: application/json");

    echo json_encode($J);
  }
}

$Produtos=new ClassProdutos();
$Produtos->exibeProdutos();