<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de" lang="de">
	<head>
		<title></title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<link href="stile.css" rel="stylesheet" type="text/css" />
	</head>
	<body id="skopus">
		<h1>Title und so</h1>
		<p id="aendern">Und ein Absatz.</p>
		
		
		
		<a href="#" onclick="document.getElementById('aendern').innerHTML ='Nunja, das hier geht ja auch'">verändern</a>
		
		<a href="#" onclick="document.getElementById('ziel').value = new XMLSerializer().serializeToString( document.getElementById('skopus') );">Serialize!</a>
		
		<xml id='xmldata'>
			<songsheet>
<info>
	<title>L'ours</title>
	<composer>Tricot Machine</composer>
	
	<key original="2"> <chord name="cm" /> </key>
	<capo>3</capo>
	<year>2010</year>
	<genre>was auch immer</genre>
	<beat>8/8</beat>
	
</info>

<song>
	<stanza type="verse">
		J’ai <chord name="cm" />sauvé la <chord name="Bb" />peau d’un p’tit <chord name="Es" />ours<br />
		Pis son <chord name="cm" />coeur, je <chord name="Bb" />l’ai pas <chord name="Es" />volé<br />
		J’ai <chord name="cm" />tué le chas<chord name="Gm" />seur avant qu’il <chord name="As" />shoote<br />
		Et l’ours m’a consol<chord name="cm" />ée
	</stanza>
	
	<stanza type="verse">
		Tu es doux et juste un peu farouche<br />
		Mais je sais que je t’aprivoiserai<br />
		Tu as mordu dans mon coeur à pleine bouche<br />
		Et t’y est installé
	</stanza>
	
	<stanza type="verse">
		Les années se suivent et nous rassemblent<br />
		Il y a toujours plus à partager<br />
		Dans la tanière qui abrite nos confidences<br />
		Nous on a hiberné
	</stanza>
	
	<stanza type="verse">
		Puis un jour c’est l’été et c’est dimanche<br />
		Et les framboises poussent par milliers<br />
		J’ai tâché de fruits rouges ma robe blanche<br />
		Et je vais t’épouser
	</stanza>
	
	<stanza type="verse">
		Les yeux fermés, main dans la patte, on avance<br />
		Dans l’allée d’un champs d’blé d’inde shooté<br />
		Un doux mélange de romance et de démence<br />
		Quand le fermier a tiré
	</stanza>
	
	<stanza type="verse">
		Ce matin je me suis faite une p’tite bouffe<br />
		Mais à vrai dire ça passait pas vraiment<br />
		J’m’étais même préparé un bol de soupe<br />
		Et j’espérais te voir dedans
	</stanza>
	
	<stanza type="verse">
		Mais en vain, je l’ai scruté à galops<br />
		Aucune trace de toi dedans, de sang<br />
		Dis t’es où à présent, mon p’tit ours<br />
		Ta fourrure traîne sur le divan
	</stanza>
</song>
</songsheet>
		</xml>
		
		<input type="text" id="ziel"/>
		
	</body>
</html>