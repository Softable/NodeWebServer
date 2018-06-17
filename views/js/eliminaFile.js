function eliminaFile(){
	$(document).ready(function() {
			$.ajax({
					url: "http://localhost:8080/tabella/eliminaTuttiFile",
					type: "POST",
					contentType: "application/json",
					dataType: "json"
			}).done(function (esito) {
					console.log("Esito fileDrop: "+esito);
			});
	});
}
