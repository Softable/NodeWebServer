
(function ($) {
	"use strict";
	$('.column100').on('mouseover',function(){
		var table1 = $(this).parent().parent().parent();
		var table2 = $(this).parent().parent();
		var verTable = $(table1).data('vertable') + "";
		var column = $(this).data('column') + "";

		/*var dati = $(this).parent().parent().data();
		console.log("mouseover: " + verTable);
		console.log("dati: ");
		for(var i in dati){
			console.log(dati[i]);
		}*/

		$(table2).find("." + column).addClass('hov-column-' + verTable);
		$(table1).find(".row100.head ." + column).addClass('hov-column-head-' + verTable);
	});


	$('.column100').on('mouseout',function(){
		var table1 = $(this).parent().parent().parent();
		var table2 = $(this).parent().parent();
		var verTable = $(table1).data('vertable') + "";
		var column = $(this).data('column') + "";

		//console.log("mouseout: " + verTable);

		$(table2).find("." + column).removeClass('hov-column-' + verTable);
		$(table1).find(".row100.head ." + column).removeClass('hov-column-head-' + verTable);
	});


})(jQuery);