<?php

// Load the XML source
$xml = new DOMDocument;
$xml->load('lied.xml');

$xsl = new DOMDocument;
$xsl->load('../xml-xhtml.xsl');

// Configure the transformer
$proc = new XSLTProcessor;
$proc->importStyleSheet($xsl); // attach the xsl rules

$liedHtml = $proc->transformToXML($xml);
echo $liedHtml;

?>