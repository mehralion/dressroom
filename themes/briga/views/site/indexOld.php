<?php
/* @var $this SiteController */
$this->pageTitle = Yii::app()->name;
?>

<?php
$baseUrl = Yii::app()->theme->baseUrl;

?>
<ul class="btn_nav">
    <li style="padding: 0px;">
        <ul class="cabins">
            <li id="0" class="active">
                <span class="btn_orange"><a href="#">Кабинка 1</a><a href="#" class="delete"></a></span>
            </li>
        </ul>
    </li>
    <li class="add_cabin">
        <span class="btn_grey"><img alt="" src="<?php echo $baseUrl; ?>/images/bg_btn_grey_one.gif"> <a href="#">Добавить
                кабинку</a></span>
    </li>
    <li class="cabin_result">
        <span class="btn_grey"><img alt="" src="<?php echo $baseUrl; ?>/images/bg_btn_grey_two.gif"><a href="#">Сводная
                таблица</a></span>
    </li>
</ul>
<div class="white_box tab">
<h3>Боец</h3>

<div class="life">
    <img alt="" src="<?php echo $baseUrl; ?>/images/icon_life.gif">

    <div class="life_box"></div>
    <span>: 24/24</span>
</div>
<div class="mana" style="display: none;">
    <img alt="" src="<?php echo $baseUrl; ?>/images/icon_mana.gif">

    <div class="mana_box"></div>
    <span>: 30/30</span>
</div>

