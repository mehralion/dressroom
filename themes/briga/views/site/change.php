<?php
/**
 * Created by PhpStorm.
 * User: Николай
 * Date: 09.05.14
 * Time: 0:38
 *
 * @var Item $Item
 */ ?>

<div class="changeItem">
    <div class="left">
        <fieldset class="well" id="mf">
            <legend>Модификация</legend>
            <div class="hp row">
                <label for="mf_hp">Добавить ХП</label>
                <input id="mf_hp" min="0" max="20" type="number" name="mf_hp" value="0">
            </div>
            <div class="stat row">
                <label for="mf_stat">Добавить Статы</label>
                <input id="mf_stat" min="0" max="3" type="number" name="mf_stat" value="0">
            </div><div class="bron row">
                <label for="mf_bron">Добавить Бронь</label>
                <input id="mf_bron" min="0" max="3" type="number" name="mf_bron" value="0">
            </div>
        </fieldset>
        <fieldset class="well" id="ap">
            <legend>АП</legend>
            <div id="ap_7" class="apImage unselect" data-rel="1"></div>
            <div id="ap_8" class="apImage unselect" data-rel="2"></div>
            <div id="ap_9" class="apImage unselect" data-rel="3"></div>
            <div id="ap_10" class="apImage unselect" data-rel="4"></div>
            <div id="ap_11" class="apImage unselect" data-rel="5"></div>
            <div id="ap_12" class="apImage unselect" data-rel="6"></div>
        </fieldset>
        <fieldset class="well art_settings">
            <legend>Настройки арта</legend>
            <div class="hp row">
                <label for="art_hp">Добавить ХП</label>
                <span id="art_hp">50</span>
                <div class="add add_art_hp" style="margin-left:2px;"></div>
                <div class="take take_art_hp" style="margin-left:2px;"></div>
            </div>
            <div id="usil_art" class="usil row" style="text-align:left;">
                <div>
                        <span class="input">
                            <input type="checkbox" value="0" id="usil_0">
                        </span>
                    <label for="usil_0">+ 10% брони</label>
                </div>
                <div>
                        <span class="input">
                            <input type="checkbox" value="1" id="usil_1">
                        </span>
                    <label for="usil_1">+5% к макс МФ</label>
                </div>
                <div>
                        <span class="input">
                            <input type="checkbox" value="2" id="usil_2">
                        </span>
                    <label for="usil_2">+3% к макс МФ и 1% к урону</label>
                </div>
            </div>
        </fieldset>
        <fieldset class="well" id="podgon">
            <legend>Подгон</legend>
            <div id="podgon_sh_1" class="podgonImage unselect" data-rel="1"></div>
            <div id="podgon_sh_2" class="podgonImage unselect" data-rel="2"></div>
            <div id="podgon_sh_3" class="podgonImage unselect" data-rel="3"></div>
            <div id="podgon_sh_4" class="podgonImage unselect" data-rel="4"></div>
            <div id="podgon_sh_5" class="podgonImage unselect" data-rel="5"></div>
        </fieldset>
        <fieldset class="well" id="auto">
            <legend>Автораспределение</legend>
            <ul>
                <li>
                    <label>Топ уник</label>
                    <input type="radio" class="topValue" value="top_unik">
                </li>
                <li>
                    <label>Топ</label>
                    <input type="radio" class="topValue" value="top">
                </li>
            </ul>
        </fieldset>
    </div>
    <div class="right" id="item_info"></div>
</div>