function genera_tabella(){
	var modello = leggiCookie('modello');
  modello = "23";
	if(modello=="null")
		alert("Seleziona un modello dalla pagina dei modelli.");
	else{
		tabella_input(modello);
	}
}

function tabella_input(id_modello){
  var modello = richiedi_modello(id_modello);
  $("#divTabella").append("<table id='tabella'><thead class='header'><tr><th colspan='"+modello.attributi.length+"'>"+modello.nome_modello+"</th></tr></thead><tbody></tbody></table>");
  var tabellaH = document.getElementById('tabella').getElementsByTagName('thead')[0];
  var rigaH   = tabellaH.insertRow(tabellaH.rows.length);
  var tabellaB = document.getElementById('tabella').getElementsByTagName('tbody')[0];
  var rigaB   = tabellaB.insertRow(tabellaB.rows.length);
  for(var i=0; i<modello.attributi.length ; i++){
    var cellaH  = rigaH.insertCell(i);
    var datiH  = document.createTextNode(modello.attributi[i]);
    cellaH.appendChild(datiH);
    var cellaB  = rigaB.insertCell(i);
    var input  = document.createElement("input");
    input.setAttribute("value",modello.attributi[i]);
    input.setAttribute("id","input"+i);
    cellaB.appendChild(input);
  }
  $("#limiter").append("<img class='icone' src='assets/images/aggiungiTabella.png' title='Conferma la nuova Tabella' style='margin-bottom:30px; align:center;' id='Conferma' onclick='creaTabella("+id_modello+");' >");
}

function creaTabella(id_modello){
  var modello = richiedi_modello(id_modello);
  var dati = [] ;
  for(var i=0; i<modello.attributi.length ; i++){
    dati[i] = document.getElementById("input"+i).value;
  }
  var utente = leggiCookie('username');
  inserisci_tabella(utente,id_modello,dati);
  window.location.href='/tabella';
}

function inserisci_tabella(username,modello,dati) {
    $(document).ready(function() {
        var obj = {};
        obj = {
          "id_tabella" : 0,
          "username_utente" : username,
          "id_modelloTabella" : modello,
          "tabella" : dati
        };
        $.ajax({
            url: "http://localhost:8080/tabella/inserisci",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(obj),
            dataType: "json"
        }).done(function (esito) {
            console.log("Esito inserimento: "+esito);
        });
    });
}

function richiedi_modello(id_modello){
	var modello = {};
	$.ajax({
		url: 'http://localhost:8080/modello/richiedi/' + id_modello,
		type: 'GET',
		async: false,
		success: function(data) {
			modello.id_modello = data.id_modello;
			modello.nome_modello = data.nome_modello;
			modello.attributi = data.attributi;
		}
	});
	return modello;
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