<div class="white_box_left">
    <div class="player">
        <div class="stats_1 item_empty i" alt="Серьги" rel="ser"></div>
        <div class="stats_2 item_empty i" alt="Футболка" rel="fb"></div>
        <div class="stats_3 item_empty i" alt="Плащ" rel="pl"></div>
        <div class="stats_4 item_empty i" alt="Ожерелье" rel="kl"></div>
        <div class="stats_5 item_empty i or" alt="Оружие" rel="or"></div>
        <div class="stats_6 item_empty i" alt="Бронь" rel="br"></div>
        <div class="stats_7 item_empty i" alt="Кольцо" rel="r1"></div>
        <div class="stats_8 item_empty i" alt="Кольцо" rel="r2"></div>
        <div class="stats_9 item_empty i" alt="Кольцо" rel="r3"></div>

        <div class="player_box"><img alt="" src="<?php echo $baseUrl; ?>/images/img_player.jpg"></div>

        <div class="stats_10 item_empty i" alt="Шлем" rel="sh"></div>
        <div class="stats_11 item_empty i" alt="Перчатки" rel="pr"></div>
        <div class="stats_12 item_empty i" alt="Щит" rel="st"></div>
        <div class="stats_13 item_empty i" alt="Обувь" rel="ob"></div>

        <div class="stats_14 img_icon" id="addArt"><img class="hintView" alt="Сделать арт" src="<?php echo $baseUrl; ?>/images/img_stats_12.jpg"></div>
        <div class="stats_15 img_icon"><div class="hintView" class="" id="hero" alt="Знак героя"></div></div>
        <!--<div class="stats_15"><img alt="" src="<?php // echo $baseUrl; ?>/images/img_stats_13.jpg"></div>
        <div class="stats_16"><img alt="" src="<?php // echo $baseUrl; ?>/images/img_stats_14.jpg"></div>-->
        <div class="runes">
            <div class="rune1 i item_empty" alt="Руна" rel="runa1"></div>
            <div class="rune2 i item_empty" alt="Руна" rel="runa2"></div>
            <div class="rune3 i item_empty" alt="Руна" rel="runa3"></div>
        </div>
    </div>

    <div class="orange_box">
        <ul>
            <li>На 1 апе [0] уровня Вам доступно <strong>16</strong> родных статов.</li>
            <li>В вашем комплекте используется <span class="red">25</span> родных статов.</li>
            <li>Не хватает <span class="red">9</span> статов</li>
        </ul>
    </div>

    <div class="list_stats">
        <ul class="list_one" id="other">
            <li id="level">
                <input type="text" value="1">
                <label>Уровень</label>
                <span class="namber">0</span>
                <a href="#" class="minuse">-</a>
                <a href="#" class="pluse">+</a>
            </li>
            <li id="ap">
                <input type="text" value="6">
                <label>Ап</label>
                <span class="namber">1</span>
                <a href="#" class="minuse">-</a>
                <a href="#" class="pluse">+</a>
            </li>
        </ul>

        <ul class="list_one" id="stats">
            <li id="sila">
                <input type="text" value="1">
                <label>Сила</label>
                <span class="namber">6 <span class="green">[15 (14)]</span></span>
                <a href="#" class="minuse">-</a>
                <a href="#" class="pluse">+</a>
            </li>
            <li id="lovka">
                <input type="text" value="1">
                <label>Ловкость</label>
                <span class="namber">6</span>
                <a href="#" class="minuse">-</a>
                <a href="#" class="pluse">+</a>
            </li>
            <li id="inta">
                <input type="text" value="1">
                <label>Интуиция</label>
                <span class="namber">6</span>
                <a href="#" class="minuse">-</a>
                <a href="#" class="pluse">+</a>
            </li>
            <li id="vinos">
                <input type="text" value="1">
                <label>Выносливость</label>
                <span class="namber">10 <span class="red">  [25 (25)]    </span></span>
                <a href="#" class="minuse">-</a>
                <a href="#" class="pluse">+</a>
            </li>
            <li id="intel">
                <input type="text" value="1">
                <label>Интеллект</label>
                <span class="namber">0</span>
                <a href="#" class="minuse">-</a>
                <a href="#" class="pluse">+</a>
            </li>
            <li id="mudra">
                <input type="text" value="1">
                <label>Мудрость</label>
                <span class="namber">3</span>
                <a href="#" class="minuse">-</a>
                <a href="#" class="pluse">+</a>
            </li>

        </ul>
    </div>

    <ul class="list_one" id="vlad">
        <li id="nog">
            <input type="text" value="1">
            <label>Ножами и кастетами</label>
            <span class="namber">0</span>
            <a href="#" class="minuse">-</a>
            <a href="#" class="pluse">+</a>
        </li>
        <li id="topor">
            <input type="text" value="1">
            <label>топорами и секирами</label>
            <span class="namber">60</span>
            <a href="#" class="minuse">-</a>
            <a href="#" class="pluse">+</a>
        </li>
        <li id="dubina">
            <input type="text" value="1">
            <label>Дубинами булавами</label>
            <span class="namber">0</span>
            <a href="#" class="minuse">-</a>
            <a href="#" class="pluse">+</a>
        </li>
        <li id="mech">
            <input type="text" value="1">
            <label>Мечами</label>
            <span class="namber">0</span>
            <a href="#" class="minuse">-</a>
            <a href="#" class="pluse">+</a>
        </li>
    </ul>
    <ul class="list_one" id="vladm">
        <li id="ogon">
            <input type="text" value="0">
            <label>Огонь</label>
            <span class="namber">0</span>
            <a href="#" class="minuse">-</a>
            <a href="#" class="pluse">+</a>
        </li>
        <li id="voda">
            <input type="text" value="0">
            <label>Вода</label>
            <span class="namber">0</span>
            <a href="#" class="minuse">-</a>
            <a href="#" class="pluse">+</a>
        </li>
        <li id="zemlya">
            <input type="text" value="0">
            <label>Земля</label>
            <span class="namber">0</span>
            <a href="#" class="minuse">-</a>
            <a href="#" class="pluse">+</a>
        </li>
        <li id="vozduh">
            <input type="text" value="0">
            <label>Воздух</label>
            <span class="namber">0</span>
            <a href="#" class="minuse">-</a>
            <a href="#" class="pluse">+</a>
        </li>
        <li id="grey">
            <input type="text" value="0">
            <label>Серая</label>
            <span class="namber">0</span>
            <a href="#" class="minuse">-</a>
            <a href="#" class="pluse">+</a>
        </li>
        <li id="svet">
            <input type="text" value="0">
            <label>Свет</label>
            <span class="namber">0</span>
            <a href="#" class="minuse">-</a>
            <a href="#" class="pluse">+</a>
        </li>
        <li id="tma">
            <input type="text" value="0">
            <label>Тьма</label>
            <span class="namber">0</span>
            <a href="#" class="minuse">-</a>
            <a href="#" class="pluse">+</a>
        </li>
    </ul>


</div>

