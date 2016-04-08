/**
 * Created with JetBrains PhpStorm.
 * User: user
 * Date: 26.12.12
 * Time: 16:10
 * To change this template use File | Settings | File Templates.
 */
function Dummy()
{
    var _that = this;
    this.setEvents = function()
    {
        var item = $('.pers img.i');
        item.unbind('mouseover');
        item.unbind('mouseout');
        item.unbind('click');
        item.mouseover(function(e){
            if($(this).hasClass('item_empty'))
                new Hint(e, null, $(this).attr('alt'));
            else
                new Hint(e, container[tab].getCurrItem($(this).attr('id')), '');
        });
        item.mouseout(function(){
            removeHint();
        });
        item.click(function(e){
            if($(this).hasClass('item_empty')) {
                if($(this).hasClass('or')) {
                    var menu = new Menu(null, e);
                    menu.orShow(true);
                } else {
                    var dress = new Dress();
                    dress.newW($(this).attr('id'));
                }
            } else {
                var menu = new Menu($(this).attr('id'), e);
                if($(this).hasClass('or'))
                    menu.orShow(false);
                else
                    menu.show();
            }
        });
        var AddButton = $('.stats .p');
        AddButton.unbind('click');
        AddButton.click(function () {
            if ($(this).hasClass('other'))
                _that.add('other', $(this).attr('rel'), 1);
            else if ($(this).hasClass('stat'))
                _that.add('stats', $(this).attr('rel'), 1);
            else if ($(this).hasClass('vlad'))
                _that.add('vlad', $(this).attr('rel'), 1);
        });

        var TakeButton = $('.stats .m');
        TakeButton.unbind('click');
        TakeButton.click(function () {
            if ($(this).hasClass('other'))
                _that.take('other', $(this).attr('rel'), 1);
            else if ($(this).hasClass('stat'))
                _that.take('stats', $(this).attr('rel'), 1);
            else if ($(this).hasClass('vlad'))
                _that.take('vlad', $(this).attr('rel'), 1);
        });

        var ChangeParamInput = $('.stats input');
        ChangeParamInput.unbind('blur');
        ChangeParamInput.blur(function () {
            if ($(this).hasClass('other'))
                _that.change('other', $(this).attr('rel'), parseInt($(this).val()));
            else if ($(this).hasClass('stat'))
                _that.change('stats', $(this).attr('rel'), parseInt($(this).val()));
            else if ($(this).hasClass('vlad'))
                _that.change('vlad', $(this).attr('rel'), parseInt($(this).val()));
        });
        var createArt = $('.img_icon1');
        createArt.unbind('clicl');
        createArt.click(function(){
            var dress = new Dress();
            dress.showArt();
        });
    }
    /**
     * Надеть вещь на куклу
     * @param categoryIn категория вещи
     * @param reDraw перерисовать
     */
    this.setItem = function (categoryIn, reDraw) {
        var item = container[tab].getCurrItem(categoryIn);
        var dummyItem = $('.pers #'+categoryIn);
        dummyItem.attr('src', item['img']);
        dummyItem.removeClass('item_empty').addClass('item_dressed');
        if(reDraw === undefined || reDraw === true)
            _that.drawDummyParams();
    }
    /**
     * Снять вещь с кукли
     * @param categoryIn категория вещи
     */
    this.unsetItem = function (categoryIn) {
        var dummyItem = $('.pers #'+categoryIn);
        dummyItem.attr('src', empty[categoryIn]);
        dummyItem.removeClass('item_dressed').addClass('item_empty');
        _that.drawDummyParams();
    }
    /**
     * клик добавить стат\владение
     * @param typeIn
     * @param nameIn
     * @param valueIn
     */
    this.add = function (typeIn, nameIn, valueIn) {
        switch (typeIn) {
            case 'other':
                var curValue = container[tab].getParamValue(typeIn, 'have', nameIn);
                var nextValue = curValue + valueIn;
                if (nameIn == 'level') {
                    if (levelGive[nextValue] !== undefined) {
                        container[tab].paramAdd(typeIn, 'have', nameIn, valueIn);
                        container[tab].setParamValue(typeIn, 'have', 'ap', 0);
                    }
                    else
                        showMessage('error', 'Уровень ' + nextValue + ' еще не доступен.');
                }
                else if (nameIn == 'ap') {
                    var curLevel = container[tab].getParamValue('other', 'have', 'level');
                    if (levelGive[curLevel]['ap'] >= nextValue)
                        container[tab].paramAdd('other', 'have', nameIn, valueIn);
                    else
                        showMessage('error', nextValue + ' АП не существует.');
                }
                break;
            default:
                container[tab].paramAdd(typeIn, 'own', nameIn, valueIn);
                break;
        }
        _that.drawDummyParams();
    }
    /**
     * клик отнять стат\владение
     * @param typeIn
     * @param nameIn
     * @param valueIn
     */
    this.take = function (typeIn, nameIn, valueIn) {
        switch (typeIn) {
            case 'other':
                var curValue = container[tab].getParamValue(typeIn, 'have', nameIn);
                if ((curValue - valueIn) >= 0)
                    container[tab].paramTake(typeIn, 'have', nameIn, valueIn);
                else
                    showMessage('error', 'Занчение не может быть меньше 0');
                break;
            default:
                var curValue = container[tab].getParamValue(typeIn, 'own', nameIn);
                var minValue = 3;
                if (nameIn == 'intel' || nameIn == 'mudra' || typeIn == 'vlad')
                    minValue = 0;
                else if (nameIn == 'vinos')
                    minValue = 3;
                if (curValue - valueIn >= minValue)
                    container[tab].paramTake(typeIn, 'own', nameIn, valueIn);
                else
                    showMessage('error', 'Вы не можете сделать ваш стат "' + vak[nameIn] + '" меньше ' + minValue + '.');
                break;
        }
        _that.drawDummyParams();
    }
    /**
     * изменение параметров через инпут
     * @param typeIn
     * @param nameIn
     * @param valueIn
     */
    this.change = function (typeIn, nameIn, valueIn) {
        switch (typeIn) {
            case 'other':
                var curLevel = container[tab].getParamValue(typeIn, 'have', 'level');
                if (nameIn == 'level' && levelGive[valueIn] !== undefined) {
                    container[tab].setParamValue(typeIn, 'have', nameIn, valueIn);
                    container[tab].setParamValue(typeIn, 'have', 'ap', 0);
                }
                else if (nameIn == 'ap' && levelGive[curLevel]['ap'] >= valueIn)
                    container[tab].setParamValue(typeIn, 'have', nameIn, valueIn);
                else if (nameIn == 'level')
                    showMessage('error', 'Несуществующий уровень');
                else if (nameIn == 'ap')
                    showMessage('error', 'Несуществующий АП');
                break;
            default:
                var minValue = 3;
                if (nameIn == 'intel' || nameIn == 'mudra' || typeIn == 'vlad')
                    minValue = 0;
                else if (nameIn == 'vinos')
                    minValue = 3;
                if (valueIn >= minValue)
                    container[tab].setParamValue(typeIn, 'own', nameIn, valueIn);
                else
                    showMessage('error', 'Вы не можете сделать ваш стат "' + vak[nameIn] + '" меньше ' + minValue + '.');
                break;
        }
        _that.drawDummyParams();
    }
    /**
     * перерисовать куклу
     */
    this.drawDummyImg = function() {
        $.each(empty, function (cat, img) {
            $('#'+cat).attr('src', img);
            $('#'+cat).removeClass('item_dressed');
            $('#'+cat).addClass('item_empty');
        });
        $.each(container[tab].getDummyItems(), function(category, item){
            if(item['img'] !== undefined)
                _that.setItem(category, false);
        });
        _that.drawDummyParams();
    }
    /**
     * Прописовать и выставить все параметры
     */
    this.drawDummyParams = function () {
        _that.drawLevelAndAp();
        _that.drawStatsAndVlad('stats');
        _that.drawStatsAndVlad('vlad');
        _that.drawTableParams('other');
        _that.drawTableParams('mf');
        _that.drawTableParams('bron');
        _that.drawParamsToMF();
        _that.drawUsil();
        _that.drawOtherInfo();
    }
    /**
     * Рисуем уровень и ап
     */
    this.drawLevelAndAp = function () {
        var curLevel = container[tab].getParamValue('other', 'have', 'level');
        var curAp = container[tab].getParamValue('other', 'have', 'ap');
        var availableStats = 0;
        var statOwn = 0;
        $.each(levelGive, function (level, info) {
            if (level < curLevel) {
                if(level == 10)
                    availableStats += (info['stats'] + info['vinos'] + (info['ap']*2));
                else if(level == 11)
                    availableStats += (info['stats'] + info['vinos'] + info['ap']+5);
                else
                    availableStats += (info['stats'] + info['vinos'] + info['ap']);
            } else if (level == curLevel)
                availableStats += (info['stats'] + info['vinos']);
        });
        if(curLevel == 10)
            availableStats += curAp * 2;
        else if(curLevel == 11 && curAp > 8)
            availableStats += curAp + (curAp - 8 * 2);
        else if(curLevel == 12 && curAp < 3)
            availableStats += curAp * 2;
        else if(curLevel == 12 && curAp >= 3)
            availableStats += curAp * 2 + 1;
        else
            availableStats += curAp;

        var ownStats = container[tab].getGroupParam('stats', 'own');
        $.each(ownStats, function (name, value) {
            statOwn += value;
        });

        var text = _that.compareTextLevelAndAp(curAp, curLevel, availableStats, statOwn);
        $('.hintview').html(text);
        $('.level[rel="level"]').val(curLevel);
        var needLevel = container[tab].getParamValue('other', 'need', 'level');
        if (curLevel >= needLevel)
            $('.level[rel="value"]').html(curLevel);
        else
            $('.level[rel="value"]').html(curLevel + '<span style="color:red;">(' + (curLevel - needLevel) + ')</span>');
        $('.ap[rel="ap"]').val(curAp);
        $('.ap[rel="value"]').html(curAp);
    }
    /**
     * Формируем текст для отображения уровня и апа
     * @param curAp Текущий ап
     * @param curLevel Текущий уровень
     * @param availableStats Свободных статов
     * @param statOwn Родных статов
     * @return {string}
     */
    this.compareTextLevelAndAp = function (curAp, curLevel, availableStats, statOwn) {
        var text = 'На ' + curAp + ' апе [' + curLevel + '] Вам доступно <b>' + availableStats + '</b> родных статов.';
        if (availableStats < statOwn) {
            text += ' В Вашем комплекте используется <span style="font-weight: bold;color:red;">' + statOwn + '</span> родных статов.';
            text += ' Не хватает <b>' + ((availableStats - statOwn) * (-1)) + '</b> статов.';
        } else {
            text += ' В Вашем комплекте используется ' + statOwn + ' родных статов.';
            if (availableStats > statOwn)
                text += ' Осталось <b>' + (availableStats - statOwn) + ' </b>свободных статов.';
            else
                text += ' Свободных статов нет.';
        }
        return text;
    }
    /**
     * Рисуем владения и уровень
     * @param categoryIn
     */
    this.drawStatsAndVlad = function (categoryIn) {
        var ownParams = container[tab].getGroupParam(categoryIn, 'own');
        $.each(ownParams, function (statName, statValue) {
            $('.'+statName+'[rel="' + statName + '"]').val(statValue);
        });
        var haveParams = container[tab].getGroupParam(categoryIn, 'have');
        $.each(haveParams, function (statName, statValue) {
            var ownAndHave = container[tab].getParamValue(categoryIn, 'own', statName) + statValue;
            var need = container[tab].getParamValue(categoryIn, 'need', statName);
            var diff = ownAndHave - need;
            if (diff < 0)
                $('.' + statName).html(ownAndHave + '<span style="color:red"> (' + diff + ')</span>');
            else
                $('.' + statName).html(ownAndHave);
        });
    }
    /**
     * Выставляем модификации кукли (уроен, хр, мф и т.д.)
     * @param categoryIn
     */
    this.drawTableParams = function (categoryIn) {
        var haveParams = container[tab].getGroupParam(categoryIn, 'have');
        $.each(haveParams, function (statName, statValue) {
            var pers = '';
            if (categoryIn == 'mf')
                pers = ' %';
            switch(statName){
                case 'minu':
                    var minU = 0;
                    var vladCount = 0;
                    var level = container[tab].getParamValue('other', 'have', 'level');
                    var items = container[tab].getDummyItems();
                    $.each(items, function(cat, item){
                        if(is_empty(item))
                            return;

                        minU += item['params_give']['other']['minu'];
                        if(cat == 'nog' || cat == 'mech' || cat == 'dubina' || cat == 'topor') {
                            vladCount = container[tab].getParamValue('vlad', 'have', cat);
                            vladCount += container[tab].getParamValue('vlad', 'own', cat);
                        }
                    });

                    statValue = Math.round(1 + parseInt(level) + parseInt(minU) * (1 + 0.07 * parseInt(vladCount)));
                    break;
                case 'maxu':
                    var maxU = 0;
                    var vladCount = 0;
                    var level = container[tab].getParamValue('other', 'have', 'level');
                    var items = container[tab].getDummyItems();
                    $.each(items, function(cat, item){
                        if(is_empty(item))
                            return;

                        maxU += item['params_give']['other']['maxu'];
                        if(cat == 'nog' || cat == 'mech' || cat == 'dubina' || cat == 'topor') {
                            vladCount = container[tab].getParamValue('vlad', 'have', cat);
                            vladCount += container[tab].getParamValue('vlad', 'own', cat);
                        }
                    });

                    statValue = Math.round(4 + parseInt(level) + parseInt(maxU) * (1 + 0.07 * parseInt(vladCount)));
                    break;
            }
            $('.table_mf .' + statName).html(statValue + pers);
            $('.table_mf .' + statName).attr('value', statValue);
        });
    }
    /**
     * Рисуем усиления
     */
    this.drawUsil = function () {
        var haveParamsUsil = container[tab].getGroupParam('usil', 'have');
        $.each(haveParamsUsil, function (statOwn, valueOwn) {
            switch (statOwn) {
                case 'usil_uron':
                    var cur_minu = container[tab].getParamValue('other', 'have', 'minu');
                    var cur_maxu = container[tab].getParamValue('other', 'have', 'maxu');
                    var val = Math.round(cur_minu + cur_minu * (valueOwn/100));
                    var val2 = Math.round(cur_maxu + cur_maxu * (valueOwn/100));
                    $('.table_mf .minu').val(cur_minu + (cur_minu * (valueOwn/100)));
                    $('.talbe_mf .minu').html(val);
                    $('.table_mf .maxu').val(cur_maxu + (cur_maxu * (valueOwn/100)));
                    $('.talbe_mf .maxu').html(val2);
                    break;
                case 'usil_max_mf':
                    var krit = $('.table_mf .krit').val();
                    var pkrit = $('.table_mf .pkrit').val();
                    var uvorot = $('.table_mf .uvor').val();
                    var puvorot = $('.table_mf .puvor').val();
                    if(krit > pkrit && krit > uvorot && krit > puvorot) {
                        $('.table_mf .krit').val(krit + krit * (valueOwn/100));
                        $('.table_mf .krit').html(Math.round(krit + krit * (valueOwn/100)) + '%');
                    } else if(pkrit > krit && pkrit > uvorot && pkrit > puvorot) {
                        $('.table_mf .pkrit').val(pkrit + pkrit * (valueOwn/100));
                        $('.table_mf .pkrit').html(Math.round(pkrit + pkrit * (valueOwn/100)) + '%');
                    } else if(uvorot > krit && uvorot > pkrit && uvorot > puvorot) {
                        $('.table_mf .uvor').val(uvorot + uvorot * (valueOwn/100));
                        $('.table_mf .uvor').html(Math.round(uvorot + uvorot * (valueOwn/100)) + '%');
                    } else if(puvorot > krit && puvorot > pkrit && puvorot > uvorot) {
                        $('.table_mf .puvor').val(puvorot + puvorot * (valueOwn/100));
                        $('.table_mf .puvor').html(Math.round(puvorot + puvorot * (valueOwn/100)) + '%');
                    }
                    break;
                case 'usil_bron':
                    var haveParamsBron = container[tab].getGroupParam('bron', 'have');
                    $.each(haveParamsBron, function(name, value) {
                        $('.table_mf .' + name).val(value + value * (valueOwn/100));
                        $('.table_mf .' + name).html(parseInt(value + value * (valueOwn/100)));
                    });
                    break;
            }
            $('.table_mf .' + statOwn).html(valueOwn + '%');
        });
    }
    /**
     * Рисуем массу, стоимость
     */
    this.drawOtherInfo = function () {
        var items = container[tab].getDummyItems();
        var unikCount = 0;

        $.each(items, function (category, info) {
            if( (info['settings'] !== undefined && info['settings']['mf']['stats'] == 3) || info['is_art'] || info['create_art'])
                unikCount++;
        });
        $('.table_mf .unik').val(unikCount);
        if(unikCount > 5) {
            $('.table_mf .unik').html('<span style="color:red;">' + unikCount + '</span>');
            var haveParamsMF = container[tab].getGroupParam('mf', 'have');
            $.each(haveParamsMF, function (statName, value) {
                var cur = parseInt($('.table_mf .' + statName).attr('value'));
                var val = Math.round(cur + (cur * 0.01));
                $('.table_mf .' + statName).html(val + '%');
                $('.table_mf .' + statName).attr('value', cur + (cur * 0.01));
            });
        } else
            $('.table_mf .unik').html(unikCount);
        var silaCount = 0;
        var itemsMassa = container[tab].getAllMass();
        var haveParamsStats = container[tab].getGroupParam('stats', 'have');
        $.each(haveParamsStats, function (name, value) {
            if (name == 'sila')
                silaCount += value;
        });
        var ownParamsStats = container[tab].getGroupParam('stats', 'own');
        $.each(ownParamsStats, function (name, value) {
            if (name == 'sila')
                silaCount += value;
        });
        $('.table_mf .massa').val(itemsMassa + '/' + silaCount);
        $('.table_mf .massa').html(itemsMassa + '/' + silaCount * 4);
        var cost = container[tab].getAllCost();
        var costRepa = container[tab].getAllCostRepa();
        $('.table_mf .cost').val(cost);
        $('.table_mf .cost').html(cost + ' кр.');
        $('.table_mf .cost_repa').val(costRepa);
        $('.table_mf .cost_repa').html(costRepa + ' реп.');
    }
    /**
     * Превращаем статы в модификации
     */
    this.drawParamsToMF = function () {
        var ownParamsStats = container[tab].getGroupParam('stats', 'own');
        $.each(ownParamsStats, function (statOwn, valueOwn) {
            $.each(statToMf, function (typeTo, paramsTo) {
                if (paramsTo[statOwn] !== undefined) {
                    $.each(paramsTo[statOwn], function (categoryGive, value) {
                        $.each(value, function (paramGive, valueGive) {
                            var cur = parseInt($('.table_mf .' + paramGive).attr('value'));
                            var val = Math.round((valueGive * valueOwn) + cur);
                            $('.table_mf .' + paramGive).html(val);
                            $('.table_mf .' + paramGive).attr('value', (valueGive * valueOwn) + cur);
                        });
                    });
                }
            });
        });
        var haveParamsStats = container[tab].getGroupParam('stats', 'have');
        $.each(haveParamsStats, function (statOwn, valueOwn) {
            $.each(statToMf, function (typeTo, paramsTo) {
                if (paramsTo[statOwn] !== undefined) {
                    $.each(paramsTo[statOwn], function (categoryGive, value) {
                        $.each(value, function (paramGive, valueGive) {
                            var cur = parseInt($('.table_mf .' + paramGive).attr('value'));
                            var val = Math.round((valueGive * valueOwn) + cur);
                            var pers = '';
                            if (categoryGive == 'mf')
                                pers = '%';
                            $('.table_mf .' + paramGive).html(val + pers);
                            $('.table_mf .' + paramGive).attr('value', (valueGive * valueOwn) + cur);
                        });
                    });
                }
            });
        });
    }
}