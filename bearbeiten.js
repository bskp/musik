$(document).ready(function(){
	
	
	// Setup Hyphenator
	var hyphenatorSettings = {
                hyphenchar :            '<em>AV</em>'
        };
        Hyphenator.config(hyphenatorSettings);
	//alert(Hyphenator.hyphenate('Hyphenation is cool!', 'de'));
	
	$('#song p').replaceWith(function(){
		var t = syllabe( $(this).html() , '<span class="drop">', '</span>');
		return '<p class="'+$(this).attr('class')+'">'+t+'</p>'
	});
	
	
	
	$('.chord').draggable({ 
		revert: true,
		cursorAt: { top: 10, left: 25 },
		revertDuration: 10,
		addClasses: false,
		scope: 'chords',
		start: function() { $(this).addClass('ziehen'); },
		stop: function() { $(this).removeClass('ziehen'); }
	});
	
	
	$('.drop').droppable({
		drop: function(event, ui) { $(this).before(ui.draggable).removeClass('dropHover'); },
		over: function(event, ui) { $(this).addClass('dropHover'); },
		out: function(event, ui) { $(this).removeClass('dropHover'); },
		scope: 'chords',
		addClasses: false
	});
	
	
});



var syllabe = function(t, pre, post) {
	
	t = pre+t.replace(/(\s)*<br>(\s)*/g, post+'<br>'+pre)+post;
	
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