/**
 * Created with JetBrains PhpStorm.
 * User: Николай
 * Date: 01.10.13
 * Time: 15:37
 * To change this template use File | Settings | File Templates.
 */
function Dummy()
{
    var _that = this;
    this.events = function() {
        $(document.body).on('mouseover', '.player .i', function(e){
            if($(this).hasClass('item_empty')) {
                hint.empty($(this).attr('alt'), e);
            } else
                hint.showInfo(e, container[tabs.getCurrentTab()].getCurrItem($(this).attr('id')));
        });
        $(document.body).on('mouseout', '.player .i', function(){
            hint.close();
        });
        $(document.body).on('click', '.player .i', function(e){
            if($(this).hasClass('item_empty')) {
                if($(this).attr('rel') != 'or') {
                    var dress = new Dress();
                    dress.showItems($(this).attr('rel'));
                    dress = null;
                } else
                    menu.showOr(e);

            } else {
                if($(this).attr('rel') != 'or')
                    menu.showDressed($(this).attr('id'), e);
                else
                    menu.showDressedOr($(this).attr('id'), e);
            }
        });

        $(document.body).on('click', '.white_box_left .pluse', function(event){
            event.preventDefault();
            var type = $($(this).parent().parent().get(0)).attr('id');
            var param = $($(this).parent().get(0)).attr('id');
            _that.add(type, param, 1);
        });
        $(document.body).on('click', '.white_box_left .minuse', function(event){
            event.preventDefault();
            var type = $($(this).parent().parent().get(0)).attr('id');
            var param = $($(this).parent().get(0)).attr('id');
            _that.take(type, param, 1);
        });

        $(document.body).on('blur', '.white_box_left input', function(event){
            event.preventDefault();
            var type = $($(this).parent().parent().get(0)).attr('id');
            var param = $($(this).parent().get(0)).attr('id');
            _that.change(type, param, parseInt($(this).val()));
        });

        $(document.body).on('click', '#addArt', function(event){
            event.preventDefault();
            var dress = new Dress();
            dress.showArt();
        });

        $(document.body).on('click', '#hero', function(event){
            event.preventDefault();
            if($(this).hasClass('select')) {
                container[tabs.getCurrentTab()].setMedal('hero', false);
                $(this).removeClass('select');
            } else {
                container[tabs.getCurrentTab()].setMedal('hero', true);
                $(this).addClass('select');
            }
            _that.drawDummyParams();
        });

        $(document.body).on('mouseover', '.hintView', function(e){
            hint.show($(this).attr('alt'), e);
        });
        $(document.body).on('mouseout', '.hintView', function(){
            hint.close();
        });
    };

    this.drawItem = function(categoryIn, reDraw){
        var item = container[tabs.getCurrentTab()].getCurrItem(categoryIn);
        var selector = null;
        if(categoryIn == 'nog' || categoryIn == 'mech' || categoryIn == 'dubina' || categoryIn == 'topor')
            selector = 'or';
        else
            selector = categoryIn;
        $('.player [rel="'+selector+'"] img').remove();
        $('.player [rel="'+selector+'"]')
            .attr('id', categoryIn)
            .append('<img src="'+item['img']+'">')
            .removeClass('item_empty')
            .addClass('item_dressed');

        if(reDraw !== false)
            _that.drawDummyParams();
    };

    /**
     * Снять вещь с кукли
     * @param categoryIn категория вещи
     */
    this.unsetItem = function (categoryIn) {
        $('.player [rel="'+categoryIn+'"]')
            .attr('id', false)
            .removeClass('item_dressed')
            .addClass('item_empty')
            .find('img').remove();
    };

    /**
     *
     */
    this.setEmpty = function() {
        $.each(empty, function(category, image){
            $('.player [rel="'+category+'"]')
                .attr('id', false)
                .removeClass('item_dressed')
                .addClass('item_empty')
                .find('img').remove();
        });
    };

    /**
     * клик добавить стат\владение
     * @param typeIn
     * @param nameIn
     * @param valueIn
     */
    this.add = function (typeIn, nameIn, valueIn) {
        var tab = tabs.getCurrentTab();
        var curValue;
        var nextValue;
        switch (typeIn) {
            case 'other':
                curValue = container[tab].getParamValue(typeIn, 'have', nameIn);
                nextValue = curValue + valueIn;
                if (nameIn == 'level') {
                    if (levelGive[nextValue] !== undefined) {
                        container[tab].paramAdd(typeIn, 'have', nameIn, valueIn);
                        container[tab].setParamValue(typeIn, 'have', 'ap', 0);

                        /** при добавлении уровня, добавляем статы в вынос */
                        if(levelGive[nextValue] !== undefined)
                            container[tab].paramAdd('stats', 'own', 'vinos', levelGive[nextValue]['vinos']);
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
                curValue = container[tab].getParamValue(typeIn, 'own', nameIn);
                nextValue = curValue + valueIn;
                if(typeIn == 'vlad' || typeIn == 'vladm') {
                    if(nextValue <= 5)
                        container[tab].paramAdd(typeIn, 'own', nameIn, valueIn);
                    else
                        showMessage('error', 'Вы не можете сделать ваш параметр "' + vak[nameIn] + '" больше 5.');
                } else
                    container[tab].paramAdd(typeIn, 'own', nameIn, valueIn);

                break;
        }
        _that.drawDummyParams();
    };

    /**
     * клик отнять стат\владение
     * @param typeIn
     * @param nameIn
     * @param valueIn
     */
    this.take = function (typeIn, nameIn, valueIn) {
        var tab = tabs.getCurrentTab();
        var curValue = null;
        switch (typeIn) {
            case 'other':
                curValue = container[tab].getParamValue(typeIn, 'have', nameIn);
                var beforeValue = curValue - valueIn;
                if (beforeValue >= 0) {
                    container[tab].paramTake(typeIn, 'have', nameIn, valueIn);
                    if(nameIn == 'level') {
                        /** при добавлении уровня, добавляем статы в вынос */
                        if(levelGive[curValue] !== undefined)
                            container[tab].paramTake('stats', 'own', 'vinos', levelGive[curValue]['vinos']);
                    }
                } else
                    showMessage('error', 'Занчение не может быть меньше 0');
                break;
            default:
                curValue = container[tab].getParamValue(typeIn, 'own', nameIn);
                var minValue = 3;
                if (nameIn == 'intel' || nameIn == 'mudra' || typeIn == 'vlad' || typeIn == 'vladm')
                    minValue = 0;
                else if (nameIn == 'vinos') {
                    var minVinos = 3;
                    var curLevel = container[tab].getParamValue('other', 'have', 'level');
                    $.each(levelGive, function(level, info){
                        if(level > curLevel)
                            return false;
                        minVinos += info['vinos'];
                    });
                    minValue = minVinos;
                }
                if (curValue - valueIn >= minValue)
                    container[tab].paramTake(typeIn, 'own', nameIn, valueIn);
                else
                    showMessage('error', 'Вы не можете сделать ваш стат "' + vak[nameIn] + '" меньше ' + minValue + '.');
                break;
        }
        _that.drawDummyParams();
    };

    /**
     * изменение параметров через инпут
     * @param typeIn
     * @param nameIn
     * @param valueIn
     */
    this.change = function (typeIn, nameIn, valueIn) {
        var tab = tabs.getCurrentTab();
        switch (typeIn) {
            case 'other':
                var curLevel = container[tab].getParamValue(typeIn, 'have', 'level');
                if (nameIn == 'level' && levelGive[valueIn] !== undefined) {
                    container[tab].setParamValue(typeIn, 'have', nameIn, valueIn);
                    container[tab].setParamValue(typeIn, 'have', 'ap', 0);

                    var vinos = 0;
                    if(curLevel > valueIn) {
                        $.each(levelGive, function(level, info){
                            if(level <= curLevel && level > valueIn)
                                vinos += info['vinos'];
                        });
                        container[tab].paramTake('stats', 'own', 'vinos', vinos);
                    } else {
                        $.each(levelGive, function(level, info){
                            if(level > curLevel && level <= valueIn)
                                vinos += info['vinos'];
                        });
                        container[tab].paramAdd('stats', 'own', 'vinos', vinos);
                    }
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

                if(typeIn == 'vlad' || typeIn == 'vladm') {
                    if(valueIn <= 5)
                        container[tab].setParamValue(typeIn, 'own', nameIn, valueIn);
                    else {
                        container[tab].setParamValue(typeIn, 'own', nameIn, 5);
                        showMessage('error', 'Вы не можете сделать ваш параметр "' + vak[nameIn] + '" больше 5.');
                    }
                } else {
                    if (valueIn >= minValue)
                        container[tab].setParamValue(typeIn, 'own', nameIn, valueIn);
                    else
                        showMessage('error', 'Вы не можете сделать ваш стат "' + vak[nameIn] + '" меньше ' + minValue + '.');
                }
                break;
        }
        _that.drawDummyParams();
    };

    /**
     * перерисовать куклу
     */
    this.drawDummyImg = function() {
        _that.setEmpty();
        $.each(container[tabs.getCurrentTab()].getDummyItems(), function(category, item){
            if(item['img'] !== undefined)
                _that.drawItem(category, false);
        });
        _that.drawDummyParams();
    };

    /**
     * Прописовать и выставить все параметры
     */
    this.drawDummyParams = function () {
        _that.drawLevelAndAp();
        _that.drawStatsAndVlad('stats');
        _that.drawStatsAndVlad('vlad');
        _that.drawStatsAndVlad('vladm');
        _that.drawTableParams('other');
        _that.drawTableParams('mf');
        _that.drawTableParams('bron');
        _that.drawParamsToMF();
        _that.drawUsil();
        _that.drawOtherInfo();
    };

    /**
     * Рисуем уровень и ап
     */
    this.drawLevelAndAp = function () {
        var tab = tabs.getCurrentTab();
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
                else if(level == 12)
                    availableStats += (info['stats'] + info['vinos'] + info['ap']+11);
                else
                    availableStats += (info['stats'] + info['vinos'] + info['ap']);
            } else if (level == curLevel)
                availableStats += (info['stats'] + info['vinos']);
        });
        for(var $i = 1; $i <= curAp; $i++) {
            if(curLevel == 10 || (curLevel == 11 && $i > 8) || (curLevel == 12 && $i < 3) || (curLevel == 12 && $i > 3 && $i < 7))
                availableStats += 2;
            else if(curLevel == 12 && $i == 3)
                availableStats += 3;
            else if(curLevel == 12 && $i == 7)
                availableStats += 5;
            else
                availableStats += 1;
        }

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
    };

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
    };

    /**
     * Рисуем владения и уровень
     * @param categoryIn
     */
    this.drawStatsAndVlad = function (categoryIn) {
        var tab = tabs.getCurrentTab();
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
    };

    /**
     * Выставляем модификации кукли (уроен, хр, мф и т.д.)
     * @param categoryIn
     */
    this.drawTableParams = function (categoryIn) {
        var tab = tabs.getCurrentTab();
        var haveParams = container[tab].getGroupParam(categoryIn, 'have');
        var minU = 0;
        var maxU = 0;
        var vladCount = 0;
        var level = 0;
        var items = 0;
        $.each(haveParams, function (statName, statValue) {
            switch(statName){
                case 'minu':
                    minU = 0;
                    vladCount = 0;
                    level = container[tab].getParamValue('other', 'have', 'level');
                    items = container[tab].getDummyItems();
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
                    maxU = 0;
                    vladCount = 0;
                    level = container[tab].getParamValue('other', 'have', 'level');
                    items = container[tab].getDummyItems();
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
            else if(statName == 'mp') {
                $('.mana span').attr('value', statValue).html(statValue);
                if(statValue > 0)
                    $('.mana').show();
                else
                    $('.mana').hide();
            } else
                $('.table_mf #' + statName).attr('value', statValue).html(statValue);
        });
    };

    /**
     * Рисуем усиления
     */
    this.drawUsil = function () {
        var tab = tabs.getCurrentTab();
        var haveParamsUsil = container[tab].getGroupParam('usil', 'have');
        $.each(haveParamsUsil, function (statOwn, valueOwn) {
            switch (statOwn) {
                case 'usil_uron':
                    var cur_minu = $('.table_mf #minu').val();
                    var cur_maxu = $('.table_mf #maxu').val();
                    var val = Math.ceil(cur_minu + cur_minu * (valueOwn/100));
                    var val2 = Math.ceil(cur_maxu + cur_maxu * (valueOwn/100));
                    $('.table_mf #minu').val(cur_minu + (cur_minu * (valueOwn/100))).html(val);
                    $('.table_mf #maxu').val(cur_maxu + (cur_maxu * (valueOwn/100))).html(val2);
                    break;
                case 'usil_max_mf':
                    var items = container[tab].getDummyItems();
                    var unikCount = 0;
                    var unikPerc = 0;

                    $.each(items, function (category, info) {
                        if( (info['settings'] !== undefined && info['settings']['mf']['stats'] == 3) || info['is_art'] || info['create_art'])
                            unikCount++;
                    });
                    if(container[tab].getMedal('hero'))
                        unikCount++;

                    $('.table_mf #unik').val(unikCount);
                    if(unikCount > 5 && unikCount < 9) {
                        $('.table_mf #unik').html('<span style="color:red;">' + unikCount + '</span>');
                        unikPerc = 1;
                        $('.unikImage').attr('id', 'unik_1');
                        $('#unikMax').html(' / 9');
                    } else if(unikCount > 8 && unikCount < 12) {
                        $('.table_mf #unik').html('<span style="color:red;">' + unikCount + '</span>');
                        unikPerc = 2;
                        $('.unikImage').attr('id', 'unik_2');
                        $('#unikMax').html(' / 12');
                    } else if(unikCount == 12) {
                        $('.table_mf #unik').html('<span style="color:red;">' + unikCount + '</span>');
                        unikPerc = 3;
                        $('.unikImage').attr('id', 'unik_3');
                        $('#unikMax').html(' / 13');
                    } else if(unikCount > 12) {
                        $('.table_mf #unik').html('<span style="color:red;">' + unikCount + '</span>');
                        unikPerc = 4;
                        $('.unikImage').attr('id', 'unik_4');
                        $('#unikMax').html(' / 13');
                    } else {
                        $('.table_mf #unik').html(unikCount);
                        $('.unikImage').attr('id', false);
                    }


                    var maxMFParamName = '';
                    var krit = $('.table_mf #krit').val();
                    var pkrit = $('.table_mf #pkrit').val();
                    var uvorot = $('.table_mf #uvor').val();
                    var puvorot = $('.table_mf #puvor').val();
                    if(krit > pkrit && krit > uvorot && krit > puvorot) {
                        $('.table_mf #krit')
                            .val(krit + krit * ((valueOwn + unikCount)/100))
                            .html(Math.round(krit + krit * ((valueOwn + unikPerc)/100)));
                        maxMFParamName = 'krit';
                    } else if(pkrit > krit && pkrit > uvorot && pkrit > puvorot) {
                        $('.table_mf #pkrit')
                            .val(pkrit + pkrit * ((valueOwn + unikCount)/100))
                            .html(Math.round(pkrit + pkrit * ((valueOwn + unikPerc)/100)));
                        maxMFParamName = 'pkrit';
                    } else if(uvorot > krit && uvorot > pkrit && uvorot > puvorot) {
                        $('.table_mf #uvor')
                            .val(uvorot + uvorot * ((valueOwn + unikCount)/100))
                            .html(Math.round(uvorot + uvorot * ((valueOwn + unikPerc)/100)));
                        maxMFParamName = 'uvor';
                    } else if(puvorot > krit && puvorot > pkrit && puvorot > uvorot) {
                        $('.table_mf #puvor')
                            .val(puvorot + puvorot * ((valueOwn + unikCount)/100))
                            .html(Math.round(puvorot + puvorot * ((valueOwn + unikPerc)/100)));
                        maxMFParamName = 'puvor';
                    }

                    var haveParamsMF = container[tab].getGroupParam('mf', 'have');
                    $.each(haveParamsMF, function (statName, value) {
                        if(statName == maxMFParamName)
                            return;

                        var cur = parseInt($('.table_mf #' + statName).attr('value'));
                        var val = Math.round(cur + (cur * (unikPerc/100)));
                        $('.table_mf #' + statName).html(val).attr('value', cur + (cur * (unikPerc/100)));
                    });
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
    };

    /**
     * Рисуем массу, стоимость
     */
    this.drawOtherInfo = function () {
        var tab = tabs.getCurrentTab();
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
    };

    /**
     * Превращаем статы в модификации
     */
    this.drawParamsToMF = function () {
        var tab = tabs.getCurrentTab();
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
                            } else if(paramGive == "mp") {
                                cur = parseInt($('.mana span').attr('value'));
                                $('.mana span')
                                    .html(': ' + (val + cur) + '/' + (val + cur))
                                    .attr('value', (valueGive * valueOwn) + cur);
                                if(val + cur > 0)
                                    $('.mana').show();
                                else
                                    $('.mana').hide();
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
                            } else if(paramGive == "mp") {
                                cur = parseInt($('.mana span').attr('value'));
                                $('.mana span')
                                    .html(': ' + (val + cur) + '/' + (val + cur))
                                    .attr('value', (valueGive * valueOwn) + cur);
                                if(val + cur > 0)
                                    $('.mana').show();
                                else
                                    $('.mana').hide();
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
    };
    __construct = function() {
        _that.events();
    }();
}