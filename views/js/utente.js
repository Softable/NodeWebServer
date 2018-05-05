function visualizza_utenti(){
  $( document ).ready(function() {
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

function richiedi_utente() {
    $( document ).ready(function() {
        $('#tabella').ready(function( event ) {
            var obj = "/" + String(document.getElementById('usernameGET').value);
            $.get('http://localhost:8080/utente/richiedi'+obj, function(data) {
                $(function(){
                    var jsonObj = data;
                    var html = '';
                    html += '<tr>';
                    html += '<td>' + $(jsonObj).attr("username") + '</td>';
                    html += '<td>' + $(jsonObj).attr("nome") + '</td>';
                    html += '<td>' + $(jsonObj).attr("cognome") + '</td>';
                    html += '<td>' + $(jsonObj).attr("email") + '</td>';
                    html += '<td>' + $(jsonObj).attr("password") + '</td>';
                    html += '</tr>';
                    $('#tabella').append(html);
                });
            });
        });
    });
}

function inserisci_utente() {
  $( document ).ready(function() {
    var obj = {};
    obj['username']= document.getElementById('usernameAdd').value;
    obj['nome']= document.getElementById('nomeAdd').value;
    obj['cognome']= document.getElementById('cognomeAdd').value;
    obj['email']= document.getElementById('emailAdd').value;
    obj['password']= document.getElementById('passAdd').value;
    $.ajax({
      url: 'http://localhost:8080/utente/inserisci',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(obj),
      dataType: 'json'
    }).done(function (esito) {
      alert("Esito inserimento: "+esito);
    });
  });
}

function modifica_utente() {
  $( document ).ready(function() {
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
    $( document ).ready(function() {
      var obj = "/" + String(document.getElementById('usernameDel').value);
      $.ajax({
      url: 'http://localhost:8080/utente/elimina' + obj,
      type: 'GET',
      }).done(function (esito) {
        alert("Esito eliminazione: "+esito);
      });
    });
}

function accedi_utente(username, password) {
    $(document).ready(function() {
        var obj = {};
        $.get("http://localhost:8080/utente/richiedi/" + username, function(data) {
            $(function(){
                var jsonObj = data;
                obj['username'] = $(jsonObj).attr("username");
                obj['password'] = $(jsonObj).attr("password");
            });
        });
        if (obj['username'] == username && obj['password'] == password) {
            window.location.replace("http://localhost:3000/index.html");
        } else {
            window.location.replace("http://localhost:3000/error.html");
        }
    });
}
