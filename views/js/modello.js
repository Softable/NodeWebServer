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
			modello.tipiAttributi = data.tipiAttributi;
		}
	});
	return modello;
}

function inserisci_modello() {
	var modello = {}, attributi = [], tipiAttributi = [], attributo, tipoAttributo, username, i;
	username = document.getElementById('username').value;
	// INSERISCO SOLO GLI ATTRIBUTI CHE NON SONO VUOTI
	for (i = 0; i < document.getElementsByClassName('attributi').length; i++) {
		attributo = document.getElementsByClassName('attributi')[i].value;
		tipoAttributo = document.getElementsByClassName('tipiAttributi')[i].value;
		if (attributo !== null && attributo !== '' && attributo !== 'null') {
			attributi.push(attributo);
			tipiAttributi.push(tipoAttributo);
		}
	}
	modello = {
		"id_modello" : 0,
		"nome_modello" : document.getElementById('nome_modello').value,
		"username" : username,
		"attributi" : attributi,
		"tipiAttributi" : tipiAttributi
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
	var modello = {}, nuoviAttributi = [], vecchiAttributi = [], tipiAttributi = [], username, i;
	tipiAttributi = richiedi_modello(id_modello).tipiAttributi;
	username = richiedi_modello(id_modello).username;
	vecchiAttributi = document.getElementsByClassName('nuoviAttributi' + id_modello);
	for (i = 0; i < vecchiAttributi.length; i++) {
		if (vecchiAttributi[i].value !== null && vecchiAttributi[i].value !== 'null' && vecchiAttributi[i].value !== '') {
			nuoviAttributi.push(vecchiAttributi[i].value);
		}
	}
	modello = {
		"id_modello" : parseInt(id_modello),
		"nome_modello" : document.getElementById("nuovoNome" + id_modello).value,
		"username" : username,
		"attributi" : nuoviAttributi,
		"tipiAttributi" : tipiAttributi
	};
	$.ajax({
		url : "http://localhost:8080/modello/modifica",
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(modello),
		dataType: "json"
	}).done(function (esito) {
		if (esito) {
			location.href = '../modello';
		} else {
			location.href = '../error';
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
		tabella += "<div class=wrap-table100 style='width: 70%;margin: 0 0 5% 10%;'><div class='table100 ver1'>";
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
		$("#modelli").append("<div class='utilityButtons' id='utilityButtons" + id_modello + "'></div>");
		$("#utilityButtons" + id_modello).append("<button class=button type=submit onClick=location.href='../creaTabella?id_modello=" + id_modello + "'>Crea Tabella</button>");
		$("#utilityButtons" + id_modello).append("<button id='bttModify" + id_modello + "' class=button type=submit onClick=acquisizione_dati(" + id_modello + ");>Modifica modello</button>");
		$("#utilityButtons" + id_modello).append("<button class=button type=submit onClick=elimina_modello(" + id_modello + ");>Elimina</button>");
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
	$("#bttModify" + id_modello).replaceWith("<button class='button modify save' type=submit onClick=modifica_modello(" + id_modello + ")>Salva</button><button class='button modify cancel' type=submit onClick=location.href='../modello'>Annulla</button>");
}
