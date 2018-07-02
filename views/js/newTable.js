function genera_tabella(){
	var modello = (window.location.href).split("id_modello=")[1];
	if(modello=="null")
		alert("Seleziona un modello dalla pagina dei modelli.");
	else{
		tabella_input(modello);
	}
}

function tabella_input(id_modello){
  var modello = richiedi_modello(id_modello);
	var tipiAttributi = modello.tipiAttributi;
  $("#divTabella").append("<table id='tabella'><thead class='header'><tr><th colspan='"+modello.attributi.length+"'>"+modello.nome_modello+"</th></tr></thead><tbody></tbody></table>");
  var tabellaH = document.getElementById('tabella').getElementsByTagName('thead')[0];
  var rigaH   = tabellaH.insertRow(tabellaH.rows.length);
  var tabellaB = document.getElementById('tabella').getElementsByTagName('tbody')[0];
  var rigaB   = tabellaB.insertRow(tabellaB.rows.length);
	var filebttn = false;
  for(var i=0; i<modello.attributi.length ; i++){
		if(tipiAttributi[i]=="file"){
			var cellaH  = rigaH.insertCell(i);
	    var datiH  = document.createTextNode(modello.attributi[i]);
	    cellaH.appendChild(datiH);
	    var cellaB  = rigaB.insertCell(i);
			var form = document.createElement("form");
			form.name = "form";
			form.method = "POST";
			form.action = "/upload";
			form.id = "form";
			form.enctype="multipart/form-data";
			var input  = document.createElement("input");
	    input.setAttribute("value",modello.attributi[i]);
	    input.setAttribute("id","File");
			input.setAttribute("type","file");
			input.setAttribute("name","photo");
	    form.appendChild(input);
			cellaB.appendChild(form);
			filebttn=true;
		}else{
	    var cellaH  = rigaH.insertCell(i);
	    var datiH  = document.createTextNode(modello.attributi[i]);
	    cellaH.appendChild(datiH);
	    var cellaB  = rigaB.insertCell(i);
	    var input  = document.createElement("input");
	    input.setAttribute("value",modello.attributi[i]);
	    input.setAttribute("id","input"+i);
			input.setAttribute("type","text");
	    cellaB.appendChild(input);

		}
  }
	if(filebttn){
		$("#form").append('<input type="submit" name="Upload" value="Upload Photo" onclick="creaTabella('+id_modello+');" />');
	}else{
					$("#limiter").append("<img type='submit' class='icone' src='assets/images/aggiungiTabella.png' title='Conferma la nuova Tabella' style='margin-bottom:30px; align:center;' id='Conferma' onclick=creaTabella("+id_modello+");location.href='../tabella' >");
	}
}

function creaTabella(id_modello){
  var modello = richiedi_modello(id_modello);
  var dati = [] ;
	var indiceFile;
  for(var i=0; i<modello.attributi.length ; i++){
		if(modello.tipiAttributi[i]=="file"){
			dati[i] = document.getElementById("File").value.replace(/^.*\\/, '');
		}else{
    	dati[i] = document.getElementById("input"+i).value;
		}
	}
  var utente = leggiCookie('username');
  inserisci_tabella(utente,id_modello,dati);
	var name = "id_modello";

creaCookie(name,id_modello);
}
function creaCookie(name,id_modello) {
	document.cookie = name + "=" + id_modello + "; path=/";
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
			modello.tipiAttributi = data.tipiAttributi;
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

/*function aggiungiFile(id){
	creaTabella(id);
	nomeFile = document.getElementById("File").value;
	nomeFile = nomeFile.replace(/^.*\\/, '');
	$(document).ready(function() {
			var obj = {};
			obj = {
				"nome":nomeFile,
				"id":id
			};
			$.ajax({
					url: "http://localhost:8080/tabella/upload",
					type: "POST",
					contentType: "application/json",
					data: JSON.stringify(obj),
					dataType: "json"
			}).done(function (esito) {
					console.log("Esito inserimento: "+esito);
			});
	});
}*/
