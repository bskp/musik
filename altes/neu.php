<?php

// Load the XML source
$xml = new DOMDocument;
$xml->load('neu.xml');

$xsl = new DOMDocument;
$xsl->load('neu.xsl');

// Configure the transformer
$proc = new XSLTProcessor;
$proc->importStyleSheet($xsl); // attach the xsl rules

$newXml = $proc->transformToXML($xml);
echo $newXml;

?>