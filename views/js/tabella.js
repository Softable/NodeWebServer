<<<<<<< HEAD
=======
function visualizza_tabelle() {
  var tabelle = [];
  $.ajax({
    url: 'http://localhost:8080/tabella/collezione',
    type: 'GET',
    async: false,
    success: function(data) {
      data.forEach(
		  function(tabella) {
        	tabelle.push(tabella);
      	  }
	  );
	}
  });
  return tabelle;
}

>>>>>>> ed1fcc7f03b04e09a8dd4e560700d367f569165d
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

function inserisci_tabella() {
    $(document).ready(function() {
        var obj = {}, dati = [];
        for (var i = 0; i < document.getElementsByName('dati').length; i++) {
            dati[i] = document.getElementsByName('dati')[i].value;
		}
        obj = {
          "id_tabella" : 0,
          "username_utente" : document.getElementById('username').value,
          "id_modelloTabella" : document.getElementById('modello').value,
          "tabella" : dati
        };
        $.ajax({
            url: "http://localhost:8080/tabella/inserisci",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(obj),
            dataType: "json"
        }).done(function (esito) {
            alert("Esito inserimento: "+esito);
        });
    });
}

function modifica_tabella() {
    $(document).ready(function() {
        var obj = {}, dati = [];
        for (var i = 0; i < document.getElementsByName('dati').length; i++) {
            dati[i] = document.getElementsByName('dati')[i].value;
		}
        obj = {
            "id_tabella" : parseInt(document.getElementById("id_tabella").value),
            "username_utente": document.getElementById("username").value,
            "id_modelloTabella": document.getElementById("id_modelloTabella").value,
            "tabella" : dati
        };
        $.ajax({
            url : "http://localhost:8080/tabella/modifica",
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(obj),
            dataType: "json"
        }).done(function (esito) {
            alert("Esito modifica: "+esito);
        });
    });
}

function elimina_tabella() {
    $(document).ready(function() {
        var obj = document.getElementById("id_tabella").value;
        $.ajax({
            url: "http://localhost:8080/tabella/elimina" + "/" + obj,
            type: "GET"
        }).done(function (esito) {
          alert("Esito eliminazione: "+esito);
        });
    });
}
