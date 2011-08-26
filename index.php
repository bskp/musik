<?php

$fh = opendir('sammlung/');

while ($dateiname = readdir($fh))
{
	if($dateiname=="." || $dateiname==".." || $dateiname==".htaccess") continue;
	
	$liste[] = $dateiname;
}

//print_r($liste);
?>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de" lang="de">
	<head>
	<style type="text/css">

	a {
		text-transform: uppercase;
		font-weight: bold;
		color: black;
		font-style: italic;
		font-size: 40px;
		font-family: "Bauer Bodoni", Bodoni, Georgia, "Times New Roman", Times, serif;
	}

	a:hover {
		font-style: normal;
		font-weight: bold;
	}

	body {
		padding-bottom: 2em;
		padding-top: 2em;
		margin-right: auto;
		margin-left: auto;
		width: 800px;
	}

	</style>
		<title>Faisez votre choix</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	</head>
	<body>
	
	<a href="bearbeiten.php">+bearbeiten ”proof of concept”</a></a><br />
		<?
		foreach ($liste as $item)
			echo '<a href="sammlung/'.$item.'">'.$item.'</a><br />';
		?>
	</body>
</html>