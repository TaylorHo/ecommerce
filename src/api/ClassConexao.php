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