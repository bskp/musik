//  Allgemeine Einstellungen 
var B = {
	leerText: 'Bitte ausfüllen',
	leerTitel: 'Titel bitte angeben!'
};

//  Lied
/**
 * @description Alles betreffend des zu bearbeitenden XML-Dokuments
 */
 
var Lied = {
	titelAlt: '',
	titelNeu: '',
	
	/**
	 * @name Lied-bearbeitet
	 * @description
	 * Wurde das Dokument verändert?
	 * @type boolean
	 * @default false
	 * @private
	 * @see UI.verwerfen
	 */
	bearbeitet: false,
	textModus: false,
	
	sichern: function(){
		alert('in db schreiben: '+this.titelNeu);
		location.href = 'index.php';
	},
	
	ersetzen: function(){
		Lied.sichern();
		alert('von db löschen: '+this.titelAlt);
	}
	
};

//  UI
var UI = {
	verwerfen: function(){
		if (Lied.bearbeitet) Dialog.zeigen('verwerfen');
	},
	
	sichern: function(){
		if (Lied.textModus) Parser.machHTML();
		Lied.titelNeu = $('h1').text();
		
		if (Lied.titelNeu != Lied.titelAlt && Lied.titelAlt != B.leerTitel){
			Dialog.zeigen('umbenennen', { alt: Lied.titelAlt, neu: Lied.titelNeu });
		}
		else Lied.sichern();
	},
		/*
		$.post("db.php", { aktion: 'check', datei: titelNeu }, function(data){
			//alert(data);
		});
	*/
	
	bearbeiten: function( bKnopf ){
	
		if (Lied.textModus){
			bKnopf.removeClass('active');
			Parser.machHTML();
			Lied.textModus = false;
		}
		else{
			bKnopf.addClass('active');
			Parser.machCode();
			Lied.textModus = true;
		}
	},
	
	akkordListeLaden: function(){
		$('#akkordListe').empty(); // Listenelement leeren
		
		var akkorde = new Array();
		
		$('.chord').each(function() {
			var dies = $(this).text();
			if ( $.inArray(dies, akkorde) == -1 )
				akkorde.push(dies);
		});
		
		// Akkorde in Liste schreiben
		$(akkorde).each(function(){
			$('#akkordListe').append('<span class="chord edit">'+this+'</span>');
		});
		
		UI.dragdropBinden();
	},
	
	dragdropBinden: function(){
		
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
					UI.dragdropBinden();
				}
				UI.akkordListeLaden();
				Lied.bearbeitet = true;
			},
			over: function(event, ui) { $(this).addClass('dropHover'); },
			out: function(event, ui) { $(this).removeClass('dropHover'); },
			scope: 'chords',
			addClasses: false
		});
	}
};

//  Parser
var Parser = {
	machCode: function(){
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
	},
	
	machHTML: function(){
		var t = $('#song textarea').val();
		
		t = t.replace(/#\n((.|\n)*?)(\n\n(?=([#RB]\n))|(?=($|<)))/g, '<p class="verse">$1</p>');
		t = t.replace(/R\n((.|\n)*?)(\n\n(?=([#RB]\n))|(?=($|<)))/g, '<p class="chorus">$1</p>');
		t = t.replace(/B\n((.|\n)*?)(\n\n(?=([#RB]\n))|(?=($|<)))/g, '<p class="bridge">$1</p>');
		
		t = t.replace(/{((.|\s)*?)}/g, '<span class="note">$1</span>');
		t = t.replace(/\((.*?)\)/g, '<span class="edit chord">$1</span>');
		t = t.replace(/\n/g, '<br />\n');
		
		$('#song').html(t);
		
		/*
		$('#song p').replaceWith(function(){
			var t = Parser.machSilben( $(this).html() );
			return '<p class="'+$(this).attr('class')+'">'+t+'</p>'
		});
		*/
		//NEU
		Parser.machSilben();
		
		UI.akkordListeLaden();
	
		$('#werkzeuge').fadeIn(500);
		$('#tipps').fadeOut(500);
		Lied.bearbeitet = true;
	},
	
	
	machSilben: function() {
		$('#song p').replaceWith(function(){
		
			var t = $(this).html();
			
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
			
			// Leerzeichen als Trenner erkennen
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
			
			var hyphenatorSettings = { hyphenchar: post+pre };
		        
			Hyphenator.config(hyphenatorSettings);
			t = Hyphenator.hyphenate(t, 'de');
			
			return '<p class="'+$(this).attr('class')+'">'+t+'</p>';
		});
	}
}; /* Parser Ende */

// Document Ready
$(document).ready(function(){
	Lied.titelAlt = $('h1').text();
	
	Parser.machSilben();
	
	UI.akkordListeLaden();
	
	// Hilfsfunktion für Handleranbindung
	var wrapEditor = function(event, target){
			
		//Abbrechen, wenn bereits geöffnet
		if (target.children().is('#editor')) return;
		//Abbrechen, wenn noch in Seitenleiste
		if (target.parent().is('#akkordListeLaden')) return;
	
		//Neue Eingabemaske erstellen
		target.wrapInner(function() {
			return '<input id="editor" value="' + target.text() + '" />';
		});
		
		target.children('input').select();
	}
	
	// Bearbeitbarkeit sämtlicher .edit-Felder
	$('.edit').live('click', function(event){ wrapEditor(event, $(this)); });
	// Akkorde erst per Doppelklick
	$('.chord').die('click');
	$('.chord').live('dblclick', function(event){ wrapEditor(event, $(this)); });
	
	$('.edit').live('focusout', function(event){	
		// Geöffnete Elemente schliessen und in DOM-Baum zurückschreiben
		var offen = $("#editor");
		if (offen.val() == '') offen.val(B.leerText);
		
		offen.replaceWith(offen.val());
		Lied.bearbeitet = true;
		
		// Akkord: Liste anpassen
		if ($(this).hasClass('chord')) UI.akkordListeLaden();	
	});
	
	// Element per Enter verlassen
	$('.edit').live('keypress', function(event){
		if (event.which == 13) $(this).trigger('focusout');
	});
	
	// Dialog-Effekte
	$('#dialog a').live('mouseenter', function() {
		var i = $(this).siblings('.dialogInfo');
		
		i.data('text', i.html());
		i.text( $(this).attr('alt') );
	});
	
	$('#dialog a').live('mouseleave', function() {
		var i = $(this).siblings('.dialogInfo');
		i.html( i.data('text') );
	});
}); /* Document Ready */

//  Dialog
var Dialog = {

	zeigen: function( meldung, args ){
		for (var arg in args)
    	$('#'+meldung+' em#'+arg).text(args[arg]); // Platzhalter ersetzen

		$('#dialog').fadeIn();
		$('#'+meldung).slideDown( 200 );
	},
	
	schliessen: function(){
		$('#dialog').fadeOut('fast');
		$('#dialog div').slideUp( 200 );
		return false; // "href" bitte nicht aufrufen!
	}
};

/*
var dialogSichern = function( sichern, loeschen ){

	dialogSchliessen();
	
	alert('hä');
	
	$.post("db.php", { aktion: 'sichern', datei: args['sichern'], daten: $('body').html() }, alert(data));
	
	if ( args['loeschen'] ) $.post("db.php", { aktion: 'loeschen', datei: args['loeschen']}, alert(data))
	
	
}

*/
