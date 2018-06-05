function visualizza_tabelle_utente(){
	var username = leggiCookie('utente');
	if(username=="null")
		alert("Accedi dalla pagina di login!");
	else{
		tabelle_utente(username).forEach(function(tabella) {
  		inserisci_tabella_inPagina(tabella);
		});
	}
}

function inserisci_tabella_inPagina(id){
	try{
		if (document.getElementById("tabella"+id)) {
	    alert("La tabella già presente in pagina!");
		}else{
			var tabella=richiedi_tabella(id);
			var quantita_dati=tabella.valori.length;
			var id_modello=tabella.id_modelloTabella;
			var modello=richiedi_modello(id_modello);
			var colonne=modello.attributi.length;
			$("#header").append("<br><div id=aggiungi"+id+"><button id='"+id+"aggiungi' onclick=aggiungi_riga('"+id+"') >Aggiungi una nuova riga</button></div>");
			$("#header").append("<div class='wrap-table100' style='float: left; margin: 5% 0 0 4%;'><div class='table100 ver1'><div class='table100-head'><table><thead><tr class='row100 head' id='attributi"+id+"'></tr></thead></table></div><div class='table100-body js-pscroll'><table id='tabella"+id+"'><tbody id='dati"+id+"'></tbody></table></div></div></div>");
			var tabellaHTML = document.getElementById("tabella"+id).getElementsByTagName("tbody")[0];
			document.getElementById('attributi'+id).innerHTML+="<th class='cell100 column"+(1)+"' data-column='column"+(1)+"'>Modifica</th>";
			document.getElementById('attributi'+id).innerHTML+="<th class='cell100 column"+(2)+"' data-column='column"+(2)+"'><button onclick='elimina_tabella(this.value)' value='"+id+"'>Elimina la Tabella</button></th>";
			for(var i=3 ; i<colonne+3 ; i++){
		    document.getElementById('attributi'+id).innerHTML+="<th class='cell100 column"+(i)+"' data-column='column"+(i)+"'>"+modello.attributi[i-3]+"</th>";
			}
			for(var i=0,j=0,k=0; i<quantita_dati ; i++,k++){ //i per i dati,j per le righe, k per le celle
				if(i%colonne==0){
					k=0;
					var riga = tabellaHTML.insertRow(tabellaHTML.rows.length); //Inserisce una riga nella tabella considerata
					riga.id = id+"riga"+j; //Assegna un id alla riga, che è formato da id_tabella+"riga"+numero_riga
					document.getElementById(id+"riga"+""+j).setAttribute("class", "row100 body");
					var cella = riga.insertCell(k); //Inserisco la prima cella
					cella.id=j+"cella"+id+"M"+(k); //Assegno l'id alla cella modifica che è indice riga+"cella"+id_tabella+"M"+numero_cella
					var bottone_modifica = "<button onclick='modifica_riga(this.value)' value='"+id+"riga"+j+"'>Modifica la Riga</button>"; //Il value corrisponde all'id della riga
					cella.innerHTML+=(bottone_modifica); //Aggiungo il bottone alla tabella
					document.getElementById(j+"cella"+id+"M"+k).setAttribute("class", "cell100 column"+(k+1));
					k++; //Aumento poichè ho aggiunto la cella del modifica
					cella = riga.insertCell(k); //Inserisco la seconda cella
					cella.id=j+"cella"+id+"E"+(k); //Assegno l'id alla cella elimina che è indice riga+"cella"+id_tabella+"E"+numero_cella
					var bottone_elimina = "<button onclick='elimina_riga(this.value)' value='"+id+"riga"+j+"'>Elimina la Riga</button>"; //Il value corrisponde all'id della riga
					cella.innerHTML+=(bottone_elimina); //Aggiungo il bottone alla tabella
					document.getElementById(j+"cella"+id+"E"+k).setAttribute("class", "cell100 column"+(k+1));
					k++;
					j++;
				}
				var cella = riga.insertCell(k);
				cella.id=id+"cella"+(i+1); //Inserimento di una cella con il dato; l'id è id_tabella+"ccella"+indice cella
				var dato = tabella.valori[i];
				cella.innerHTML+=(dato);
				document.getElementById(id+"cella"+(i+1)).setAttribute("class", "cell100 column"+(k+1));
			}
		}
	}catch(error){
		console.log("Questa tabella non esiste oppure c'è un errore!");
	}
}

function leggiCookie(name) {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return 'null';
}

