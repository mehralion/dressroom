<?php
/* @var $this SiteController */
$this->pageTitle = Yii::app()->name;
?>

<?php
$baseUrl = Yii::app()->theme->baseUrl;

?>
<style>
    #cop {
        border-radius: 4px;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2) inset;
        padding: 10px;
        border: 1px solid #dcdcdc;
        background: #fff;
        margin-left: 11px;
        margin-top: 20px;
        width: 200px;
    }
</style>
<ul class="btn_nav">
    <li style="padding: 0;">
        <ul id="cabins">
            <li data-index="0" class="active">
                <span class="btn_orange"><a href="#" class="title">Кабинка 1</a></span>
            </li>
        </ul>
    </li>
    <li id="add_cabin">
        <span class="btn_grey"><img alt="" src="<?php echo $baseUrl; ?>/images/bg_btn_grey_one.gif"> <a href="#">Добавить
                кабинку</a></span>
    </li>
    <li id="cabin_result">
        <span class="btn_grey"><img alt="" src="<?php echo $baseUrl; ?>/images/bg_btn_grey_two.gif"><a href="#">Сводная
                таблица</a></span>
    </li>
</ul>
<div id="fighter" class="white_box tab">
    <h3>Боец</h3>

    <div class="life">
        <img alt="" src="<?php echo $baseUrl; ?>/images/icon_life.gif">

        <div class="life_box"></div>
        <span class="wrap">: <span data-type="other" data-string-value="hp" class="clearString">0</span>/<span data-type="other" data-string-value="hp" class="clearString">0</span></span>
    </div>
    <div class="mana" style="display: none;">
        <img alt="" src="<?php echo $baseUrl; ?>/images/icon_mana.gif">

        <div class="mana_box"></div>
        : <span data-type="other" data-string-value="mp" class="clearString">0</span>/<span data-type="other" data-string-value="mp" class="clearString">0</span>
    </div>

    <div class="white_box_left">
        <div class="player">
            <div class="stats_1 item_empty hover item" data-name="Серьги"    data-type="ser"></div>
            <div class="stats_2 item_empty hover item" data-name="Футболка"  data-type="fb"></div>
            <div class="stats_3 item_empty hover item" data-name="Плащ"      data-type="pl"></div>
            <div class="stats_4 item_empty hover item" data-name="Ожерелье"  data-type="kl"></div>
            <div class="stats_5 item_empty hover item" data-name="Оружие"    data-type="or" data-or="true"></div>
            <div class="stats_6 item_empty hover item" data-name="Бронь"     data-type="br"></div>
            <div class="stats_7 item_empty hover item" data-name="Кольцо"    data-type="r1"></div>
            <div class="stats_8 item_empty hover item" data-name="Кольцо"    data-type="r2"></div>
            <div class="stats_9 item_empty hover item" data-name="Кольцо"    data-type="r3"></div>

            <div class="player_box">
                <div class="cast hover" data-type="eat"></div>
                <div class="cast hover" data-type="duh"></div>
            </div>

            <div class="stats_10 item_empty hover item" data-name="Шлем"     data-type="sh"></div>
            <div class="stats_11 item_empty hover item" data-name="Перчатки" data-type="pr"></div>
            <div class="stats_12 item_empty hover item" data-name="Щит"      data-type="st"></div>
            <div class="stats_13 item_empty hover item" data-name="Обувь"    data-type="ob"></div>

            <div class="stats_14 hover" data-name="Сделать арт" id="addArt"></div>
            <div class="stats_15 hover" data-name="Дух" data-cast-type="duh"></div>
            <div class="stats_16 hover" data-name="Еда" data-cast-type="eat"></div>
            <div class="stats_17 hover" data-name="Знак героя"><div class="hintView" id="hero"></div></div>
            <div class="runes">
                <div class="rune1 item_empty hover item" data-name="Руна" data-type="runa1"></div>
                <div class="rune2 item_empty hover item" data-name="Руна" data-type="runa2"></div>
                <div class="rune3 item_empty hover item" data-name="Руна" data-type="runa3"></div>
            </div>
        </div>

        <div class="orange_box">
            <ul>
                <li>На 1 апе [0] уровня Вам доступно <strong>16</strong> родных статов.</li>
                <li>В вашем комплекте используется <span class="red">25</span> родных статов.</li>
                <li>Не хватает <span class="red">9</span> статов</li>
            </ul>
        </div>

        <div id="left_info">
            <ul class="list_one" data-type="levelInfo">
                <li data-type="level">
                    <input data-for="level" data-input-value="level" class="clearInput" id="level" type="text" value="0" />
                    <label for="level">Уровень</label>
                    <span data-string-value="level" class="number clearString">0</span>
                    <a data-for="level" data-type="take" href="#" class="minuse">-</a>
                    <a data-for="level" data-type="add" href="#" class="pluse">+</a>
                </li>
                <li data-type="ap">
                    <input data-for="ap" data-input-value="ap" class="clearInput" id="ap" type="text" value="0" />
                    <label for="ap">Ап</label>
                    <span data-string-value="ap" class="number clearString">0</span>
                    <a data-for="ap" data-type="take" href="#" class="minuse">-</a>
                    <a data-for="ap" data-type="add" href="#" class="pluse">+</a>
                </li>
            </ul>

            <ul class="list_one" data-type="stats">
                <li data-type="strange">
                    <input data-for="strange" id="strange" class="clearInput" data-input-value="strange" type="text" value="0" />
                    <label for="strange">Сила</label>
                    <span data-string-value="strange" class="number clearString">0<span class="green">[15 (14)]</span></span>
                    <a data-for="strange" data-type="take" href="#" class="minuse">-</a>
                    <a data-for="strange" data-type="add" href="#" class="pluse">+</a>
                </li>
                <li data-type="agility">
                    <input data-for="agility" id="agility" class="clearInput" data-input-value="agility" type="text" value="0" />
                    <label for="agility">Ловкость</label>
                    <span data-string-value="agility" class="number clearString">0</span>
                    <a data-for="agility" data-type="take" href="#" class="minuse">-</a>
                    <a data-for="agility" data-type="add" href="#" class="pluse">+</a>
                </li>
                <li data-type="intuition">
                    <input data-for="intuition" id="intuition" class="clearInput" data-input-value="intuition" type="text" value="0" />
                    <label for="intuition">Интуиция</label>
                    <span data-string-value="intuition" class="number clearString">0</span>
                    <a data-for="intuition" data-type="take" href="#" class="minuse">-</a>
                    <a data-for="intuition" data-type="add" href="#" class="pluse">+</a>
                </li>
                <li data-type="endurance">
                    <input data-for="endurance" id="endurance" class="clearInput" data-input-value="endurance" type="text" value="0" />
                    <label for="endurance">Выносливость</label>
                    <span data-string-value="endurance" class="number clearString">0<span class="red">  [25 (25)]    </span></span>
                    <a data-for="endurance" data-type="take" href="#" class="minuse">-</a>
                    <a data-for="endurance" data-type="add" href="#" class="pluse">+</a>
                </li>
                <li data-type="intellect">
                    <input data-for="intellect" id="intellect" class="clearInput" data-input-value="intellect" type="text" value="0" />
                    <label for="intellect">Интеллект</label>
                    <span data-string-value="intellect" class="number clearString">0</span>
                    <a data-for="intellect" data-type="take" href="#" class="minuse">-</a>
                    <a data-for="intellect" data-type="add" href="#" class="pluse">+</a>
                </li>
                <li data-type="wisdom">
                    <input data-for="wisdom" id="wisdom" class="clearInput" data-input-value="wisdom" type="text" value="0" />
                    <label for="wisdom">Мудрость</label>
                    <span data-string-value="wisdom" class="number clearString">0</span>
                    <a data-for="wisdom" data-type="take" href="#" class="minuse">-</a>
                    <a data-for="wisdom" data-type="add" href="#" class="pluse">+</a>
                </li>

            </ul>

            <ul class="list_one" data-type="possession">
                <li data-type="knife">
                    <input data-for="knife" id="knife" class="clearInput" data-input-value="knife" type="text" value="0" />
                    <label for="knife">Ножами и кастетами</label>
                    <span data-string-value="knife" class="number clearString">0</span>
                    <a data-for="knife" data-type="take" href="#" class="minuse">-</a>
                    <a data-for="knife" data-type="add" href="#" class="pluse">+</a>
                </li>
                <li data-type="ax">
                    <input data-for="ax" id="ax" class="clearInput" data-input-value="ax" type="text" value="0" />
                    <label for="ax">топорами и секирами</label>
                    <span data-string-value="ax" class="number clearString">0</span>
                    <a data-for="ax" data-type="take" href="#" class="minuse">-</a>
                    <a data-for="ax" data-type="add" href="#" class="pluse">+</a>
                </li>
                <li data-type="baton">
                    <input data-for="baton" id="baton" class="clearInput" data-input-value="baton" type="text" value="0" />
                    <label for="baton">Дубинами булавами</label>
                    <span data-string-value="baton" class="number clearString">0</span>
                    <a data-for="baton" data-type="take" href="#" class="minuse">-</a>
                    <a data-for="baton" data-type="add" href="#" class="pluse">+</a>
                </li>
                <li data-type="sword">
                    <input data-for="sword" id="sword" class="clearInput" data-input-value="sword" type="text" value="0" />
                    <label for="sword">Мечами</label>
                    <span data-string-value="sword" class="number clearString">0</span>
                    <a data-for="sword" data-type="take" href="#" class="minuse">-</a>
                    <a data-for="sword" data-type="add" href="#" class="pluse">+</a>
                </li>
            </ul>
            <ul class="list_one" data-type="possession_m">
                <li data-type="fire">
                    <input data-for="fire" id="fire" class="clearInput" data-input-value="fire" type="text" value="0" />
                    <label for="fire">Огонь</label>
                    <span data-string-value="fire" class="number clearString">0</span>
                    <a data-for="fire" data-type="take" href="#" class="minuse">-</a>
                    <a data-for="fire" data-type="add" href="#" class="pluse">+</a>
                </li>
                <li data-type="water">
                    <input data-for="water" id="water" class="clearInput" data-input-value="water" type="text" value="0" />
                    <label for="water">Вода</label>
                    <span data-string-value="water" class="number clearString">0</span>
                    <a data-for="water" data-type="take" href="#" class="minuse">-</a>
                    <a data-for="water" data-type="add" href="#" class="pluse">+</a>
                </li>
                <li data-type="earth">
                    <input data-for="earth" id="earth" class="clearInput" data-input-value="earth" type="text" value="0" />
                    <label for="earth">Земля</label>
                    <span data-string-value="earth" class="number clearString">0</span>
                    <a data-for="earth" data-type="take" href="#" class="minuse">-</a>
                    <a data-for="earth" data-type="add" href="#" class="pluse">+</a>
                </li>
                <li data-type="air">
                    <input data-for="air" id="air" class="clearInput" data-input-value="air" type="text" value="0" />
                    <label for="air">Воздух</label>
                    <span data-string-value="air" class="number clearString">0</span>
                    <a data-for="air" data-type="take" href="#" class="minuse">-</a>
                    <a data-for="air" data-type="add" href="#" class="pluse">+</a>
                </li>
                <li data-type="grey">
                    <input data-for="grey" id="grey" class="clearInput" data-input-value="grey" type="text" value="0" />
                    <label for="grey">Серая</label>
                    <span data-string-value="grey" class="number clearString">0</span>
                    <a data-for="grey" data-type="take" href="#" class="minuse">-</a>
                    <a data-for="grey" data-type="add" href="#" class="pluse">+</a>
                </li>
                <li data-type="light">
                    <input data-for="light" id="light" class="clearInput" data-input-value="light" type="text" value="0" />
                    <label for="light">Свет</label>
                    <span data-string-value="light" class="number clearString">0</span>
                    <a data-for="light" data-type="take" href="#" class="minuse">-</a>
                    <a data-for="light" data-type="add" href="#" class="pluse">+</a>
                </li>
                <li data-type="dark">
                    <input data-for="dark" id="dark" class="clearInput" data-input-value="dark" type="text" value="0" />
                    <label for="dark">Тьма</label>
                    <span data-string-value="dark" class="number clearString">0</span>
                    <a data-for="dark" data-type="take" href="#" class="minuse">-</a>
                    <a data-for="dark" data-type="add" href="#" class="pluse">+</a>
                </li>
            </ul>
        </div>
    </div>

    <div class="white_box_rigth table_mf">
        <ul class="stats_result">
            <li>
                <span class="name">Урон: </span>
                <span data-type="damage" class="clearString" data-string-value="min_damage">0</span>
                -
                <span data-type="damage" class="clearString" data-string-value="max_damage">0</span>
            </li>
        </ul>

        <ul class="stats_result">
            <li>
                <span class="name">Мф. критических ударов: </span>
                <span data-type="mf" data-string-value="critical" class="clearString">0</span>%
            </li>
            <li>
                <span class="name">Мф. против крит. ударов:</span>
                <span data-type="mf" data-string-value="p_critical" class="clearString">0</span>%
            </li>
            <li>
                <span class="name">Мф. увертливости: </span>
                <span data-type="mf" data-string-value="flee" class="clearString">0</span>%
            </li>
            <li>
                <span class="name">Мф. против увертлив.: </span>
                <span data-type="mf" data-string-value="p_flee" class="clearString">0</span>%
            </li>
        </ul>

        <ul class="stats_result">
            <li>
                <span class="name">Усиление урона: </span>
                <span data-type="increased" data-string-value="increased_damage" class="clearString">0</span>%
            </li>
            <li>
                <span class="name">Усиление максимального мф.: </span>
                <span data-type="increased" data-string-value="increased_mf" class="clearString">0</span>%
            </li>
            <li>
                <span class="name">Усиление брони: 	</span>
                <span data-type="increased" data-string-value="increased_armor" class="clearString">0</span>%
            </li>
        </ul>

        <ul class="stats_result">
            <li>
                <span class="name">Уникальный бонус: </span>
                <span data-string-value="unique" class="clearString">0</span><span data-string-value="m_unique" class="clearString"> / 6</span>
                <span class="uniqueImage"></span>
            </li>
            <li>
                &nbsp;
            </li>
            <li>
                <span class="name">Броня головы: </span>
                <span data-type="armor" data-string-value="head" class="clearString">0</span>
            </li>
            <li>
                <span class="name">Броня корпуса: 	</span>
                <span data-type="armor" data-string-value="body" class="clearString">0</span>
            </li>
            <li>
                <span class="name">Броня пояса: </span>
                <span data-type="armor" data-string-value="belt" class="clearString">0</span>
            </li>
            <li>
                <span class="name">Броня ног: 	</span>
                <span data-type="armor" data-string-value="feet" class="clearString">0</span>
            </li>
        </ul>
        <ul class="stats_result">
            <li>
                <span class="name">Бонус опыта: </span>
                <span data-string-value="exp">0</span>%
            </li>
        </ul>
        <ul class="stats_result">
            <li>
                <span class="name">Вес предметов: </span>
                <span data-string-value="weight" class="clearString">0 / 24</span>
            </li>
        </ul>
        <ul class="stats_result">
            <li>
                <span class="name">Стоимость предметов:  </span>
                <span data-string-value="price" class="clearString">0</span> кр.,
                <span data-string-value="price_ekr" class="clearString">0</span> екр. и
                <span data-string-value="price_reputation" class="clearString">0</span> реп.
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
        <ul>
            <li id="cop">
                Copyright &copy; <?php echo date('Y'); ?> by <a href="http://oldbrigada.ru/">Бригада</a>.<br/>
                All Rights Reserved.<br/>
                <?php //echo Yii::powered(); ?><br>
                Создал СпокоенКакЛед <a href="skype:quietasice?chat">skype <img src="<?php echo Yii::app()->theme->baseUrl ?>/images/skype_7461.png"></a>
            </li>
        </ul>
    </div>
</div>
<div class="white_box" id="result" style="display: none;">
    <div class="white_box_rigth" style="width: 200px;">
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
<div id="message_box">
    <a class="closeW" title="Закрыть" href="#close">
        <span id="img"></span>
    </a>
    <div id="title">
        Заголовок
    </div>
    <div id="hr"></div>
    <div id="body">
ацуаца
    </div>
</div>
<div id="fuzz">
    <div class="msgbox">
        Загружаем вещи...
        <span class="img"></span>
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