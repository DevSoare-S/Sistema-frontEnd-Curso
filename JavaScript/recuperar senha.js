window.onload = function (e) {

    var txtBotao = document.getElementById("txtBotao");

    var txtEmail = document.getElementById("txtEmailRecuperarSenha");

    txtBotao.onclick = function (e) {

        e.preventDefault();

        var email = txtEmail.value;

        if (email == "") {
            exibirMensagemErro("Email inválido");
        }

        else {
            realizarLogin(email);
        }

        function exibirMensagemErro(mensagem) {

            var txtErro = document.getElementById("txtErro");

            txtErro.innerText = mensagem;

            txtErro.style.display = "block";

            setTimeout(function () {
                txtErro.style.display = "none";
            }, 5000);
        }

        function realizarLogin(email) {
            var data = JSON.stringify({
                "email": email
            });

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {

                    var esqueceuSenha = JSON.parse(this.responseText);

                    if (esqueceuSenha.sucesso) {
                        alert('E-mail de cadastro enviado');
                    }

                    else {
                        exibirMensagemErro(result.mensagem);
                    }
                }
            });

            xhr.open("POST", "https://localhost:7113/api/usuario/esqueceuSenha");
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.send(data);
        }
    }

}