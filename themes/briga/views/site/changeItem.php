<?php
/**
 * Created by PhpStorm.
 * User: Николай
 * Date: 09.05.14
 * Time: 0:38
 *
 * @var Item $Item
 * @var ObkItems $model
 * @var integer $rune_level
 */ ?>
<style>
    table td {
        height: 18px;
    }
</style>
<div class="changeItem">
    <div class="left">
        <?php if($Item->isRune()): ?>
            <fieldset class="well" id="block_rune_ap">
                <legend>АП</legend>
                <?php for ($i = 1; $i <= $rune_level; $i++): ?>
                    <div id="apRune_<?php echo $i; ?>" class="apRuneImage unselect" data-level="<?php echo $i; ?>"></div>
                <?php endfor; ?>
            </fieldset>
        <?php endif; ?>
        <?php if($Item->is_art || $Item->create_art): ?>
            <fieldset class="well" id="block_art">
                <legend>Настройки арта</legend>
                <div class="hp">
                    <label for="art_hp">Добавить ХП</label>
                    <span class="add add_art_hp" style="margin-left:2px;"></span>
                    <span class="take take_art_hp" style="margin-left:2px;"></span>
                </div>
                <div id="usil_art" class="usil" style="text-align:left;">
                    <div>
                        <input type="radio" name="usil" value="1" id="usil_0">
                        <label for="usil_0">+ 10% брони</label>
                    </div>
                    <div>
                        <input type="radio" name="usil" value="2" id="usil_1">
                        <label for="usil_1">+5% к макс МФ</label>
                    </div>
                    <div>
                        <input type="radio" name="usil" value="3" id="usil_2">
                        <label for="usil_2">+3% к макс МФ и 1% к урону</label>
                    </div>
                </div>
            </fieldset>
        <?php endif; ?>
        <?php if($Item->can_mf): ?>
            <fieldset class="well" id="block_mf">
                <legend>Модификация</legend>
                <div class="hp">
                    <label for="mf_hp">Добавить ХП</label>
                    <input data-type="hp" id="mf_hp" min="0" max="20" type="number" name="mf_hp" value="0">
                </div>
                <div class="stat">
                    <label for="mf_stat">Добавить Статы</label>
                    <input data-type="stats" id="mf_stat" min="0" max="3" type="number" name="mf_stat" value="0">
                </div>
                <div class="bron">
                    <label for="mf_armor">Добавить Бронь</label>
                    <input data-type="armor" id="mf_armor" min="0" max="3" type="number" name="mf_armor" value="0">
                </div>
            </fieldset>
        <?php endif; ?>
        <?php if($Item->dataType == 'knife' || $Item->dataType == 'sword' || $Item->dataType == 'ax' || $Item->dataType == 'baton'): ?>
            <fieldset class="well" id="block_sharpen">
                <legend>Заточка</legend>
                <div id="sharpen_<?php echo $Item->dataType; ?>_1" data-type="sharpen" class="sharpenImage unselect" data-value="1"></div>
                <div id="sharpen_<?php echo $Item->dataType; ?>_2" data-type="sharpen" class="sharpenImage unselect" data-value="2"></div>
                <div id="sharpen_<?php echo $Item->dataType; ?>_3" data-type="sharpen" class="sharpenImage unselect" data-value="3"></div>
                <div id="sharpen_<?php echo $Item->dataType; ?>_4" data-type="sharpen" class="sharpenImage unselect" data-value="4"></div>
                <div id="sharpen_<?php echo $Item->dataType; ?>_5" data-type="sharpen" class="sharpenImage unselect" data-value="5"></div>
                <div id="sharpen_<?php echo $Item->dataType; ?>_6" data-type="sharpen" class="sharpenImage unselect" data-value="6"></div>
                <div id="sharpen_<?php echo $Item->dataType; ?>_7" data-type="sharpen" class="sharpenImage unselect" data-value="7"></div>
            </fieldset>
        <?php endif; ?>
        <?php if($Item->can_ap && !$Item->isRune()): ?>
            <fieldset class="well" id="block_ap">
                <legend>АП</legend>
                <div id="ap_7" data-type="ap" data-level="7" data-value="1" class="apImage unselect"></div>
                <div id="ap_8" data-type="ap" data-level="8" data-value="2" class="apImage unselect"></div>
                <div id="ap_9" data-type="ap" data-level="9" data-value="3" class="apImage unselect"></div>
                <div id="ap_10" data-type="ap" data-level="10" data-value="4" class="apImage unselect"></div>
                <div id="ap_11" data-type="ap" data-level="11" data-value="5" class="apImage unselect"></div>
                <div id="ap_12" data-type="ap" data-level="12" data-value="6" class="apImage unselect"></div>
            </fieldset>
        <?php endif; ?>
        <?php if($Item->chooseProkat == true): ?>
            <fieldset class="well" id="block_prokat">
                <legend>Уровень прокат</legend>
                <?php $i = 0; foreach($Item->prokat_info as $level => $value): $i++; if(!$value) continue; ?>
                    <div id="ap_<?php echo $level ?>" data-type="prokat" data-value="<?php echo $i; ?>" data-level="<?php echo $level ?>" class="apImage unselect"></div>
                <?php endforeach; ?>
            </fieldset>
        <?php endif; ?>
        <?php if($Item->can_podgon): ?>
            <fieldset class="well" id="block_podgon">
                <legend>Подгон</legend>
                <div id="podgon_<?php echo $Item->dataType; ?>_1" data-type="podgon" data-value="1" class="podgonImage unselect"></div>
                <div id="podgon_<?php echo $Item->dataType; ?>_2" data-type="podgon" data-value="2" class="podgonImage unselect"></div>
                <div id="podgon_<?php echo $Item->dataType; ?>_3" data-type="podgon" data-value="3" class="podgonImage unselect"></div>
                <div id="podgon_<?php echo $Item->dataType; ?>_4" data-type="podgon" data-value="4" class="podgonImage unselect"></div>
                <div id="podgon_<?php echo $Item->dataType; ?>_5" data-type="podgon" data-value="5" class="podgonImage unselect"></div>
            </fieldset>
        <?php endif; ?>
        <?php if($Item->can_mf): ?>
            <fieldset class="well" id="block_autoset">
                <legend>Автораспределение</legend>
                <ul>
                    <li>
                        <a href="#" data-type="top_unique">Топ уник</a> | <a href="#" data-type="top">Топ</a>
                    </li>
                </ul>
            </fieldset>
        <?php endif; ?>
    </div>
    <div class="right" id="item_info">
        <fieldset class="well item">
            <legend>Предмет</legend>
            <table style="width: 100%;">
                <tr>
                    <td><?php echo $Item->name; ?></td>
                    <td rowspan="4"><img src="<?php echo $Item->img; ?>"></td>
                </tr>
                <tr>
                    <td>
                        <span class="mlabel">Цена: </span>
                        <span class="value" data-type="price">
                            <?php echo $Item->price_reputation > 0 ? $Item->price_reputation.' реп.' : $Item->price.' кр.'; ?>
                        </span>
                    </td>
                </tr>
                <tr><td><div style="width: 300px; border-bottom: 1px solid #e5e5e5;"></div></td></tr>
                <tr>
                    <td>Требуется минимальное:</td>
                </tr>
                <?php
                foreach (get_object_vars($Item->params_need) as $nameObj => $valueObj) {
                    foreach (get_object_vars($Item->params_need->{$nameObj}) as $name => $value) {
                        if($value <= 0) continue; ?>
                        <tr>
                            <td>
                                <span class="mlabel">• <?php echo $model->getAttributeLabel($name) ?>: </span>
                                <span class="value" data-need="true" data-type="<?php echo $name; ?>"><?php echo $value; ?></span>
                            </td>
                        </tr>
                    <?php }
                }?>
                <tr><td><div style="width: 300px; border-bottom: 1px solid #e5e5e5;"></div></td></tr>
                <tr>
                    <td>Действует на:</td>
                </tr>
                <?php foreach (get_object_vars($Item->params_give->damage) as $name => $value): ?>
                    <?php $style = ''; if($value == 0 && !$Item->create_art || $value == '') $style = 'display:none;'; ?>
                    <tr class="damage" style="<?php echo $style; ?>">
                        <td>
                            <span class="mlabel">• <?php echo $model->getAttributeLabel($name) ?>: </span>
                            <span class="value" data-give="true" data-type="<?php echo $name; ?>"><?php echo $value; ?></span>
                        </td>
                    </tr>
                <?php endforeach; ?>
                <tr>
                    <td colspan="2">
                        <span class="mlabel">• Уровень жизни: </span>
                        <span class="value" data-give="true" data-type="hp_original"><?php echo $Item->params_give->other->hp; ?></span>
                        <span style="color:#708090;">
                            <span data-give="true" data-type="hp_original"><?php echo $Item->params_give->other->hp; ?></span> +
                            <span data-give="true" data-type="hp_mf">0</span>(МФ) +
                            <span data-give="true" data-type="hp_ap">0</span>(АПЫ) +
                            <span data-give="true" data-type="hp_art">0</span>(АРТ)
                        </span>
                    </td>
                </tr>
                <tr id="free-set-stats">
                    <td style="color:green;">
                        Доступно для распределения: <span data-type="free-stats">0</span>
                    </td>
                </tr>
                <?php foreach (get_object_vars($Item->params_give->stats) as $name => $value): ?>
                    <?php $style = ''; if($value == 0 && !$Item->create_art || $value == '') $style = 'display:none;'; ?>
                    <tr class="stats" data-type="stats" style="<?php echo $style; ?>">
                        <td>
                            <span class="mlabel">• <?php echo $model->getAttributeLabel($name) ?>: </span>
                            <span class="value" data-give="true" data-type="<?php echo $name; ?>"><?php echo $value; ?></span>
                            <span class="take" data-for="<?php echo $name; ?>"></span>
                            <span class="add" data-for="<?php echo $name; ?>"></span>
                            <span class="addPP" data-for="<?php echo $name; ?>"></span>
                        </td>
                    </tr>
                <?php endforeach; ?>
                <tr id="free-set-mf">
                    <td style="color:green;">
                        Доступно для распределения: <span data-type="free-mf">0</span> мф
                    </td>
                </tr>
                <?php foreach (get_object_vars($Item->params_give->mf) as $name => $value): ?>
                    <?php if($value == 0 && !$Item->create_art) continue; ?>
                    <tr class="mf" data-type="mf">
                        <td>
                            <span class="mlabel">• <?php echo $model->getAttributeLabel($name) ?>: </span>
                            <span class="value" data-give="true" data-type="<?php echo $name; ?>" data-string="true"><?php echo $value; ?></span>% +
                            <input type="number" data-give="true" class="min mfNew" data-type="<?php echo $name ?>" data-input="true" value="0">%
                            <span class="addPP" data-for="<?php echo $name; ?>"></span>
                        </td>
                    </tr>
                <?php endforeach; ?>
                <?php foreach (get_object_vars($Item->params_give->possession) as $name => $value): ?>
                    <?php $style = ''; if($value == 0 && !$Item->create_art || $value == '') $style = 'display:none;'; ?>
                    <tr class="possession" style="<?php echo $style; ?>">
                        <td>
                            <span class="mlabel">• <?php echo $model->getAttributeLabel($name) ?>: </span>
                            <span class="value" data-give="true" data-type="<?php echo $name; ?>"><?php echo $value; ?></span>
                        </td>
                    </tr>
                <?php endforeach; ?>
                <?php foreach (get_object_vars($Item->params_give->possession_m) as $name => $value): ?>
                    <?php $style = ''; if($value == 0 && !$Item->create_art || $value == '') $style = 'display:none;'; ?>
                    <tr class="possession_m" style="<?php echo $style; ?>">
                        <td>
                            <span class="mlabel">• <?php echo $model->getAttributeLabel($name) ?>: </span>
                            <span class="value" data-give="true" data-type="<?php echo $name; ?>"><?php echo $value; ?></span>
                        </td>
                    </tr>
                <?php endforeach; ?>
                <?php foreach (get_object_vars($Item->params_give->armor) as $name => $value): ?>
                    <?php $style = ''; if($value == 0 && !$Item->create_art || $value == '') $style = 'display:none;'; ?>
                    <tr class="armor" style="<?php echo $style; ?>">
                        <td>
                            <span class="mlabel">• <?php echo $model->getAttributeLabel($name) ?>: </span>
                            <span class="value" data-give="true" data-type="<?php echo $name; ?>"><?php echo $value; ?></span>
                        </td>
                    </tr>
                <?php endforeach; ?>
                <?php foreach (get_object_vars($Item->params_give->increased) as $name => $value): ?>
                    <tr class="increased">
                        <td>
                            <span class="mlabel">• <?php echo $model->getAttributeLabel($name) ?>: </span>
                            <span class="value" data-give="true" data-type="<?php echo $name; ?>"><?php echo $value; ?></span> %
                        </td>
                    </tr>
                <?php endforeach; ?>
                <tr id="is_unique" style="display: none;">
                    <td style="color: red;font-weight: bold;">
                        Вещь имеет уникальные характеристики.
                    </td>
                </tr>
            </table>
        </fieldset>
    </div>
</div>
<div class="" style="height: 27px;"></div>
<div class="buttons" style="text-align: center;position: fixed;width: 760px;background-color: white;height: 35px;margin-top: -33px;">
    <a href="#" class="btn_popup" id="saveBtn" style="font-size: 11px;">Сохранить</a>
</div>