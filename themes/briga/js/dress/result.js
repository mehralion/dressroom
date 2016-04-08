/**
 * Created with JetBrains PhpStorm.
 * User: Николай
 * Date: 06.01.13
 * Time: 16:55
 * To change this template use File | Settings | File Templates.
 */
function Result() {
    var _that = this;
    var _id = null;
    var _container = null;
    var _Tab = null;

    this.drawResult = function() {
        var result =  $('#result .results');
        result.html('');
        $.each(container, function(tabCont, itemContainer){
            _container = itemContainer;
            _id = tabCont;
            _Tab = $('<div>', {'class':'item_' + tabCont, 'style':'display:inline-block;margin-left: 10px;'}).appendTo(result);
            var _HeadCont = $('<ul>', {'style':'height: 15px;margin-bottom: 0px;margin-top:-15px;'}).appendTo(_Tab);
            $('<li>', {'text':'Кабинка '+(parseInt(tabCont)+1)}).appendTo(_HeadCont);

            _drawStatsAndVlad('stats');
            _drawHp();
            _drawTableParams('damage');
            _drawTableParams('mf');
            _drawTableParams('armor');
            _drawParamsToMF();
            _drawUsil();
        });
    };

    /**
     * Рисуем владения и уровень
     * @param dataType
     */
    var _drawStatsAndVlad = function (dataType) {
        var _statsAll = 0;
        var _HeadCont = $('<ul>', {'class':'stats_result'}).appendTo(_Tab);
        $.each(_container.getGroupParam(dataType, 'give'), function (fieldName, fieldValue) {
            var ownAndHave = _container.getParamValue(dataType, 'own', fieldName) + fieldValue;
            $('<li>', {'data-result-tab':_id,'data-result-value':ownAndHave,'data-result-type':fieldName,'text':ownAndHave}).appendTo(_HeadCont);

            _statsAll += ownAndHave;
        });

        var allStats = $('<ul>', {'class':'stats_result'}).appendTo(_Tab);
        $('<li>', {text:_statsAll, value:_statsAll}).appendTo(allStats);
    };

    var _drawHp = function() {
        var _HpCont = $('<ul>', {'class':'stats_result'}).appendTo(_Tab);
        var _hpItem = _container.getParamValue('other', null, 'hp');
        $('<li>', {'data-result-tab':_id,'data-result-type':'hp','data-result-value':_hpItem, 'html':_hpItem, 'class':'hp_'+_id}).appendTo(_HpCont);
    };

    var _drawTableParams = function (dataType) {
        var _UronCont = $('<ul>', {'class':'stats_result'}).appendTo(_Tab);
        switch (dataType) {
            case 'damage':
                var minU = _container.getParamValue(dataType, null, 'min_damage');
                var maxU = _container.getParamValue(dataType, null, 'max_damage');
                var vladCount = _container.getPossession();
                var level = _container.getParamValue('levelInfo', 'own', 'level');

                var min = Math.round(1 + parseInt(level) + parseInt(minU) * (1 + 0.07 * parseInt(vladCount)));
                var max = Math.round(4 + parseInt(level) + parseInt(maxU) * (1 + 0.07 * parseInt(vladCount)));

                $('<li>', {'data-result-tab':_id,'data-result-value':dataType,
                    'html': '<span data-result-tab="'+_id+'" data-result-type="min_damage" class="clearString" data-result-value="'+min+'">'+min+'</span> - <span data-result-tab="'+_id+'" data-result-type="max_damage" class="clearString" data-result-value="'+max+'">'+max+'</span>',
                    'class':'uron_'+_id}).appendTo(_UronCont);
                break;
            default:
                $.each(_container.getGroupParam(dataType), function (fieldName, fieldValue){
                    $('<li>', {'data-result-tab':_id,'data-result-type':fieldName,'data-result-value':fieldValue,'html': fieldValue, 'class':'uron_'+_id}).appendTo(_UronCont);
                });
                break;
        }
    };

    var _drawParamsToMF = function () {
        $.each(statToMf, function(fieldName, i){
            var mfs = _container.getMFfromStat(fieldName);
            $.each(mfs, function (_dataType, values){
                $.each(values, function (_fieldName, _fieldValue){
                    var _el = $('#result [data-result-tab="'+_id+'"][data-result-type="'+_fieldName+'"]');
                    var _v = parseInt(_el.attr('data-result-value'));
                    var sum = _fieldValue + _v;
                    _el.attr('data-result-value', sum).html(sum);
                });
            });
        });
    };

    var _drawUsil = function () {
        $.each(_container.getGroupParam('increased'), function (statOwn, valueOwn) {
            switch (statOwn) {
                case 'damage':
                    $.each(_container.getGroupParam('damage'), function (fieldName, fieldValue){
                        var _el = $('#result [data-result-tab="'+_id+'"][data-result-type="'+fieldName+'"]');
                        var _val = parseInt(_el.attr('data-result-value'));
                        var _res = _val + _val * (valueOwn/100);
                        _el.attr('data-result-value', _res).html(Math.ceil(_res));
                    });
                    break;
                case 'mf':
                    var items = _container.getDummyItems();
                    var unikCount = 0;
                    var unikPerc = 0;

                    $.each(items, function (category, info) {
                        if(info['unique'] === true)
                            unikCount++;
                    });
                    if(_container.getMedal('hero'))
                        unikCount++;

                    if(unikCount > 5 && unikCount < 9) {
                        unikPerc = 1;
                    } else if(unikCount > 8 && unikCount < 12) {
                        unikPerc = 2;
                    } else if(unikCount == 12) {
                        unikPerc = 3;
                    } else if(unikCount > 12) {
                        unikPerc = 4;
                    }


                    var maxMFParamName = '';
                    var $critical   = $('[data-result-tab="'+_id+'"][data-result-value="critical"]');
                    var $p_critical = $('[data-result-tab="'+_id+'"][data-result-value="p_critical"]');
                    var $flee       = $('[data-result-tab="'+_id+'"][data-result-value="flee"]');
                    var $p_flee     = $('[data-result-tab="'+_id+'"][data-result-value="p_flee"]');

                    var krit    = parseInt($critical.attr('data-result-value'));
                    var pkrit   = parseInt($p_critical.attr('data-result-value'));
                    var uvorot  = parseInt($flee.attr('data-result-value'));
                    var puvorot = parseInt($p_flee.attr('data-result-value'));
                    if(krit > pkrit && krit > uvorot && krit > puvorot) {
                        $critical
                            .attr('data-result-value', krit + krit * ((valueOwn + unikCount)/100))
                            .html(Math.round(krit + krit * ((valueOwn + unikPerc)/100)));
                        maxMFParamName = 'krit';
                    } else if(pkrit > krit && pkrit > uvorot && pkrit > puvorot) {
                        $p_critical
                            .attr('data-result-value', pkrit + pkrit * ((valueOwn + unikCount)/100))
                            .html(Math.round(pkrit + pkrit * ((valueOwn + unikPerc)/100)));
                        maxMFParamName = 'pkrit';
                    } else if(uvorot > krit && uvorot > pkrit && uvorot > puvorot) {
                        $flee
                            .attr('data-result-value', uvorot + uvorot * ((valueOwn + unikCount)/100))
                            .html(Math.round(uvorot + uvorot * ((valueOwn + unikPerc)/100)));
                        maxMFParamName = 'uvor';
                    } else if(puvorot > krit && puvorot > pkrit && puvorot > uvorot) {
                        $p_flee
                            .attr('data-result-value', puvorot + puvorot * ((valueOwn + unikCount)/100))
                            .html(Math.round(puvorot + puvorot * ((valueOwn + unikPerc)/100)));
                        maxMFParamName = 'puvor';
                    }

                    $.each(_container.getGroupParam('mf'), function (statName, value) {
                        if(statName == maxMFParamName)
                            return;

                        var _el = $('[data-result-tab="'+_id+'"][data-result-type="'+statName+'"]');
                        var cur = parseInt(_el.attr('data-result-value'));
                        var val = Math.round(cur + (cur * (unikPerc/100)));
                        _el.html(val).attr('data-result-value', cur + (cur * (unikPerc/100)));
                    });
                    break;
                case 'armor':
                    $.each(_container.getGroupParam('armor'), function(name, value) {
                        $('[data-result-tab="'+_id+'"][data-result-type="'+name+'"]').attr('data-result-value', value + value * (valueOwn/100)).html(parseInt(value + value * (valueOwn/100)));
                    });
                    break;
            }
        });
    };
}