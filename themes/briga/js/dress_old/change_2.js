/**
 * Created with JetBrains PhpStorm.
 * User: Николай
 * Date: 02.10.13
 * Time: 1:12
 * To change this template use File | Settings | File Templates.
 */
function ChangeItem(categoryIn) {
    var _category;
    var _selected;
    var _that = this;
    var _debug = true;

    this.change = function(){
        /**
         * кидаем вещь в контейнер
         * @type {Selected}
         * @private
         */
        _selected = new Selected(categoryIn);

        /**
         * Настройка арт
         * @type {string}
         */
        var artSet = '';
        if (_selected.isArt())
            artSet = _buildArtSettings();

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

        var top = '';
        if(!_selected.isArt() && !_selected.isWeapon())
            top = _buildTOP();

        var changeItem = $('<div>', {'class':'changeItem'});
        $('<div>', {'class':'left'})
            .append(sharpen)
            .append(mf)
            .append(ap)
            .append(podgon)
            .append(artSet)
            .append(top).appendTo(changeItem);
        $('<div>', {'class':'right'}).appendTo(changeItem);

        myWindow.change('Изменение предмета', changeItem, '<a class="btn_popup save" href="#" style="display: inline-block;">Сохранить</a>'+
            '<a href="#" class="btn_popup close_btn" style="display: inline-block;margin-left: 10px;">Закрыть</a>');
        _setItem();
        _setEventsChange();
        if (_selected.getChooseUsil() !== null)
            $('.well.art_settings .usil input[value="' + _selected.getChooseUsil() + '"]').attr('checked', true);
    };

    var _setEventsChange = function () {
        $('#mf_hp').change(function () {
            if(_debug)
                console.log('mf_hp');
            var _val = $(this).val();
            if (!isNaN(_val) && _val >= 0 && _val <= 20)
                _selected.setHpMf(_val);
            else
                $(this).val(_selected.getHpMf());
            $('.well.auto .topValue').removeAttr('checked');
            _setItem();
        });
        $('#mf_stat').change(function () {
            if(_debug)
                console.log('mf_stat');
            var _val = parseInt($(this).val());
            if(_val > 3)
                _val = 3;
            else if(_val < 0)
                _val = 0;
            _selected.setStatsMf(_val);
            $('.well.auto .topValue').removeAttr('checked');
            _setItem();
        });
        $('#mf_bron').change(function () {
            if(_debug)
                console.log('mf_bron');
            var _val = parseInt($(this).val());
            if(_val > 3) {
                _val = 3;
                $(this).val(3);
            } else if(_val < 0) {
                _val = 0;
                $(this).val(0);
            }
            _selected.setBronMf(_val);
            $('.well.auto .topValue').removeAttr('checked');
            _setItem();
        });
        $('#mf_stat').blur(function () {
            if(_debug)
                console.log('mf_stat');
            var _val = parseInt($(this).val());
            if(_val > 3) {
                _val = 3;
                $(this).val(3);
            } else if(_val < 0) {
                _val = 0;
                $(this).val(0);
            }
            _selected.setStatsMf(_val);
            $('.well.auto .topValue').removeAttr('checked');
            _setItem();
        });
        $('#mf_bron').blur(function () {
            if(_debug)
                console.log('mf_bron');
            var _val = parseInt($(this).val());
            if(_val > 3)
                _val = 3;
            else if(_val < 0)
                _val = 0;
            _selected.setBronMf(_val);
            $('.well.auto .topValue').removeAttr('checked');
            _setItem();
        });
        $('.well.ap div').click(function () {
            if(_debug)
                console.log('.well.ap div');
            if ($(this).hasClass('select')) {
                $('.well.ap div').removeClass('select').addClass('unselect');
                _selected.setAp(0);
            } else {
                $('.well.ap div').removeClass('select').addClass('unselect');
                $(this).removeClass('unselect').addClass('select');
                _selected.setAp($(this).attr('rel'));
            }
            _setItem();
        });
        $('.well.podgon div').click(function () {
            if(_debug)
                console.log('.well.podgon div');
            if ($(this).hasClass('select')) {
                $('.well.podgon div').removeClass('select').addClass('unselect');
                _selected.setPodgon(0);
            } else {
                $('.well.podgon div').removeClass('select').addClass('unselect');
                $(this).removeClass('unselect').addClass('select');
                _selected.setPodgon($(this).attr('rel'));
            }
            _setItem();
        });
        $('.well.sharpen div').click(function () {
            if(_debug)
                console.log('.well.sharpen div');
            if ($(this).hasClass('select')) {
                $('.well.sharpen div').removeClass('select').addClass('unselect');
                _selected.setSharpen(0);
            } else {
                $('.well.sharpen div').removeClass('select').addClass('unselect');
                $(this).removeClass('unselect').addClass('select');
                _selected.setSharpen($(this).attr('rel'));
            }
            _setItem();
        });


        $('.btn_popup.save').click(function () {
            if(_debug)
                console.log('.btn_popup.save');
            _save();
        });
        $('.btn_popup.close_btn').click(function () {
            if(_debug)
                console.log('.btn_popup.close_btn');
            myWindow.close();
        });
        $('.well.art_settings .add_art_hp').click(function () {
            if(_debug)
                console.log('.well.art_settings .add_art_hp');
            var val = parseInt($('.well.art_settings #art_hp').html());
            if (!isNaN(val) && val <= 60) {
                _selected.addArtHP(val + 5);
                $('.well.art_settings #art_hp').html(val + 5);
            }
            _setItem();
        });
        $('.well.art_settings .take_art_hp').click(function () {
            if(_debug)
                console.log('.well.art_settings .take_art_hp');
            var val = parseInt($('.well.art_settings #art_hp').html());
            if (!isNaN(val) && val >= 5) {
                _selected.takeArtHP(val - 5);
                $('.well.art_settings #art_hp').html(val - 5);
            }
            _setItem();
        });
        $('.well.art_settings .usil span.input').click(function () {
            if(_debug)
                console.log('.well.art_settings .usil span.input');
            $('#usil_art input').removeAttr('checked');
            if (_selected.getChooseUsil() === null || _selected.getChooseUsil() != parseInt($(this).find('input').val())) {
                _selected.setChooseUsil(parseInt($(this).find('input').val()));
                $(this).find('input').attr('checked', true);
            } else {
                _selected.setChooseUsil(null);
            }
            _setItem();
        });
        $('.well.auto .topValue').click(function() {
            if(_debug)
                console.log('.well.auto .topValue');
            $('.well.auto .topValue').removeAttr('checked');
            if ($(this).val() == 'top_unik'){
                _selected.setUnik();
                $('#mf_hp').val(20);
                $('#mf_stat').val(3);
                $('#mf_bron').val(3);
            } else {
                _selected.setTop();
                $('#mf_hp').val(20);
                $('#mf_stat').val(2);
                $('#mf_bron').val(3);
            }
            $(this).attr('checked', true);
            _setItem();
        });
        $('.well.auto .autoMF').click(function() {
            if(_debug)
                console.log('.well.auto .autoMF');
            $('.well.auto .autoMF').removeAttr('checked');
            if (_selected.getChooseMf() === null || _selected.getChooseMf() != $(this).val()) {
                _selected.setChooseMf($(this).val());
                $(this).attr('checked', true);
            } else {
                _selected.setChooseUsil(null);
            }
            _setItem();
        });
        $('.well.auto .autoStat').click(function() {
            if(_debug)
                console.log('.well.auto .autoStat');
            $('.well.auto .autoStat').removeAttr('checked');
            if (_selected.getChooseStat() === null || _selected.getChooseStat() != $(this).val()) {
                _selected.setChooseStat($(this).val());
                $(this).attr('checked', true);
            } else {
                _selected.setChooseStat(null);
            }
            _setItem();
        });
    };

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
        $('<div>', {'class':'add add_art_hp', 'style':'margin-left:2px;'}).appendTo(hpRow);
        $('<div>', {'class':'take take_art_hp', 'style':'margin-left:2px;'}).appendTo(hpRow);
        var usilRow = $('<div>', {'id':'usil_art', 'class':'usil row', 'style':'text-align:left;'}).appendTo(fieldset);
        var div = $('<div>').appendTo(usilRow);
        var div2 = $('<div>').appendTo(usilRow);
        var div3 = $('<div>').appendTo(usilRow);

        div.append('<span class="input"><input type="checkbox" value="0" id="usil_0"></span>');
        $('<label>', {'for':'usil_0', 'text':'+ 10% брони'}).appendTo(div);
        div2.append('<span class="input"><input type="checkbox" value="1" id="usil_1"></span>');
        $('<label>', {'for':'usil_1', 'text':'+5% к макс МФ'}).appendTo(div2);
        div3.append('<span class="input"><input type="checkbox" value="2" id="usil_2"></span>');
        $('<label>', {'for':'usil_2', 'text':'+3% к макс МФ и 1% к урону'}).appendTo(div3);
        /*$('<input>', {'type':'radio','value':1, 'id':'usil_0'}).appendTo(div);
        $('<label>', {'for':'usil_0', 'text':'+ 10% брони'}).appendTo(div);

        $('<input>', {'type':'radio','value':2, 'id':'usil_1'}).appendTo(div2);
        $('<label>', {'for':'usil_1', 'text':'+5% к макс МФ'}).appendTo(div2);

        $('<input>', {'type':'radio','value':3, 'id':'usil_2'}).appendTo(div3);
        $('<label>', {'for':'usil_2', 'text':'+3% к макс МФ и 1% к урону'}).appendTo(div3);*/
        return fieldset;
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
            fieldset.append('<div id=sharpen_' + _category + '_' + number + ' class="sharpenImage ' + _class + '" rel="' + number + '">');
            _return = true;
        });
        return fieldset;
    };

    /**
     * Модификаиця
     * @return {string}
     * @private
     */
    var _buildMF = function(){
        var fieldset = $('<fieldset>', {'class':'well mf'}).append('<legend>Модификация</legend>');

        if(_selected.canSetHP()) {
            var hp = $('<div>', {'class':'hp row'}).appendTo(fieldset);
            $('<label>', {'for':'mf_hp','text':'Добавить ХП'}).appendTo(hp);
            $('<input>', {'id':'mf_hp','min':0,'max':20,'type':'number','name':'mf_hp','value':_selected.getHpMf()}).appendTo(hp);
        }
        if(_selected.canSetStats()) {
            var stat = $('<div>', {'class':'stat row'}).appendTo(fieldset);
            $('<label>', {'for':'mf_stat','text':'Добавить Статы'}).appendTo(stat);
            $('<input>', {'id':'mf_stat','min':0,'max':3,'type':'number','name':'mf_stat','value':_selected.getStatsMf()}).appendTo(stat);
        }
        if(_selected.canSetBron()) {
            var bron = $('<div>', {'class':'bron row'}).appendTo(fieldset);
            $('<label>', {'for':'mf_bron','text':'Добавить Бронь'}).appendTo(bron);
            $('<input>', {'id':'mf_bron','min':0,'max':3,'type':'number','name':'mf_bron','value':_selected.getBronMf()}).appendTo(bron);
        }
        return fieldset;
    };

    var _buildTOP = function(){
        var fieldset = $('<fieldset>', {'class':'well auto'}).append('<legend>Автораспределение</legend>');

        var ulRaw = $('<ul>').appendTo(fieldset);
        $('<li>', {'html':'<label>Топ уник</label><input type="radio" class="topValue" value="top_unik">'}).appendTo(ulRaw);
        $('<li>', {'html':'<label>Топ</label><input type="radio" class="topValue" value="top">'}).appendTo(ulRaw);
        /*if(!is_empty(_selected.getSetField('stats')))
            $('<li>', {'style':'border-bottom:1px solid #e5e5e5;'}).appendTo(ulRaw);
        $.each(_selected.getSetField('stats'), function(i, name){
            $('<li>', {'html':'<label>'+vak[name]+'</label><input type="radio" class="autoStat" value="'+name+'">'}).appendTo(ulRaw);
        });
        if(!is_empty(_selected.getSetField('mf')))
            $('<li>', {'style':'border-bottom:1px solid #e5e5e5;'}).appendTo(ulRaw);
        $.each(_selected.getSetField('mf'), function(i, name){
            $('<li>', {'html':'<label>'+vak[name]+'</label><input type="radio" class="autoMF" value="'+name+'">'}).appendTo(ulRaw);
        });*/
        return fieldset;
    };

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
        $.each(apInfo, function (number, info) {
            if (info['level'] > itemLevel) {
                _return = true;
                var _class = 'unselect';
                if (number == _ap)
                    _class = 'select';
                fieldset.append('<div id=ap_' + info['level'] + ' class="apImage ' + _class + '" rel="' + number + '"></div>');
            }
        });
        return fieldset;
    };

    /**
     * Подгоны
     * @return {string}
     * @private
     */
    var _buildPodgon = function () {
        var fieldset = $('<fieldset>', {'class':'well podgon'}).append('<legend>Подгон</legend>');
        var _podgon = _selected.getPodgon();
        $.each(podgonInfo, function (number, info) {
            var _class = 'unselect';
            if (number == _podgon)
                _class = 'select';
            fieldset.append('<div id=podgon_' + _category + '_' + number + ' class="podgonImage ' + _class + '" rel="' + number + '"></div>');
        });
        return fieldset;
    };

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
        var fieldset = $('<fieldset>', {'class':'well item'}).append('<legend>Предмет</legend>');
        var itemUl = $('<ul>').appendTo(fieldset);
        var liName = $('<li>').appendTo(itemUl);
        var align = item['params_need']['other']['align'];
        if (align !== undefined && align > 0)
            liName.append('<div class="align" id="align_'+align+'"></div>');
        if (item['name'] !== undefined)
            liName.append(item['name']);
        if (item['is_art'])
            liName.append('<div class="art"></div>');

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
                                var ap = _selected.getAp();
                                var level = value;
                                if (ap > 0)
                                    level = apInfo[ap]['level'];
                                $('<li>', {'html':'• ' + vak[name] + ': ' + level}).appendTo(itemUl);
                                break;
                            default:
                                $('<li>', {'html':'• ' + vak[name] + ': ' + (value + _selected.getSetAp() + sharpenNeed)}).appendTo(itemUl);
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
                    if (value == 0 && !_selected.isArt())
                        return true;
                    if (!_selected.isWeapon() && _selected.canSetStats() || _selected.isArt())
                        $('<li>', {'html':'<span class="label_stat">• ' + vak[name] + ': ' + (value + changeStats[name]) + '</span> <div class="take" rel="' + name + '"></div> <div class="add" rel="' + name + '"></div></div> <div class="addPP" rel="' + name + '"></div>'}).appendTo(itemUl);
                    else
                        $('<li>', {'html':'<span class="label_stat">• ' + vak[name] + ': ' + (value + changeStats[name])+'</span>'}).appendTo(itemUl);
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
                        $('<li>', {'html':'<div class="row"><span class="label_mf">• ' + vak[name] + ': ' + value + '%</span> + <input type="number" class="min mfNew" rel="' + name + '" value="' + changeMF[name] + '">%<div style="vertical-align: middle;margin-left: 10px;" class="addPP mf" rel="' + name + '"></div></div></div>'}).appendTo(itemUl);
                    else
                        $('<li>', {'html':'<div class="row"><span class="label_mf">• ' + vak[name] + ': ' + value + '%</span></div>'}).appendTo(itemUl);
                });
            }
            if (item['params_give']['vlad']) {
                var li = $('<li>').appendTo(itemUl);
                var ul = $('<ul>').appendTo(li);
                $.each(item['params_give']['vlad'], function (name, value) {
                    if (value > 0)
                        $('<li>', {'html':'• ' + vak[name] + ': ' + value}).appendTo(ul);
                });
            }
            if (item['params_give']['bron']) {
                var li = $('<li>').appendTo(itemUl);
                var ul = $('<ul>').appendTo(li);
                var apBron = _selected.getApBron();
                $.each(item['params_give']['bron'], function (name, value) {
                    var mfBron = value == 0 ? 0 :_selected.getBronMf();
                    if (value > 0 || _selected.isArt()) {
                        var art = 0;
                        if (_selected.isArt()) {
                            art = _selected.getArtBron();
                            if (value == 0 && art == 0)
                                return;
                        }
                        $('<li>', {'html':'• ' + vak[name] + ': ' + (value + art + apBron + mfBron)}).appendTo(ul);
                    }
                });
            }
            if (item['params_give']['usil']) {
                var li = $('<li>').appendTo(itemUl);
                var ul = $('<ul>').appendTo(li);
                $.each(item['params_give']['usil'], function (name, value) {
                    if (value > 0)
                        $('<li>', {'html':'• +' + value + '% ' + vak[name]}).appendTo(ul);
                });
            }
        }
        if (_selected.getStatsMf() == 3 || item['is_art'] || item['create_art'])
            $('<li>', {'html':'<span style="color:red;font-weight: bold;">Вещь имеет уникальные характеристики.</span>'}).appendTo(itemUl);
        return fieldset;
    };

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
        $('.right div.add').click(function () {
            _selected.statAdd($(this).attr('rel'), 1);
            _setItem();
        });
        $('.right div.take').click(function () {
            _selected.statTake($(this).attr('rel'), 1);
            _setItem();
        });
        $('.right div.addPP').click(function () {
            if(!$(this).hasClass('mf'))
                _selected.statAdd($(this).attr('rel'), _selected.getSetStats());
            else
                _selected.changeMf($(this).attr('rel'), _selected.getSetMF());
            _setItem();
        });
    };

    var _save = function () {
        if ((_selected.getSetStats() != 0 && _selected.canSetStats()) || (_selected.getSetMF() != 0 && _selected.canSetMF()))
            alert('Распределите статы и МФ');
        else {
            _selected.setItem();
            myWindow.close();
        }
    };

    var __construct = function(categoryIn) {
        _category = categoryIn;
    }(categoryIn);
}