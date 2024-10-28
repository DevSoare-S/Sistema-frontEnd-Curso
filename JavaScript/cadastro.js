window.onload = function (e) {

    var txtBotao = document.getElementById("txtBotao");

    var txtNome = document.getElementById("txtNome");

    var txtSobrenome = document.getElementById("txtSobrenome");

    var txtEmailCadastro = document.getElementById("txtEmailCadastro");

    var txtSenhaCadastro = document.getElementById("txtSenhaCadastro");

    var txtCpf = document.getElementById("txtCpf");

    var txtTelefone = document.getElementById("txtTelefone");

    var slc1 = document.getElementById("slc1");

    txtNome.focus();

    txtBotao.onclick = function (e) {

        e.preventDefault();

        var nome = txtNome.value;

        var sobrenome = txtSobrenome.value;

        var email = txtEmailCadastro.value;

        var senha = txtSenhaCadastro.value;

        var cpf = txtCpf.value;

        var telefone = txtTelefone.value;

        var genero = slc1.value;

        if (nome == "") {
            exibirMensagemErro("Informe o nome");
        }

        else if (sobrenome == "") {
            exibirMensagemErro("Informe sobrenome");
        }

        else if (email == "") {
            exibirMensagemErro("Informe o email");
        }

        else if (senha == "") {
            exibirMensagemErro("Informe a senha");
        }

        else if (cpf == "") {
            exibirMensagemErro("Informe o cpf");
        }

        else if (telefone == "") {
            exibirMensagemErro("Informe o telefone");
        }

        else {
            cadastrar(nome, sobrenome, email, senha, cpf, telefone, genero);
        }

        function exibirMensagemErro(mensagem) {

            var spnErro = document.getElementById("spnErro");

            spnErro.innerText = mensagem;

            spnErro.style.display = "block";

            setTimeout(function () {
                spnErro.style.display = "none";
            }, 5000);
        }

        function cadastrar(nome, sobrenome, email, senha, cpf, telefone, slc1) {

            var data = JSON.stringify({
                "nome": nome,
                "sobrenome": sobrenome,
                "telefone": telefone,
                "genero": genero,
                "email": email,
                "senha": senha
            });

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {

                    var result = JSON.parse(this.responseText);

                    if (result.sucesso) {

                        localStorage.setItem("usuarioGuid", result.usuarioGuid);

                        window.location.href = "home.html";
                    }
                    else {
                        exibirMensagemErro(result.mensagem);
                    }
                }
            });

            xhr.open("POST", "https://localhost:7113/api/usuario/cadastro");
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.send(data);
        }
    }
}