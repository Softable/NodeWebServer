function visualizza_utenti(){
  var utenti = [];
  $.ajax({
    url: 'http://localhost:8080/utente/collezione',
    type: 'GET',
    async: false,
    success: function(data) {
      data.forEach(
		function(utente) {
			utenti.push(utente);
		}
	  );
	}
  });
  return utenti;
}

function richiedi_utente(username) {
  var utente = {};
  $.ajax({
    url: 'http://localhost:8080/utente/richiedi/' + String(username),
    type: 'GET',
    async: false,
    success: function(data) {
      utente.username = username;
      utente.nome = data.nome;
      utente.cognome = data.cognome;
      utente.email = data.email;
      utente.password = data.password;
    }
  });
  return utente;
}

function inserisci_utente() {
  $(document).ready(function() {
    var utente = {}, confPassword;
    utente.username = document.getElementById('reg_username').value;
    utente.nome = document.getElementById('nome').value;
    utente.cognome = document.getElementById('cognome').value;
    utente.email = document.getElementById('email').value;
    utente.password = document.getElementById('reg_password').value;
    confPassword = document.getElementById('conf_password').value;
    if (confPassword == utente.password) {
      $.ajax({
        url: 'http://localhost:8080/utente/inserisci',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(utente),
        dataType: 'json'
      }).done(function (esito) {
        if (esito) {
          window.location.replace("/tabella");
		} else {
          window.location.replace("/error1");
		}
      });
    } else {
      window.location.replace("/error2");
	}
  });
}

function modifica_utente() {
  $(document).ready(function() {
    var obj = {};
    obj.username = document.getElementById('usernameMod').value;
    obj.nome = document.getElementById('nomeMod').value;
    obj.cognome = document.getElementById('cognomeMod').value;
    obj.email = document.getElementById('emailMod').value;
    obj.password = document.getElementById('passMod').value;
    $.ajax({
        url: 'http://localhost:8080/utente/modifica',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(obj),
        dataType: 'json'
    }).done(function (esito) {
      alert("Esito modifica: "+ esito);
    });
  });
}

function elimina_utente() {
    $(document).ready(function() {
      var obj = "/" + String(document.getElementById('usernameDel').value);
      $.ajax({
      url: 'http://localhost:8080/utente/elimina' + obj,
      type: 'GET',
      }).done(function (esito) {
        alert("Esito eliminazione: " + esito);
      });
    });
}

function accedi_utente() {
  var username, password, utente;

  username = document.getElementById("username").value;
  password = document.getElementById("password").value;

  utente = richiedi_utente(username);
  console.log(utente);

  if (utente.password == password) {
    window.location.replace("/tabella");
  } else {
    window.location.replace("/error");
  }
}
