var viewportWidth;
var scrollVideosCount = 0; 

$(document).ready(function() {
    // Largura da página na tela
    let viewportWidth = $(window).width();
    
    // Preparações iniciais para scroll
    $(window).on("load resize", function() {
        scrollVideosPrepare();
        if(viewportWidth <= 1280)
            scrollStagesPrepare();
        if(viewportWidth <= 1080) {
            scrollItemsPrepare(); 
            scrollFormationsPrepare();
        }

        if($(this).scrollTop() > 0) 
            $("button.backToTheTop").show();
        else 
            $("button.backToTheTop").hide();
    });

    function scrollVideosPrepare() {
        let videos = $("section.tenth .leftDark .depositions .videos .video");
        let videosConteiner = $("section.tenth .leftDark .depositions .videos");
        
        videos.animate({
            bottom: '0px'
        }, 1);

        let newHeight = 0;
        if (viewportWidth <= 1080) {
            videos.css("display", "flex");
            newHeight = $(videos[0]).outerHeight();
        } else {
            for(let i = 0; i <= 2 && i < videos.length; i++)
                if (i % 2) 
                    newHeight += $(videos[i]).outerHeight(true);
                else 
                    newHeight += $(videos[i]).outerHeight();
        }
            
        videosConteiner.height(newHeight);
    }

    function scrollItemsPrepare() {
        let items = $("section.fourth .corpse .items .item");
        items.css("right", "0px");
    }

    function scrollStagesPrepare() {
        let stages = $("section.sixth .subscribePath div .subscribeStages .subscribeStage");
    }

    function scrollFormationsPrepare() {
        let formations = $("section.eigth > div:last-child .formations > div");
        formations.css("right", "0px");
    }

    // Botão para voltar ao topo
        // Aparece somente quando a página não estiver no topo
    $(window).scroll(function() {
        if($(this).scrollTop() > 0) 
            $("button.backToTheTop").show();
        else 
            $("button.backToTheTop").hide();
    });

    $("button.backToTheTop").click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 200);
    });

    // Movimentar os vídeos somente quando a quantidade exceder a altura do contêiner
    function scrollVideos(scrollTo) {
        let videosConteiner = $("section.tenth .leftDark .depositions .videos");
        let videos = $("section.tenth .leftDark .depositions .videos .video");
        let currentVideo = $(videos[scrollVideosCount]);
        let scrollLength = currentVideo.outerHeight(true);
        
        let maxScroll = 0;
        let i;
        for(i = 0; i < $(videos).length - 3; i++)
            maxScroll += $(videos[i]).outerHeight(true) - Number($(videos[i]).css("margin-top").replace("px", ""));

        if (viewportWidth <= 1080) {
            if (scrollTo === "up") {
                if (scrollVideosCount === 0) {
                    videos.animate({
                        bottom: `${maxScroll}px`
                    });
                    scrollVideosCount = $(videos).length - 1;
                    videosConteiner.height($(videos[scrollVideosCount]).outerHeight());
                } else {
                    let previousVideo = $(videos[scrollVideosCount-1]);
                    videosConteiner.height(previousVideo.outerHeight(true));
                    videos.animate({
                        bottom: `-=${previousVideo.outerHeight(true)}px`
                    });
                    scrollVideosCount--;
                }
            } else {
                if (scrollVideosCount + 1 == $(videos).length) {
                    videos.animate({
                        bottom: '0px'
                    });
                    scrollVideosCount = 0;
                    videosConteiner.height($(videos[scrollVideosCount]).outerHeight());
                } else {
                    let nextVideo = $(videos[scrollVideosCount+1]);
                    videosConteiner.height(nextVideo.outerHeight(true));
                    videos.animate({
                        bottom: `+=${scrollLength}px`
                    });

                    scrollVideosCount++;
                }
            }
        } else {
            if (scrollTo === "up") {
                if (scrollVideosCount === 0) {
                    videos.animate({
                        bottom: `${maxScroll}px`
                    });

                    scrollVideosCount = $(videos).length - 3;
                } else {
                    videos.animate({
                        bottom: `-=${currentVideo.outerHeight(true) - Number(currentVideo.css("margin-top").replace("px", ""))}px`
                    });
                    scrollVideosCount--;
                }
            } else {
                if (scrollVideosCount + 3 == $(videos).length) {
                    videos.animate({
                        bottom: '0px'
                    });

                    scrollVideosCount = 0;
                } else {
                    videos.animate({
                        bottom: `+=${currentVideo.outerHeight(true) - Number(currentVideo.css("margin-top").replace("px", ""))}px`
                    });

                    scrollVideosCount++;
                }
            }

            let newConteinerHeight = 0;
            for(let i = 0; i < 3; i++) {
                if (i % 2)
                    newConteinerHeight += $(videos[scrollVideosCount + i]).outerHeight(true);
                else 
                    newConteinerHeight += $(videos[scrollVideosCount + i]).outerHeight();
            }
            videosConteiner.height(newConteinerHeight);
        }

    }

    $("section.tenth button#scrollVideosUp").click(function() {
        scrollVideos("up");
    });

    $("section.tenth button#scrollVideosDown").click(function() {
        scrollVideos("down");
    });

    if(viewportWidth <= 1280) {
        // É preciso tornar os botões das etapas de inscrição operáveis
            // Eles precisam fazer todos as caixas de tipo subscribeStage
            // andarem para a esquerda ou para a direita

        function scrollStages(scrollTo) {
            let subscribeStages = $("section.sixth .subscribeStage");

            let stagesHorizontalMargin = Number(subscribeStages.css("margin-left").replace("px", ""));
            stagesHorizontalMargin += Number(subscribeStages.css("margin-right").replace("px", ""));

            let greyDotsSets = $("section.sixth .subscribeStages > img");
            let dotsSetsHorizontalMargin = Number($("section.sixth .subscribeStages > img").css("margin-left").replace("px", ""));
            dotsSetsHorizontalMargin += Number($("section.sixth .subscribeStages > img").css("margin-right").replace("px", ""));

            let maxScroll = subscribeStages.width() * (subscribeStages.length - 1);
            maxScroll += stagesHorizontalMargin * (subscribeStages.length - 1);
            if (greyDotsSets.css("display") !== "none") {
                maxScroll += greyDotsSets.width() * greyDotsSets.length;
                maxScroll += dotsSetsHorizontalMargin * greyDotsSets.length;
            }
            maxScroll += $(".subscribeStage:last-child").width();
            maxScroll += Number($(".subscribeStage:last-child").css("margin-left").replace("px", ""));
            maxScroll += Number($(".subscribeStage:last-child").css("margin-right").replace("px", ""));
            maxScroll -= $("section.sixth .subscribeStages").width();

            let alreadyScrolled = Number(subscribeStages.css("right").replace("px", ""));

            let scrollLengthRight = $("section.sixth .subscribeStages").width() <  (maxScroll - alreadyScrolled) ? $("section.sixth .subscribeStages").width() : (maxScroll - alreadyScrolled);
            let scrollLengthLeft = $("section.sixth .subscribeStages").width() < alreadyScrolled ? $("section.sixth .subscribeStages").width() : alreadyScrolled;
            
            if (scrollTo === "left") {
                    if (alreadyScrolled) {
                    subscribeStages.animate({
                        right: `-=${scrollLengthLeft}px`
                    }, 100);
                    greyDotsSets.animate({
                        right: `-=${scrollLengthLeft}px`
                    }, 100);
                }
                else {
                    subscribeStages.animate({
                        right: `+=${maxScroll}px`
                    }, 100);
                    greyDotsSets.animate({
                        right: `+=${maxScroll}px`
                    }, 100);
                }
            } else {
                if (alreadyScrolled - maxScroll < -0.1 || alreadyScrolled - maxScroll > 0.1) {
                    subscribeStages.animate({
                        right: `+=${scrollLengthRight}px`
                    }, 100);
                    greyDotsSets.animate({
                        right: `+=${scrollLengthRight}px`
                    }, 100);
                }
                else {
                    subscribeStages.animate({
                        right: `0px`
                    }, 100);
                    greyDotsSets.animate({
                        right: `0px`
                    }, 100);

                }
            }
        }

        $("section.sixth button#scrollStagesLeft").click(function() {
            scrollStages("left");
        });

        $("section.sixth button#scrollStagesRight").click(function() {
            scrollStages("right");
        });
    }

    if(viewportWidth <= 1080) {
        // É preciso tornar os botões dos itens operáveis também 
        function scrollItems(scrollTo) {
            let items = $("section.fourth .corpse > div .items .item");
            let itemHorizontalMargin = Number(items.css("margin-left").replace("px", ""));
            itemHorizontalMargin += Number(items.css("margin-right").replace("px", ""));

            let maxScroll = items.width() * items.length; 
            maxScroll += itemHorizontalMargin * items.length;
            maxScroll -= $("section.fourth .corpse > div .items").width();

            alreadyScrolled = Number(items.css("right").replace("px", "")); 
            
            let scrollLengthRight = $("section.fourth .corpse > div .items").width() < (maxScroll - alreadyScrolled) ? $("section.fourth .corpse > div .items").width() : (maxScroll - alreadyScrolled);
            let scrollLengthLeft = $("section.fourth .corpse > div .items").width() < alreadyScrolled ? $("section.fourth .corpse > div .items").width() : alreadyScrolled;

            if (scrollTo === "left") {
                if (alreadyScrolled) {
                    items.animate({
                        right: `-=${scrollLengthLeft}px`
                    }, 100);
                }
                else {
                    items.animate({
                        right: `+=${maxScroll}px`
                    }, 100);
                }
            } else {
                if (alreadyScrolled - maxScroll < -0.1 || alreadyScrolled - maxScroll > 0.1) {
                    items.animate({
                        right: `+=${scrollLengthRight}px`
                    }, 100);
                }
                else {
                    items.animate({
                        right: `0px`
                    }, 100);
                }
            }
        }

        $("section.fourth button#scrollItemsLeft").click(function() {
            scrollItems("left");
        });

        $("section.fourth button#scrollItemsRight").click(function() {
            scrollItems("right");
        });

        function scrollFormations(scrollTo) {
            let formations = $("section.eigth div:last-child .formations > div");
            let formationHorizontalMargin = Number(formations.css("margin-left").replace("px", ""));
            formationHorizontalMargin += Number(formations.css("margin-right").replace("px", ""));

            let maxScroll = formations.width() * formations.length; 
            maxScroll += formationHorizontalMargin * formations.length;
            maxScroll -= $("section.eigth div:last-child .formations").width();

            alreadyScrolled = Number(formations.css("right").replace("px", "")); 
            
            let scrollLengthRight = $("section.eigth div:last-child .formations").width() < (maxScroll - alreadyScrolled) ? $("section.eigth div:last-child .formations").width() : (maxScroll - alreadyScrolled);
            let scrollLengthLeft = $("section.eigth div:last-child .formations").width() < alreadyScrolled ? $("section.eigth div:last-child .formations").width() : alreadyScrolled;

            if (scrollTo === "left") {
                if (alreadyScrolled) {
                    formations.animate({
                        right: `-=${scrollLengthLeft}px`
                    }, 100);
                }
                else {
                    formations.animate({
                        right: `+=${maxScroll}px`
                    }, 100);
                }
            } else {
                if (alreadyScrolled - maxScroll < -0.1 || alreadyScrolled - maxScroll > 0.1) {
                    formations.animate({
                        right: `+=${scrollLengthRight}px`
                    }, 100);
                }
                else {
                    formations.animate({
                        right: `0px`
                    }, 100);
                }
            }
        } 

        $("section.eigth button#scrollFormationsLeft").click(function() {
            scrollFormations("left");
        });

        $("section.eigth button#scrollFormationsRight").click(function() {
            scrollFormations("right");
        });
    }
});