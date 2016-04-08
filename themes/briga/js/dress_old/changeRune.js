/**
 * Created by Николай on 24.10.13.
 */
function ChangeRune(categoryIn)
{
    var _category;
    var _selected;
    var _that = this;

    this.change = function(){
        /**
         * кидаем вещь в контейнер
         * @type {Selected}
         * @private
         */
        _selected = new Selected(categoryIn);

        var ap = _buildAP();

        var changeItem = $('<div>', {'class':'changeItem'});
        $('<div>', {'class':'left'})
            .append(ap).appendTo(changeItem);
        $('<div>', {'class':'right'}).appendTo(changeItem);
        myWindow.change('Изменение предмета', changeItem, '<a class="btn_popup save" href="#" style="display: inline-block;">Сохранить</a>'+
            '<a href="#" class="btn_popup close_btn" style="display: inline-block;margin-left: 10px;">Закрыть</a>');
        _setItem();
        _setEventsChange();
    };

    var _setEventsChange = function () {
        $('.well.ap div').click(function () {
            if ($(this).hasClass('select')) {
                $('.well.ap div').removeClass('select').addClass('unselect');
                _selected.setApRune(0);
            } else {
                $('.well.ap div').removeClass('select').addClass('unselect');
                $(this).removeClass('unselect').addClass('select');
                _selected.setApRune($(this).attr('rel'));
            }
            _setItem();
        });


        $('.btn_popup.save').click(function () {
            _save();
            myWindow.close();
        });
        $('.btn_popup.close_btn').click(function () {
            myWindow.close();
        });
    };

    /**
     * Ап
     * @return {string}
     * @private
     */
    var _buildAP = function () {
        var fieldset = $('<fieldset>', {'class':'well ap'}).append('<legend>АП</legend>');
        var _ap = _selected.getApRune();
        $.each(runes, function (number, info) {
            var _class = 'unselect';
            if (number == _ap)
                _class = 'select';
            fieldset.append('<div id=apRune_' + number + ' class="apRuneImage ' + _class + '" rel="' + number + '"></div>');
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
        var fieldset = $('<fieldset>', {'class':'well item'}).append('<legend>Руна</legend>');
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
                    switch (name) {
                        case 'hp':
                            var hpAp = _selected.getApRuneParam('hp');
                            $('<li>', {'html':'• ' + vak[name] + ': ' + (origin + hpAp) + '  <span style="color:#708090;">' + origin + ' + ' + hpAp + '(АПЫ)</span>'}).appendTo(itemUl);
                            break;
                        case 'minu':
                            $('<li>', {'html':'• ' + vak[name] + ': ' + (_selected.getApRuneParam('minu') + value)}).appendTo(itemUl);
                            break;
                        case 'maxu':
                            $('<li>', {'html':'• ' + vak[name] + ': ' + (_selected.getApRuneParam('maxu') + value)}).appendTo(itemUl);
                            break;
                        default:
                            $('<li>', {'html':'• ' + vak[name] + ': ' + value}).appendTo(itemUl);
                            break;
                    }
                });
            }
            if (_selected.getAvailableFieldCount('stats')) {
                var changeStats = _selected.getChangeStats();
                if(_selected.getAvailableFieldCount('stats') == 1 && _selected.getSetStats())
                    _selected.statAdd(_selected.getAvailableField('stats'), _selected.getSetStats());

                $('<li>', {'html':'<span style="color:green;">Доступно для распределения: ' + _selected.getSetStats() + '</span>'}).appendTo(itemUl);
                $.each(item['params_give']['stats'], function (name, value) {
                    //console.log(name, value, _selected.getApRuneSubGroup('stats', name));
                    value += _selected.getApRuneSubGroup('stats', name);
                    if(value == 0)
                        return true;

                    if (_selected.canSetStats())
                        $('<li>', {'html':'<span class="label_stat">• ' + vak[name] + ': ' + (value + changeStats[name]) + '</span><div class="take" rel="' + name + '"></div> <div class="add" rel="' + name + '"></div>'}).appendTo(itemUl);
                    else
                        $('<li>', {'html':'<span class="label_stat">• ' + vak[name] + ': ' + (value + changeStats[name])+'</span>'}).appendTo(itemUl);
                });
            }
            if (_selected.getAvailableFieldCount('mf')) {
                var changeMF = _selected.getChangeMF();
                if(_selected.getAvailableFieldCount('mf') == 1 && _selected.getSetMF())
                    _selected.changeMf(_selected.getAvailableField('mf'), _selected.getSetMF());

                $('<li>', {'html':'<span style="color:green;">Доступно для распределения: ' + _selected.getSetMF() + ' мф</span>'}).appendTo(itemUl);
                $.each(item['params_give']['mf'], function (name, value) {
                    if(value == 0)
                        return true;
                    if(_selected.getAvailableFieldCount('mf') == 1)
                        value += changeMF[name];

                    if (_selected.canSetMF() && _selected.getAvailableFieldCount('mf') > 1)
                        $('<li>', {'html':'<div class="row"><span class="label_mf">• ' + vak[name] + ': ' + value + '%</span> + <input type="number" class="min mfNew" rel="' + name + '" value="' + changeMF[name] + '">%</div>'}).appendTo(itemUl);
                    else
                        $('<li>', {'html':'<div class="row"><span class="label_mf">• ' + vak[name] + ': ' + value + '%</span></div>'}).appendTo(itemUl);
                });
            }
            if (item['params_give']['vlad']) {
                var li = $('<li>', {'class':'inline'}).appendTo(itemUl);
                var ul = $('<ul>').appendTo(li);
                $.each(item['params_give']['vlad'], function (name, value) {
                    value += _selected.getApRuneParam('vlad');
                    if (value > 0)
                        $('<li>', {'html':'• ' + vak[name] + ': ' + value}).appendTo(ul);
                });
            }
            if (item['params_give']['vladm']) {
                var li = $('<li>').appendTo(itemUl);
                var ul = $('<ul>').appendTo(li);
                $.each(item['params_give']['vladm'], function (name, value) {
                    value += _selected.getApRuneParam('vladm');
                    if (value > 0)
                        $('<li>', {'html':'• ' + vak[name] + ': ' + value}).appendTo(ul);
                });
            }
            if (item['params_give']['bron']) {
                var li = $('<li>').appendTo(itemUl);
                var ul = $('<ul>').appendTo(li);
                $.each(item['params_give']['bron'], function (name, value) {
                    value += _selected.getApRuneParam('bron');
                    if (value > 0)
                        $('<li>', {'html':'• ' + vak[name] + ': ' + value}).appendTo(ul);
                });
            }
            if (item['params_give']['usil']) {
                var li = $('<li>').appendTo(itemUl);
                var ul = $('<ul>').appendTo(li);
                $.each(item['params_give']['usil'], function (name, value) {
                    value += _selected.getApRuneSubGroup('usil', name);
                    if (value > 0 || item['enabled_rune_'+name])
                        $('<li>', {'html':'• +' + value + '% ' + vak[name]}).appendTo(ul);
                });
            }
        }
        return fieldset;
    };

    var _setItem = function () {
        $('.changeItem .right').html(_buildSetMD());
        /*$('input.mfNew').change(function () {
            var _val = parseInt($(this).val());
            if (!isNaN(_val) && _val >= 0)
                _selected.changeMf($(this).attr('rel'), _val);
            else
                $(this).val(_selected.getChangeMF($(this).attr('rel')));
            _setItem();
        });*/
        $('.right div.add').click(function () {
            _selected.statAdd($(this).attr('rel'), 1);
            _setItem();
        });
        $('.right div.take').click(function () {
            _selected.statTake($(this).attr('rel'), 1);
            _setItem();
        });
    };

    var _save = function () {
        if ((_selected.getSetStats() != 0 && _selected.canSetStats()) || (_selected.getSetMF() != 0 && _selected.canSetMF()))
            alert('Распределите статы и МФ');
        else
            _selected.setItem();
    };

    var __construct = function(categoryIn) {
        _category = categoryIn;
    }(categoryIn);
}