<div class="white_box_rigth table_mf">
    <ul class="stats_result">
        <li>
            <span class="name">Урон: </span>
            <span id="minu"></span>
            -
            <span id="maxu"></span>
        </li>
    </ul>

    <ul class="stats_result">
        <li>
            <span class="name">Мф. критических ударов: </span>
            <span id="krit">30</span>%
        </li>
        <li>
            <span class="name">Мф. против крит. ударов:</span>
            <span id="pkrit">30</span>%
        </li>
        <li>
            <span class="name">Мф. увертливости: </span>
            <span id="uvor">30</span>%
        </li>
        <li>
            <span class="name">Мф. против увертлив.: </span>
            <span id="puvor">30</span>%
        </li>
    </ul>

    <ul class="stats_result">
        <li>
            <span class="name">Усиление урона: </span>
            <span id="usil_uron">0</span>%
        </li>
        <li>
            <span class="name">Усиление максимального мф.: </span>
            <span id="usil_max_mf">0</span>%
        </li>
        <li>
            <span class="name">Усиление брони: 	</span>
            <span id="usil_bron">0</span>%
        </li>
    </ul>

    <ul class="stats_result">
        <li>
            <span class="name">Уникальный бонус: </span>
            <span id="unik">0</span><span id="unikMax"> / 6</span>
            <span class="unikImage"></span>
        </li>
        <li>
            &nbsp;
        </li>
        <li>
            <span class="name">Броня головы: </span>
            <span id="golova">30</span>
        </li>
        <li>
            <span class="name">Броня корпуса: 	</span>
            <span id="korp">30</span>
        </li>
        <li>
            <span class="name">Броня пояса: </span>
            <span id="poyas">30</span>
        </li>
        <li>
            <span class="name">Броня ног: 	</span>
            <span id="nogi">30</span>
        </li>
    </ul>

    <ul class="stats_result">
        <li>
            <span class="name">Вес предметов: </span>
            <span id="massa">0 / 24</span>
        </li>
    </ul>
    <ul class="stats_result">
        <li>
            <span class="name">Стоимость предметов:  </span>
            <span id="cost">0</span> кр. и
            <span id="cost_repa">0</span> реп.
        </li>
    </ul>

    <ul class="link_nav">
        <li><a href="#" id="clearAll">Очистить все</a></li>
        <li><a href="#" id="setCorrectStats">Подогнать статы и умения</a></li>
        <li><a href="#" id="saveItems">Сохранить комплект</a></li>
        <li><a href="#" id="loadItems">Загрузить комплект</a></li>
        <li><a href="#" id="loadByNick">Загрузить по персонажу ОлдБК</a></li>
        <li><a href="#" id="copyTab">Дублировать кабинку</a></li>
    </ul>

</div>
</div>
<div class="white_box tabResult" style="display: none;">
    <div class="white_box_rigth">
        <ul class="stats_result">
            <li>
                <span class="name">Сила</span>
            </li>
            <li>
                <span class="name">Ловкость</span>
            </li>
            <li>
                <span class="name">Интуиция</span>
            </li>
            <li>
                <span class="name">Выносливость</span>
            </li>
            <li>
                <span class="name">Интеллект</span>
            </li>
            <li>
                <span class="name">Мудрость</span>
            </li>
        </ul>
        <ul class="stats_result">
            <li>
                <span class="name">Всего статов</span>
            </li>
        </ul>
        <ul class="stats_result">
            <li>
                <span class="name">Уровень жизней: </span>
            </li>
        </ul>
        <ul class="stats_result">
            <li>
                <span class="name">Урон: </span>
            </li>
        </ul>

        <ul class="stats_result">
            <li>
                <span class="name">Мф. критических ударов: </span>
            </li>
            <li>
                <span class="name">Мф. против крит. ударов:</span>
            </li>
            <li>
                <span class="name">Мф. увертливости: </span>
            </li>
            <li>
                <span class="name">Мф. против увертлив.: </span>
            </li>
        </ul>

        <ul class="stats_result">
            <li>
                <span class="name">Броня головы: </span>
            </li>
            <li>
                <span class="name">Броня корпуса: 	</span>
            </li>
            <li>
                <span class="name">Броня пояса: </span>
            </li>
            <li>
                <span class="name">Броня ног: 	</span>
            </li>
        </ul>
    </div>
    <div class="white_box_rigth results">

    </div>
</div>
<div class="popup__overlay">
    <div class="popup">
        <a href="#" class="clouse_popup"></a>

        <div class="popup_top">
            <div class="top_left"></div>
            <div class="top_middle">
                <h2>Предметы</h2>
            </div>
            <div class="top_right"></div>
        </div>
        <div class="popup_cont">
            <div class="cont_left"></div>
            <div class="cont_middle">
                <div class="items">

                </div>
                <div class="buttons">
                    <a href="#" class="btn_popup close_btn">Закрыть</a>
                </div>
            </div>
            <div class="cont_right"></div>
        </div>
        <div class="popup_bot">
            <div class="bot_left"></div>
            <div class="bot_middle"></div>
            <div class="bot_right"></div>
        </div>
    </div>
</div>


<div id="fuzz">
    <div class="msgbox">
        Загружаем вещи...
        <img src="<?php echo Yii::app()->baseUrl; ?>/themes/bootstrap/images/ajax-loader.gif">
    </div>
</div>
<script type="text/javascript">
    $(function () {
        $("#fuzz").css("height", $(document).height());
    });
    $(window).bind("resize", function () {
        $("#fuzz").css("height", $(window).height());

    });
</script>