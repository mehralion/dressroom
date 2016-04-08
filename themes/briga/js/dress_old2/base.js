/**
 * Created with JetBrains PhpStorm.
 * User: user
 * Date: 24.12.12
 * Time: 16:24
 * To change this template use File | Settings | File Templates.
 */
var baseUrl = '/themes/briga';
var container = {}, dress, dummy, items;
var tab = 0;
var tabCount = 0;
$(function () {
    /*if (top.frames.length != 0 || window.location.host != 'olddil.ru') {
        window.location.href = 'http://olddil.ru';
    }
    showMessage('success', 'Примерочная клана DIL работает в тестовом режиме, <br>о всех неполадках сообщать персонажу СпокоенКакЛед');
    */
    container[tabCount] = new Container(); //Создаем контейнер с данными для конкретного таба
    container[tabCount].setParams(null); //Обнуляем параметры
    container[tabCount].setDummyItems(null); //Обнуляем вещи
    dummy = new Dummy(); //Создаем куклу
    dummy.setEvents(); //Вешаем события куклы
    dummy.drawDummyParams(); //Рисуем параметры
    items = new Items(); //Для вещей
    resetAll();
    $.ajax({ //Получаем вещи
        url: '/site/getitems.html',
        dataType:'json',
        beforeSend: function() {
            $("#fuzz").fadeIn();
            return true;
        },
        success: function(data) {
            $("#fuzz").fadeOut();
            items.setItems(data);
        },
        error: function() {
            $("#fuzz").fadeOut();
            changeWindow("Ошибка!", $('<div>', {'text':'Не удалось загрузить вещи'}), "", "showNew");
        }
    });
    $('#saveItems').click(function(){
        saveDummy();
        return false;
    });
    $('#clearAll').click(function(){
        resetAll();
        return false;
    });
    $('#setCorrectStats').click(function(){
        setCorrectStats();
        return false;
    });
    $('#loadByNick').click(function(){
        openByNick();
        return false;
    });

    $('.add_cabin').click(function(){
        tabCount++;
        $('.tab').show();
        $('.tabResult').hide();
        $('ul.cabins li').removeClass('active');
        var li = $('<li>', {'class':'active','id':tabCount}).appendTo($('ul.cabins'));
        var span = $('<span>', {'class':'btn_orange'}).appendTo(li);
        $('<a>', {'href':'#', 'text':'Кабинка ' + (tabCount+1)}).appendTo(span);
        $('<a>', {'href':'#', 'class':'delete', 'rel':tabCount}).appendTo(span);
        //$('ul.cabins').append('<li class="active" id="'+tabCount+'"><a data-toggle="tab" href="#">Кабинка '+(tabCount+1)+'<div class="closeTab" rel="'+tabCount+'">x</div></a></li>');
        tabEvent();
        container[tabCount] = new Container();
        container[tabCount].setParams(null);
        container[tabCount].setDummyItems(null);
        tab = tabCount;
        dummy.drawDummyImg();
        return false;
    });
    $('.cabin_result').click(function(){
        $('ul.cabins li').removeClass('active');
        $(this).addClass('active');
        $('.tab').hide();
        $('.tabResult').show();
        var result = new Result();
        result.drawResult();
    });
    tabEvent();

    $('.clouse_popup').click(function(){
        $('.popup__overlay').hide();
    });
    $('.popup__overlay').click(function(event) {
        e = event || window.event
        if (e.target == this) {
            $('.popup__overlay').hide();
        }
    })
});
function tabEvent() {
    $('ul.cabins li').unbind('click');
    $('ul.cabins li').click(function(){
        $('.tab').show();
        $('.tabResult').hide();
        $('ul.cabins li').removeClass('active');
        $(this).addClass('active');
        tab = $(this).attr('id');
        dummy.drawDummyImg();
    });

    $('ul.cabins li .delete').unbind('click');
    $('ul.cabins li .delete').unbind('mouseover');
    $('ul.cabins li .delete').unbind('mouseout');
    $('ul.cabins li .delete').mouseover(function(){
        $(this).css({color:'red'});
    });
    $('ul.cabins li .delete').mouseout(function(){
        $(this).css({color:'black'});
    });
    $('ul.cabins li .delete').click(function(){
        var id = $(this).attr('rel');
        delete container[id];
        $('ul.cabins li#'+ id).remove();

        $('.tab').show();
        $('.tabResult').hide();
        $('ul.cabins li').removeClass('active');
        $('ul.cabins li#0').addClass('active');
        tab = 0;
        dummy.drawDummyImg();
    });
}
function openByNick() {
    changeWindow("Загрузка по персонажу", $('<input>', {'name':'loadNick', 'id':'loadNick', 'placeholder':'Введите логин'}), '<a href="#" class="btn_popup load_nick">Загрузить</a> <a href="#" class="btn_popup close_btn">Закрыть</a>', "showNew");
    $('.load_nick').click(function(){
        loadByNick();
    });
}
function loadByNick() {
    $.ajax({
        url: '/site/loadbynick.html',
        data: {login:$('#loadNick').val()},
        type:'post',
        dataType:'json',
        beforeSend: function() {
            $("#fuzz").fadeIn();
            return true;
        },
        success: function(data) {
            $("#fuzz").fadeOut();
            if(data['error'] !== undefined)
                changeWindow("Ошибка!", $('<div>', {'text':data['error']}), "", "showNew");
            else{
                resetAll();
                container[tab].setDummyItems(data);
                changeWindow("", "", "", "hide");
            }
        },
        error: function() {
            $("#fuzz").fadeOut();
            changeWindow("Ошибка!", $('<div>', {'text':'Непредвиденная ошибка'}), "", "showNew");
        }
    });
}
function saveDummy () {
    $.ajax({
        url: '/site/saveDummy.html',
        dataType:'json',
        type: "POST",
        data:{params:container[tab].getParams(),dressed:container[tab].getDummyItems()},
        beforeSend: function() {
            $("#fuzz").fadeIn();
            return true;
        },
        success: function(data) {
            $("#fuzz").fadeOut();
            changeWindow("Сохранение компелкта", $('<div>', {'text':'<div>Ссылка на этот комплект:<br><b>http://olddil.ru/service/dress.html?key=' + data.key + '</b></div>'}), "", "showNew");
        },
        error: function() {
            $("#fuzz").fadeOut();
            changeWindow("Ошибка!", $('<div>', {'text':'Непредвиденная ошибка'}), "", "showNew");
        }
    });
}
function resetAll() {
    $.each(empty, function (cat, img) {
        if(cat == 'or') {
            $('.player .or').attr('src', img);
            $('.player .or').removeClass('item_dressed');
            $('.player .or').addClass('item_empty');
        } else {
            $('.player #'+cat).attr('src', img);
            $('.player #'+cat).removeClass('item_dressed');
            $('.player #'+cat).addClass('item_empty');
        }
    });
    container[tab].setParams(null);
    container[tab].setDummyItems(null);
    dummy.drawDummyParams();
}
function setCorrectStats() {
    container[tab].setCorrectStats();
    dummy.drawDummyParams();
}
