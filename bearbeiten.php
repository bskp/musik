<?php

$titel = 'fribourg, mon amour.xml';
//$titel = 'lours.xml';


// Load the XML source
$xml = new DOMDocument;
$xml->load('sammlung/'.$titel);

$xsl = new DOMDocument;
$xsl->load('xml-xhtml.xsl');

// Configure the transformer
$proc = new XSLTProcessor;
$proc->importStyleSheet($xsl); // attach the xsl rules

$liedHtml = $proc->transformToXML($xml);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de" lang="de">
	<head>
		<title>Bearbeite ”<?=$titel?>”</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link href="bearbeiten.css" rel="stylesheet" type="text/css" />
		<script src="lib/jquery.js"></script>
		<script src="lib/jqueryUI.js"></script>
		<script src="lib/Hyphenator.js"></script>
		<script src="lib/patterns/de.js" type="text/javascript"></script>
		<script src="bearbeiten.js"></script>
		<script src="dialoge.js"></script>
	</head>
	<body>
	<div id="menu">
		<a href="#" onclick="sichern();" title="Sichern" class="button" accesskey="s"><img src="img/accept.png" /></a>
		<a href="#" title="Verwerfen" onclick="verwerfen();" class="button" accesskey="x"><img src="img/cancel.png" /></a>
		<a href="#" onclick="if ($(this).hasClass('active')){parseLyrics();} else {editLyrics();} $(this).toggleClass('active');" title="Text bearbeiten" class="button" id="editButton" accesskey="e"><img src="img/edit.png" /></a>
	</div>
	<div id="werkzeuge">
		<a href="#" class="button"><img src="img/minus.png" /></a>
		<a href="#" class="button"><img src="img/plus.png" /></a>
		<div id="akkordListe"></div>
	</div>
	<div id="tipps">
		<p><span>(</span>Akkord<span>)</span></p>
		<p><span>#</span> Strophe</p>
		<p><span>B</span> Bridge</p>
		<p><span>R</span> Refrain</p>
		<p><span>{</span>Notiz<span>}</span></p>
	</div>
	<div id="dialog"><?php include('dialoge.php'); ?></div>
	
	<?=$liedHtml?>
	</body>
</html>