<div id="umbenennen">
	<h3>Liedtitel wurde geändert!</h3>
	<p class="dialogInfo"><em id="alt">Alter Titel</em> heisst jetzt <em id="neu">neuer Titel</em>. 
	<br />Was soll weiter geschehen?</p>
	<a href="index.php" class="button" onclick="Lied.ersetzen();" alt="Benennt das aktuelle Lied um und überschreibt die alte Fassung"><img src="img/accept_16.png" /> ändern</a>
	<a href="index.php" class="button" onclick="Lied.sichern();" alt="Behält das ursprüngliche Lied und speichert die Änderungen unter dem neuen Titel"><img src="img/plus.png" /> hinzufügen</a>
	<a href="#" class="button" onclick="Dialog.schliessen();" alt="Schliesst das Fenster und kehrt zum Lied zurück"><img src="img/cancel_16.png" /> Zurück</a>
</div>

<div id="verwerfen">
	<h3>Änderungen verwerfen?</h3>
	<p class="dialogInfo">Arbeit droht verloren zu gehen! Was tun?</p>
	<a href="index.php" class="button" onclick="Dialog.schliessen(); return true;" alt="Verwirft alle Änderungen"><img src="img/trash_16.png" /> verwerfen</a>
	<a href="#" class="button" onclick="Dialog.schliessen();" alt="Schliesst das Fenster und kehrt zum Lied zurück"><img src="img/cancel_16.png" /> Zurück</a>
</div>

<div id="tutor">


</div>