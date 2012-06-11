<?php

if ($_POST['aktion'] == 'sichern'){
    // Load the XML source
    $xhtml = new DOMDocument;
    //$xhtml->loadXML('<div id="songsheet">'+$_POST['html']+'</div>');
    
    
    $source = $_POST['html'];
    // tweak xml-conformity
    $source = preg_replace("/<br>/", "<br />", $source);
    $source = preg_replace("/&nbsp;/", " ", $source);
    
    $xhtml->loadXML($source);
    
    $xsl = new DOMDocument;
    $xsl->load('xhtml-xml.xsl');
    
    // Configure the transformer
    $proc = new XSLTProcessor;
    $proc->importStyleSheet($xsl); // attach the xsl rules
    
    $liedXML = $proc->transformToXML($xhtml);
    
    
    $xmlFile = "sammlung/test.xml";
    $handle = fopen($xmlFile, 'w') or die("No Write Access");
    $stringData = "Floppy Jalopy\n";
    fwrite($handle, $stringData);
    
    //echo $liedXML;
}





?>