function visualizza_tabella(id){
	var tabella=richiedi_tabella(id);
	var quantita_dati=tabella.valori.length;
	var id_modello=tabella.id_modelloTabella;
	var modello=richiedi_modello(id_modello);
	var colonne=modello.attributi.length;
	for(var i=0 ; i<colonne ; i++){
    document.getElementById('attributi').innerHTML+="<th class='column100 column"+(i+1)+"' data-column='column"+(i+1)+"'>"+modello.attributi[i]+"</th>";
	}


		var tableRef = document.getElementById('tabella').getElementsByTagName('tbody')[0];

		// Insert a row in the table at the last row
		var newRow   = tableRef.insertRow(tableRef.rows.length);

		// Insert a cell in the row at index i
		var newCell  = newRow.insertCell(0);
var newCell1  = newRow.insertCell(1);
		// Append a text node to the cell
		var newText  = tabella.valori[1];
		var newText1  =tabella.valori[2];
		newCell.innerHTML+=(newText);
	newCell1.innerHTML+=(newText1);
	jQuery("tr").addClass("row100");

}

function richiedi_tabella(id_tabella){
    var tabella = {};
    $.ajax({
        url: 'http://localhost:8080/tabella/richiedi/' + id_tabella,
        type: 'GET',
        async: false,
        success: function(data) {
            tabella.id_tabella = id_tabella;
            tabella.username_utente = data.username_utente;
            tabella.id_modelloTabella = data.id_modelloTabella;
            tabella.valori = data.tabella;
        }
      });
      return tabella;
}

function richiedi_modello(id_modello){
    var modello = {};
    $.ajax({
      url: 'http://localhost:8080/modello/richiedi/' + id_modello,
      type: 'GET',
      async: false,
      success: function(data) {
        modello.id_modello = id_modello;
        modello.nome_modello = data.nome_modello;
        modello.attributi = data.attributi;
      }
    });
    return modello;
}

function change_color(version) {
		document.getElementById("div_table").className= "table100 ver" + version + " m-b-110";
		document.getElementsByTagName("table")[0].setAttribute("data-vertable", "ver" + version);
}

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


});
