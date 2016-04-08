/**
 * Created with JetBrains PhpStorm.
 * User: Николай
 * Date: 01.10.13
 * Time: 18:41
 * To change this template use File | Settings | File Templates.
 */
function Tabs() {
    var _tabCount = 0;
    var _tabCurrent = 0;
    var _that = this;

    /**
     * Вешаем события на табы
     * @private
     */
    var _setEvents = function(){
        if(debug)
            console.log('Вешаем события на табы');
        /** Добавление кабинки */
        $(document.body).on('click', '.add_cabin', function(){
            if(debug)
                console.log('Добавили кабинку');
            _tabCount++;
            $('.tab').show();
            $('.tabResult').hide();
            $('ul.cabins li').removeClass('active');
            var li = $('<li>', {'class':'active','id':_tabCount}).appendTo($('ul.cabins'));
            var span = $('<span>', {'class':'btn_orange'}).appendTo(li);
            $('<a>', {'href':'#', 'text':'Кабинка ' + (_tabCount+1)}).appendTo(span);
            $('<a>', {'href':'#', 'class':'delete', 'rel':_tabCount}).appendTo(span);
            _tabCurrent = _tabCount;

            container[_tabCurrent] = new Container();
            container[_tabCurrent].setParams(null);
            container[_tabCurrent].setDummyItems(null);
            dummy.drawDummyImg();
        });
        /** Открытие суммарной инфы по табам */
        $(document.body).on('click', '.cabin_result', function(){
            if(debug)
                console.log('Смотрим результаты');
            $('ul.cabins li').removeClass('active');
            $(this).addClass('active');
            $('.tab').hide();
            $('.tabResult').show();
            var result = new Result();
            result.drawResult();
        });
        /** открыть таб */
        $(document.body).on('click', 'ul.cabins li a:not(.delete)', function(event){
            if(debug)
                console.log('Открыли таб');
            $('.tab').show();
            $('.tabResult').hide();
            $('ul.cabins li').removeClass('active');
            $(this).parent().parent().addClass('active');
            _tabCurrent = $(this).parent().parent().attr('id');

            dummy.drawDummyImg();
            event.preventDefault();
        });
        /** Удаляем таб */
        $(document.body).on('click', 'ul.cabins li a.delete', function(event){
            if(debug)
                console.log('Удалили таб');
            var id = $(this).attr('rel');
            //delete container[id];
            $('ul.cabins li#'+ id).remove();
            $('ul.cabins li#0 a:not(.delete)').trigger('click');
            _tabCurrent = 0;
            event.preventDefault();
        });
    };

    /**
     * Получаем открытый таб
     * @returns {number}
     */
    this.getCurrentTab = function() {
        return _tabCurrent;
    };

    /**
     * Открываем таб дубль
     */
    this.cloneTab = function(){
        var params = $.extend(true, {}, container[_tabCurrent].getParams());
        var dummyItems = $.extend(true, {}, container[_tabCurrent].getDummyItems());

        _tabCount++;
        $('.tab').show();
        $('.tabResult').hide();
        $('ul.cabins li').removeClass('active');
        var li = $('<li>', {'class':'active','id':_tabCount}).appendTo($('ul.cabins'));
        var span = $('<span>', {'class':'btn_orange'}).appendTo(li);
        $('<a>', {'href':'#', 'text':'Кабинка ' + (_tabCount+1)}).appendTo(span);
        $('<a>', {'href':'#', 'class':'delete', 'rel':_tabCount}).appendTo(span);
        _tabCurrent = _tabCount;

        container[_tabCurrent] = new Container();
        container[_tabCurrent].setParams(params);
        container[_tabCurrent].setDummyItems(dummyItems, true);
        dummy.drawDummyImg();
    };

    /**
     *
     * @type {__construct}
     * @private
     */
    __construct = function() {
        _setEvents();
    }();
}