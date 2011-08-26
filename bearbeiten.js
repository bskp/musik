$(document).ready(function(){
	
	$('#song p').replaceWith(function(){
		var t = wrapTextnodeLetters( $(this).html() , '<span class="drop">', '</span>');
		return '<p class="'+$(this).attr('class')+'">'+t+'</p>'
	});
	
	refreshChordlist();

	bindHandlers( $('*') );
	
	$('#papierkorb').droppable({
		drop: function(event, ui) { $(ui.draggable).remove(); refreshChordlist(); },
		/*over: function(event, ui) { $(this).addClass('dropHover'); },
		out: function(event, ui) { $(this).removeClass('dropHover'); },*/
		scope: 'chords',
		addClasses: false
	});
	
	
	$('#transpose').change(function(){
		transpose( $('#transpose').val() );
		$('#transpose').val(0);
	
	});
	
});

// Da klappt noch was nicht ganz
var bindHandlers = function( s ){
	
	scope = $(s);
	
	scope.filter('.edit').click(function(event){
		
		//Abbrechen, wenn bereits geöffnet
		if ($(this).children().is('#editor')) return;
		
		//Abbrechen, wenn noch in Seitenleiste
		if ($(this).parent().is('#akkordListe')) return;
		
		//Neue Eingabemaske erstellen
		$(this).wrapInner(function() {
			return '<input id="editor" value="' + $(this).text() + '" />';
		});
		
		$(this).children('input').select();
		
	});
	
	scope.filter('.edit').focusout(function(event){
		
		// Geöffnete Elemente schliessen und in DOM-Baum zurückschreiben
		var offen = $("#editor");
		offen.replaceWith(offen.val());
		
		// Akkord: Liste anpassen
		if ($(this).hasClass('chord')) refreshChordlist();
		
		// Tag: -edit entfernen, neuen handler anbinden
		if ($(this).hasClass('tag')) {
			
			$(this).removeClass('edit');
			bindHandlers( $('*') );
			
		}
		
	});
	
	scope.filter('.tag').click(function(){
		$(this).remove();
	});
	
	scope.filter('.edit').keypress(function(event){
		
		if (event.which == 13) $(this).trigger('focusout'); // Element bei Enter verlassen
	
	});
	
	scope.filter('#song p').dblclick(function(event){
		$(this).parent().wrapInner(function() {
			return '<textarea>' + parse($(this)) + 'asdasdf</textarea>';
		});
		
		
		$('textarea').select();
	
	});
	
	scope.filter('.chord').draggable({ 
		revert: true,
		cursorAt: { top: 10, left: 25 },
		revertDuration: 0,
		addClasses: false,
		scope: 'chords',
		start: function() { $(this).addClass('ziehen'); },
		stop: function() { $(this).removeClass('ziehen'); }
	});
	
	scope.filter('.drop').droppable({
		drop: function(event, ui) { $(this).before(ui.draggable).removeClass('dropHover'); refreshChordlist(); },
		over: function(event, ui) { $(this).addClass('dropHover'); },
		out: function(event, ui) { $(this).removeClass('dropHover'); },
		scope: 'chords',
		addClasses: false
	});

}

var parse = function(song){

	var t;
	
	$('#song .chord').prepend('(').append(')');
	$('#song p.verse').prepend('\n#');
	$('#song p.chorus').prepend('\nR');
	$('#song p.bridge').prepend('\nB');
	$('#song span.note').prepend('{').append('}');
	
	t = song.text();
	
	t = t.replace(/\t/g, '');
	t = t.replace(/\n\n\n/g, '\n\n');
	t = t.replace(/\n\n\n/g, '\n\n');
	
	return t;
}

