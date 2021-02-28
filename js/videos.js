$(document).ready(function() {
    // Botões sobre os vídeos devem reproduzi-los

    let playButtons = $("section.tenth .leftDark .videos .video div");
    let videos = $("section.tenth .leftDark .videos .video > video");

    for(let i = 0; i < videos.length; i++) {
        $(playButtons[i]).click(function() {
            $(videos[i]).trigger("play");
            $(videos[i]).attr("controls", "true");
            $(this).hide();
        });

        $(videos[i]).on('pause', function() {
            $(playButtons[i]).show();
            $(this).removeAttr("controls");
        });
    }

    $("section.tenth .leftDark .controls > button").click(function() {
        $(videos).trigger("pause");
    });
});