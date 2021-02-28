$(document).ready(function() {
    function showContactModal() {
        $(".contactModalProtector").fadeIn(100);
        $(".contactModal").fadeIn(100);
        $("html, body").css("overflow-y", "hidden");
    }

    function hideContactModal() {
        $(".contactModalProtector").fadeOut(100);
        $(".contactModal").fadeOut(100);
        $(".contactResponseModal").fadeOut(100);
        $("html, body").css("overflow-y", "auto");
    }

    $("button#moreInfo").click(showContactModal);
    $(".contactModal button.close").click(hideContactModal);
    $(".contactModalProtector").click(hideContactModal);

    var nameFailed = false,
        emailFailed = false,
        phoneFailed = false;
    let nameInput = $(".contactModal #contactName"), 
        emailInput = $(".contactModal #contactEmail"), 
        phoneInput = $(".contactModal #contactPhone");

    // Validando os campos
    function testPattern(input, pattern) {
        if (pattern.test($(input).val())) {
            $(`label[for = ${$(input).attr("id")}]`).css("background-color", "#000");
            $(input).css("border-color", "#555555");
            return true;
        }

        $(`label[for = ${$(input).attr("id")}]`).css("background-color", "var(--red)");
        $(input).css("border-color", "var(--red)");
        return false;
    }
    
    nameInput.keyup(function() {
        let regex = /^[a-zA-Z]{2,}\ [a-zA-Z ]{2,}$/;
        nameFailed = !testPattern($(this), regex);
    });

    phoneInput.keyup(function() {
        let regex = /^(\([0-9]{2}\)\ 9\ [0-9]{4}\-[0-9]{4})|(\([0-9]{2}\)\ [0-9]{4}\-[0-9]{4})$/
        phoneFailed = !testPattern($(this), regex);
    });

    emailInput.keyup(function() {
        let regex = /^[^\ ]{2,}\@[a-zA-Z\.\_]{2,}\.+.{2,}$/
        emailFailed = !testPattern($(this), regex);
    });

    function showFormErrors(input, label) {
        let initialText = $(label).html();
        $(label).html("Preencha aqui corretamente!");
        $(label).css("background-color", "var(--red)");
        $(input).css("border-color", "var(--red)");
        for(let i = 0; i < 3; i++) {
            $(label).animate({
                opacity: '0.5'
            },300).animate({
                opacity: '1'
            }, 300, function() {
                if (i == 2) {
                    $(label).html(initialText);
                    $(input).css("border-color", "#555");
                    $(label).css("background-color", "#000");
                }
            });
        }
    }
    
    function showRequestResult(result) {
        if (result) {
            $(".contactResponseModal > img").attr("src", "assets/svg/formation.svg");
            $(".contactResponseModal div h3").text("O formulário foi enviado com sucesso!");
            $(".contactResponseModal div p").text(`Obrigado por entrar em contato.`);
            $(".contactResponseModal button.lemon").css({
                "background-color": "var(--lemon)",
                "color": "#000" 
            });
            return;
        } 

        // Envio para o servidor sucedeu, preciso avisar
        $(".contactResponseModal > img").attr("src", "assets/svg/fail.svg");
        $(".contactResponseModal div h3").text("O formulário não pode ser enviado...");
        $(".contactResponseModal div p").text(`Por favor, tente novamente mais tarde.`);
        $(".contactResponseModal button.lemon").css({
            "background-color": "var(--red)",
            "color": "#FFF" 
        });
    }

    // Enviando formulário
    $(".contactModal button#submitMessage").click(function() {
        if(!nameFailed && nameInput.val().trim().length && 
            !emailFailed && emailInput.val().trim().length && 
            !phoneFailed && phoneInput.val().trim().length) {
            $.post("main.php", {
                contactName: $(".contactModal #contactName").val().trim(),
                contactEmail: $(".contactModal #contactEmail").val().trim(),
                contactPhone: $(".contactModal #contactPhone").val().trim(),
                contactMessage: $(".contactModal #contactMessage").val().trim()
            }, function(data, status) {
                $(".contactModal").fadeOut(100);
                if (status === "success") {
                    // Envio para o servidor sucedeu
                    showRequestResult(true);
                } else {
                    // Envio para o servidor não sucedeu
                    showRequestResult(false);
                }
                $(".contactResponseModal").fadeIn(100).css("display", "flex");
            }).fail(function() {
                showRequestResult(false);
            })
        } else {
            if(nameFailed || !nameInput.val().trim().length) 
                showFormErrors(nameInput, $(".contactModal label[for = 'contactName']"));
            if(emailFailed || !emailInput.val().trim().length)
                showFormErrors(emailInput, $(".contactModal label[for = 'contactPhone']"));
            if(phoneFailed || !phoneInput.val().trim().length) 
                showFormErrors(phoneInput, $(".contactModal label[for = 'contactEmail']"));
        }
    });

    $(".contactResponseModal button.lemon").click(function() {
        $(".contactModalProtector").fadeOut(100);
        $(".contactResponseModal").fadeOut(100);
        $("html, body").css("overflow-y", "auto");
    })
});