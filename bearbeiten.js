$(document).ready(function(){
	
	var titelAlt = $('h1').text();
	
	$('#song p').replaceWith(function(){
		var t = syllabe( $(this).html() );
		return '<p class="'+$(this).attr('class')+'">'+t+'</p>'
	});
	
	refreshChordlist();
	
	
	// Test onhoverhandlers bei dialogfenstern
	
	$('#dialog a').mouseenter( function() {
		var i = $('#dialogInfo');
		
		i.attr('alt', i.text());
		i.text( $(this).attr('alt') );
	});
	
	$('#dialog a').mouseleave( function() {
		var i = $('#dialogInfo');

		i.text( i.attr('alt') );
	});
	
	
});

var sichern = function( titel ){
	
	if ($('#editButton').hasClass('active')) parseLyrics();
	
	var titelNeu = $('h1').text();
	
	if (titelNeu != titelAlt && titelAlt != 'Titelplatzhalter'){
		
	}
	
	
	$.post("sichern.php", { aktion: 'check', datei: titelNeu }, function(data){
		alert(data);
	});

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