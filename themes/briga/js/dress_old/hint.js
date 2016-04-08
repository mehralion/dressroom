/**
 * Created with JetBrains PhpStorm.
 * User: user
 * Date: 24.12.12
 * Time: 16:25
 * To change this template use File | Settings | File Templates.
 */
function Hint() {
    var _that = this;
    var _hint;

    /**
     * Пустой слот
     * @param itemName название слота
     * @param e
     */
    this.empty = function(itemName, e) {
        if(debug)
            console.log('Пустой слот ' + itemName);
        _hint.html('');
        _hint.html('Пустой слот ' + itemName).show().css({left:e.pageX + 20, top:e.pageY});
    };

    this.show = function(alt, e){
        _hint.html('');
        _hint.html(alt).show().css({left:e.pageX + 20, top:e.pageY});
    };

    /**
     * Отображаем инфу по предмету
     * @param e
     * @param item объект предмета целиком
     */
    this.showInfo = function(e, item){
        _hint.html('');

        var itemObj = new Item(item);

        var name = $('<h4>').append('<img src="http://i.oldbk.com/i/align_'+itemObj.getAlign()+'.gif"> ');
        name.append(itemObj.getName());
        if(itemObj.isMF())
            name.append(' (МФ)');

        if(itemObj.getAp() !== false)
            name.append(' (' + itemObj.getAp() + ' АП)');

        if(itemObj.getSharpen() !== false)
            name.append(' [+' + itemObj.getSharpen() + ']');

        if(itemObj.getApRuna())
            name.append(' (' + itemObj.getApRuna() + ' АП)');

        if(itemObj.isArt())
            name.append('<img src="http://i.oldbk.com/i/artefact.gif">');

        var ulOther = $('<ul>');
        var price = itemObj.getCost();
        if(price !== false)
            $('<li>', {'html':'Цена: <b>' + price + ' кр.</b>'}).appendTo(ulOther);

        var repaPrice = itemObj.getRepaCost();
        if(repaPrice !== false)
            $('<li>', {'html':'Цена: <b>' + repaPrice + ' реп.</b>'}).appendTo(ulOther);

        var podgon = itemObj.getPodgon();
        if(podgon !== false) {
            var count = 'раз';
            if(podgon == 2 || podgon == 3 || podgon == 4)
                count += 'a';
            $('<li>', {'html':'Подогнано: <b>' + podgon + ' ' + count + '</b>'}).appendTo(ulOther);
        }
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

            $.each(itemObj.getGroupParam('params_give', 'mf'), function (name, value) {
                if (value > 0)
                    $('<li>', {'html':vak[name] + ': ' + value + '%'}).appendTo(ulGive);
            });

            $.each(itemObj.getGroupParam('params_give', 'vlad'), function (name, value) {
                if (value > 0)
                    $('<li>', {'html':vak[name] + ': ' + value}).appendTo(ulGive);
            });

            $.each(itemObj.getGroupParam('params_give', 'vladm'), function (name, value) {
                if (value > 0)
                    $('<li>', {'html':vak[name] + ': ' + value}).appendTo(ulGive);
            });

            $.each(itemObj.getGroupParam('params_give', 'bron'), function (name, value) {
                if (value > 0)
                    $('<li>', {'html':vak[name] + ': ' + value}).appendTo(ulGive);
            });

            $.each(itemObj.getGroupParam('params_give', 'usil'), function (name, value) {
                if (value > 0 || item['enabled_rune_'+name])
                    $('<li>', {'html':value + '% ' + vak[name]}).appendTo(ulGive);
            });
        }

        if(itemObj.isUnik())
            $('<li>', {'html':'Вещь имеет уникальные характеристики.', 'style':'color:red;font-weight: bold;'}).appendTo(ulGive);

        _hint.show().css({left:e.pageX + 20, top:e.pageY});
    };

    /**
     * Закрываем хинт
     */
    this.close = function(){
        if(debug)
            console.log('Закрыли хинт');
        _hint.hide();
    };

    var __construct = function () {
        $('body').append('<div class="hint"></div>');
        _hint = $('.hint');
    }();
}
