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
        var result =  $('.tabResult .results');
        result.html('');
        $.each(container, function(tabCont, itemContainer){
            _container = itemContainer;
            _id = tabCont;
            _Tab = $('<div>', {'class':'item_' + tabCont, 'style':'display:inline-block;margin-left: 10px;'}).appendTo(result);
            var _HeadCont = $('<ul>', {'style':'height: 15px;margin-bottom: 0px;margin-top:-15px;'}).appendTo(_Tab);
            $('<li>', {'text':'Кабинка '+(parseInt(tabCont)+1)}).appendTo(_HeadCont);
            _that.drawStatsAndVlad('stats');
            _that.drawHp();
            _that.drawUron();
            _that.drawTableParams('mf');
            _that.drawMfUsil('mf');
            _that.drawTableParams('bron');
        });
    }
    this.drawHp = function() {
        var _HpCont = $('<ul>', {'class':'stats_result'}).appendTo(_Tab);
        var _hpItem = _container.getParamValue('other', 'have', 'hp');
        var _vinos = _container.getParamValue('stats', 'own', 'vinos');
        $('<li>', {text:_hpItem + _vinos * statToMf['stats']['vinos']['other']['hp'], 'class':'hp_'+_id}).appendTo(_HpCont);
        //$('<div>', {'class':'separator'}).appendTo(_Tab);
    }
    this.drawUron = function() {
        var _UronCont = $('<ul>', {'class':'stats_result'}).appendTo(_Tab);
        var maxU = 0;
        var minU = 0;
        var vladCount = 0;
        var level = _container.getParamValue('other', 'have', 'level');
        var _sila = _container.getParamValue('stats', 'own', 'sila') + _container.getParamValue('stats', 'have', 'sila');
        var items = _container.getDummyItems();
        $.each(items, function(cat, item){
            if(is_empty(item))
                return;

            minU += item['params_give']['other']['minu'];
            maxU += item['params_give']['other']['maxu'];
            if(cat == 'nog' || cat == 'mech' || cat == 'dubina' || cat == 'topor') {
                vladCount = _container.getParamValue('vlad', 'have', cat);
                vladCount += _container.getParamValue('vlad', 'own', cat);
            }
        });
        minU = Math.round(1 + parseInt(level) + parseInt(minU) * (1 + 0.07 * parseInt(vladCount))) + statToMf['stats']['sila']['other']['minu'] * _sila;
        maxU = Math.round(4 + parseInt(level) + parseInt(maxU) * (1 + 0.07 * parseInt(vladCount))) + statToMf['stats']['sila']['other']['maxu'] * _sila;

        minU = Math.round(minU + minU * (_container.getParamValue('usil', 'have', 'usil_uron')/100));
        maxU = Math.round(maxU + maxU * (_container.getParamValue('usil', 'have', 'usil_uron')/100));

        $('<li>', {text: minU+' - '+maxU, 'class':'uron_'+_id}).appendTo(_UronCont);
        //$('<div>', {'class':'separator'}).appendTo(_Tab);
    }
    this.drawStatsAndVlad = function (categoryIn) {
        var _StatsCont = $('<ul>', {'class':'stats_result'}).appendTo(_Tab);
        var _statsAll = 0;
        var haveParams = _container.getGroupParam(categoryIn, 'have');
        $.each(haveParams, function (statName, statValue) {
            var curOwn = _container.getParamValue(categoryIn, 'own', statName);
            $('<li>', {text:statValue + curOwn, 'class':statName+'_'+_id, value:statValue + curOwn}).appendTo(_StatsCont);
            _statsAll += statValue + curOwn;
        });
        var allStats = $('<ul>', {'class':'stats_result'}).appendTo(_Tab);
        $('<li>', {text:_statsAll, value:_statsAll}).appendTo(allStats);
        //$('<div>', {'class':'separator'}).appendTo(_Tab);
    }
    this.drawTableParams = function (categoryIn) {
        var _MfCont = $('<ul>', {'class':'table_mf stats_result'}).appendTo(_Tab);
        var haveParams = _container.getGroupParam(categoryIn, 'have');
        $.each(haveParams, function (statName, statValue) {
            var pers = '';
            if (categoryIn == 'mf') {
                pers = ' %';

                var _lovka = _container.getParamValue('stats', 'own', 'lovka')
                    + _container.getParamValue('stats', 'have', 'lovka');
                if(statToMf['stats']['lovka']['mf'][statName] !== undefined)
                    statValue += Math.round(statToMf['stats']['lovka']['mf'][statName] * _lovka);
                var _inta = _container.getParamValue('stats', 'own', 'inta')
                    + _container.getParamValue('stats', 'have', 'inta');
                if(statToMf['stats']['inta']['mf'][statName] !== undefined)
                    statValue += Math.round(statToMf['stats']['inta']['mf'][statName] * _inta);

                var items = _container.getDummyItems();
                var unikCount = 0;

                $.each(items, function (category, info) {
                    if( (info['settings'] !== undefined && info['settings']['mf']['stats'] == 3) || info['is_art'] || info['create_art'])
                        unikCount++;
                });
                if(unikCount > 5)
                    statValue = Math.round(statValue + (statValue * 0.01));

            } else if(categoryIn == 'bron')
                statValue += parseInt(statValue * (_container.getParamValue('usil', 'have', 'usil_bron')/100));

            $('<li>', {text:statValue+pers,value: statValue, 'class':statName+'_'+_id}).appendTo(_MfCont);
        });
    }
    this.drawMfUsil = function() {
        var krit = $('.krit_'+_id).attr('value');
        var uvorot = $('.uvor_'+_id).attr('value');
        var pkrit = $('.pkrit_'+_id).attr('value');
        var puvorot = $('.puvor_'+_id).attr('value');
        var usil = _container.getParamValue('usil', 'have', 'usil_max_mf');
        if(krit > pkrit && krit > uvorot && krit > puvorot)
            $('.krit_'+_id).html(Math.round(krit + krit * (usil/100)) + '%').attr('value', krit + krit * (usil/100));
        else if(pkrit > krit && pkrit > uvorot && pkrit > puvorot)
            $('.pkrit_'+_id).html(Math.round(pkrit + pkrit * (usil/100)) + '%').attr('value', pkrit + pkrit * (usil/100));
        else if(uvorot > krit && uvorot > pkrit && uvorot > puvorot)
            $('.uvor_'+_id).html(Math.round(uvorot + uvorot * (usil/100)) + '%').attr('value', uvorot + uvorot * (usil/100));
        else if(puvorot > krit && puvorot > pkrit && puvorot > uvorot)
            $('.puvor_'+_id).html(Math.round(puvorot + puvorot * (usil/100)) + '%').attr('value', puvorot + puvorot * (usil/100));
    }
}