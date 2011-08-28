$(document).ready(function(){

	
	$('#song p').replaceWith(function(){
		var t = syllabe( $(this).html() );
		return '<p class="'+$(this).attr('class')+'">'+t+'</p>'
	});
	
	refreshChordlist();
});


var abschicken = function( titel ){
	alert(parseSong());

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
		offen.replaceWith(offen.val());
		
		// Akkord: Liste anpassen
		if ($(this).hasClass('chord')) refreshChordlist();
			
	});
	
	$('.edit').keypress(function(event){
		
		if (event.which == 13) $(this).trigger('focusout'); // Element bei Enter verlassen
	
	});
}


var editLyrics = function(){

	var t;
	
	$('#song .chord').prepend(' (').append(') ');
	$('#song p.verse').prepend('#');
	$('#song p.chorus').prepend('R');
	$('#song p.bridge').prepend('B');
	$('#song p br').prepend('\n');
	$('#song span.note').prepend('{').append('}');
	
	t = $('#song').text();
	
	t = t.replace(/\t/g, '');
	t = t.replace(/( )+/g, ' ');
	t = t.replace(/(\n )+/g, '\n');
	//t = t.replace(/(\n){2,5}/g, '\n\n');
	
	$('#song p').parent().wrapInner(function() {
		return '<textarea>' + t + '</textarea>';
	});
	
	$('#werkzeuge').fadeOut(500);
	$('#tipps').fadeIn(500);
	
}

var parseLyrics = function(){

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