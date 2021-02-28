# Avaliação de estagiário front-end KBR TEC

Este repositório foi criado para conter o meu desenvolvimento do teste para a vaga de estagiário *front-end* para a KBR TEC ─ empresa de criação de sites de Santos (SP, Brasil).

## Sobre o desenvolvimento do projeto

O projeto foi desenvolvido utilizando HTML, CSS, JS com *framework* jQuery, PHP e MySQL. O documento HTML está contido em `index.html`. As folhas de estilo CSS estão todas contidas na pasta `css`. Os *scripts* JavaScript estão na pasta `js`. As imagens (`.png`, `.svg`), as fontes (`.otf`) e os vídeos (`.mp4`) contidos na pasta `assets`. 

Vale notar que o sistema operacional utilizado para desenvolvimento foi o Ubuntu 20.04 LTS. Realizei testes nos navegadores Google Chrome, Mozila Firefox e Microsoft Edge (Windows 10 x64) e, em dispositivos Android, no Google Chrome. Utilizei a ferramenta *devTools* do Google Chrome para verificar responsividade do *layout* da página nas principais resoluções ─ de fato, dediquei atenção somente á largura do dispositivo.  

## Funcionalidades adicionadas 

Além do *layout*, tomei liberdade de adicionar algumas funcionalidades à página. 

O botão de menu *dropdown*, no canto superior direito da página, é utilizado para navegar entre as seções da página ─ decidi implementar essa funcionalidade tendo em vista que a página é bem longa, e chegar até uma seção específica pode levar tempo, principalmente em dispositivos *mobile*. Ao ser clicado, o botão exibe um contêiner que detém botões; cada um deles está associado a uma seção da página e clicar sobre um deles leva a respectiva seção. 

Algumas seções apresentam itens alinhados horizontalmente. Em dispositivos *mobile* ─ para não ter que reduzir o tamanho daqueles itens, ou ainda ter que alinhá-los verticalmente (o que exigiria mais esforço do usuário para chegar ao fim da página) ─, botões de controle surgem abaixo para que o usuário possa alternar entre um ou outro item sem muito esforço. 

Na parte de depoimentos, os vídeos organizados verticalmente no *layout* fornecido passam a ser organizados horizontalmente em dispositivos *mobile*. Os botões de controle, antes localizados ao lado direito dos vídeos, vão para baixo, para que o vídeo possa ocupar praticamente toda a largura do dispositivo.

Um botão de voltar ao topo também surge no canto inferior direito da tela quando há *scroll*, para que o usuário possa voltar ao topo mais facilmente. 

Quando o botão de "mais informações" é pressionado, um *modal* surge contendo um formulário para inserir informações de contato e uma mensagem. A mesma mensagem é enviada ao servidor via JavaScript, com AJAX. O arquivo `main.php` trata da requisição, enviando os dados inseridos para um banco de dados mySQL. Para criar o banco de dados, se quiser, utilize o arquivo `contact_messages.sql` disponível aqui.

## Considerações finais

Desde já, gostaria de agradecer a oportunidade de realização do teste, dizendo que foi um excelente desafio. Agradeço, inclusive, a atenção da equipe concedida desde o contato até então. Estou muito empolgado e no aguardo de um *feedback*.
