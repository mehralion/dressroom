/**
 * Created with JetBrains PhpStorm.
 * User: user
 * Date: 24.12.12
 * Time: 16:24
 * To change this template use File | Settings | File Templates.
 */
var baseUrl = '';
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
            showMessage('error', 'Не удалось загрузить вещи');
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
        $('ul.header li').removeClass('active');
        $('ul.header').append('<li class="active cabins" id="'+tabCount+'"><a data-toggle="tab" href="#">Кабинка '+(tabCount+1)+'<div class="closeTab" rel="'+tabCount+'">x</div></a></li>');
        tabEvent();
        container[tabCount] = new Container();
        container[tabCount].setParams(null);
        container[tabCount].setDummyItems(null);
        dummy.drawDummyImg();
        return false;
    });
    $('.cabin_result').click(function(){
        $('ul.header li').removeClass('active');
        $(this).addClass('active');
        $('.tab').hide();
        $('.tabResult').show();
        var result = new Result();
        result.drawResult();
    });
    tabEvent();
});
function tabEvent() {
    $('ul.header li.cabins').unbind('click');
    $('ul.header li.cabins').click(function(){
        $('.tab').show();
        $('.tabResult').hide();
        $('ul.header li').removeClass('active');
        $(this).addClass('active');
        tab = $(this).attr('id');
        dummy.drawDummyImg();
    });

    $('.closeTab').unbind('click');
    $('.closeTab').unbind('mouseover');
    $('.closeTab').unbind('mouseout');
    $('.closeTab').mouseover(function(){
        $(this).css({color:'red'});
    });
    $('.closeTab').mouseout(function(){
        $(this).css({color:'black'});
    });
    $('.closeTab').click(function(){
        var id = $(this).attr('rel');
        delete container[id];
        $('ul.header li#'+ id).remove();

        $('.tab').show();
        $('.tabResult').hide();
        $('ul.header li').removeClass('active');
        $('li#0').addClass('active');

        dummy.drawDummyImg();
    });
}
function openByNick() {
    $('#dialog').remove();
    $('body').append('<div id="dialog"></div>');
    $('#dialog').html('<input type="text" name="loadNick" id="loadNick" placeholder="Введите логин">');
    $("#dialog").dialog({
        modal:true,
        width:500,
        title:'Загрузка по логину',
        buttons:{
            Ok:function () {
                loadByNick();
                closeMessage(this);
            }
        }
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
                showMessage('error', data['error']);
            else{
                resetAll();
                container[tab].setDummyItems(data);
            }
        },
        error: function() {
            $("#fuzz").fadeOut();
            showMessage('error', 'Непредвиденная ошибка');
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
            showMessage('success',
                '<div>Ссылка на этот комплект:<br><b>http://olddil.ru/service/dress.html?key=' + data.key + '</b></div>'
            );
        },
        error: function() {
            $("#fuzz").fadeOut();
            showMessage('error', 'Непредвиденная ошибка');
        }
    });
}
function resetAll() {
    $.each(empty, function (cat, img) {
        $('#'+cat).attr('src', img);
        $('#'+cat).removeClass('item_dressed');
        $('#'+cat).addClass('item_empty');
    });
    container[tab].setParams(null);
    container[tab].setDummyItems(null);
    dummy.drawDummyParams();
}
function showMessage(type, text) {
    $('#dialog').remove();
    $('body').append('<div id="dialog"></div>');
    $('#dialog').addClass(type);
    $('#dialog').html(text);
    $("#dialog").dialog({
        modal:true,
        width:500,
        title:'Сообщение',
        buttons:{
            Ok:function () {
                closeMessage(this);
            }
        }
    });
}
function setCorrectStats() {
    container[tab].setCorrectStats();
    dummy.drawDummyParams();
}
function closeMessage(dialogObj) {
    $(dialogObj).dialog("close");
    $("#dialog:ui-dialog").dialog("destroy");
    $('#dialog').remove();
}
