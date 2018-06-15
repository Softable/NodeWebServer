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
			modello.username = data.username;
			modello.attributi = data.attributi;
		}
	});
	return modello;
}

function inserisci_modello() {
	var modello = {}, attributi = [], elemento, username;
	username = document.getElementById('username').value;
	for (var i = 0; i < document.getElementsByClassName('attributi').length; i++) {
		elemento = document.getElementsByClassName('attributi')[i].value;
		if (elemento !== null && elemento !== '' && elemento !== 'null') {
			attributi.push(elemento);	
		}
	}
	modello = {
		"id_modello" : 0,
		"nome_modello" : document.getElementById('nome_modello').value,
		"username" : username,
		"attributi" : attributi
	};
	$.ajax({
		url: "http://localhost:8080/modello/inserisci",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(modello),
		dataType: "json"
	}).done(function () {
		window.location.href = '../modello';
	});
}

function modifica_modello(id_modello) {
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
		if (esito) {
			window.location.href = '../modello';
		} else {
			window.location.href = '../error';
		}
	});
}

function elimina_modello(id_modello) {
	var t;
	t = confirm("Sei sicuro di voler eliminare questo modello?");
	if (t) {
		$.ajax({
			url: "http://localhost:8080/modello/elimina" + "/" + id_modello,
			type: "GET"
		}).done(function () {
			window.location.href = '../modello';
		});
	}
}

//UTILIZZATI NELLA PAGINA MODELLO
function visualizzaModelliInPagina(username) {
	idModelliUtente(username).forEach(function(id_modello) {
		var modello, i, cont = 1, tabella = "";
		modello = richiedi_modello(id_modello);
		//HEAD DELLA TABELLA
		tabella += "<div class=wrap-table100 style='width: 70%;margin: 0 0 2% 15%;'><div class='table100 ver1'>";
		tabella += "<table id='" + id_modello + "'><thead class='table100-head'><tr class='row100 head'>";
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
		$("#modelli").append("<div id='utilityButtons" + id_modello + "'></div>");
		$("#utilityButtons" + id_modello).append("<button class=button type=submit style='clear:right;'>Crea Tabella</button>");
		$("#utilityButtons" + id_modello).append("<button id='bttModify" + id_modello + "' class=button type=submit style='clear:right;' onClick=acquisizione_dati(" + id_modello + ");>Modifica modello</button>");
		$("#utilityButtons" + id_modello).append("<button class=button type=submit style='clear:right;' onClick=elimina_modello(" + id_modello + ");>Elimina</button>");
		$("#modelli").append(tabella);	
	});
}

function acquisizione_dati(id_modello) {
	var $headTable, $bodyTable, vecchioModello;
	vecchioModello = richiedi_modello(id_modello);
	//CERCO L'HEAD E IL BODY DELLA TABELLA CHE MI SERVE ATTRAVERSO IL SUO ID, CHE SARà UGUALE A QUELLO DEL MODELLO
	$headTable = $("#" + id_modello + " thead");
	$bodyTable = $("#" + id_modello + " tbody");
	//MODIFICO LA TABELLA AFFFINCHE POSSA PRENDERE IN INPUT I DATI
	$headTable.children().children(".cell100.column1").html("<input type='text' id='nuovoNome" + id_modello + "' value='" + vecchioModello.nome_modello + "' />");
	$bodyTable.children().each(function() {
		$(this).children().each(function () {
			$(this).html("<input type=text class='nuoviAttributi" + id_modello + "' value=" + $(this).text() + " />");
		});
	});
	$("#bttModify" + id_modello).replaceWith("<button class='button modify' type=submit style=''>Annulla</button><button class='button modify' type=submit style=''>Salva</button>");
}