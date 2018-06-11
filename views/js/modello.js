"use strict";
function ottieni_modelli() {
	var modelli = [];
	$.ajax({
		url: 'http://localhost:8080/modelli/collezione',
		type: 'GET',
		async: false,
		success: function(data) {
			data.forEach(
				function(modello) {
					modelli.push(modello);
				}
			);
		}
	});
	return modelli;
}

function idModelliUtente (username) {
	var idModelliUtente = [];
	$.ajax({
		url: 'http://localhost:8080/modello/modelli_utente/' + username,
		type: 'GET',
		async: false,
		success: function(data) {
			idModelliUtente = data;
		}
	});
	return idModelliUtente;
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

function inserisci_modello() {
    $(document).ready(function() {
        var modello = {}, attributi = [];
        for (var i = 0; i < document.getElementsByName('att').length; i++) {
            attributi[i] = document.getElementsByName('att')[i].value;
		}
        modello = {
          "id_modello" : 0,
          "nome_modello" : document.getElementById('nome').value,
          "attributi" : attributi
        };
        $.ajax({
            url: "http://localhost:8080/modello/inserisci",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(modello),
            dataType: "json"
        }).done(function (esito) {
            alert("Esito inserimento: "+esito);
        });
    });
}

function modifica_modello() {
	$(document).ready(function() {
		var modello = {}, attributi = [];
		for (var i = 0; i < document.getElementsByName('att').length; i++) {
			attributi[i] = document.getElementsByName('att')[i].value;
		}
		modello = {
			"id_modello" : parseInt(document.getElementById("id_modello").value),
			"nome_modello" : document.getElementById("nome_modello").value,
			"attributi" : attributi
		};
		$.ajax({
			url : "http://localhost:8080/modello/modifica",
			type: "PUT",
			contentType: "application/json",
			data: JSON.stringify(modello),
			dataType: "json"
		}).done(function (esito) {
			alert("Esito modifica: "+esito);
		});
	});
}

function elimina_modello(id_modello) {
	var t;
	t = confirm("Sei sicuro di voler eliminare questo modello?");
	if (t) {
		$.ajax({
			url: "http://localhost:8080/modello/elimina" + "/" + id_modello,
			type: "GET"
		}).done(function (esito) {
			alert("Esito eliminazione: " + esito);
		});
		window.location("../modello");
	}
}

//UTILIZZATI NELLA PAGINA MODELLO
function visualizzaModelliInPagina(username) {
	try {
		idModelliUtente(username).forEach(function(idModello) {
			mostraModello(richiedi_modello(idModello));
		});
		
	} catch(error) {
		console.log(error);
	}
}

function mostraModello(modello) {
	var i, cont = 1, tabella = "";
	//HEAD DELLA TABELLA
	tabella += "<div class='wrap-table100' style='width: 70%;margin: 0 0 2% 10%;'><div class='table100 ver1'>";
	tabella += "<table><thead class='table100-head'><tr class='row100 head'>";
	tabella += "<th/><th/><th class='cell100 column1'>" + modello.nome_modello + "</th><th/><th/></tr></thead>";
	//BODY DELLA TABELLA
	tabella += "<tbody class='table100-body js-pscroll'><tr class='row100 body'>";
	for (i = 0; i < modello.attributi.length; i++) {
		if (cont > 5) {
			tabella += "</tr><tr class='row100 body'>";
			cont = 1;
		}
		tabella += "<td class='cell100 column" + (cont++) + "'>" + modello.attributi[i] + "</td>";
	}
	tabella += "</tr></tbody></table></div></div>";
	$("#modelli").append("<button class='button' type='submit' onClick='elimina_modello(" + modello.id_modello + ");'>Elimina</button>");
	$("#modelli").append(tabella);
	
}