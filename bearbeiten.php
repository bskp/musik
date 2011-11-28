<?php

if (!$_GET) $titel = 'fribourg, mon amour.xml';
else $titel = $_GET['lied'];

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
	</head>
	<body>
	<div id="menu">
		<a href="#" onclick="UI.sichern();" title="Sichern" class="button" accesskey="s"><img src="img/accept.png" /></a>
		<a href="#" title="Verwerfen" onclick="UI.verwerfen();" class="button" accesskey="x"><img src="img/cancel.png" /></a>
		<a href="#" onclick="UI.bearbeiten( $(this) );" title="Text bearbeiten" class="button" id="editButton" accesskey="e"><img src="img/edit.png" /></a>
	</div>
	<div id="darstellung">
		<a href="#" onclick"UI.scrollen();" title"Autoscroll" class="button" accesskey="a">Autoscroll</a>
		<select name="transpose" onchange="UI.transponieren()" id="transpose" size="1">
		     <option value="6">- Tritonus</option>
		     <option value="7">- Quarte</option>
		     <option value="8">- Grosse Terz</option>
		     <option value="9">- Kleine Terz</option>
		     <option value="10">- 1 Ganzton</option>
		     <option value="11">- 1 Halbton</option>
		     <option value="0" selected="selected">Originaltonart</option>
		     <option value="1">+ 1 Halbton</option>
		     <option value="2">+ 1 Ganzton</option>
		     <option value="3">+ Kleine Terz</option>
		     <option value="4">+ Grosse Terz</option>
		     <option value="5">+ Quarte</option>
		     <option value="6">+ Tritonus</option>
		   </select></h3>
	</div>
	<div id="werkzeuge">
		<a href="#" id="minus" class="button"><img src="img/minus.png" /></a>
		<a href="#" onclick="UI.plus();" id="plus" class="button"><img src="img/plus.png" /></a>
		<div id="akkordListe"></div>
	</div>
	<div id="markup">
		<p><span>(</span>Akkord<span>)</span></p>
		<p><span>#</span> Strophe</p>
		<p><span>B</span> Bridge</p>
		<p><span>R</span> Refrain</p>
		<p><span>{</span>Notiz<span>}</span></p>
	</div>
	<div id="dialog"><?php include('dialoge.php'); ?></div>
	<div id="tipp"><?php include('tipps.php'); ?></div>
	
	<div id="ausXML"><?=$liedHtml?></div>
	</body>
</html>