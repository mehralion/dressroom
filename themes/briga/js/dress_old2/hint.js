/**
 * Created with JetBrains PhpStorm.
 * User: user
 * Date: 24.12.12
 * Time: 16:25
 * To change this template use File | Settings | File Templates.
 */
function Hint(eIn, itemIn, textIn) {
    var _e;
    var _item;
    var _body;
    var _text;
    var _that = this;
    var _hint;

    this.draw = function () {
        _that.getHead();
        _that.getNeed();
        _that.getGive();
        $('.hint').css({left:_e.pageX + 20, top:_e.pageY});
    }
    /**
     *
     * @return {String}
     */
    this.getHead = function () {
        var align = _item['params_need']['other']['align'];

        var name = $('<h4>').appendTo(_hint);
        if(align !== undefined && align > 0)
            name.append('<img src="http://i.oldbk.com/i/align_'+align+'.gif"> ');
        if (_item['name'] !== undefined)
            name.append(_item['name']);
        if(_item['settings'] !== undefined) {
            $.each(_item['settings']['mf'], function (i, value){
                if(value > 0) {
                    name.append(' (МФ)');
                    return false;
                }
            });
            if(_item['settings']['apInfo']['select'] > 0)
                name.append(' ('+apInfo[_item['settings']['apInfo']['select']]['level']+' АП)');
            if(_item['settings']['sharpen']['select'] > 0)
                name.append(' [+' + _item['settings']['sharpen']['select'] + ']');

        }
        if(_item['is_art'] || _item['create_art'])
            name.append('<img src="http://i.oldbk.com/i/artefact.gif">');

        var ulOther = $('<ul>').appendTo(_hint);
        if (_item['price'] !== undefined && (_item['repa_cost'] === undefined || !_item['repa_cost']))
            $('<li>', {'html':'Цена: <b>' + _item['price'] + ' кр.</b>'}).appendTo(ulOther);
        else if(_item['repa_cost'] !== undefined && _item['repa_cost'] > 0)
            $('<li>', {'html':'Цена: <b>' + _item['repa_cost'] + ' реп.</b>'}).appendTo(ulOther);
        if(_item['settings'] !== undefined && _item['settings']['podgonInfo']['select'] > 0) {
            var _podgon = _item['settings']['podgonInfo']['select'];
            var count = 'раз';
            if(_podgon == 2 || _podgon == 3 || _podgon == 4)
                count += 'a';
            $('<li>', {'html':'Подогнано: <b>' + _podgon + ' ' + count + '</b>'}).appendTo(ulOther);
        }
    }
    /**
     *
     * @return {String}
     */
    this.getNeed = function () {
        if (_item['params_need'] !== undefined) {
            _hint.append('<h4>Требуется минимальное:</h4>');
            var ulNeed = $('<ul>').appendTo(_hint);
            $.each(_item['params_need'], function (category, items) {
                $.each(items, function (name, value) {
                    if (value > 0 && name != 'align')
                        $('<li>', {'html':vak[name] + ': ' + value}).appendTo(ulNeed);
                });
            });
        }
    }
    /**
     *
     * @return {String}
     */
    this.getGive = function () {
        var give = '';
        if (_item['params_give'] !== undefined) {
            _hint.append('<h4>Действует на:</h4>');
            var ulGive = $('<ul>').appendTo(_hint);
            if (_item['params_give']['stats']) {
                $.each(_item['params_give']['stats'], function (name, value) {
                    if (value > 0)
                        $('<li>', {'html':vak[name] + ': ' + value}).appendTo(ulGive);
                });
            }
            if (_item['params_give']['other']) {
                $.each(_item['params_give']['other'], function (name, value) {
                    if (value > 0)
                        $('<li>', {'html':vak[name] + ': ' + value}).appendTo(ulGive);
                });
            }
            if (_item['params_give']['mf']) {
                $.each(_item['params_give']['mf'], function (name, value) {
                    if (value > 0)
                        $('<li>', {'html':vak[name] + ': ' + value + '%'}).appendTo(ulGive);
                });
            }
            if (_item['params_give']['vlad']) {
                $.each(_item['params_give']['vlad'], function (name, value) {
                    if (value > 0)
                        $('<li>', {'html':vak[name] + ': ' + value}).appendTo(ulGive);
                });
            }
            if (_item['params_give']['bron']) {
                $.each(_item['params_give']['bron'], function (name, value) {
                    if (value > 0)
                        $('<li>', {'html':vak[name] + ': ' + value}).appendTo(ulGive);
                });
            }
            if (_item['params_give']['usil']) {
                $.each(_item['params_give']['usil'], function (name, value) {
                    if (value > 0)
                        $('<li>', {'html':value + '% ' + vak[name]}).appendTo(ulGive);
                });
            }
        }
        if((_item['settings'] !== undefined && _item['settings']['mf']['stats'] == 3) || _item['create_art'] || _item['is_art'])
            $('<li>', {'html':'Вещь имеет уникальные характеристики.', 'style':'color:red;font-weight: bold;'}).appendTo(ulGive);
    }
    this.drawEmpty = function () {
        _body = 'Пустой слот ' + _text;
        $('.hint').css({left:_e.pageX + 20, top:_e.pageY});
        $('.hint').html(_body);
    }

    var __construct = function (ePassed, itemPassed, textPassed) {
        $('body').append('<div class="hint"></div>');
        _hint = $('.hint');
        _e = ePassed;
        _item = itemPassed;
        _text = textPassed;
        if (_item !== null)
            _that.draw();
        else
            _that.drawEmpty();
    }(eIn, itemIn, textIn);
}

function removeHint() {
    $('.hint').remove();
}