function aggiungi_riga(id_tabella){
	var tabella = richiedi_tabella(id_tabella);
	var attributi = richiedi_modello(tabella.id_modelloTabella).attributi;
	document.getElementById("aggiungi"+id_tabella).innerHTML = "<button id='"+id_tabella+"aggiungiConferma' onclick=conferma_inserimento('"+id_tabella+"') >Conferma l'inserimento</button>";
	attributi.forEach(function(colonna){
		document.getElementById("aggiungi"+id_tabella).innerHTML+="<input id='"+colonna+"Input' value='"+colonna+"'></input>";
	});
}

function conferma_inserimento(id_tabella){
	var tabella = richiedi_tabella(id_tabella);
	var attributi = richiedi_modello(tabella.id_modelloTabella).attributi;
	var dati = tabella.valori;
	attributi.forEach(function(colonna){
		dati.push(document.getElementById(colonna+"Input").value);
	});
	modifica_tabella(id_tabella,tabella.username_utente,tabella.id_modelloTabella,dati);
	location.reload();
}

function modifica_riga(id_riga){
	var tabella_elementi = idTabella_posizioniElementi(id_riga);
	var posizioni_dati = tabella_elementi[1];
	var celle = document.getElementById(id_riga).cells;
	var cella_modifica = celle[0];
	cella_modifica.innerHTML = "<button onclick=conferma_modifiche('"+id_riga+"') value='"+cella_modifica.id+"'>Esegui le modifiche</button>";
	for (var i=2; i<celle.length ; i++){
		celle[i].innerHTML = "<input id='"+celle[i].id+"in' value='"+celle[i].innerHTML+"'></input>";
	}
}

function conferma_modifiche(id_riga){
	var tabella_elementi = idTabella_posizioniElementi(id_riga);
	var id_tabella = tabella_elementi[0];
	var posizioni_dati = tabella_elementi[1];
	var tabella = richiedi_tabella(id_tabella);
	var dati = tabella.valori;
	var celle = document.getElementById(id_riga).cells;
	var cella_modifica = celle[0];
	for (var i=2,j=0; i<celle.length ; i++,j++){
		dati[posizioni_dati[j]-1] = document.getElementById(celle[i].id+"in").value;
	}
	modifica_tabella(id_tabella,tabella.username_utente,tabella.id_modelloTabella,dati);
	location.reload();
}

function elimina_riga(id_riga){
	if(confirm("Sei sicuro di voler eliminare la riga?")){
		var tabella_elementi = idTabella_posizioniElementi(id_riga);
		var id_tabella = tabella_elementi[0];
		var posizioni_dati = tabella_elementi[1];
		var tabella = richiedi_tabella(id_tabella);
		var dati = tabella.valori;
		for(var posizione=posizioni_dati.length-1 ; posizione>=0 ; posizione--){
    	dati.splice(posizioni_dati[posizione]-1, 1);
		}
		modifica_tabella(id_tabella,tabella.username_utente,tabella.id_modelloTabella,dati);
		var riga = document.getElementById(id_riga);
		riga.parentNode.removeChild(riga);
	}
}

function idTabella_posizioniElementi(id_riga){
	var celle = document.getElementById(id_riga).cells;
	var posizione_cella = [];
	var posizione_riga = id_riga.split("riga");
	var posizione_cella_inTabella;
	var posizioni_dati = [];
	for (var i=2; i<celle.length ; i++){
		posizione_cella = celle[i].id.split("cella");
		posizione_cella_inTabella = posizione_cella[1];
		posizioni_dati.push(posizione_cella_inTabella);
	}
	var id_e_elementi = [];
	var id_tabella = posizione_riga[0];
	id_e_elementi.push(id_tabella);
	id_e_elementi.push(posizioni_dati);
	return id_e_elementi;
}

function elimina_tabella(id_tabella) {
	if(confirm("Sei sicuro di voler eliminare la tabella?")){
    $(document).ready(function() {
        var obj = id_tabella;
        $.ajax({
            url: "http://localhost:8080/tabella/elimina" + "/" + obj,
            type: "GET"
        }).done(function (esito) {
          console.log("Esito eliminazione: "+esito);
        });
    });
		var tabella = document.getElementById("tabella"+id_tabella);
		tabella.parentNode.removeChild(tabella);
	}
}

function tabelle_utente(username){
    var id = [];
    $.ajax({
        url: 'http://localhost:8080/tabella/tabelle_utente/' + username,
        type: 'GET',
        async: false,
        success: function(data) {
            id=data;
        }
      });
    return id;
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

function modifica_tabella(id_tabella,username,modello,dati) {
    $(document).ready(function() {
        var obj = {};
        obj = {
            "id_tabella" : id_tabella,
            "username_utente": username,
            "id_modelloTabella": modello,
            "tabella" : dati
        };
        $.ajax({
            url : "http://localhost:8080/tabella/modifica",
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(obj),
            dataType: "json"
        }).done(function (esito) {
            console.log("Esito modifica: "+esito);
        });
    });
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