var wrapTextnodeLetters = function(t, pre, post){

	var i = -1;
	var t_ = '';
	var inBrack = false;
	var inTag = false;
	
	
	while( t[++i] != undefined ){
		
		if (t[i] == '>') inBrack = false;
		if (t[i] == '<') inBrack = true;
		
		if ( t[i].match(/[\w\,'.!?:\s]/) && !inBrack && !inTag ){
			t_ += pre+t[i]+post;
		} else {
			t_ += t[i];
		}
	}

	return t_;
}

//todo: autocomplete, bindhandler-fix
var addTag = function(){
	$('ul#tags').append('<li class="edit"></li>');
	
	bindHandlers( $('*') );
	
	$('ul#tags li:last').trigger('click');

}

var refreshChordlist = function(){
	$('#akkordListe').empty(); // Listenelement leeren
	
	var akkorde = new Array();
	
	$('.chord').each(function() {
		var dies = $(this).text();
		if ( $.inArray(dies, akkorde) == -1 )
			akkorde.push(dies);
	});
	
	//akkorde.sort();
	
	// Akkorde in Liste schreiben
	$(akkorde).each(function(){
		$('#akkordListe').append('<span class="chord edit">'+this+'</span>');
	});
	
	bindHandlers( $('*') );
}


var transpose = function(d){
	
	var leiter = [
		['c', 'cis', 'd', 'dis', 'e', 'f', 'fis', 'g', 'gis', 'a', 'ais', 'h'], // DE, +1/2
    	['c', 'des', 'd', 'es', 'e', 'f', 'ges', 'g', 'as', 'a', 'b', 'ces'],   // DE, -1/2
    	['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'h'],      // Int, +1/2
    	['c', 'db', 'd', 'eb', 'e', 'f', 'gb', 'g', 'ab', 'a', 'bb', 'b'],      // Int, -1/2
	];
	
	// Art der Notation bestimmen: notLoc : Int < 0 < De
	//							   notArt : es < 0 < is
	
	
	var notLoc = 0;
	var notArt = 0;
	$('#akkordListe .chord').each(function(){
	
		if ( $(this).text().match(/^[A-Ha-h][#(is)]/) )
			notArt++;
		if ( $(this).text().match(/^[A-Ha-h][b(es)s]/) ) //todo: findet noch nicht alles
			notArt--;
	
		if ( $(this).text().match(/^[Bb]$|^b/) ) // B/b ohne Bb/bb
			return true; //aka continue;
			
		if ( $(this).text().match(/^[B-Hb-h][ei]s|^Es|^As/) ) // Es, Gis, Des, Cis...
			notLoc++;
		if ( $(this).text().match(/^[A-Ha-h][#b]/) ) // Eb, G#, Db, C#...
			notLoc--;
	});
	
	var notI = 0;
	
	if (notLoc < 0)
		notI = 2;
	if (notArt < 0)
		notI++;
	
	throw('notI: '+notI);
	
	var not = leiter[notI];
	
	if (notLoc < 0 ) // falls internationale Schreibweise
		leiter = [ leiter[2], leiter[3], leiter[0], leiter[1] ]; // B bevorzugt als Bb erkennen
	
	$('.chord').text(function(){
		
		var c = $(this).text();
		var gross = c.match(/[A-H]/);
		c = c.replace(/^([A-Ha-h][eib#s]?s?)(.*)/, function(p1, p2, p3){
			
			p2 = p2.toLowerCase();
			
			$(leiter).each(function(index){
				var pos = $.inArray(p2, this);
				
				if (pos != -1){
				
					p2 = not[(pos+d+12)%12];
					return false;
				}
			
			});
			
			if (gross)
				p2 = p2.slice(0,1).toUpperCase() + p2.slice(1);
			
			return(p2+p3);
		});
		
		
		return c+'';
	});
	
	//refreshChordlist();
}

var abschicken = function(titel){

	//$.post("post.php", new XMLSerializer().serializeToString( document ));
	
	/*$.post("post.php", function(data) {
		alert("Data Loaded: " + data);
	});
	*/
	
	transpose(1);
	/*
	$.ajax({
		type: 'POST',
		url: 'post.php',
		data: { datei: titel, xhtml: new XMLSerializer().serializeToString( document ) },
		success: function(d) { alert(d); }
	});
	*/
	//alert(new XMLSerializer().serializeToString( document ) );

};