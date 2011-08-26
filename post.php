<?php

//xhtml->xml

$xml = new DOMDocument;
$xml->load('bearbeiten.php');

$xsl = new DOMDocument;
$xsl->load('xhtml-xml.xsl');

// Configure the transformer
$proc = new XSLTProcessor;
$proc->importStyleSheet($xsl); // attach the xsl rules

$liedXml = $proc->transformToXML($xml);


// Datei öffnen

/*
$henkel = fopen('sammlung/'.$_POST['datei'],'w');

fwrite($henkel, $_POST['xhtml']);
fclose($henkel);
*/

echo 'liedtitel: '.$_POST['datei'];

echo 'code: '.$liedXml;

?>