$(document).ready(function() {
    // Largura da porção visível da página
    let viewportWidth = $(window.width);
    // Menu dropdown
    let dropdownButtons = $(".dropdownMenu > div button");
    let sections = $("body main section");

    // Botão para ativar o menu dropdown
    $("button#dropdownMenu").click(function() {
        if (viewportWidth <= 768 && viewportWidth > 425) {
            if ($(".dropdownMenu").css("display") == "none") {
                $(".headerButtons").animate({
                    right: `+=${$(".dropdownMenu").outerWidth(true)}`
                }, 100);
            } else {
                $(".headerButtons").animate({
                    right: `-=${$(".dropdownMenu").outerWidth(true)}`
                }, 100);
            }
        }
        
        $(".dropdownMenu").slideToggle(100, function() {
            if ($(".dropdownMenu").css("display") != "none") 
                $("button#dropdownMenu").css("background-color", "white");
            else 
                $("button#dropdownMenu").css("background-color", "transparent");
        });
    });

    // Descendo até a respectiva seção
    for(let i = 1; i < sections.length; i++) {
        $(dropdownButtons[i-1]).click(function() {
            $("html, body").animate({
                scrollTop: $(sections[i]).offset().top
            }, "quick");
            $(".dropdownMenu").slideUp(100);
            $("button#dropdownMenu").css("background-color", "transparent");
        });
    }
    
    // Ao clicar fora do menu dropdown, ele se esconderá
    $(document).click(function (e) { 
        if (e.target.id != "dropdownMenu" && $(e.target).closest(".dropdownMenu").length === 0) {
            $(".dropdownMenu").slideUp(100);
            $("button#dropdownMenu").css("background-color", "transparent"); 
            if ($(".headerButtons").css("right") !== '0px') { 
                $(".headerButtons").animate({ 
                    right: `-=${$(".dropdownMenu").outerWidth(true)}`
                }, 100);
            }
        }
    }); 

    // Fechar o menu quando o botão de fechar for clicado 
    $(".dropdownMenu button.exit").click(function() {
        $(".dropdownMenu").slideUp(100, function() {
            $("header .headerButtons button#dropdownMenu").css("background-color", "transparent");
        });
    });
})