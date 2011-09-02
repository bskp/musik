var titelAlt;
var bearbeitet = false;
var leerText = 'Bitte ausfüllen!';

$(document).ready(function(){
	
	titelAlt = $('h1').text();
	
	$('#song p').replaceWith(function(){
		var t = syllabe( $(this).html() );
		return '<p class="'+$(this).attr('class')+'">'+t+'</p>'
	});
	
	refreshChordlist();
	//Bindhandlers inbegriffen
	
});

var sichern = function(){
	
	
	if ($('#editButton').hasClass('active')) parseLyrics();
	var titelNeu = $('h1').text();
	
	if (titelNeu != titelAlt && titelAlt != 'Titelplatzhalter'){
		dialog('umbenennen', { alt: titelAlt, neu: titelNeu });
	}
	
	$.post("db.php", { aktion: 'check', datei: titelNeu }, function(data){
		//alert(data);
	});

}

var dialogSichern = function( sichern, loeschen ){

	dialogSchliessen();
	
	alert('hä');
	
	$.post("db.php", { aktion: 'sichern', datei: args['sichern'], daten: $('body').html() }, alert(data));
	
	if ( args['loeschen'] ) $.post("db.php", { aktion: 'loeschen', datei: args['loeschen']}, alert(data))
	
	
}


var verwerfen = function(){

	if (bearbeitet) dialog('verwerfen');

}

var dialog = function( meldung, args ){

	for (var arg in args)
    	$('#'+meldung+' em#'+arg).text(args[arg]); // Platzhalter ersetzen

	$('#dialog').fadeIn();
	$('#'+meldung).slideDown( 200 );

}

var dialogSchliessen = function(){

	$('#dialog').fadeOut('fast');
	$('#dialog div').slideUp( 200 );

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
	
	bindHandlers();
}

var bindHandlers = function(){
	
	$('.chord').draggable({ 
		revert: true,
		//cursorAt: { top: 10, left: 25 },
		revertDuration: 0,
		addClasses: false,
		scope: 'chords',
		start: function() {
			$(this).addClass('ziehen');
			
		},
		stop: function(event, ui) { $(this).removeClass('ziehen'); }
	});
	
	$('.drop').droppable({
		drop: function(event, ui) { 
			$(this).before(ui.draggable).removeClass('dropHover');
			if ($(this).hasClass('LL')){
				$(this).after('<span class="drop LL">&nbsp;</span>');
				bindHandlers();
			}
			refreshChordlist();
			bearbeitet = true;
		},
		over: function(event, ui) { $(this).addClass('dropHover'); },
		out: function(event, ui) { $(this).removeClass('dropHover'); },
		scope: 'chords',
		addClasses: false
	});
	
	var bindEditor = function(event, target){
		
		//Abbrechen, wenn bereits geöffnet
		if (target.children().is('#editor')) return;
		
		//Abbrechen, wenn noch in Seitenleiste
		if (target.parent().is('#akkordListe')) return;
		
		//Neue Eingabemaske erstellen
		target.wrapInner(function() {
			return '<input id="editor" value="' + target.text() + '" />';
		});
		
		target.children('input').select();
	}
	
	$('.edit').click(function(event){ bindEditor(event, $(this)); });
	$('.chord').unbind('click');
	$('.chord').dblclick(function(event){ bindEditor(event, $(this)); });
	
	$('.edit').focusout(function(event){
		
		// Geöffnete Elemente schliessen und in DOM-Baum zurückschreiben
		var offen = $("#editor");
		if (offen.val() == '') offen.val(leerText);
		
		offen.replaceWith(offen.val());
		bearbeitet = true;
		
		// Akkord: Liste anpassen
		if ($(this).hasClass('chord')) refreshChordlist();
			
	});
	
	$('.edit').keypress(function(event){
		
		if (event.which == 13) $(this).trigger('focusout'); // Element bei Enter verlassen
	
	});
	
	$('#dialog a').mouseenter( function() {
		var i = $(this).siblings('.dialogInfo');
		
		i.data('text', i.html());
		i.text( $(this).attr('alt') );
	});
	
	$('#dialog a').mouseleave( function() {
		var i = $(this).siblings('.dialogInfo');

		i.html( i.data('text') );
	});
}



var editLyrics = function(){

	var t;
	
	$('#song .chord').prepend('(').append(')');
	$('#song p.verse').prepend('\n\n#\n');
	$('#song p.chorus').prepend('\n\nR\n');
	$('#song p.bridge').prepend('\n\nB\n');
	$('#song p br').prepend('\n');
	$('#song span.note').prepend('{').append('}');
	
	t = $('#song').text();
	
	t = t.replace(/\t/g, '');
	t = t.replace(/ \n/g, '\n'); // ! Achtung, nbsp!
	
	$('#song p').parent().wrapInner(function() {
		return '<textarea>' + t + '</textarea>';
	});
	
	$('#werkzeuge').fadeOut(500);
	$('#tipps').fadeIn(500);
	
	bearbeitet = true;
	
}

var parseLyrics = function(){

	var t = $('#song textarea').val();
	
	t = t.replace(/#\n((.|\n)*?)(\n\n(?=([#RB]\n))|(?=($|<)))/g, '<p class="verse">$1</p>');
	t = t.replace(/R\n((.|\n)*?)(\n\n(?=([#RB]\n))|(?=($|<)))/g, '<p class="chorus">$1</p>');
	t = t.replace(/B\n((.|\n)*?)(\n\n(?=([#RB]\n))|(?=($|<)))/g, '<p class="bridge">$1</p>');
	
	t = t.replace(/{((.|\s)*?)}/g, '<span class="note">$1</span>');
	t = t.replace(/\((.*?)\)/g, '<span class="edit chord">$1</span>');
	t = t.replace(/\n/g, '<br />\n');
	
	$('#song').html(t);
	
	$('#song p').replaceWith(function(){
		var t = syllabe( $(this).html() );
		return '<p class="'+$(this).attr('class')+'">'+t+'</p>'
	});
	
	refreshChordlist();

	$('#werkzeuge').fadeIn(500);
	$('#tipps').fadeOut(500);
}

var syllabe = function( t ) {
	 var pre = '<span class="drop">';
	 var preLL = '<span class="drop LL">';
	 var post = '</span>';
	
	var lineStart = '';
	var lineEnd = preLL+'&nbsp;'+post;
	
	t = lineStart+pre+t.replace(/(\s)*<br>(\s)*/g, post+lineEnd+'<br>'+lineStart+pre )+post+lineEnd;
	
	var i = -1;
	var t_ = '';
	var inBrack = false;
	var inTag = false;
	
	while( t[++i] != undefined ){
		
		if (t[i] == '>') inBrack = false;
		if (t[i] == '<') inBrack = true;
		
		if ( t[i] == ' ' && !inBrack && !inTag ){
			t_ += post+t[i]+pre;
		} else {
			t_ += t[i];
		}
	}

	t = t_;
	
	var hyphenatorSettings = {
                hyphenchar :            post+pre
        };
        
	Hyphenator.config(hyphenatorSettings);
	
	//t = t.replace(/(\b)\s(\b)/g, '$1'+post+pre+'$2');
	t = Hyphenator.hyphenate(t, 'de');
	
	return t;
}