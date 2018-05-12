function visualizza_utenti(){
  $(document).ready(function() {
    $('#tabella').ready(function( event ) {
      $.get('http://localhost:8080/utente/collezione', function(data) {
        $(function(){
          var jsonObj = data;
          var html = '';
          $.each(jsonObj, function(key, value){
            html += '<tr>';
            html += '<td>' + key + '</td>';
            html += '<td>' + $(value).attr("nome") + '</td>';
            html += '<td>' + $(value).attr("cognome") + '</td>';
            html += '<td>' + $(value).attr("email") + '</td>';
            html += '<td>' + $(value).attr("password") + '</td>';
            html += '</tr>';
          });
          $('#tabella').append(html);
        });
      });
    });
  });
}

function richiedi_utente(username) {
  var utente = {};
  $.get('http://localhost:8080/utente/richiedi/' + String(username), function(data) {
    var jsonObj = data;
    utente.username = username;
    utente.nome = $(jsonObj).attr("nome");
    utente.cognome = $(jsonObj).attr("cognome");
    utente.email = $(jsonObj).attr("email");
    utente.password = $(jsonObj).attr("password");
    return utente;
  });
  console.log(utente);
  /*$.ajax({
    url: 'http://localhost:8080/utente/richiedi/' + String(username),
    type: 'GET',
    async: false,
    success: function(data) {
      var jsonObj = data;
      utente.username = username;
      utente.nome = jsonObj.nome;//$(jsonObj).attr("nome");
      utente.cognome = jsonObj.cognome;//$(jsonObj).attr("cognome");
      utente.email = jsonObj.email;//$(jsonObj).attr("email");
      utente.password = jsonObj.password;//$(jsonObj).attr("password");
      console.log(utente);
    }
  })*/
  return utente;
}

function inserisci_utente() {
  $(document).ready(function() {

    var obj = {}, confPassword;

    obj['username'] = document.getElementById('username').value;
    obj['nome'] = document.getElementById('nome').value;
    obj['cognome'] = document.getElementById('cognome').value;
    obj['email'] = document.getElementById('email').value;
    obj['password'] = document.getElementById('password').value;

    confPassword = document.getElementById('conf_password').value;

    if (confPassword == obj['password']) {
      $.ajax({
        url: 'http://localhost:8080/utente/inserisci',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(obj),
        dataType: 'json'
      }).done(function (esito) {
        if (esito)
          window.location.replace("/tabella");
        else
          window.location.replace("/error1");
      });
    } else
      window.location.replace("/error2");


  });
}

function modifica_utente() {
  $(document).ready(function() {
    var obj = {};
    obj['username']= document.getElementById('usernameMod').value;
    obj['nome']= document.getElementById('nomeMod').value;
    obj['cognome']= document.getElementById('cognomeMod').value;
    obj['email']= document.getElementById('emailMod').value;
    obj['password']= document.getElementById('passMod').value;
    $.ajax({
        url: 'http://localhost:8080/utente/modifica',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(obj),
        dataType: 'json'
    }).done(function (esito) {
      alert("Esito modifica: "+esito);
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
        alert("Esito eliminazione: "+esito);
      });
    });
}

function accedi_utente() {
  var username, password, utente;

  username = document.getElementById("username").value;
  password = document.getElementById("password").value;

  utente = richiedi_utente(username);
  console.log(utente);

  if (utente['password'] == password)
     window.location.replace("/tabella");
  //else
    //  window.location.replace("/error");

}
