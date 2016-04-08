/**
 * Created by Николай on 04.06.14.
 */
function Windows()
{
    var _that = this;
    var $_popup;
    var $_block;
    var $_title;
    var $_body;
    var $_filters;

    var _create = function (){
        $_block = $('<div>', {'id':'popup__overlay', 'class':'popup__overlay'}).appendTo('body');
        $_popup = $('<div>', {'class':'popup'}).appendTo($_block);
        $('<a>', {'href':'#', 'class':'clouse_popup'}).appendTo($_popup);

        var $popupTop = $('<div>', {'class':'popup_top'}).appendTo($_popup);
        $('<div>', {'class':'top_left'}).appendTo($popupTop);
        $_title = $('<h2>');
        $('<div>', {'class':'top_middle'}).append($_title).appendTo($popupTop);
        $('<div>', {'class':'top_right'}).appendTo($popupTop);

        var $popupCont = $('<div>', {'class':'popup_cont'}).appendTo($_popup);
        $('<div>', {'class':'cont_left'}).appendTo($popupCont);
        var contentMiddle = $('<div>', {'class':'cont_middle'}).appendTo($popupCont);
        $_filters = $('<div>', {'class':'filters'}).appendTo(contentMiddle).hide();
        $_body = $('<div>', {'class':'body'}).appendTo(contentMiddle);
        $('<div>', {'class':'cont_right'}).appendTo($popupCont);

        var $popupBot = $('<div>', {'class':'popup_bot'}).appendTo($_popup);
        $('<div>', {'class':'bot_left'}).appendTo($popupBot);
        $('<div>', {'class':'bot_middle'}).appendTo($popupBot);
        $('<div>', {'class':'bot_right'}).appendTo($popupBot);
    };

    var _events = function(){
        $(document.body).on('click', '.clouse_popup', function(event){
            event.preventDefault();

            _that.close();
        });

        $(document.body).on('change', '#chooseArtType', function(event){
            event.preventDefault();

            var $self = $(this);
            if($self.val() == '0')
                return;

            var dataType = $self.val();

            $('.chooseItemBlock').html('');

            var items = _items_.getItemsByType(dataType);
            var $itemsUl = $('<ul>', {'class':'list_tovar'}).appendTo('.chooseItemBlock');
            $.each(items, function(id, info){
                var $img = $('<img>', {'src':info['img'], 'data-id':info['id'], 'data-type':dataType, 'data-art':'true'});
                $('<li>').append($img).appendTo($itemsUl);
            });
        });

        $(document.body).on('change', '#filter_level, #filter_itemType, #filter_align', function(event){
            var $self = $(this);
            var level = undefined;
            var itemType = undefined;
            var align = undefined;

            if($('#filter_level').val() != 'all')
                level = parseInt($('#filter_level').val());
            if($('#filter_itemType').val() != 'all')
                itemType = parseInt($('#filter_itemType').val());
            if($('#filter_align').val() != 'all')
                align = parseFloat($('#filter_align').val());

            _that.showItems(_that._title, _that._dataType, _that._items, level, itemType, align, false);
        });
    };

    this.close = function(){
        $_block.hide();
        $_title.html('');
        $_body.html('');
        $_filters.hide();
        $_popup.removeClass('show_items').removeClass('change_items').removeAttr('style');
    };

    this.changeItem = function(){
        $_block.show();
        $_title.html('Изменение предмета');
        $_popup.addClass('change_items');
        $_body.html('<div class="wLoader"></div>');
    };

    this._title = null;
    this._dataType = null;
    this._items = {};
    this.showItems = function(title, dataType, items, level, itemType, align, createFilter){
        _that._title = title;
        _that._dataType = dataType;
        _that._items = items;

        $_block.show();
        $_title.html(title);
        $_popup.addClass('show_items');
        $_body.html('');

        if(createFilter !== false && !currentContainer.isRune(dataType)) {
            $_filters.html('');
            var $filtersUl = $('<ul>', {'class':'filtersUl'}).appendTo($_filters);
            $('<li>').append(_filters).appendTo($filtersUl);

            $_filters.show();
        }

        var $itemsUl = $('<ul>', {'class':'list_tovar'}).appendTo($_body);
        $.each(items, function(id, info){
            if(level !== undefined && level < info['params_need']['levelInfo']['level'])
                return;
            if(align !== undefined && !currentContainer.canSetItem(info['align'], align))
                return;

            var prokat = false;
            if(itemType === 1 && !info['in_prokat'])
                return;
            else if(itemType === 1 && info['in_prokat'])
                prokat = true;

            var $img = $('<img>', {'src':info['img'], 'data-prokat':prokat, 'data-id':info['id'], 'data-type':dataType});
            $('<li>').append($img).appendTo($itemsUl);
        });
    };

    this.showArt = function(){
        $_block.show();
        $_title.html('Создать арт');
        $_popup.addClass('show_items');
        $_body.html('');

        var select = $('<select>', {'id':'chooseArtType'}).appendTo($_body);
        $('<option>', {'value':'0',     'text':'Сделайте выбор категории'}).appendTo(select);
        $('<option>', {'value':'knife', 'text':'Кастет'}).appendTo(select);
        $('<option>', {'value':'sword', 'text':'Меч'}).appendTo(select);
        $('<option>', {'value':'ax',    'text':'Топор'}).appendTo(select);
        $('<option>', {'value':'baton', 'text':'Дубина'}).appendTo(select);
        $('<option>', {'value':'ser',   'text':'Серьги'}).appendTo(select);
        $('<option>', {'value':'kl',    'text':'Ожерелье'}).appendTo(select);
        $('<option>', {'value':'br',    'text':'Броня'}).appendTo(select);
        $('<option>', {'value':'r1',    'text':'Кольцо'}).appendTo(select);
        $('<option>', {'value':'sh',    'text':'Шлем'}).appendTo(select);
        $('<option>', {'value':'pr',    'text':'Перчатки'}).appendTo(select);
        $('<option>', {'value':'st',    'text':'Щит'}).appendTo(select);
        $('<option>', {'value':'ob',    'text':'Обувь'}).appendTo(select);
        $('<div>', {'class':'chooseItemBlock'}).appendTo($_body);
    };

    var _filters = function(){
        var $filters = $('<div>');

        var $level = $('<select>', {'id':'filter_level', 'style':'width:120px;'}).appendTo($filters);
        $('<option>', {'text':'Все уровни','value':'all'}).appendTo($level);
        for(var i = 1; i <= 13; i ++)
            $('<option>', {'text':'До '+i+' уровня (включительно)','value':i}).appendTo($level);

        var $itemType = $('<select>', {'id':'filter_itemType', 'style':'width:185px;'}).appendTo($filters);
        $('<option>', {'text':'Все магазины и лавки', 'value':'all'}).appendTo($itemType);
        $('<option>', {'text':'Магазины (гос/березка)', 'value':0}).appendTo($itemType);
        $('<option>', {'text':'Прокат', 'value':1}).appendTo($itemType);

        var $align = $('<select>', {'id':'filter_align', 'style':'width:140px;'}).appendTo($filters);
        $('<option>', {'text':'Все', 'value':'all'}).appendTo($align);
        $.each(alignInfo, function(align, info){
            $('<option>', {'value':align, html:info}).appendTo($align);
        });

        return $filters;
    };

    var __construct = function () {
        _create();
        _events();
    }();
}
     