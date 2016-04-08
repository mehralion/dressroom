/**
 * Created by Николай on 09.05.14.
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

        $.ajax({
            url: baseSiteUrl+'site/change.html',
            dataType: 'json',
            success: function(response){
                if(response.ok !== undefined) {
                    myWindow.text("Изменение предмета", response.content, '<a class="btn_popup save" href="#" style="display: inline-block;">Сохранить</a>'+
                        '<a href="#" class="btn_popup close_btn" style="display: inline-block;margin-left: 10px;">Закрыть</a>', 'change_items');

                    _setItem();
                }
            }
        });
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