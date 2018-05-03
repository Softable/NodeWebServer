function inserisci_utente() {
    $( document ).ready(function() {
        $('#signupbtn').click(function( event ) {
        var obj = {}, conf_password, password = "";

        obj['username']= document.getElementById('username').value;
        obj['nome']= document.getElementById('nome').value;
        obj['cognome']= document.getElementById('cognome').value;
        obj['email']= document.getElementById('email').value;
        obj['password']= document.getElementById('password').value;

        conf_password = document.getElementById('conf_password').value;
        if(conf_password == obj['password']) {
//BISOGNA PRENDERE IL VALORE CHE RESTITUISCE LA CHIAMATA
            $.ajax({
                url: 'http://localhost:8080/utente/inserisci',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(obj),
                dataType: 'json'
            });
        } else {
            window.location.replace("http://localhost:3000/error.html");   
        }
        });
    });
}

function elimina_utente() {
    $( document ).ready(function() {
        $('#eliminaUtente').click(function( event ) {
            var obj = "/" + String(document.getElementById('usernameDel').value);
                $.ajax({
                url: 'http://localhost:8080/utente/elimina' + obj,
                type: 'GET',
            });
        });
    });
}

function modifica_utente() {
    $( document ).ready(function() {
        $('#modificaUtente').click(function( event ) {
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