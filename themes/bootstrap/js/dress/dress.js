/**
 * Created with JetBrains PhpStorm.
 * User: user
 * Date: 26.12.12
 * Time: 16:14
 * To change this template use File | Settings | File Templates.
 */
function changeWindow(header, body, footer, stat)
{
    if(stat === undefined || stat == 'show' || stat == 'showNew') {
        if(header != '') $('#myModal .modal-header').html(header);
        if(body != '') $('#myModal .modal-body').html(body);
        if(footer != '') $('#myModal .modal-footer').html(footer);
        if(stat != 'showNew')
            $('#myModal').addClass('change_window');
        $('#myModal').modal('show');
    } else {
        $('#myModal').removeClass('change_window');
        if($('#myModal .modal-footer a.save').length) {
            $('#myModal .modal-footer a.save').remove();
        }

    }
    if(stat == 'hide')
        $('#myModal').modal('hide');
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
        changeWindow('', getItems(), '', 'showNew');
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
        if (_selected.canAp())
            ap = _buildAP();
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
        changeWindow('', '<div class="changeItem">' +
            '<div class="left">' + sharpen + '<div class="mf_block">' + mf + '</div>' + ap + podgon + artSet + auto + '' +
            '</div>' +
            '<div class="right"></div>' +
            '</div>', '<a data-dismiss="modal" class="btn save" href="#">Сохранить</a>' +  $('.modal-footer').html());
        _setEventsChange();
        _setItem();
        if (_selected.getChooseUsil() !== null)
            $('.well.art_settings .usil input[value="' + _selected.getChooseUsil() + '"]').attr('checked', true);
    }
    var _setEvents = function () {
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
            } else {
                var category = container[tab].setItem(
                    items.getCurrItem(_category, $(this).attr('rel')),
                    _category,
                    $(this).attr('rel')
                );
                dummy.setItem(category);
            }
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

        $('.btn.save').click(function () {
            _save();
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
        var string = '<div class="item_window">';
        $.each(items.getCurrCategory(_category), function (i, item) {
            string += '<div class="item">';
            string += '<img src="' + item['img'] + '" style="cursor:pointer;" rel="' + i + '">';
            string += '</div>';
        });
        string += '</div>';
        return string;
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
        var item = container[tab].getCurrItem(_category);
        var string = '<fieldset class="well mf"><legend>Модификация</legend>';
        /* give hp? */
        if (_selected.canSetHP())
            string += '<div class="hp row">' +
                '<label for="mf_hp">Добавить ХП</label>' +
                '<input id="mf_hp" min="0" max="20" value="' + _selected.getHpMf() + '" type="number" name="mf_hp">' +
                '</div>';
        if (_selected.canSetStats()) {
            var mfStats = _selected.getStatsMf();
            string += '<div class="stat row">' +
                '<label for="mf_stat">Добавить Статы</label>' +
                '<select id="mf_stat" name="mf_stat">';
            for (var i = 0; i < 4; i++) {
                var _select = '';
                if (mfStats == i)
                    _select = ' selected';
                string += '<option value="' + i + '"' + _select + '>' + i + '</option>';
            }
            string += '</select></div>';
        }
        if (_selected.canSetBron()) {
            var mfBron = _selected.getBronMf();
            string += '<div class="bron row">' +
                '<label for="mf_bron">Добавить Бронь</label>' +
                '<select id="mf_bron" name="mf_bron">';
            for (var i = 0; i < 4; i++) {
                var _select = '';
                if (mfBron == i)
                    _select = ' selected';
                string += '<option value="' + i + '"' + _select + '>' + i + '</option>';
            }
            string += '</select></div>';
        }
        string += '</fieldset>';
        return string;
    }
    /**
     * Ап
     * @return {string}
     * @private
     */
    var _buildAP = function () {
        var itemLevel = _selected.getItemLevel();
        var string = '<fieldset class="well ap"><legend>АП</legend>';
        var _body = '';
        var _ap = _selected.getAp();
        $.each(apImg, function (number, img) {
            if (apInfo[number]['level'] > itemLevel) {
                var _class = 'unselect';
                if (number == _ap)
                    _class = 'select';
                _body += '<img src=' + img + ' class="' + _class + '" rel="' + number + '">';
            }
        });
        string += _body;
        string += '</fieldset>';
        if(_body != '')
            return string;
        else
            return '';
    }
    /**
     * Подгоны
     * @return {string}
     * @private
     */
    var _buildPodgon = function () {
        var string = '<fieldset class="well podgon"><legend>Подгон</legend>';
        var _podgon = _selected.getPodgon();
        $.each(podgon[_category], function (number, img) {
            var _class = 'unselect';
            if (number == _podgon)
                _class = 'select';
            string += '<img src=' + img + ' class="' + _class + '" rel="' + number + '">';
        });
        string += '</fieldset>';
        return string;
    }
    /**
     * Заточка
     * @return {string}
     * @private
     */
    var _buildSharpen = function () {
        var string = '<fieldset class="well sharpen"><legend>Заточка</legend>';
        var _sharpen = _selected.getSharpen();
        $.each(sharpen[_category], function (number, img) {
            var _class = 'unselect';
            if (number == _sharpen)
                _class = 'select';
            string += '<img src=' + img + ' class="' + _class + '" rel="' + number + '">';
        });
        string += '</fieldset>';
        return string;
    }
    /**
     * Настройки арта
     * @return {string}
     * @private
     */
    var _buildArtSettings = function () {
        var string = '<fieldset class="well art_settings"><legend>Настройки арта</legend>';
        string += '<div class="hp row">' +
            '<label for="art_hp">Добавить ХП</label>' +
            ' <span id="art_hp">' + _selected.getArtHp() + '</span>' +
            ' <img class="add_art_hp" src="/images/dress/up.gif" style="cursor:pointer;"> <img style="cursor:pointer;" class="take_art_hp" src="/images/dress/down.gif">' +
            '</div>';
        string += '<div class="usil row" style="text-align:left;">' +
            '<input type="radio" value="1" name="usil[]" id="usil_0">' +
            ' <label for="usil_0">+ 10% брони</label><br>' +
            '<input type="radio" value="2" name="usil[]" id="usil_1">' +
            ' <label for="usil_1">+5% к макс МФ</label><br>' +
            '<input type="radio" value="3" name="usil[]" id="usil_2">' +
            ' <label for="usil_2">+3% к макс МФ и 1% к урону</label><br>' +
            '</div>';
        string += '</fieldset>';
        return string;
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
        var head = '';
        var a = '';
        var art = '';
        var podgon = _selected.getPodgon();
        var align = item['params_need']['other']['align'];
        if (align !== undefined && align > 0)
            a = '<img src="http://i.oldbk.com/i/align_' + align + '.gif"> ';
        if (item['is_art'])
            art = '<img src="http://i.oldbk.com/i/artefact.gif">';
        if (item['name'] !== undefined)
            head += a + item['name'] + ' ' + art + '<br>';
        if (item['price'] !== undefined && (item['repa_cost'] === undefined || !item['repa_cost'])) {
            var price = item['price'];
            $.each(podgonInfo, function (i, info) {
                if (i <= podgon)
                    price += Math.round(price * info['cost']);
            });
            head += 'Цена: ' + (price + _selected.getSharpenCost()) + ' кр.<br>';
        } else if (item['repa_cost'] !== undefined && item['repa_cost'] > 0)
            head += 'Цена: ' + item['repa_cost'] + ' реп.<br>';

        if (podgon) {
            var count = 'раз';
            if (podgon == 2 || podgon == 3 || podgon == 4)
                count += 'a';
            head += 'Подогнано: <b>' + podgon + ' ' + count + '</b><br>';
        }
        /**
         * Строим то, что требуется
         * @type {string}
         */
        var need = '';
        if (item['params_need'] !== undefined) {
            need = 'Требуется минимальное:<br>';
            //var ap = _selected.getAp();
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
                                need = need + '• ' + vak[name] + ': ' + level + '<br>';
                                break;
                            default:
                                need = need + '• ' + vak[name] + ': ' + (value + ap + sharpenNeed) + '<br>';
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
        var give = '';
        if (item['params_give'] !== undefined) {
            give = 'Действует на:<br>';
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
                            give += '• ' + vak[name] + ': ' + (origin + hpMf + art + hpAp) + '  <span style="color:#708090;">' + origin + ' + ' + hpMf + '(МФ) + ' + hpAp + '(АПЫ) + ' + art + '(АРТ)</span><br>';
                            break;
                        case 'minu':
                            if (!_selected.isWeapon())
                                give += '• ' + vak[name] + ': ' + (value + _selected.artMin()) + '<br>';
                            else
                                give += '• ' + vak[name] + ': ' + (_selected.getSharpenMinu() + _selected.artMin() + _selected.getApMinu() + value) + '<br>';
                            break;
                        case 'maxu':
                            if (!_selected.isWeapon())
                                give += '• ' + vak[name] + ': ' + (value + _selected.artMax()) + '<br>';
                            else
                                give += '• ' + vak[name] + ': ' + (_selected.getSharpenMaxu() + _selected.artMax() + _selected.getApMaxu() + value) + '<br>';
                            break;
                        default:
                            give += '• ' + vak[name] + ': ' + value + '<br>';
                            break;
                    }
                });
            }
            if (item['params_give']['stats']) {
                var changeStats = _selected.getChangeStats();
                if (!_selected.isWeapon() && _selected.canSetStats() || _selected.isArt())
                    give += '<span style="color:green;">Доступно для распределения: ' + _selected.getSetStats() + '</span><br>';
                $.each(item['params_give']['stats'], function (name, value) {
                    if (value <= 0 && !_selected.isArt())
                        return true;
                    if (!_selected.isWeapon() && _selected.canSetStats() || _selected.isArt())
                        give += '• ' + vak[name] + ': ' + (value + changeStats[name]) + ' <img class="add" rel="' + name + '" src="/images/dress/up.gif"> <img class="take" rel="' + name + '" src="/images/dress/down.gif"><br>';
                    else
                        give += '• ' + vak[name] + ': ' + (value + changeStats[name]) + '<br>';
                });
            }
            if ((item['params_give']['mf'])) {
                if (!_selected.isWeapon() && _selected.canSetMF() || _selected.isArt())
                    give = give + '<span style="color:green;">Доступно для распределения: ' + _selected.getSetMF() + ' мф</span><br>';
                $.each(item['params_give']['mf'], function (name, value) {
                    if (value <= 0 && !_selected.isArt())
                        return true;
                    var changeMF = _selected.getChangeMF();
                    if (!_selected.isWeapon() && _selected.canSetMF() || _selected.isArt())
                        give += '<div class="row"><label>• ' + vak[name] + ': ' + value + '%</label> + <input type="number" class="min mfNew" rel="' + name + '" value="' + changeMF[name] + '">%</div>';
                    else
                        give += '<div class="row"><label>• ' + vak[name] + ': ' + value + '%</label></div>';
                });
            }
            if (item['params_give']['vlad']) {
                $.each(item['params_give']['vlad'], function (name, value) {
                    if (value > 0)
                        give += '• ' + vak[name] + ': ' + value + '<br>';
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
                        give += '• ' + vak[name] + ': ' + (value + art + apBron + mfBron) + '<br>';
                    }
                });
            }
            if (item['params_give']['usil']) {
                $.each(item['params_give']['usil'], function (name, value) {
                    if (value > 0)
                        give = give + '• +' + value + '% ' + vak[name] + '<br>';
                });
            }
        }
        if (_selected.getStatsMf() == 3 || item['is_art'] || item['create_art'])
            give += '<br><span style="color:red;font-weight: bold;">Вещь имеет уникальные характеристики.</span>';
        return '<fieldset class="well item"><legend>Прдемет</legend>' + head + need + give + '</fieldset>';
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