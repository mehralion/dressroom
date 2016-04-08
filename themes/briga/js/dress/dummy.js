/**
 * Created by Николай on 03.06.14.
 */
function Dummy()
{
    var _that = this;

    this.events = function(){
        $(document.body).on('mouseover', '.player .item_empty', function(event){
            event.preventDefault();

            hint.hide();

            var $self = $(this);
            hint.empty($self.attr('data-name'), event);
        });

        $(document.body).on('mouseover', '.player .duh[data-type="duh"]', function(event){
            event.preventDefault();

            hint.hide();

            var $self = $(this);
            var duhParams = currentContainer.getGroupParam('duh');
            var duhNumber = currentContainer.getGroupParam('info', 'duh');
            hint.duh(duhParams, duhNumber, event);
        });

        $(document.body).on('mouseout', '.player .hover', function(event){
            event.preventDefault();

            hint.hide();
        });

        $(document.body).on('click', '.player .item_empty:not([data-or="true"])', function(event){
            event.preventDefault();

            hint.hide();
            menu.hide();

            var $self = $(this);
            var dataType = $self.attr('data-type');
            var items = _items_.getItemsByType(dataType);
            windows.showItems(vak[dataType], dataType, items);
        });

        $(document.body).on('click', '.player [data-cast-type="eat"]', function(event){
            event.preventDefault();

            hint.hide();
            menu.hide();

            var $self = $(this);
            var dataType = $self.attr('data-cast-type');
            var items = _items_.getItemsByType(dataType);
            windows.showItems(vak[dataType], dataType, items);
        });

        $(document.body).on('mouseover', '.player .item_dressed', function(event){
            event.preventDefault();

            hint.hide();

            var $self = $(this);
            var dataType = $self.closest('div').attr('data-type');
            var item = currentContainer.getItem(dataType);
            hint.itemsShow(item, event);
        });

        $(document.body).on('mouseover', '.list_tovar li img', function(event){
            event.preventDefault();

            hint.hide();

            var $self = $(this);
            var dataType = $self.attr('data-type');
            var dataId = $self.attr('data-id');
            var item = _items_.getItem(dataType, dataId);
            hint.itemsShow(item, event);
        });

        $(document.body).on('mouseout', '.list_tovar li img', function(event){
            event.preventDefault();

            hint.hide();
        });

        $(document.body).on('click', '#left_info .minuse', function(event){
            event.preventDefault();

            hint.hide();
            menu.hide();

            var $self = $(this);
            var dataType = $self.closest('.list_one').attr('data-type');
            var statName = $self.attr('data-for');
            currentContainer.takeParamValue(dataType, 'own', statName, 1);
            _that.drawDummyParams();
        });

        $(document.body).on('click', '#left_info .pluse', function(event){
            event.preventDefault();

            hint.hide();
            menu.hide();

            var $self = $(this);
            var dataType = $self.closest('.list_one').attr('data-type');
            var statName = $self.attr('data-for');
            currentContainer.addParamValue(dataType, 'own', statName, 1);
            _that.drawDummyParams();
        });

        $(document.body).on('blur', '#left_info input[type="text"]', function(event){
            event.preventDefault();

            var $self = $(this);
            var dataType = $self.closest('.list_one').attr('data-type');
            var statName = $self.attr('data-for');
            currentContainer.setParamValue(dataType, 'own', statName, parseInt($self.val()));
            _that.drawDummyParams();
        });

        $(document.body).on('click', '.list_tovar li img', function(event){
            event.preventDefault();

            hint.hide();
            menu.hide();

            var art = false;
            var prokat = false;

            var $self = $(this);
            var dataType = $self.attr('data-type');
            var dataId = $self.attr('data-id');
            var isArt = $self.attr('data-art');
            var dataProkat = $self.attr('data-prokat');
            var item = _items_.getItem(dataType, dataId);
            if(isArt == 'true')
                art = true;
            if(dataProkat == 'true')
                prokat = true;

            if(currentContainer.isRune(dataType)) {
                if(currentContainer.isEmpty('runa1'))
                    currentContainer.setItem('runa1', item, art, prokat);
                if(currentContainer.isEmpty('runa2'))
                    currentContainer.setItem('runa2', item, art, prokat);
                if(currentContainer.isEmpty('runa3'))
                    currentContainer.setItem('runa3', item, art, prokat);
            }

            if(currentContainer.isRing(dataType)) {
                if(currentContainer.isEmpty('r1'))
                    currentContainer.setItem('r1', item, art, prokat);
                if(currentContainer.isEmpty('r2'))
                    currentContainer.setItem('r2', item, art, prokat);
                if(currentContainer.isEmpty('r3'))
                    currentContainer.setItem('r3', item, art, prokat);
            }

            currentContainer.setItem(dataType, item, art, prokat);
            windows.close();
            hint.hide();
            _that.drawDummyParams();
        });

        $(document.body).on('click', '#changeAlign', function(event){
            event.preventDefault();

            $('#align_list').toggle();
        });

        $(document.body).on('click', '#align_list span a', function(event){
            event.preventDefault();

            var $self = $(this);
            var align = parseFloat($self.closest('span').attr('data-value'));
            currentContainer.changeAlign(align);
            $('#align_list').hide();
            _that.drawDummyParams();
        });

        $(document.body).on('click', '#hero', function(event){
            event.preventDefault();

            hint.hide();
            menu.hide();

            if($(this).hasClass('select')) {
                container[tabs.getCurrentTab()].setMedal('hero', false);
                $(this).removeClass('select');
            } else {
                container[tabs.getCurrentTab()].setMedal('hero', true);
                $(this).addClass('select');
            }
            _that.drawDummyParams();
        });

        $(document.body).on('click', '#addArt', function(event){
            event.preventDefault();

            hint.hide();
            menu.hide();

            windows.showArt();
        });
    };

    this.drawString = function(sum, need) {
        var sClass = 'green';
        if(sum < need)
            sClass = 'red';

        return '<span class="'+sClass+'">['+sum+' ('+need+')]</span>';
    };

    this.clear = function() {
        $('.clearString').html('0').attr('data-value', 0);
        $('.clearInput').attr('data-value', 0).val(0);
    };

    this.emptyItem = function(categoryIn){
        var $el = $('.player [data-type="'+categoryIn+'"]');
        $el.removeClass('item_dressed').addClass('item_empty').html('');
        if(categoryIn == 'ax' || categoryIn == 'baton' || categoryIn == 'knife' || categoryIn == 'sword')
            $el.attr('data-type', 'or');
    };

    /**
     *
     * @param categoryIn
     * @param reDraw
     */
    this.drawItem = function(categoryIn, reDraw){
        var item = currentContainer.getCurrItem(categoryIn);
        var $el = $('.player [data-type="'+categoryIn+'"]');
        if(categoryIn == 'ax' || categoryIn == 'baton' || categoryIn == 'knife' || categoryIn == 'sword')
            $el = $('.player [data-type="or"], .player [data-type="'+categoryIn+'"]');

        $el.attr('data-type', categoryIn)
            .removeClass('item_empty')
            .addClass('item_dressed')
            .html('')
            .append('<img src="'+item['img']+'">');

        if(reDraw === true)
            _that.drawDummyParams();
    };

    /**
     * перерисовать куклу
     */
    this.drawDummyImg = function() {
        $('.player div.item').removeClass('item_dressed').addClass('item_empty').html('');
        $.each(currentContainer.getDummyItems(), function(category, item){
            if(item['img'] !== undefined)
                _that.drawItem(category);
        });

        var duh = currentContainer.getParamValue('info', null, 'duh');
        if(duh > 0)
            $('[data-type="duh"]').addClass('duh');
        else
            $('[data-type="duh"]').removeClass('duh');

        _that.drawDummyParams();
    };

    /**
     * Прописовать и выставить все параметры
     */
    this.drawDummyParams = function () {
        _that.drawLevelAndAp();
        _that.drawCast();
        _that.drawStatsAndVlad('stats');
        _that.drawStatsAndVlad('possession');
        _that.drawStatsAndVlad('possession_m');
        _that.drawTableParams('damage');
        _that.drawTableParams('other');
        _that.drawTableParams('mf');
        _that.drawTableParams('armor');
        _that.drawParamsToMF();
        _that.drawUsil();
        _that.drawOtherInfo();
    };

    this.drawCast = function(){
        var level = currentContainer.getParamValue('levelInfo', 'own', 'level');
        var duhNumber = currentContainer.getParamValue('info', null, 'duh');
        if(duhNumber == 0)
            return;

        $.each(currentContainer.getGroupParam('duh'), function(type, values){
            $.each(values, function(name, value){
                currentContainer.takeParamValue(type, 'give', name, value);
            });
        });

        $.each(duhInfo[level], function(type, values){
            $.each(values, function(name, value){
                currentContainer.setParamValue('duh', type, name, (value * duhNumber));
                currentContainer.addParamValue(type, 'give', name, (value * duhNumber));
            });
        });
    };

    /**
     * Рисуем уровень и ап
     */
    this.drawLevelAndAp = function () {
        var curLevel = currentContainer.getParamValue('levelInfo', 'own', 'level');
        var curAp = currentContainer.getParamValue('levelInfo', 'own', 'ap');
        var availableStats = 0;
        var statOwn = 0;
        $.each(levelGive, function (level, info) {
            if (level < curLevel) {
                if(level == 10)
                    availableStats += (info['stats'] + info['endurance'] + (info['ap']*2));
                else if(level == 11)
                    availableStats += (info['stats'] + info['endurance'] + info['ap']+5);
                else if(level == 12)
                    availableStats += (info['stats'] + info['endurance'] + info['ap']+11);
                else
                    availableStats += (info['stats'] + info['endurance'] + info['ap']);
            } else if (level == curLevel)
                availableStats += (info['stats'] + info['endurance']);
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

        var ownStats = currentContainer.getGroupParam('stats', 'own');
        $.each(ownStats, function (name, value) {
            statOwn += value;
        });

        var text = _that.compareTextLevelAndAp(curAp, curLevel, availableStats, statOwn);
        $('.orange_box').html(text);

        $('[data-input-value="level"]').val(curLevel);
        var needLevel = currentContainer.getParamValue('levelInfo', 'need', 'level');
        $('[data-string-value="level"]').html(_that.drawString(curLevel, needLevel));

        $('[data-input-value="ap"]').val(curAp);
        $('[data-string-value="ap"]').html(_that.drawString(curAp, 0));
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
     * @param dataType
     */
    this.drawStatsAndVlad = function (dataType) {
        $.each(currentContainer.getGroupParam(dataType, 'own'), function (fieldName, fieldValue) {
            $('[data-type="'+dataType+'"] [data-input-value="'+fieldName+'"]').val(fieldValue);
        });

        $.each(currentContainer.getGroupParam(dataType, 'give'), function (fieldName, fieldValue) {
            var ownAndHave = currentContainer.getParamValue(dataType, 'own', fieldName) + fieldValue;
            var need = currentContainer.getParamValue(dataType, 'need', fieldName);
            $('[data-type="'+dataType+'"] [data-string-value="'+fieldName+'"]').html(_that.drawString(ownAndHave, need));
        });
    };

    /**
     * Выставляем модификации куклы (уроен, хр, мф и т.д.)
     * @param dataType
     */
    this.drawTableParams = function (dataType) {
        switch (dataType) {
            case 'damage':
                var minU = currentContainer.getParamValue(dataType, null, 'min_damage');
                var maxU = currentContainer.getParamValue(dataType, null, 'max_damage');
                var vladCount = currentContainer.getPossession();
                var level = currentContainer.getParamValue('levelInfo', 'own', 'level');

                var min = Math.round(1 + parseInt(level) + parseInt(minU) * (1 + 0.07 * parseInt(vladCount)));
                var max = Math.round(4 + parseInt(level) + parseInt(maxU) * (1 + 0.07 * parseInt(vladCount)));
                $('[data-type="'+dataType+'"][data-string-value="min_damage"]')
                    .attr('data-value', min).html();
                $('[data-type="'+dataType+'"][data-string-value="max_damage"]')
                    .attr('data-value', max).html();
                break;
            default:
                $.each(currentContainer.getGroupParam(dataType), function (fieldName, fieldValue){
                    $('[data-type="'+dataType+'"][data-string-value="'+fieldName+'"]').attr('data-value', fieldValue).html(fieldValue);
                });
                break;
        }
    };

    /**
     * Рисуем усиления
     */
    this.drawUsil = function () {
        $.each(currentContainer.getGroupParam('increased'), function (statOwn, valueOwn) {
            $('[data-string-value="increased_'+statOwn+'"]').html(valueOwn);
            switch (statOwn) {
                case 'damage':
                    $.each(currentContainer.getGroupParam('damage'), function (fieldName, fieldValue){
                        var _el = $('[data-type="damage"][data-string-value="'+fieldName+'"]');
                        var _val = parseInt(_el.attr('data-value'));
                        var _res = _val + _val * (valueOwn/100);
                        _el.attr('data-value', _res).html(Math.ceil(_res));
                    });
                    break;
                case 'mf':
                    var items = currentContainer.getDummyItems();
                    var unikCount = 0;
                    var unikPerc = 0;

                    $.each(items, function (category, info) {
                        if(info['unique'] === true)
                            unikCount++;
                    });
                    if(currentContainer.getMedal('hero'))
                        unikCount++;

                    if(unikCount > 5 && unikCount < 9) {
                        $('[data-string-value="unique"]').html('<span style="color:red;">' + unikCount + '</span>');
                        unikPerc = 1;
                        $('.uniqueImage').attr('id', 'unik_1');
                        $('[data-string-value="m_unique"]').html(' / 9 (+1%)');
                    } else if(unikCount > 8 && unikCount < 12) {
                        $('[data-string-value="unique"]').html('<span style="color:red;">' + unikCount + '</span>');
                        unikPerc = 2;
                        $('.uniqueImage').attr('id', 'unik_2');
                        $('[data-string-value="m_unique"]').html(' / 12 (+2%)');
                    } else if(unikCount == 12) {
                        $('[data-string-value="unique"]').html('<span style="color:red;">' + unikCount + '</span>');
                        unikPerc = 3;
                        $('.uniqueImage').attr('id', 'unik_3');
                        $('[data-string-value="m_unique"]').html(' / 13 (+3%)');
                    } else if(unikCount > 12) {
                        $('[data-string-value="unique"]').html('<span style="color:red;">' + unikCount + '</span>');
                        unikPerc = 4;
                        $('.uniqueImage').attr('id', 'unik_4');
                        $('[data-string-value="m_unique"]').html(' / 13 (+4%)');
                    } else {
                        $('[data-string-value="unique"]').html(unikCount);
                        $('.uniqueImage').attr('id', false);
                        $('[data-string-value="m_unique"]').html(' / 6');
                    }


                    var maxMFParamName = '';
                    var $critical   = $('[data-string-value="critical"]');
                    var $p_critical = $('[data-string-value="p_critical"]');
                    var $flee       = $('[data-string-value="flee"]');
                    var $p_flee     = $('[data-string-value="p_flee"]');

                    var krit    = parseInt($critical.attr('data-value'));
                    var pkrit   = parseInt($p_critical.attr('data-value'));
                    var uvorot  = parseInt($flee.attr('data-value'));
                    var puvorot = parseInt($p_flee.attr('data-value'));
                    if(krit > pkrit && krit > uvorot && krit > puvorot) {
                        $critical
                            .attr('data-value', krit + krit * ((valueOwn + unikPerc)/100))
                            .html(Math.round(krit + krit * ((valueOwn + unikPerc)/100)));
                        maxMFParamName = 'critical';
                    } else if(pkrit > krit && pkrit > uvorot && pkrit > puvorot) {
                        $p_critical
                            .attr('data-value', pkrit + pkrit * ((valueOwn + unikPerc)/100))
                            .html(Math.round(pkrit + pkrit * ((valueOwn + unikPerc)/100)));
                        maxMFParamName = 'p_critical';
                    } else if(uvorot > krit && uvorot > pkrit && uvorot > puvorot) {
                        $flee
                            .attr('data-value', uvorot + uvorot * ((valueOwn + unikPerc)/100))
                            .html(Math.round(uvorot + uvorot * ((valueOwn + unikPerc)/100)));
                        maxMFParamName = 'flee';
                    } else if(puvorot > krit && puvorot > pkrit && puvorot > uvorot) {
                        $p_flee
                            .attr('data-value', puvorot + puvorot * ((valueOwn + unikPerc)/100))
                            .html(Math.round(puvorot + puvorot * ((valueOwn + unikPerc)/100)));
                        maxMFParamName = 'p_flee';
                    }

                    $.each(currentContainer.getGroupParam('mf'), function (statName, value) {
                        if(statName == maxMFParamName)
                            return;

                        var _el = $('[data-string-value="'+statName+'"]');
                        var cur = parseInt(_el.attr('data-value'));
                        var val = Math.round(cur + (cur * (unikPerc/100)));
                        _el.html(val).attr('data-value', cur + (cur * (unikPerc/100)));
                    });
                    break;
                case 'armor':
                    $.each(currentContainer.getGroupParam('armor'), function(name, value) {
                        $('[data-string-value="'+name+'"]').attr('data-value', value + value * (valueOwn/100)).html(parseInt(value + value * (valueOwn/100)));
                    });
                    break;
            }
        });
    };

    /**
     * Рисуем массу, стоимость
     */
    this.drawOtherInfo = function () {
        var silaCount = 0;
        var itemsMassa = currentContainer.getAllMass();
        $.each(currentContainer.getGroupParam('stats', 'give'), function (name, value) {
            if (name == 'strange')
                silaCount += value;
        });
        $.each(currentContainer.getGroupParam('stats', 'own'), function (name, value) {
            if (name == 'strange')
                silaCount += value;
        });


        $('[data-string-value="weight"]').attr('data-value', itemsMassa + ' / ' + silaCount).html(itemsMassa + ' / ' + silaCount * 4);
        var cost = currentContainer.getAllCost();
        var costRepa = currentContainer.getAllCostRepa();
        var costEkr = currentContainer.getAllEkrCost();
        $('[data-string-value="price"]').attr('data-value', cost).html(cost);
        $('[data-string-value="price_ekr"]').attr('data-value', costEkr).html(costEkr);
        $('[data-string-value="price_reputation"]').attr('data-value', costRepa).html(costRepa);

        //align
        var align = currentContainer.getParamValue('info', null, 'align');
        $('[data-type="info"][data-string-value="align"]').attr('data-value', align).html(alignInfo[align]);
    };

    /**
     * Превращаем статы в модификации
     */
    this.drawParamsToMF = function () {
        $.each(statToMf, function(fieldName, i){
            var mfs = currentContainer.getMFfromStat(fieldName);
            $.each(mfs, function (_dataType, values){
                $.each(values, function (_fieldName, _fieldValue){
                    var _el = $('[data-type="'+_dataType+'"][data-string-value="'+_fieldName+'"]');
                    var _v = parseInt(_el.attr('data-value'));
                    var sum = _fieldValue + _v;
                    _el.attr('data-value', sum).html(sum);
                });
            });
        });
    };

    var __construct = function () {
        _that.drawDummyParams();
        _that.events();
    }();
}