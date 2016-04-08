/**
 * Created by Николай on 04.06.14.
 */
function Menu()
{
    var _menu;
    var _that = this;

    var _show = function(dataType, e){
        _menu.html('').append('<div data-type="'+dataType+'" class="item set">Одеть другую</div>');
        if(dataType != 'eat')
            _menu.append('<div data-type="'+dataType+'" class="item change">Изменить</div>');
        _menu.append('<div data-type="'+dataType+'" class="item unset">Снять</div>')
            .append('<div class="separator"></div>')
            .append('<div class="item close">Закрыть окно</div>')
            .show().css({left:e.pageX + 20, top:e.pageY});
    };

    var _showOr = function(dataType, e){
        _menu.html('').append('<div data-type="knife" class="item set">Ножи</div>')
            .append('<div data-type="ax" class="item set">Топоры</div>')
            .append('<div data-type="baton" class="item set">Дубины</div>')
            .append('<div data-type="sword" class="item set">Мечи</div>')
            .append('<div class="separator"></div>')
            .append('<div class="item close">Закрыть окно</div>')
            .show().css({left:e.pageX + 20, top:e.pageY});
    };

    var _showOr2 = function(dataType, e){
        _menu.html('').append('<div data-type="knife" class="item set">Ножи</div>')
            .append('<div data-type="ax" class="item set">Топоры</div>')
            .append('<div data-type="baton" class="item set">Дубины</div>')
            .append('<div data-type="sword" class="item set">Мечи</div>')
            .append('<div class="separator"></div>')
            .append('<div data-type="'+dataType+'" class="item change">Изменить</div>')
            .append('<div data-type="'+dataType+'" class="item unset">Снять</div>')
            .append('<div class="separator"></div>')
            .append('<div class="item close">Закрыть окно</div>')
            .show().css({left:e.pageX + 20, top:e.pageY});
    };

    var _duh = function(exist, e){
        _menu.html('').append('<div data-value="1" data-type="duh" class="item set">Дух Стойкости 1</div>')
            .append('<div data-value="2" data-type="duh" class="item set">Дух Стойкости 2</div>')
            .append('<div data-value="3" data-type="duh" class="item set">Дух Стойкости 3</div>');
        if(currentContainer.getParamValue('info', null, 'duh') > 0)
            _menu.append('<div data-value="0" data-type="duh" class="item unset">Снять</div>');
        _menu.append('<div class="separator"></div>')
            .append('<div class="item close">Закрыть окно</div>')
            .show().css({left:e.pageX + 20, top:e.pageY});
    };

    this.hide = function(){
        _menu.html('');
        _menu.hide();
    };

    this.events = function(){
        $(document.body).on('click', '.player .item_dressed:not([data-or="true"])', function(event){
            event.preventDefault();

            var $self = $(this);
            _show($self.attr('data-type'), event);
        });

        $(document.body).on('click', '.player [data-cast-type="duh"]', function(event){
            event.preventDefault();

            _duh($('[data-type="duh"]').hasClass('duh') ,event);
        });

        $(document.body).on('click', '.player .item_dressed[data-or="true"]', function(event){
            event.preventDefault();

            var $self = $(this);
            _showOr2($self.attr('data-type'), event);
        });

        $(document.body).on('click', '.player .item_empty[data-or="true"]', function(event){
            event.preventDefault();

            var $self = $(this);
            _showOr($self.attr('data-type'), event);
        });

        $(document.body).on('click', '.menu_dressed .set', function(event){
            event.preventDefault();

            var $self = $(this);
            var dataType = $self.attr('data-type');

            switch (dataType) {
                case 'duh':
                    currentContainer.setDuh(parseInt($self.attr('data-value')));
                    break;
                default:
                    var items = _items_.getItemsByType(dataType);
                    windows.showItems(vak[dataType], dataType, items);
                    break;
            }

            dummy.drawDummyImg();
            _that.hide();
        });

        $(document.body).on('click', '.menu_dressed .change', function(event){
            event.preventDefault();

            var $self = $(this);
            var dataType = $self.attr('data-type');
            if(currentContainer.isArt(dataType))
                change.art(dataType);
            else if(currentContainer.isRune(dataType))
                change.rune(dataType);
            else
                change.begin(dataType);
            _that.hide();
        });

        $(document.body).on('click', '.menu_dressed .unset', function(event){
            event.preventDefault();

            var $self = $(this);
            var dataType = $self.attr('data-type');

            switch (dataType) {
                case 'duh':
                    currentContainer.unsetDuh();
                    break;
                default:
                    currentContainer.unsetItem(dataType);
                    break;
            }

            _that.hide();
            dummy.drawDummyImg();
        });

        $(document.body).on('click', '.menu_dressed .close', function(event){
            _that.hide();
        });
    };

    var __construct = function () {
        var $hint = $('.menu_dressed');
        if($hint.exists())
            $hint.remove();

        $('body').append('<div class="menu_dressed"></div>');
        _menu = $('.menu_dressed').hide();

        //set events
        _that.events();
    }();
}