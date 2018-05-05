function visualizza_collezione() {
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

function richiedi_modello(){
    $(document).ready(function() {
        var id_modello = document.getElementById("id_tabella").value;
        $("#tabella").ready(function( event ) {
            $.get("http://localhost:8080/tabella/richiedi/"+id_modello, function(data) {
                $(function(){
                    var jsonObj = data;
                    var table = "";
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
                    document.getElementById("tabella").innerHTML+=table;
                });
            });
        });
    });
}

function elimina_modello() {
    $(document).ready(function() {
        var obj = document.getElementById("id_tabella").value;
        $.ajax({
            url: "http://localhost:8080/tabella/elimina" + "/" + obj,
            type: "GET"
        });
    });
}
