<?php

if(isset($_GET) && isset($_GET['txt'])){
    echo $json;
    $somecontent = $_GET['txt'];
    
    $file = 'export.json';
    // Ouvre un fichier pour lire un contenu existant
    //$current = file_get_contents($file);
    // Ajoute une personne
    $json = json_encode($_GET['txt']);
    // Écrit le résultat dans le fichier
    echo $json;
    file_put_contents($file, $_GET['txt']);
}

?>