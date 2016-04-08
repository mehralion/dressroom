/**
 * Created by Николай on 03.06.14.
 */

var debug = false;
var container = {}, _items_ = {};
var hint, dummy, message, tabs, currentContainer, windows, menu, change, runeLevel;
var baseSiteUrl = '/pr/';
$(function(){
    currentContainer = container[0] = new Container();
    hint             = new Hint();
    dummy            = new Dummy();
    message          = new Message();
    tabs             = new Tabs();
    _items_          = new Items();
    windows          = new Windows();
    menu             = new Menu();
    change           = new Change();


    $.ajax({ //Получаем вещи
        url: baseSiteUrl+'site/getitems.html',
        dataType:'json',
        beforeSend: function() {
            $("#fuzz").fadeIn();
            return true;
        },
        success: function(data) {
            $("#fuzz").fadeOut();
            if(debug)
                console.log('Получили все предметы из БД', data);
            if(data['items'] !== undefined)
                _items_.setItems(data['items']);

            if(data['runeInfo'] !== undefined)
                runeLevel = data['runeInfo'];
        },
        error: function() {
            $("#fuzz").fadeOut();
            message.simple("<div>Не удалось загрузить вещи</div>", "Ошибка!");
        }
    });

    $(document.body).on('click', '#saveItems', function(event){
        event.preventDefault();
        $(window.parent).scrollTop(0);
        saveDummy();
    });
    $(document.body).on('click', '#clearAll', function(event){
        event.preventDefault();
        $(window.parent).scrollTop(0);
        resetAll();
    });
    $(document.body).on('click', '#setCorrectStats', function(event){
        event.preventDefault();
        $(window.parent).scrollTop(0);
        setCorrectStats();
    });
    $(document.body).on('click', '#loadByNick', function(event){
        event.preventDefault();
        $(window.parent).scrollTop(0);
        openByNick();
    });
    $(document.body).on('click', '#copyTab', function(event){
        event.preventDefault();
        $(window.parent).scrollTop(0);
        tabs.cloneTab();
    });
    $(document.body).on('click', '#loadItems', function(event){
        event.preventDefault();
        $(window.parent).scrollTop(0);
        openByKey();
    });
});

function openByNick() {
    message.byNick();
}
function openByKey() {
    message.byKey();
}
function loadItems()
{
    $.ajax({
        url: baseSiteUrl+'site/load.html',
        data: {key:$('#loadKey').val()},
        type:'post',
        dataType:'json',
        beforeSend: function() {
            $("#fuzz").fadeIn();
            message.hide();
            return true;
        },
        success: function(data) {
            $("#fuzz").fadeOut();
            if(data['error'] !== undefined)
                message.simple('<div>'+data['error']+'</div>', 'Ошибка !');
            else{
                resetAll();
                currentContainer.setParams(data['params']);
                currentContainer.setDummyItems(data['dressed'], true);

                dummy.drawDummyImg();
            }
        },
        error: function() {
            $("#fuzz").fadeOut();
            windows.text('<div>Непредвиденная ошибка</div>', 'Ошибка !');
        }
    });
}
function loadByNick() {
    $.ajax({
        url: baseSiteUrl+'site/loadbynick.html',
        data: {login:$('#loadNick').val()},
        type:'post',
        dataType:'json',
        beforeSend: function() {
            $("#fuzz").fadeIn();
            message.hide();
            return true;
        },
        success: function(data) {
            $("#fuzz").fadeOut();
            if(data['error'] !== undefined)
                windows.simple('<div>'+data['error']+'</div>', 'Ошибка !');
            else{
                resetAll();
                currentContainer.setDummyItems(data['items']);
                currentContainer.changeAlign(parseFloat(data['align']));
                dummy.drawDummyImg();
            }
        },
        error: function() {
            $("#fuzz").fadeOut();
            windows.text('<div>Непредвиденная ошибка</div>', 'Ошибка !');
        }
    });
}
function saveDummy () {
    $.ajax({
        url: baseSiteUrl+'site/saveDummy.html',
        dataType:'json',
        type: "POST",
        data:{params:currentContainer.getParams(),dressed:currentContainer.getDummyItems()},
        beforeSend: function() {
            $("#fuzz").fadeIn();
            return true;
        },
        success: function(data) {
            $("#fuzz").fadeOut();
            message.simple('<div>Код комплекта:<br><b>' + data.key + '</b></div>', 'Сохранение компелкта');
        },
        error: function() {
            $("#fuzz").fadeOut();
            message.simple('<div>Непредвиденная ошибка</div>', 'Ошибка !');
        }
    });
}

function resetAll() {
    currentContainer.setParams(null);
    currentContainer.setDummyItems(null);
    dummy.drawDummyImg();
}
function setCorrectStats() {
    currentContainer.setCorrectStats();
    dummy.drawDummyParams();
}


$.fn.exists = function(){ return this.length>0; };

function is_empty(obj) {

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0)    return false;
    if (obj.length && obj.length === 0)  return true;

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key))    return false;
    }

    return true;
}