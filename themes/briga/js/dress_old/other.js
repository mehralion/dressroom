/**
 * Created with JetBrains PhpStorm.
 * User: Николай
 * Date: 01.10.13
 * Time: 15:46
 * To change this template use File | Settings | File Templates.
 */
function WindowShow() {
    var _that = this;

    this.text = function(title, text, buttons, className){
        if(className !== undefined)
            $('.popup').addClass(className);
        else
            $('.popup').addClass('show_items');

        $('.popup .popup_top h2').html(title);
        $('.popup .popup_cont .items').html(text);
        if(buttons !== null && buttons !== undefined)
            $('.popup .popup_cont .buttons').html(buttons);
        else
            $('.popup .popup_cont .buttons').html('<a href="#" class="btn_popup close_btn">Закрыть</a>');
        $('.popup__overlay').show();
    };
    this.items = function(title, text, buttons){
        $('.popup').addClass('show_items');
        $('.popup .popup_top h2').html(title);
        $('.popup .popup_cont .items').append(text);
        if(buttons !== null && buttons !== undefined)
            $('.popup .popup_cont .buttons').html(buttons);
        $('.popup__overlay').show();
    };
    this.change = function(title, text, buttons){
        $('.popup').addClass('change_items');
        $('.popup .popup_top h2').html(title);
        $('.popup .popup_cont .items').append(text);
        if(buttons !== null && buttons !== undefined)
            $('.popup .popup_cont .buttons').html(buttons);
        $('.popup__overlay').show();
    };
    this.close = function(){
        $('.popup').removeClass('change_items').removeClass('show_items');
        $('.popup .popup_top h2').html('');
        $('.popup .popup_cont .items').html('');
        $('.popup .popup_cont .buttons').html('');
        $('.popup__overlay').hide();
    };
    this.events = function(){
        $(document.body).on('click', '.popup .close_btn', function(event){
            _that.close();
            event.preventDefault();
        });
        $(document.body).on('click', '.popup .clouse_popup', function(event){
            _that.close();
            event.preventDefault();
        });
        $(document.body).on('click', '.popup__overlay', function(event){
            e = event || window.event
            if (e.target == this)
                _that.close();

            event.preventDefault();
        });
    };

    __construct = function() {
        _that.events();
    }();
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

function is_empty(obj) {

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0)    return false;
    if (obj.length && obj.length === 0)  return true;

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key))    return false;
    }

    return true;
}