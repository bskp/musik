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
		<title>Akkordbüechli</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link href="akkordbuechli.css" rel="stylesheet" type="text/css" />
	</head>
	<body>
	<h1>Akkordbüechli</h1>
	<ul>
		<?
		foreach ($liste as $item)
			echo '<li><a href="bearbeiten.php?lied='.$item.'"><img src="img/edit_16.png" /></a><a href="sammlung/'.$item.'">'.$item.'</a></li>';
			
		?>
	</ul>
	</body>
</html>