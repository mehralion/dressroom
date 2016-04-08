/**
 * Created by Николай on 03.06.14.
 */
function Hint()
{
    var _hint;
    var _that = this;

    this.clear = function(){
        _hint.html('');
    };

    this.hide = function() {
        _that.clear();
        _hint.hide();
    };

    this.empty = function(itemName, e) {
        if(debug)
            console.log('Пустой слот', itemName);

        _hint.html('Пустой слот ' + itemName).show().css({left:e.pageX + 20, top:e.pageY});
    };

    this.duh = function(duhInfo, duhNumber, e){
        var name = $('<h4>').append('Дух Стойкости '+duhNumber);
        _hint.append(name);

        var ulGive = $('<ul>').appendTo(_hint);
        $.each(duhInfo, function (type, values) {
            $.each(values, function(name, value){
                if (value > 0)
                    $('<li>', {'html':vak[name] + ': ' + value}).appendTo(ulGive);
            });
        });

        _hint.show().css({left:e.pageX + 20, top:e.pageY});
    };

    this.itemsShow = function(item, e){
        if(debug)
            console.log('Выбор вещи', item);

        var itemObj = new Item(item);

        var name = $('<h4>').append('<img src="http://i.oldbk.com/i/align_'+itemObj.getAlign()+'.gif"> ');
        name.append(itemObj.getName());
        if(itemObj.isMF())
            name.append(' (МФ)');

        if(itemObj.getAp() !== false)
            name.append(' (' + itemObj.getAp() + ' АП)');

        if(itemObj.getSharpen() !== false)
            name.append(' [+' + itemObj.getSharpen() + ']');

        if(itemObj.isArt())
            name.append('<img src="http://i.oldbk.com/i/artefact.gif">');

        var ulOther = $('<ul>');
        var price = itemObj.getCost();
        var repaPrice = itemObj.getRepaCost();
        var ekrPrice = itemObj.getEkrCost();
        if(repaPrice !== false)
            $('<li>', {'html':'Цена: <b>' + repaPrice + ' реп.</b>'}).appendTo(ulOther);
        else if(price !== false)
            $('<li>', {'html':'Цена: <b>' + price + ' кр./' + ekrPrice + ' екр.</b>'}).appendTo(ulOther);

        var podgon = itemObj.getPodgon();
        if(podgon !== false) {
            var count = 'раз';
            if(podgon == 2 || podgon == 3 || podgon == 4)
                count += 'a';
            $('<li>', {'html':'Подогнано: <b>' + podgon + ' ' + count + '</b>'}).appendTo(ulOther);
        }

        var durability = itemObj.getDurability();
        if(durability !== false)
            $('<li>', {'html':'Долговечность: 0/' + durability}).appendTo(ulOther);

        _hint.append(name).append(ulOther);

        /** требуемые параметры */
        var itemNeed = itemObj.getParamNeed();
        if (!is_empty(itemNeed)) {
            _hint.append('<h4>Требуется минимальное:</h4>');
            var ulNeed = $('<ul>').appendTo(_hint);
            $.each(itemNeed, function (category, items) {
                $.each(items, function (name, value) {
                    if (value > 0 && name != 'align')
                        $('<li>', {'html':vak[name] + ': ' + value}).appendTo(ulNeed);
                });
            });
        }

        /** Какие параметры дает */
        var itemGive = itemObj.getParamGive();
        if (!is_empty(itemGive)) {
            _hint.append('<h4>Действует на:</h4>');
            var ulGive = $('<ul>').appendTo(_hint);
            $.each(itemObj.getGroupParam('params_give', 'stats'), function (name, value) {
                if (value != 0)
                    $('<li>', {'html':vak[name] + ': ' + value}).appendTo(ulGive);
            });

            $.each(itemObj.getGroupParam('params_give', 'other'), function (name, value) {
                if (value > 0)
                    $('<li>', {'html':vak[name] + ': ' + value}).appendTo(ulGive);
            });

            $.each(itemObj.getGroupParam('params_give', 'damage'), function (name, value) {
                if (value > 0)
                    $('<li>', {'html':vak[name] + ': ' + value}).appendTo(ulGive);
            });

            $.each(itemObj.getGroupParam('params_give', 'mf'), function (name, value) {
                if (value > 0)
                    $('<li>', {'html':vak[name] + ': ' + value + '%'}).appendTo(ulGive);
            });

            $.each(itemObj.getGroupParam('params_give', 'possession'), function (name, value) {
                if (value > 0)
                    $('<li>', {'html':vak[name] + ': ' + value}).appendTo(ulGive);
            });

            $.each(itemObj.getGroupParam('params_give', 'possession_m'), function (name, value) {
                if (value > 0)
                    $('<li>', {'html':vak[name] + ': ' + value}).appendTo(ulGive);
            });

            $.each(itemObj.getGroupParam('params_give', 'armor'), function (name, value) {
                if (value > 0)
                    $('<li>', {'html':vak[name] + ': ' + value}).appendTo(ulGive);
            });

            $.each(itemObj.getGroupParam('params_give', 'increased'), function (name, value) {
                if (value > 0 || item['enabled_rune_'+name])
                    $('<li>', {'html':value + '% ' + vak['increased_'+name]}).appendTo(ulGive);
            });
        }

        if(itemObj.isUnik())
            $('<li>', {'html':'Вещь имеет уникальные характеристики.', 'style':'color:red;font-weight: bold;'}).appendTo(ulGive);

        if(itemObj.isRune()) {
            $('<li>', {'html':'<br>'}).appendTo(ulGive);
            if(itemObj.isRuneDamage())
                $('<li>', {'html':'Руна на усиление урона', 'style':'font-style:italic;color:grey;'}).appendTo(ulGive);
            else if(itemObj.isRuneArmor())
                $('<li>', {'html':'Руна на усиление брони', 'style':'font-style:italic;color:grey;'}).appendTo(ulGive);
            else if(itemObj.isRuneMF())
                $('<li>', {'html':'Руна на усиление МФ (%)', 'style':'font-style:italic;color:grey;'}).appendTo(ulGive);
        }

        if(itemObj.isProkat()) {
            $('<li>', {'html':'<br>'}).appendTo(ulGive);
            $('<li>', {'html':'Предмет из проката', 'style':'font-style:italic;'}).appendTo(ulGive);
        } else if(itemObj.inProkat()) {
            $('<li>', {'html':'<br>'}).appendTo(ulGive);
            $('<li>', {'html':'Предмет можно найти в прокате: '+itemObj.getStringProkat(), 'style':'font-style:italic;'}).appendTo(ulGive);
        }

        _hint.show().css({left:e.pageX + 20, top:e.pageY});
    };

    var __construct = function () {
        var $hint = $('.hint');
        if($hint.exists())
            $hint.remove();

        $('body').append('<div class="hint"></div>');
        _hint = $('.hint');;
    }();
}