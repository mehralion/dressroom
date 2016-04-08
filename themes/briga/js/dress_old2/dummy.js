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
        var item = $('.player .i');
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
        var AddButton = $('.white_box_left .pluse');
        AddButton.click(function (event) {
            event.preventDefault();
            var type = $($(this).parent().parent().get(0)).attr('id');
            var param = $($(this).parent().get(0)).attr('id');
            _that.add(type, param, 1);
        });

        var TakeButton = $('.white_box_left .minuse');
        TakeButton.click(function (event) {
            event.preventDefault();
            var type = $($(this).parent().parent().get(0)).attr('id');
            var param = $($(this).parent().get(0)).attr('id');
            _that.take(type, param, 1);
        });

        var ChangeParamInput = $('.white_box_left input');
        ChangeParamInput.blur(function (event) {
            event.preventDefault();
            var type = $($(this).parent().parent().get(0)).attr('id');
            var param = $($(this).parent().get(0)).attr('id');
            _that.change(type, param, parseInt($(this).val()));
        });
        var createArt = $('.img_icon');
        createArt.click(function(event){
            event.preventDefault();
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
        var dummyItem = $('.player #'+categoryIn);
        if(categoryIn == 'runa1' || categoryIn == 'runa2' || categoryIn == 'runa3')
            dummyItem.append('<img src="'+item['img']+'">');
        else
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
        var dummyItem = $('.player #'+categoryIn);
        if(categoryIn == 'runa1' || categoryIn == 'runa2' || categoryIn == 'runa3') {
            dummyItem.find('img').remove();
        } else
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
        $('.orange_box').html(text);
        $('li#level input').val(curLevel);
        var needLevel = container[tab].getParamValue('other', 'need', 'level');
        if (curLevel >= needLevel)
            $('li#level .namber').html(curLevel);
        else
            $('li#level .namber').html(curLevel + '<span class="red">(' + (curLevel - needLevel) + ')</span>');
        $('li#ap input').val(curAp);
        $('li#ap .namber').html(curAp);
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
        var ul = $('<ul>');
        $('<li>', {'html':'На ' + curAp + ' апе [' + curLevel + '] Вам доступно <b>' + availableStats + '</b> родных статов.'}).appendTo(ul);
        if (availableStats < statOwn) {
            $('<li>',{'html':'В Вашем комплекте используется <span class="red">'+statOwn+'</span> родных статов.'}).appendTo(ul);
            $('<li>', {'html':'Не хватает <span class="red">'+((availableStats - statOwn) * (-1))+'</span> статов'}).appendTo(ul);
        } else {
            $('<li>',{'html':'В Вашем комплекте используется <b>'+statOwn+'</b> родных статов.'}).appendTo(ul);
            if (availableStats > statOwn)
                $('<li>',{'html':'Осталось <b>'+(availableStats - statOwn)+'</b> свободных статов.'}).appendTo(ul);
            else
                $('<li>',{'html':'Свободных статов нет.'}).appendTo(ul);
        }
        return ul;
    }
    /**
     * Рисуем владения и уровень
     * @param categoryIn
     */
    this.drawStatsAndVlad = function (categoryIn) {
        var ownParams = container[tab].getGroupParam(categoryIn, 'own');
        $.each(ownParams, function (statName, statValue) {
            $('.white_box_left ul#'+categoryIn+' li#' + statName + ' input').val(statValue);
        });
        var haveParams = container[tab].getGroupParam(categoryIn, 'have');
        $.each(haveParams, function (statName, statValue) {
            var ownAndHave = container[tab].getParamValue(categoryIn, 'own', statName) + statValue;
            var need = container[tab].getParamValue(categoryIn, 'need', statName);
            var diff = ownAndHave - need;
            if (diff < 0)
                $('.white_box_left ul#'+categoryIn+' li#' + statName + ' .namber').html(ownAndHave + '<span class="red"> (' + diff + ')</span>');
            else
                $('.white_box_left ul#'+categoryIn+' li#' + statName + ' .namber').html(ownAndHave);
        });
    }
    /**
     * Выставляем модификации кукли (уроен, хр, мф и т.д.)
     * @param categoryIn
     */
    this.drawTableParams = function (categoryIn) {
        var haveParams = container[tab].getGroupParam(categoryIn, 'have');
        $.each(haveParams, function (statName, statValue) {
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
            if(statName == 'hp')
                $('.life span').attr('value', statValue).html(statValue);
            else
                $('.table_mf #' + statName).attr('value', statValue).html(statValue);
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
                    var cur_minu = $('.table_mf #minu').val();
                    var cur_maxu = $('.table_mf #maxu').val();
                    var val = Math.round(cur_minu + cur_minu * (valueOwn/100));
                    var val2 = Math.round(cur_maxu + cur_maxu * (valueOwn/100));
                    $('.table_mf #minu').val(cur_minu + (cur_minu * (valueOwn/100))).html(val);
                    $('.table_mf #maxu').val(cur_maxu + (cur_maxu * (valueOwn/100))).html(val2);
                    break;
                case 'usil_max_mf':
                    var krit = $('.table_mf #krit').val();
                    var pkrit = $('.table_mf #pkrit').val();
                    var uvorot = $('.table_mf #uvor').val();
                    var puvorot = $('.table_mf #puvor').val();
                    if(krit > pkrit && krit > uvorot && krit > puvorot) {
                        $('.table_mf #krit')
                            .val(krit + krit * (valueOwn/100))
                            .html(Math.round(krit + krit * (valueOwn/100)));
                    } else if(pkrit > krit && pkrit > uvorot && pkrit > puvorot) {
                        $('.table_mf #pkrit')
                            .val(pkrit + pkrit * (valueOwn/100))
                            .html(Math.round(pkrit + pkrit * (valueOwn/100)));
                    } else if(uvorot > krit && uvorot > pkrit && uvorot > puvorot) {
                        $('.table_mf #uvor')
                            .val(uvorot + uvorot * (valueOwn/100))
                            .html(Math.round(uvorot + uvorot * (valueOwn/100)));
                    } else if(puvorot > krit && puvorot > pkrit && puvorot > uvorot) {
                        $('.table_mf #puvor')
                            .val(puvorot + puvorot * (valueOwn/100))
                            .html(Math.round(puvorot + puvorot * (valueOwn/100)));
                    }
                    break;
                case 'usil_bron':
                    var haveParamsBron = container[tab].getGroupParam('bron', 'have');
                    $.each(haveParamsBron, function(name, value) {
                        $('.table_mf #' + name).val(value + value * (valueOwn/100)).html(parseInt(value + value * (valueOwn/100)));
                    });
                    break;
            }
            $('.table_mf #' + statOwn).html(valueOwn);
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
        $('.table_mf #unik').val(unikCount);
        if(unikCount > 5) {
            $('.table_mf #unik').html('<span style="color:red;">' + unikCount + '</span>');
            var haveParamsMF = container[tab].getGroupParam('mf', 'have');
            $.each(haveParamsMF, function (statName, value) {
                var cur = parseInt($('.table_mf #' + statName).attr('value'));
                var val = Math.round(cur + (cur * 0.01));
                $('.table_mf #' + statName).html(val).attr('value', cur + (cur * 0.01));
            });
        } else
            $('.table_mf #unik').html(unikCount);
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
        $('.table_mf #massa').val(itemsMassa + ' / ' + silaCount).html(itemsMassa + ' / ' + silaCount * 4);
        var cost = container[tab].getAllCost();
        var costRepa = container[tab].getAllCostRepa();
        $('.table_mf #cost').val(cost).html(cost);
        $('.table_mf #cost_repa').val(costRepa).html(costRepa);
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
                            var val = Math.round((valueGive * valueOwn));
                            var cur;
                            if(paramGive == "hp") {
                                cur = parseInt($('.life span').attr('value'));
                                $('.life span')
                                    .html(': ' + (val + cur) + '/' + (val + cur))
                                    .attr('value', (valueGive * valueOwn) + cur);
                            } else {
                                cur = parseInt($('.table_mf #' + paramGive).attr('value'));
                                $('.table_mf #' + paramGive)
                                    .html(val + cur)
                                    .attr('value', (valueGive * valueOwn) + cur);
                            }
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
                            var val = Math.round((valueGive * valueOwn));
                            var cur;
                            if(paramGive == "hp") {
                                cur = parseInt($('.life span').attr('value'));
                                $('.life span')
                                    .html(': ' + (val + cur) + '/' + (val + cur))
                                    .attr('value', (valueGive * valueOwn) + cur);
                            } else {
                                cur = parseInt($('.table_mf #' + paramGive).attr('value'));
                                $('.table_mf #' + paramGive)
                                    .html(val + cur)
                                    .attr('value', (valueGive * valueOwn) + cur);
                            }
                        });
                    });
                }
            });
        });
    }
}