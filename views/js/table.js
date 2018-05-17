function inserisci_tabella(id){
	if (document.getElementById("tabella"+id)) {
    alert("La tabella esiste già!");
	}else{
		var tabella=richiedi_tabella(id);
		var quantita_dati=tabella.valori.length;
		var id_modello=tabella.id_modelloTabella;
		var modello=richiedi_modello(id_modello);
		var colonne=modello.attributi.length;
		$("#div_table").append("<table data-vertable='ver1' id='tabella"+id+"'><thead><tr class='row100 head' id='attributi"+id+"'></tr></thead><tbody id='dati"+id+"'></tbody></table>");
		var tabellaHTML = document.getElementById("tabella"+id).getElementsByTagName("tbody")[0];
		for(var i=0 ; i<colonne ; i++){
	    document.getElementById('attributi'+id).innerHTML+="<th class='column100 column"+(i+1)+"' data-column='column"+(i+1)+"'>"+modello.attributi[i]+"</th>";
		}
		for(var i=0 ; i<quantita_dati ; i++){
			if(i%colonne==0){
				var riga = tabellaHTML.insertRow(tabellaHTML.rows.length);
			}
			var cella = riga.insertCell(i%colonne);
			cella.id="cella"+id+((i)+1);
			var dato  = tabella.valori[i];
			cella.innerHTML+=(dato);
			document.getElementById("cella"+id+((i)+1)).setAttribute("class", "column100 column"+((i%colonne)+1));
			document.getElementById("cella"+id+((i)+1)).setAttribute("data-column", "column"+((i%colonne)+1));
			document.getElementById("cella"+id+((i)+1)).setAttribute("style", "text-align:center;");
		}
		jQuery("tr").addClass("row100");
	}
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
