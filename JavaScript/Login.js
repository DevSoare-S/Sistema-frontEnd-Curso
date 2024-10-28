window.onload = function (e) {

    var btn1Entrar = document.getElementById("btn1Entrar");

    var txtEmail = document.getElementById("txtEmail");

    var txtSenha = document.getElementById("txtSenha");

    txtEmail.focus();

    btn1Entrar.onclick = function (e) {

        e.preventDefault();

        var email = txtEmail.value;
        var senha = txtSenha.value;

        if (email.trim() === "") {
            exibirMensagemErro("Campo E-mail obrigatório");
        }

        else if (senha.trim() === "") {
            exibirMensagemErro("Campo senha obrigatório");
        }

        else {
            realizarLogin(email, senha);

            
        }
    };

    function realizarLogin(email, senha) {

        var data = JSON.stringify({

            "email": email,
            "senha": senha

        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var loginResult = JSON.parse(this.responseText);

                if (loginResult.sucesso) {

                    localStorage.setItem("usuarioGuid", loginResult.usuarioGuid);

                    window.location.href = 'home.html';
                }

                else {
                    exibirMensagemErro(loginResult.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:7113/api/usuario/login");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }

    function exibirMensagemErro(mensagem) {

        var txtErro = document.getElementById("txtErro");

        txtErro.innerText = mensagem;

        txtErro.style.display = "block";

        setTimeout(function () {
            txtErro.style.display = "none"
        }, 5000); 
    }

}