function visualizza_modelli() {
  var modelli = [];
  $.ajax({
    url: 'http://localhost:8080/modelli/collezione',
    type: 'GET',
    async: false,
    success: function(data) {
      data.forEach(function(modello) {
        modelli.push(modello);
      });
  });
  return modelli;
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
        for (var i = 0; i < document.getElementsByName('att').length; i++)
            attributi[i] = document.getElementsByName('att')[i].value;
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
    for (var i = 0; i < document.getElementsByName('att').length; i++)
        attributi[i] = document.getElementsByName('att')[i].value;
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

function elimina_modello() {
  $(document).ready(function() {
    var id_modello = document.getElementById("id_modello").value;
    $.ajax({
        url: "http://localhost:8080/modello/elimina" + "/" + id_modello,
        type: "GET"
      }).done(function (esito) {
        alert("Esito eliminazione: "+esito);
      });
    });
}
