/**
 * Created with JetBrains PhpStorm.
 * User: Николай
 * Date: 01.10.13
 * Time: 17:21
 * To change this template use File | Settings | File Templates.
 */
function Dress(categoryItemIn) {
    var _that = this;
    var _itemSelector = '.list_tovar img';
    var _itemCategory = null;

    _sortArray = function(a, b){
        var aCost = a['price'] > 0 ? a['price']:a['repa_cost'];
        var bCost = b['price'] > 0 ? b['price']:b['repa_cost'];
        if(aCost < bCost)
            return -1;
        if(aCost > bCost)
            return 1;

        return 0;
    };

    this.showItems = function(itemCategory){
        _itemCategory = itemCategory;
        var ul = $('<ul>', {'class':'list_tovar'});
        var array = items.getCurrCategory2(itemCategory);
        array.sort(_sortArray);
        $.each(array, function (i, item) {
            var li = $('<li>').appendTo(ul);
            li.append($('<img>', {'src':item['img'], 'rel':item['id']}));
        });

        var title = "Предметы";
        if(vak[itemCategory] !== undefined)
            title = vak[itemCategory];
        myWindow.items(title, ul, '<a href="#" class="btn_popup close_btn">Закрыть</a>');
        _events();
    };
    this.showArt = function () {
        var block = $('<div>');
        var select = $('<select>', {'id':'chooseArtType'}).appendTo(block);
        $('<option>', {'value':'0', 'text':'Сделайте выбор категории'}).appendTo(select);
        $('<option>', {'value':'nog', 'text':'Кастет','class':'or'}).appendTo(select);
        $('<option>', {'value':'mech', 'text':'Меч','class':'or'}).appendTo(select);
        $('<option>', {'value':'topor', 'text':'Топор','class':'or'}).appendTo(select);
        $('<option>', {'value':'dubina', 'text':'Дубина','class':'or'}).appendTo(select);
        $('<option>', {'value':'ser', 'text':'Серьги'}).appendTo(select);
        $('<option>', {'value':'kl', 'text':'Ожерелье'}).appendTo(select);
        $('<option>', {'value':'br', 'text':'Броня'}).appendTo(select);
        $('<option>', {'value':'r1', 'text':'Кольцо'}).appendTo(select);
        $('<option>', {'value':'sh', 'text':'Шлем'}).appendTo(select);
        $('<option>', {'value':'pr', 'text':'Перчатки'}).appendTo(select);
        $('<option>', {'value':'st', 'text':'Щит'}).appendTo(select);
        $('<option>', {'value':'ob', 'text':'Обувь'}).appendTo(select);
        $('<div>', {'class':'chooseItemBlock'}).appendTo(block);
        myWindow.items('Тип артефакта', block, '<a href="#" class="btn_popup close_btn">Закрыть</a>');
        _setEventsArt();
    }

    var _setEventsArt = function () {
        $('#chooseArtType').change(function () {
            if ($(this).val() == '0')
                return;

            _itemCategory = $(this).val();

            $('.chooseItemBlock').html('');
            var ul = $('<ul>', {'class':'list_tovar'});
            var itemsArr = items.getCurrCategory2(_itemCategory);
            itemsArr.sort(_sortArray);
            $.each(itemsArr, function (i, item) {
                var li = $('<li>').appendTo(ul);
                li.append($('<img>', {'src':item['img'], 'rel':item['id']}));
            });
            $('.chooseItemBlock').append(ul);

            $(document.body).on('mouseover', _itemSelector, function(event){
                hint.showInfo(event, items.getCurrItem(_itemCategory, $(this).attr('rel')));
                event.preventDefault();
            });
            $(document.body).on('mouseout', _itemSelector, function(event){
                hint.close();
                event.preventDefault();
            });
            $(document.body).on('click', _itemSelector, function(event){
                var category = null;
                if (_itemCategory == 'r1' || _itemCategory == 'r2' || _itemCategory == 'r3') {
                    var r1 = container[tabs.getCurrentTab()].getCurrItem('r1');
                    var r2 = container[tabs.getCurrentTab()].getCurrItem('r2');
                    var r3 = container[tabs.getCurrentTab()].getCurrItem('r3');
                    var rCat = 'r1';
                    if (is_empty(r1)) {
                        rCat = 'r1';
                    } else if (is_empty(r2)) {
                        rCat = 'r2';
                    } else if (is_empty(r3)) {
                        rCat = 'r3';
                    }
                    container[tabs.getCurrentTab()].setItem(
                        items.getCurrItem(rCat, $(this).attr('rel')),
                        rCat,
                        $(this).attr('rel'),
                        null,
                        true); // вешаем вещь
                    dummy.drawItem(rCat);
                    category = rCat;
                } else {
                    container[tabs.getCurrentTab()].setItem(
                        items.getCurrItem(_itemCategory, $(this).attr('rel')),
                        _itemCategory,
                        $(this).attr('rel'),
                        null,
                        true
                    );

                    if ($('#chooseArtType option:selected').hasClass('or'))
                        $('.pers .or').attr('id', _itemCategory);
                    dummy.drawItem(_itemCategory);
                    category = _itemCategory;
                }
                _that.close();
                event.preventDefault();
                var change = new ChangeItem(category);
                change.change();
            });
        });
    };

    var _events = function(){
        $(document.body).on('mouseover', _itemSelector, function(event){
            hint.showInfo(event, items.getCurrItem(_itemCategory, $(this).attr('rel')));
            event.preventDefault();
        });
        $(document.body).on('mouseout', _itemSelector, function(event){
            hint.close();
            event.preventDefault();
        });
        $(document.body).on('click', _itemSelector, function(event){
            var tab = tabs.getCurrentTab();
            if (_itemCategory == 'r1' || _itemCategory == 'r2' || _itemCategory == 'r3') {
                var r1 = container[tab].getCurrItem('r1');
                var r2 = container[tab].getCurrItem('r2');
                var r3 = container[tab].getCurrItem('r3');
                if(is_empty(r1) || _itemCategory == 'r1') {
                    container[tab].setItem(
                        items.getCurrItem(_itemCategory, $(this).attr('rel')),
                        'r1',
                        $(this).attr('rel')
                    ); // вешаем вещь
                    dummy.drawItem('r1');
                }
                if(is_empty(r2) || _itemCategory == 'r2') {
                    container[tab].setItem(
                        items.getCurrItem(_itemCategory, $(this).attr('rel')),
                        'r2',
                        $(this).attr('rel')
                    ); // вешаем вещь
                    dummy.drawItem('r2');
                }
                if(is_empty(r3) || _itemCategory == 'r3') {
                    container[tab].setItem(
                        items.getCurrItem(_itemCategory, $(this).attr('rel')),
                        'r3',
                        $(this).attr('rel')
                    ); // вешаем вещь
                    dummy.drawItem('r3');
                }
            } if (_itemCategory == 'runa1' || _itemCategory == 'runa2' || _itemCategory == 'runa3') {
                var runa1 = container[tab].getCurrItem('runa1');
                var runa2 = container[tab].getCurrItem('runa2');
                var runa3 = container[tab].getCurrItem('runa3');
                if(is_empty(runa1) || _itemCategory == 'runa1') {
                    container[tab].setItem(
                        items.getCurrItem(_itemCategory, $(this).attr('rel')),
                        'runa1',
                        $(this).attr('rel')
                    ); // вешаем вещь
                    dummy.drawItem('runa1');
                }
                if(is_empty(runa2) || _itemCategory == 'runa2') {
                    container[tab].setItem(
                        items.getCurrItem(_itemCategory, $(this).attr('rel')),
                        'runa2',
                        $(this).attr('rel')
                    ); // вешаем вещь
                    dummy.drawItem('runa2');
                }
                if(is_empty(runa3) || _itemCategory == 'runa3') {
                    container[tab].setItem(
                        items.getCurrItem(_itemCategory, $(this).attr('rel')),
                        'runa3',
                        $(this).attr('rel')
                    ); // вешаем вещь
                    dummy.drawItem('runa3');
                }
            } else {
                container[tab].setItem(
                    items.getCurrItem(_itemCategory, $(this).attr('rel')),
                    _itemCategory,
                    $(this).attr('rel')
                );
                dummy.drawItem(_itemCategory);
            }
            _that.close();
            event.preventDefault();
        });
    };

    this.close = function(){
        myWindow.close();
        hint.close();
    };

    __construct = function() {
        $(document.body).off('mouseover', _itemSelector);
        $(document.body).off('mouseout', _itemSelector);
        $(document.body).off('click', _itemSelector);
    }();
}