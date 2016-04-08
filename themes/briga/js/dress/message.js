/**
 * Created by Николай on 04.06.14.
 */
function Message()
{
    var $_block;
    var $_title;
    var $_body;

    var _that = this;

    this.hide = function(){
        $_block.hide();
        $_title.html('');
        $_body.html('');
    };

    var _events = function(){
        $_block = $('#message_box').hide();
        $_title = $('#message_box #title');
        $_body = $('#message_box #body');

        $(document.body).on('click', '#message_box .closeW', function(event){
            event.preventDefault();

            _that.hide();
        });

        $(document.body).on('click', '#message_box .load_nick', function(event){
            event.preventDefault();

            loadByNick();
        });

        $(document.body).on('click', '#message_box .load_key', function(event){
            event.preventDefault();

            loadItems();
        });
    };

    this.byNick = function(){
        $_block.show();
        $_title.html('Загрузка по персонажу');
        $_body.html('<input style="padding: 2px;" name="loadNick" id="loadNick" placeholder="Введите логин"> <a style="display: inline-block;text-decoration: none;" href="#" class="btn_popup load_nick">Загрузить</a>');
    };

    this.byKey = function(){
        $_block.show();
        $_title.html('Загрузка по ключу');
        $_body.html('<input style="padding: 2px;" name="loadKey" id="loadKey" placeholder="Введите ключ"> <a style="display: inline-block;text-decoration: none;" href="#" class="btn_popup load_key">Загрузить</a>');
    };

    this.simple = function(text, title){
        if(debug)
            console.log('Сообщение', text);

        if(title === undefined)
            title = 'Информация';

        $_title.html(title);
        $_body.html(text);
        $_block.show();
    };

    var __construct = function () {
        _events();
    }();
}