/**
 * Created with JetBrains PhpStorm.
 * User: Николай
 * Date: 01.10.13
 * Time: 18:36
 * To change this template use File | Settings | File Templates.
 */
var baseUrl = '/pr/themes/briga';
var debug = false;
var tabs = null;
var dummy = null; //Кукла
var container = {}; //Контейнеры
var items = null; //Все предметы из базы
var myWindow = null; //Окна
var hint = null; //Хинты
var menu = null; //Меню куклы
var baseSiteUrl = '/';
$(function(){
    tabs = new Tabs();
    items = new Items();
    myWindow = new WindowShow();
    container[0] = new Container();
    container[0].setParams(null);
    container[0].setDummyItems(null);
    dummy = new Dummy();
    dummy.drawDummyParams();

    hint = new Hint();
    menu = new Menu();

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
            items.setItems(data);
        },
        error: function() {
            $("#fuzz").fadeOut();
            myWindow.text("Ошибка!", "<div>Не удалось загрузить вещи</div>");
        }
    });

    $(document.body).on('click', '#saveItems', function(event){
        saveDummy();
        event.preventDefault();
    });
    $(document.body).on('click', '#clearAll', function(event){
        resetAll();
        event.preventDefault();
    });
    $(document.body).on('click', '#setCorrectStats', function(event){
        setCorrectStats();
        event.preventDefault();
    });
    $(document.body).on('click', '#loadByNick', function(event){
        openByNick();
        event.preventDefault();
    });
    $(document.body).on('click', '#copyTab', function(event){
        tabs.cloneTab();
        event.preventDefault();
    });
    $(document.body).on('click', '#loadItems', function(event){
        openByKey();
        event.preventDefault();
    });

});

function openByNick() {
    myWindow.text('Загрузка по персонажу', '<input name="loadNick" id="loadNick" placeholder="Введите логин">', '<a href="#" class="btn_popup load_nick">Загрузить</a> <a href="#" class="btn_popup close_btn">Закрыть</a>');
    $(document.body).off('click', '.load_nick');
    $(document.body).on('click', '.load_nick', function(event){
        loadByNick();
        event.preventDefault();
    });
}
function openByKey() {
    myWindow.text('Загрузка по персонажу', '<input name="loadKey" id="loadKey" placeholder="Введите key">', '<a href="#" class="btn_popup load_key">Загрузить</a> <a href="#" class="btn_popup close_btn">Закрыть</a>');
    $(document.body).off('click', '.load_key');
    $(document.body).on('click', '.load_key', function(event){
        loadItems();
        event.preventDefault();
    });
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
            return true;
        },
        success: function(data) {
            $("#fuzz").fadeOut();
            if(data['error'] !== undefined)
                myWindow.text('Ошибка !', '<div>'+data['error']+'</div>');
            else{
                resetAll();
                container[tabs.getCurrentTab()].setParams(data['params']);
                container[tabs.getCurrentTab()].setDummyItems(data['dressed'], true);
                myWindow.close();
            }
        },
        error: function() {
            $("#fuzz").fadeOut();
            myWindow.text('Ошибка !', '<div>Непредвиденная ошибка</div>');
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
            return true;
        },
        success: function(data) {
            $("#fuzz").fadeOut();
            if(data['error'] !== undefined)
                myWindow.text('Ошибка !', '<div>'+data['error']+'</div>');
            else{
                resetAll();
                container[tabs.getCurrentTab()].setDummyItems(data);
                myWindow.close();
            }
        },
        error: function() {
            $("#fuzz").fadeOut();
            myWindow.text('Ошибка !', '<div>Непредвиденная ошибка</div>');
        }
    });
}
function saveDummy () {
    $.ajax({
        url: baseSiteUrl+'site/saveDummy.html',
        dataType:'json',
        type: "POST",
        data:{params:container[tabs.getCurrentTab()].getParams(),dressed:container[tabs.getCurrentTab()].getDummyItems()},
        beforeSend: function() {
            $("#fuzz").fadeIn();
            return true;
        },
        success: function(data) {
            $("#fuzz").fadeOut();
            myWindow.text('Сохранение компелкта', '<div>Код комплекта:<br><b>' + data.key + '</b></div>');
        },
        error: function() {
            $("#fuzz").fadeOut();
            myWindow.text('Ошибка !', '<div>Непредвиденная ошибка</div>');
        }
    });
}
function resetAll() {
    dummy.setEmpty();
    container[tabs.getCurrentTab()].setParams(null);
    container[tabs.getCurrentTab()].setDummyItems(null);
    dummy.drawDummyParams();
}
function setCorrectStats() {
    container[tabs.getCurrentTab()].setCorrectStats();
    dummy.drawDummyParams();
}

function showMessage(type, message) {
    myWindow.text('Сообщение', message);
}