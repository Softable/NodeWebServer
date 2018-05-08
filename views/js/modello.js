function visualizza_modelli() {
  $(document).ready(function() {
      $("#tabella").ready(function( event ) {
          $.get("http://localhost:8080/modello/collezione", function(data) {
              $(function(){
                  var jsonObj = data;
                  var table = "";
                  $.each(jsonObj, function(key, value){
                      table += "<tr>";
                      table += "<td>" + key + "</td>";
                      table += "<td>" + $(value).attr("id_modello") + "</td>";
                      table += "<td>" + $(value).attr("nome_modello") + "</td>";
                      table += "<td><select>";
                      for (var i = 0; i < $(value).attr("attributi").length; i++)
                          table += "<option>" + $(value).attr("attributi")[i] + "</option>";
                      table += "</select></td>";
                      table += "</tr>";
                  });
                  $("#tabella").append(table);
              });
          });
      });
  });
}

function richiedi_modello(){
    $(document).ready(function() {
        var id_modello = document.getElementById("id_modello").value;
        $("#tabella").ready(function( event ) {
            $.get("http://localhost:8080/modello/richiedi/"+id_modello, function(data) {
                $(function(){
                    var jsonObj = data;
                    var table = "";
                    table += "<tr>";
                    table += "<td>" + $(jsonObj).attr("id_modello") + "</td>";
                    table += "<td>" + $(jsonObj).attr("nome_modello") + "</td>";
                    table += "<td><select>";
                    for (var i = 0; i < $(jsonObj).attr("attributi").length; i++)
                        table += "<option>" + $(jsonObj).attr("attributi")[i] + "</option>";
                    table += "</select></td>";
                    table += "</tr>";
                    document.getElementById("tabella").innerHTML+=table;
                });
            });
        });
    });
}

function inserisci_modello() {
    $(document).ready(function() {
        var obj = {}, attributi = [];

        for (var i = 0; i < document.getElementsByName('att').length; i++)
            attributi[i] = document.getElementsByName('att')[i].value;
        obj = {
          "id_modello" : 0,
          "nome_modello" : document.getElementById('nome').value,
          "attributi" : attributi
        };
        $.ajax({
            url: "http://localhost:8080/modello/inserisci",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(obj),
            dataType: "json"
        }).done(function (esito) {
        alert("Esito inserimento: "+esito);
        });
    });
}

function modifica_modello() {
  $(document).ready(function() {
    var obj = {}, attributi = [];

    for (var i = 0; i < document.getElementsByName('att').length; i++)
        attributi[i] = document.getElementsByName('att')[i].value;

    obj = {
        "id_modello" : parseInt(document.getElementById("id_modello").value),
        "nome_modello" : document.getElementById("nome_modello").value,
        "attributi" : attributi
    };

    $.ajax({
        url : "http://localhost:8080/modello/modifica",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(obj),
        dataType: "json"
      }).done(function (esito) {
        alert("Esito modifica: "+esito);
      });
  });
}

function elimina_modello() {
  $(document).ready(function() {
    var obj = document.getElementById("id_modello").value;
    $.ajax({
        url: "http://localhost:8080/modello/elimina" + "/" + obj,
        type: "GET"
      }).done(function (esito) {
        alert("Esito eliminazione: "+esito);
      });
    });
}
