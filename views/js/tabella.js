function visualizza_tabelle() {
    $(document).ready(function() {
        $("#tabella").ready(function( event ) {
            $.get("http://localhost:8080/tabella/collezione", function(data) {
                $(function(){
                    var jsonObj = data;
                    var table = "";
                    $.each(jsonObj, function(key, value){
                        table += "<tr>";
                        table += "<td>" + key + "</td>";
                        table += "<td>" + $(value).attr("id_tabella") + "</td>";
                        table += "<td>" + $(value).attr("username_utente") + "</td>";
                        table += "<td>" + $(value).attr("id_modelloTabella") + "</td>";
                        table += "<td><select>";
                        for (var i = 0; i < $(value).attr("tabella").length; i++)
                            table += "<option>" + $(value).attr("tabella")[i] + "</option>";
                        table += "</select></td>";
                        table += "</tr>";
                    });
                    $("#tabella").append(table);
                });
            });
        });
    });
}

function richiedi_tabella(){
    $(document).ready(function() {
        var id_tabella = document.getElementById("id_tabella").value;
        $("#tabella").ready(function( event ) {
            $.get("http://localhost:8080/tabella/richiedi/"+id_tabella, function(data) {
                $(function(){
                    var value = data;
                    var table = "";
                    table += "<tr>";
                    table += "<td>" + $(value).attr("id_tabella") + "</td>";
                    table += "<td>" + $(value).attr("username_utente") + "</td>";
                    table += "<td>" + $(value).attr("id_modelloTabella") + "</td>";
                    table += "<td><select>";
                    for (var i = 0; i < $(value).attr("tabella").length; i++)
                        table += "<option>" + $(value).attr("tabella")[i] + "</option>";
                    table += "</select></td>";
                    table += "</tr>";
                    document.getElementById("tabella").innerHTML+=table;
                });
            });
        });
    });
}

function inserisci_tabella() {
    $(document).ready(function() {
        var obj = {}, dati = [];

        for (var i = 0; i < document.getElementsByName('dati').length; i++)
            dati[i] = document.getElementsByName('dati')[i].value;
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

    for (var i = 0; i < document.getElementsByName('dati').length; i++)
        dati[i] = document.getElementsByName('dati')[i].value;

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
