/**
 * Created with JetBrains PhpStorm.
 * User: user
 * Date: 26.12.12
 * Time: 16:14
 * To change this template use File | Settings | File Templates.
 */

function changeWindow(header, body, buttons, stat)
{
    if(stat === undefined || stat == 'show' || stat == 'showNew') {
        if(header != '') $('.popup .popup_top h2').html(header);
        if(body != '') { $('.popup .popup_cont .items').html(''); $('.popup .popup_cont .items').append(body) };
        if(buttons != '') $('.popup .popup_cont .buttons').html(buttons);
        if(stat == 'showNew')
            $('.popup').removeClass('change_items').addClass('show_items');
        else if(stat == 'show')
            $('.popup').removeClass('show_items').addClass('change_items');
        $('.popup__overlay').show();
    } else
        $('.popup__overlay').hide();
    $('.btn_popup.close_btn').click(function(){
        $('.popup__overlay').hide();
    });
    return true;
}
function Dress() {
    var _category;
    var _selected;
    var _that = this;

    /**
     * Выбор вещи
     * @param categoryIn категория вещей
     */
    this.newW = function (categoryIn) {
        _category = categoryIn;
        changeWindow('', getItems(), '<a href="#" class="btn_popup close_btn">Закрыть</a>', 'showNew');
        _setEvents();
    }
    /**
     * Окно выбора арта
     */
    this.showArt = function () {
        changeWindow('', '<select name="" id="chooseArtType">' +
            '<option value="0">Сделайте выбор категории</option>' +
            '<option value="nog" class="or">Кастет</option>' +
            '<option value="mech" class="or">Меч</option>' +
            '<option value="topor" class="or">Топор</option>' +
            '<option value="dubina" class="or">Дубина</option>' +
            '<option value="ser">Серьги</option>' +
            '<option value="kl">Ожерелье</option>' +
            '<option value="br">Броня</option>' +
            '<option value="r1">Кольцо</option>' +
            '<option value="sh">Шлем</option>' +
            '<option value="pr">Перчатки</option>' +
            '<option value="st">Щит</option>' +
            '<option value="ob">Обувь</option>' +
            '</select><div class="chooseItemBlock"></div>', '','showNew');
        _setEventsArt();
    }
    /**
     * Окно изменения вещи
     * @param categoryIn категория надетой вещи
     */
    this.change = function (categoryIn) {
        _category = categoryIn;
        /**
         * кидаем вещь в контейнер
         * @type {Selected}
         * @private
         */
        _selected = new Selected(categoryIn);
        /**
         * Рисуем заточки, если это оружие
         */
        var sharpen = '';
        if (_selected.isWeapon())
            sharpen = _buildSharpen();
        /**
         * Рисуем Модификацию, если условия выполняются
         * @type {string}
         */
        var mf = '';
        if (!_selected.isWeapon() && _selected.canMF() && !_selected.isArt())
            mf = _buildMF();
        /**
         * Рисуем апы, если требуется
         * @type {string}
         */
        var ap = '';
        if (_selected.canAp()) {
            if(_category == "runa1" || _category == "runa2" || _category == "runa3")
                ap = _buildAPRune();
            else
                ap = _buildAP();
        }
        /**
         * Рисуем подгоны, если требуется
         * @type {string}
         */
        var podgon = '';
        if (!_selected.isWeapon() && _selected.canPodgon() && !_selected.isArt())
            podgon = _buildPodgon();
        /**
         * Рисуем авто-распределение, если требуется
         * @type {string}
         */
        var auto = '';
        //if (!_selected.isWeapon())
        //    auto = _buildAuto();
        /**
         * Настройка арт
         * @type {string}
         */
        var artSet = '';
        if (_selected.isArt())
            artSet = _buildArtSettings();

        var changeItem = $('<div>', {'class':'changeItem'});
        $('<div>', {'class':'left'})
            .append(sharpen)
            .append(mf)
            .append(ap)
            .append(ap)
            .append(podgon)
            .append(artSet)
            .append(auto).appendTo(changeItem);
        $('<div>', {'class':'right'}).appendTo(changeItem);
        changeWindow('',
            changeItem,
            '<a class="btn_popup save" href="#" style="display: inline-block;">Сохранить</a>'+
            '<a href="#" class="btn_popup close_btn" style="display: inline-block;margin-left: 10px;">Закрыть</a>', 'show');
        _setEventsChange();
        _setItem();
        if (_selected.getChooseUsil() !== null)
            $('.well.art_settings .usil input[value="' + _selected.getChooseUsil() + '"]').attr('checked', true);
    }
    var _setEvents = function () {
        var item = $('.list_tovar img');
        item.mouseover(function (e) {
            new Hint(e, items.getCurrItem(_category, $(this).attr('rel')), '');
        });
        item.mouseout(function (e) {
            removeHint();
        });
        item.click(function (e) {
            if (_category == 'r1' || _category == 'r2' || _category == 'r3') {
                var r1 = container[tab].getCurrItem('r1');
                var r2 = container[tab].getCurrItem('r2');
                var r3 = container[tab].getCurrItem('r3');
                if(is_empty(r1) || _category == 'r1') {
                    container[tab].setItem(
                        items.getCurrItem(_category, $(this).attr('rel')),
                        'r1',
                        $(this).attr('rel')
                    ); // вешаем вещь
                    dummy.setItem('r1');
                }
                if(is_empty(r2) || _category == 'r2') {
                    container[tab].setItem(
                        items.getCurrItem(_category, $(this).attr('rel')),
                        'r2',
                        $(this).attr('rel')
                    ); // вешаем вещь
                    dummy.setItem('r2');
                }
                if(is_empty(r3) || _category == 'r3') {
                    container[tab].setItem(
                        items.getCurrItem(_category, $(this).attr('rel')),
                        'r3',
                        $(this).attr('rel')
                    ); // вешаем вещь
                    dummy.setItem('r3');
                }
            } if (_category == 'runa1' || _category == 'runa2' || _category == 'runa3') {
                var runa1 = container[tab].getCurrItem('runa1');
                var runa2 = container[tab].getCurrItem('runa2');
                var runa3 = container[tab].getCurrItem('runa3');
                if(is_empty(runa1) || _category == 'runa1') {
                    container[tab].setItem(
                        items.getCurrItem(_category, $(this).attr('rel')),
                        'runa1',
                        $(this).attr('rel')
                    ); // вешаем вещь
                    dummy.setItem('runa1');
                }
                if(is_empty(runa2) || _category == 'runa2') {
                    container[tab].setItem(
                        items.getCurrItem(_category, $(this).attr('rel')),
                        'runa2',
                        $(this).attr('rel')
                    ); // вешаем вещь
                    dummy.setItem('runa2');
                }
                if(is_empty(runa3) || _category == 'runa3') {
                    container[tab].setItem(
                        items.getCurrItem(_category, $(this).attr('rel')),
                        'runa3',
                        $(this).attr('rel')
                    ); // вешаем вещь
                    dummy.setItem('runa3');
                }
            } else {
                container[tab].setItem(
                    items.getCurrItem(_category, $(this).attr('rel')),
                    _category,
                    $(this).attr('rel')
                );
                dummy.setItem(_category);
            }
            changeWindow('', '', '', 'hide');
            removeHint();
        });
        $('.popup .buttons .close_btn').click(function(){
            changeWindow('', '', '', 'hide');
            removeHint();
        });
    }
    var _setEventsChange = function () {
        $('#mf_hp').change(function () {
            var _val = $(this).val();
            if (!isNaN(_val) && _val >= 0 && _val <= 20)
                _selected.setHpMf(_val);
            else
                $(this).val(_selected.getHpMf());
            _setItem();
        });
        $('#mf_stat').change(function () {
            var _val = $(this).val();
            _selected.setStatsMf(_val);
            _setItem();
        });
        $('#mf_bron').change(function () {
            var _val = $(this).val();
            _selected.setBronMf(_val);
            _setItem();
        });
        $('.well.ap img').click(function () {
            if ($(this).hasClass('select')) {
                $('.well.ap img').removeClass('select').addClass('unselect');
                _selected.setAp(0);
            } else {
                $('.well.ap img').removeClass('select').addClass('unselect');
                $(this).removeClass('unselect').addClass('select');
                _selected.setAp($(this).attr('rel'));
            }
            _setItem();
        });
        /** Ап руны */
        $('.well.ap_rune img').click(function () {
            if ($(this).hasClass('select')) {
                $('.well.ap_rune img').removeClass('select').addClass('unselect');
                _selected.setApRune(0);
            } else {
                $('.well.ap_rune img').removeClass('select').addClass('unselect');
                $(this).removeClass('unselect').addClass('select');
                _selected.setApRune($(this).attr('rel'));
            }
            _setItem();
        });
        $('.well.podgon img').click(function () {
            if ($(this).hasClass('select')) {
                $('.well.podgon img').removeClass('select').addClass('unselect');
                _selected.setPodgon(0);
            } else {
                $('.well.podgon img').removeClass('select').addClass('unselect');
                $(this).removeClass('unselect').addClass('select');
                _selected.setPodgon($(this).attr('rel'));
            }
            _setItem();
        });
        $('.well.sharpen img').click(function () {
            if ($(this).hasClass('select')) {
                $('.well.sharpen img').removeClass('select').addClass('unselect');
                _selected.setSharpen(0);
            } else {
                $('.well.sharpen img').removeClass('select').addClass('unselect');
                $(this).removeClass('unselect').addClass('select');
                _selected.setSharpen($(this).attr('rel'));
            }
            _setItem();
        });
        $('.well.auto .auto_stat input').click(function () {
            if (_selected.getChooseStat() === null || _selected.getChooseStat() != $(this).attr('rel'))
                _selected.setChooseStat($(this).attr('rel'));
            else {
                $(this).removeAttr('checked');
                _selected.setChooseStat(null);
            }
            _setItem();
        });
        $('.well.auto .auto_mf input').click(function () {
            if (_selected.getChooseMf() === null || _selected.getChooseMf() != $(this).attr('rel'))
                _selected.setChooseMf($(this).attr('rel'));
            else {
                $(this).removeAttr('checked');
                _selected.setChooseMf(null);
            }
            _setItem();
        });
        /**
         * УГ, делалось на скорость, "абы" было, сорри :(
         */
        $('.well.auto .top_settings #auto_unik').click(function(){
            if ($(this).attr('rel') === undefined) {
                $('.well.auto .top_settings #auto_top').removeAttr('checked');
                $(this).attr('rel', true);
                _selected.setUnik();
            } else {
                $(this).removeAttr('checked');
                $(this).removeAttr('rel');
            }
            $('.mf_block').html(_buildMF());
            _setItem();
        });
        $('.well.auto .top_settings #auto_top').click(function(){
            if ($(this).attr('rel') === undefined) {
                $('.well.auto .top_settings #auto_unik').removeAttr('checked');
                $(this).attr('rel', true);
                _selected.setTop();
            } else {
                $(this).removeAttr('checked');
                $(this).removeAttr('rel');
            }
            $('.mf_block').html(_buildMF());
            _setItem();
        });

        $('.btn_popup.save').click(function () {
            _save();
            changeWindow('', '', '', 'hide');
        });
        $('.btn_popup.close_btn').click(function () {
            changeWindow('', '', '', 'hide');
        });
        $('.well.art_settings .add_art_hp').click(function () {
            var val = parseInt($('.well.art_settings #art_hp').html());
            if (!isNaN(val) && val <= 60) {
                _selected.addArtHP(val + 5);
                $('.well.art_settings #art_hp').html(val + 5);
            }
            _setItem();
        });
        $('.well.art_settings .take_art_hp').click(function () {
            var val = parseInt($('.well.art_settings #art_hp').html());
            if (!isNaN(val) && val >= 5) {
                _selected.takeArtHP(val - 5);
                $('.well.art_settings #art_hp').html(val - 5);
            }
            _setItem();
        });
        $('.well.art_settings .usil input').click(function () {
            if (_selected.getChooseUsil() === null || _selected.getChooseUsil() != $(this).val())
                _selected.setChooseUsil($(this).val());
            else {
                $(this).removeAttr('checked');
                _selected.setChooseUsil(null);
            }
        });
    }
    var _setEventsArt = function () {
        $('#chooseArtType').change(function () {
            if ($(this).val() == '0')
                return;
            $('.chooseItemBlock').html('');
            _category = $(this).val();
            $('.chooseItemBlock').append(getItems());

            $('.item_window .item img').mouseover(function (e) {
                new Hint(e, items.getCurrItem(_category, $(this).attr('rel')), '');
            });
            $('.item_window .item img').mouseout(function (e) {
                removeHint();
            });
            $('.item_window .item img').click(function (e) {
                if (_category == 'r1' || _category == 'r2' || _category == 'r3') {
                    var r1 = container[tab].getCurrItem('r1');
                    var r2 = container[tab].getCurrItem('r2');
                    var r3 = container[tab].getCurrItem('r3');
                    var rCat = 'r1';
                    if (is_empty(r1)) {
                        rCat = 'r1';
                    } else if (is_empty(r2)) {
                        rCat = 'r2';
                    } else if (is_empty(r3)) {
                        rCat = 'r3';
                    }
                    container[tab].setItem(
                        items.getCurrItem(rCat, $(this).attr('rel')),
                        rCat,
                        $(this).attr('rel'),
                        null,
                        true); // вешаем вещь
                    //changeWindow('', '', '', 'hide');
                    dummy.setItem(rCat);
                    _that.change(rCat);
                } else {
                    container[tab].setItem(
                        items.getCurrItem(_category, $(this).attr('rel')),
                        _category,
                        $(this).attr('rel'),
                        null,
                        true
                    );

                    if ($('#chooseArtType option:selected').hasClass('or'))
                        $('.pers .or').attr('id', _category);
                    //changeWindow('', '', '', 'hide');
                    dummy.setItem(_category);
                    _that.change(_category);
                }
                removeHint();
            });
        });
    }
    /**
     * Отрисовываем вещи для выбора конкретной
     * @return {string}
     */
    var getItems = function () {
        var ul = $('<ul>', {'class':'list_tovar'});
        $('.popup .popup_cont .items').html('');
        $.each(items.getCurrCategory(_category), function (i, item) {
            var li = $('<li>').appendTo(ul);
            li.append($('<img>', {'src':item['img'], 'rel':i}));
        });
        return ul;
    }
    /**
     * Рисуем авто-раскидывание
     * @return {string}
     * @private
     */
    var _buildAuto = function () {
        var _stats = _selected.getAvailableStats();
        var _mf = _selected.getAvailableMf();

        var string = '<fieldset class="well auto" style="max-width:336px;text-align:left;"><legend>Автораспределение</legend>';
        string += '<div class="top_settings">';
        string += '<label for="auto_unik">Топ уник</label>';
        string += '<input id="auto_unik" type="radio">';
        string += '<label for="auto_top">Топ</label>';
        string += '<input id="auto_top" type="radio">';
        string += '</div>';
        string += '<div class="separator"></div>';
        string += '<div class="auto_stat">';
        $.each(_stats, function (name, value) {
            if (value) {
                string += '<label for="auto_' + name + '">' + vak[name] + '</label>';
                string += '<input id="auto_' + name + '" name="stats[]" type="radio" rel="' + name + '"><br>';
            }
        });
        string += '</div>';
        string += '<div class="separator"></div>';
        string += '<div class="auto_mf">';
        $.each(_mf, function (name, value) {
            if (value) {
                string += '<label for="auto_' + name + '">' + vak[name] + '</label>';
                string += '<input id="auto_' + name + '" name="mf[]" type="radio" rel="' + name + '"><br>';
            }
        });
        string += '</div>';
        string += '</fieldset>';
        return string;
    }
    /**
     * Модификаиця
     * @return {string}
     * @private
     */
    var _buildMF = function () {
        var fieldset = $('<fieldset>', {'class':'well mf'}).append('<legend>Модификация</legend>');
        var _return = false;
        /* give hp? */
        if (_selected.canSetHP()) {
            _return = true;
            var hpRow = $('<div>', {'class':'hp row'}).appendTo(fieldset);
            var label = $('<label>', {'for':'mf_hp', 'text':'Добавить ХП'}).appendTo(hpRow);
            var input = $('<input>', {'id':'mf_hp', 'min':'0', 'max':'20', 'value':_selected.getHpMf(),'type':'number','name':'mf_hp'}).appendTo(hpRow);
        }
        if (_selected.canSetStats()) {
            _return = true;
            var mfStats = _selected.getStatsMf();
            var statRow = $('<div>', {'class':'stat row'}).appendTo(fieldset);
            var label = $('<label>', {'for':'mf_stat', 'text':'Добавить Статы'}).appendTo(statRow);
            var select = $('<select>', {'id':'mf_stat','name':'mf_stat'}).appendTo(statRow);
            for (var i = 0; i < 4; i++) {
                var _select = false;
                if (mfStats == i)
                    _select = true;
                $('<option>', {'value':i, 'selected':_select,'text':i}).appendTo(select);
            }
        }
        if (_selected.canSetBron()) {
            _return = true;
            var mfBron = _selected.getBronMf();
            var bronRow = $('<div>', {'class':'bron row'}).appendTo(fieldset);
            var label = $('<label>', {'for':'mf_bron', 'text':'Добавить Бронь'}).appendTo(bronRow);
            var select = $('<select>', {'id':'mf_bron','name':'mf_bron'}).appendTo(bronRow);
            for (var i = 0; i < 4; i++) {
                var _select = false;
                if (mfBron == i)
                    _select = true;
                $('<option>', {'value':i, 'selected':_select,'text':i}).appendTo(select);
            }
        }
        if(_return)
            return fieldset;
        else
            return '';
    }
    /**
     * Ап
     * @return {string}
     * @private
     */
    var _buildAP = function () {
        var itemLevel = _selected.getItemLevel();
        var fieldset = $('<fieldset>', {'class':'well ap'}).append('<legend>АП</legend>');
        var _ap = _selected.getAp();
        var _return = false;
        $.each(apImg, function (number, img) {
            if (apInfo[number]['level'] > itemLevel) {
                _return = true;
                var _class = 'unselect';
                if (number == _ap)
                    _class = 'select';
                fieldset.append('<img src=' + img + ' class="' + _class + '" rel="' + number + '">');
            }
        });
        if(_return)
            return fieldset;
        else
            return '';
    }
    /**
     * Ап руны
     * @return {string}
     * @private
     */
    var _buildAPRune = function () {
        var fieldset = $('<fieldset>', {'class':'well ap_rune'}).append('<legend>АП Руны</legend>');
        var _ap = _selected.getAp();
        var _return = false;
        $.each(apImgRunes, function (number, img) {
            _return = true;
            var _class = 'unselect';
            if (number == _ap)
                _class = 'select';
            fieldset.append('<img src=' + img + ' class="' + _class + '" rel="' + number + '">');
        });
        return fieldset;
    }
    /**
     * Подгоны
     * @return {string}
     * @private
     */
    var _buildPodgon = function () {
        var fieldset = $('<fieldset>', {'class':'well podgon'}).append('<legend>Подгон</legend>');
        var _podgon = _selected.getPodgon();
        var _return = false;
        if(podgon[_category] === undefined)
            return '';
        $.each(podgon[_category], function (number, img) {
            _return = true;
            var _class = 'unselect';
            if (number == _podgon)
                _class = 'select';
            fieldset.append('<img src=' + img + ' class="' + _class + '" rel="' + number + '">');
        });
        if(_return)
            return fieldset;
        else
            return '';
    }
    /**
     * Заточка
     * @return {string}
     * @private
     */
    var _buildSharpen = function () {
        var fieldset = $('<fieldset>', {'class':'well sharpen'}).append('<legend>Заточка</legend>');
        var _sharpen = _selected.getSharpen();
        var _return = false;
        $.each(sharpen[_category], function (number, img) {
            var _class = 'unselect';
            if (number == _sharpen)
                _class = 'select';
            fieldset.append('<img src=' + img + ' class="' + _class + '" rel="' + number + '">');
            _return = true;
        });
        if(_return)
            return fieldset;
        else
            return '';
    }
    /**
     * Настройки арта
     * @return {string}
     * @private
     */
    var _buildArtSettings = function () {
        var fieldset = $('<fieldset>', {'class':'well art_settings'}).append('<legend>Настройки арта</legend>');
        var hpRow = $('<div>', {'class':'hp row'}).appendTo(fieldset);
        $('<label>', {'for':'art_hp', 'text':'Добавить ХП'}).appendTo(hpRow);
        $('<span>', {'id':'art_hp', 'text':_selected.getArtHp()}).appendTo(hpRow);
        $('<img>', {'class':'add_art_hp', 'src':'/images/dress/up.gif', 'style':'cursor:pointer;'}).appendTo(hpRow);
        $('<img>', {'class':'take_art_hp', 'src':'/images/dress/down.gif', 'style':'cursor:pointer;'}).appendTo(hpRow);
        var usilRow = $('<div>', {'class':'usil row', 'style':'text-align:left;'});
        var div = $('<div>').appendTo(usilRow);
        var div2 = $('<div>').appendTo(usilRow);
        var div3 = $('<div>').appendTo(usilRow);

        $('<input>', {'type':'radio','value':'1', 'name':'usil[]', 'id':'usil_0'}).appendTo(div);
        $('<label>', {'for':'usil_0', 'text':'+ 10% брони'}).appendTo(div);

        $('<input>', {'type':'radio','value':'2', 'name':'usil[]', 'id':'usil_1'}).appendTo(div2);
        $('<label>', {'for':'usil_1', 'text':'+5% к макс МФ'}).appendTo(div2);

        $('<input>', {'type':'radio','value':'3', 'name':'usil[]', 'id':'usil_2'}).appendTo(div3);
        $('<label>', {'for':'usil_2', 'text':'+3% к макс МФ и 1% к урону'}).appendTo(div3);
        return fieldset;
    }
    /**
     * Отображение вещи и ее параметров
     * @return {string}
     * @private
     */
    var _buildSetMD = function () {
        var item = _selected.getItem();
        if (item['id'] === undefined)
            item['id'] = _selected.getItemId();

        /**
         * Строим шапку
         * @type {string}
         */
        var fieldset = $('<fieldset>', {'class':'well item'}).append('<legend>Прдемет</legend>');
        var itemUl = $('<ul>').appendTo(fieldset);
        var liName = $('<li>').appendTo(itemUl);
        var align = item['params_need']['other']['align'];
        if (align !== undefined && align > 0)
            liName.append('<img src="http://i.oldbk.com/i/align_' + align + '.gif"> ');
        if (item['name'] !== undefined)
            liName.append(item['name']);
        if (item['is_art'])
            liName.append('<img src="http://i.oldbk.com/i/artefact.gif">');

        var liPrice = $('<li>').appendTo(itemUl);
        if (item['price'] !== undefined && (item['repa_cost'] === undefined || !item['repa_cost'])) {
            var price = item['price'];
            $.each(podgonInfo, function (i, info) {
                if (i <= podgon)
                    price += Math.round(price * info['cost']);
            });
            liPrice.append('<div>Цена: ' + (price + _selected.getSharpenCost()) + ' кр.</div>');
        } else if (item['repa_cost'] !== undefined && item['repa_cost'] > 0)
            liPrice.append('<div>Цена: ' + item['repa_cost'] + ' реп.</div>');

        var podgon = _selected.getPodgon();
        if (podgon) {
            var liPodgon = $('<li>').appendTo(itemUl);
            var count = 'раз';
            if (podgon == 2 || podgon == 3 || podgon == 4)
                count += 'a';
            liPodgon.append('Подогнано: <b>' + podgon + ' ' + count + '</b>');
        }
        /**
         * Строим то, что требуется
         * @type {string}
         */
        if (item['params_need'] !== undefined) {
            $('<li>', {'html':'Требуется минимальное:'}).appendTo(itemUl);
            var ap = _selected.getSetAp();
            var sharpen = _selected.getSharpenParams('params_need');
            $.each(item['params_need'], function (category, items) {
                $.each(items, function (name, value) {
                    var sharpenNeed = 0;
                    if (sharpen !== undefined && sharpen[category] !== undefined && sharpen[category][name] !== undefined)
                        sharpenNeed = sharpen[category][name];
                    if (value > 0 || sharpenNeed > 0) {
                        switch (name) {
                            case 'align':
                                break;
                            case 'level':
                                var level = value;
                                if (ap > 0)
                                    level = apInfo[ap]['level'];
                                $('<li>', {'html':'• ' + vak[name] + ': ' + level}).appendTo(itemUl);
                                break;
                            default:
                                $('<li>', {'html':'• ' + vak[name] + ': ' + (value + ap + sharpenNeed)}).appendTo(itemUl);
                                break;
                        }
                    }
                });
            });
        }
        /**
         * Строим то, что дает
         * @type {string}
         */
        if (item['params_give'] !== undefined) {
            $('<li>', {'html':'Действует на:'}).appendTo(itemUl);
            if (item['params_give']['other']) {
                $.each(item['params_give']['other'], function (name, value) {
                    var originalItem = items.getCurrItem(_category, item['id']);
                    var origin = originalItem['params_give']['other'][name];
                    var hpMf = _selected.getHpMf();
                    var hpAp = _selected.getApHp();
                    if (value <= 0 && !_selected.isArt())
                        return true;
                    switch (name) {
                        case 'hp':
                            var art = 0;
                            if (_selected.isArt())
                                art = _selected.getArtHp();
                            $('<li>', {'html':'• ' + vak[name] + ': ' + (origin + hpMf + art + hpAp) + '  <span style="color:#708090;">' + origin + ' + ' + hpMf + '(МФ) + ' + hpAp + '(АПЫ) + ' + art + '(АРТ)</span>'}).appendTo(itemUl);
                            break;
                        case 'minu':
                            if (!_selected.isWeapon())
                                $('<li>', {'html':'• ' + vak[name] + ': ' + (value + _selected.artMin())}).appendTo(itemUl);
                            else
                                $('<li>', {'html':'• ' + vak[name] + ': ' + (_selected.getSharpenMinu() + _selected.artMin() + _selected.getApMinu() + value)}).appendTo(itemUl);
                            break;
                        case 'maxu':
                            if (!_selected.isWeapon())
                                $('<li>', {'html':'• ' + vak[name] + ': ' + (value + _selected.artMax())}).appendTo(itemUl);
                            else
                                $('<li>', {'html':'• ' + vak[name] + ': ' + (_selected.getSharpenMaxu() + _selected.artMax() + _selected.getApMaxu() + value)}).appendTo(itemUl);
                            break;
                        default:
                            $('<li>', {'html':'• ' + vak[name] + ': ' + value}).appendTo(itemUl);
                            break;
                    }
                });
            }
            if (item['params_give']['stats']) {
                var changeStats = _selected.getChangeStats();
                if (!_selected.isWeapon() && _selected.canSetStats() || _selected.isArt())
                    $('<li>', {'html':'<span style="color:green;">Доступно для распределения: ' + _selected.getSetStats() + '</span>'}).appendTo(itemUl);
                $.each(item['params_give']['stats'], function (name, value) {
                    if (value <= 0 && !_selected.isArt())
                        return true;
                    if (!_selected.isWeapon() && _selected.canSetStats() || _selected.isArt())
                        $('<li>', {'html':'• ' + vak[name] + ': ' + (value + changeStats[name]) + ' <img class="take" rel="' + name + '" src="/primer/themes/briga/images/btn_minuse.gif"> <img class="add" rel="' + name + '" src="/primer/themes/briga/images/btn_pluse.gif">'}).appendTo(itemUl);
                    else
                        $('<li>', {'html':'• ' + vak[name] + ': ' + (value + changeStats[name])}).appendTo(itemUl);
                });
            }
            if ((item['params_give']['mf'])) {
                if (!_selected.isWeapon() && _selected.canSetMF() || _selected.isArt())
                    $('<li>', {'html':'<span style="color:green;">Доступно для распределения: ' + _selected.getSetMF() + ' мф</span>'}).appendTo(itemUl);
                $.each(item['params_give']['mf'], function (name, value) {
                    if (value <= 0 && !_selected.isArt())
                        return true;
                    var changeMF = _selected.getChangeMF();
                    if (!_selected.isWeapon() && _selected.canSetMF() || _selected.isArt())
                        $('<li>', {'html':'<div class="row"><label>• ' + vak[name] + ': ' + value + '%</label> + <input type="number" class="min mfNew" rel="' + name + '" value="' + changeMF[name] + '">%</div>'}).appendTo(itemUl);
                    else
                        $('<li>', {'html':'<div class="row"><label>• ' + vak[name] + ': ' + value + '%</label></div>'}).appendTo(itemUl);
                });
            }
            if (item['params_give']['vlad']) {
                $.each(item['params_give']['vlad'], function (name, value) {
                    if (value > 0)
                        $('<li>', {'html':'• ' + vak[name] + ': ' + value}).appendTo(itemUl);
                });
            }
            if (item['params_give']['bron']) {
                var apBron = _selected.getApBron();
                var mfBron = _selected.getBronMf();
                $.each(item['params_give']['bron'], function (name, value) {
                    if (value > 0 || _selected.isArt()) {
                        var art = 0;
                        if (_selected.isArt()) {
                            art = _selected.getArtBron();
                            if (value == 0 && art == 0)
                                return;
                        }
                        $('<li>', {'html':'• ' + vak[name] + ': ' + (value + art + apBron + mfBron)}).appendTo(itemUl);
                    }
                });
            }
            if (item['params_give']['usil']) {
                $.each(item['params_give']['usil'], function (name, value) {
                    if (value > 0)
                        $('<li>', {'html':'• +' + value + '% ' + vak[name]}).appendTo(itemUl);
                });
            }
        }
        if (_selected.getStatsMf() == 3 || item['is_art'] || item['create_art'])
            $('<li>', {'html':'<span style="color:red;font-weight: bold;">Вещь имеет уникальные характеристики.</span>'}).appendTo(itemUl);
        return fieldset;
    }

    var _setItem = function () {
        $('.changeItem .right').html(_buildSetMD());
        $('input.mfNew').change(function () {
            var _val = parseInt($(this).val());
            if (!isNaN(_val) && _val >= 0)
                _selected.changeMf($(this).attr('rel'), _val);
            else
                $(this).val(_selected.getChangeMF($(this).attr('rel')));
            _setItem();
        });
        $('.right img.add').click(function () {
            _selected.statAdd($(this).attr('rel'), 1);
            _setItem();
        });
        $('.right img.take').click(function () {
            _selected.statTake($(this).attr('rel'), 1);
            _setItem();
        });
    }
    var _save = function () {
        var changeStats = _selected.getChangeStats();
        var changeMF = _selected.getChangeMF();
        if (changeStats > 0 || changeMF > 0)
            alert('Распределите статы и МФ');
        else
            _selected.setItem();
    }
}