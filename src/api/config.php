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

class ClassConfig extends ClassConexao{

  public function listaConfig(){
    $BFetch=$this->conectaDB()->prepare("select * from tablename");
    $BFetch->execute();

    $J=[];
    $I=0;

    while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
      $J[$I]=[
        "tipo"=>$Fetch['tipo'],
        "valor"=>$Fetch['valor'],
        "extra"=>$Fetch['extra']
      ];

      $I++;
    }

    header("Access-Control-Allow-Origin:*");
    header("Content-type: application/json");

    echo json_encode($J);
  }
}

$Produtos=new ClassConfig();
$Produtos->listaConfig();