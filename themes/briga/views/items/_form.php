<?php
/**
 * @var GxActiveForm $form
 */
?>
<div class="form">


<?php $form = $this->beginWidget('GxActiveForm', array(
	'id' => 'obk-items-form',
	'enableAjaxValidation' => false,
    'htmlOptions' => array(
        'enctype'=>'multipart/form-data'
    )
));
?>
<style type="text/css">
    input {
        width: 50px;
    }

    #params label{
        display: inline-block;
        width: 120px;
    }

</style>
<table style="width: 100%;">
    <tr>
        <td colspan="2">
            <?php echo $form->labelEx($model,'category_id'); ?>
            <?php echo CHtml::activeDropDownList($model, 'category_id', GxHtml::listDataEx(Category::model()->findAllAttributes(null, true))); ?>
            <?php echo $form->error($model,'category_id'); ?>
        </td>
        <td colspan="2">
            <?php echo $form->labelEx($model,'name'); ?>
            <?php echo $form->textField($model, 'name', array('maxlength' => 255, 'style' => 'width:300px;')); ?>
            <?php echo $form->error($model,'name'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'need_level'); ?>
            <?php echo $form->textField($model, 'need_level'); ?>
            <?php echo $form->error($model,'need_level'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'img'); ?>
            <?php echo $form->fileField($model, 'img', array('maxlength' => 255, 'style'=>'width:200px;')); ?>
            <?php echo $form->error($model,'img'); ?>
        </td>
    </tr>
    <tr>
        <td>
            <?php echo $form->labelEx($model,'price_reputation'); ?>
            <?php echo $form->textField($model, 'price_reputation'); ?>
            <?php echo $form->error($model,'price_reputation'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'price'); ?>
            <?php echo $form->textField($model, 'price'); ?>
            <?php echo $form->error($model,'price'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'price_ekr'); ?>
            <?php echo $form->textField($model, 'price_ekr'); ?>
            <?php echo $form->error($model,'price_ekr'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'durability'); ?>
            <?php echo $form->textField($model, 'durability'); ?>
            <?php echo $form->error($model,'durability'); ?>
        </td>
    </tr>
</table>
<table style="width: 100%" id="params">
    <tr>
        <td colspan="4" style="text-align: center;font-weight: bold;font-size: 15px;">
            Требования
        </td>
    </tr>
    <tr>
        <td colspan="5"><hr></td>
    </tr>
    <tr>
        <td>
            <?php echo $form->labelEx($model,'need_strange'); ?>
            <?php echo $form->textField($model, 'need_strange'); ?>
            <?php echo $form->error($model,'need_strange'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'need_agility'); ?>
            <?php echo $form->textField($model, 'need_agility'); ?>
            <?php echo $form->error($model,'need_agility'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'need_intuition'); ?>
            <?php echo $form->textField($model, 'need_intuition'); ?>
            <?php echo $form->error($model,'need_intuition'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'need_endurance'); ?>
            <?php echo $form->textField($model, 'need_endurance'); ?>
            <?php echo $form->error($model,'need_endurance'); ?>
        </td>
    </tr>
    <tr>
        <td colspan="5"><hr></td>
    </tr>
    <tr>
        <td>
            <?php echo $form->labelEx($model,'need_knife'); ?>
            <?php echo $form->textField($model, 'need_knife'); ?>
            <?php echo $form->error($model,'need_knife'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'need_ax'); ?>
            <?php echo $form->textField($model, 'need_ax'); ?>
            <?php echo $form->error($model,'need_ax'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'need_sword'); ?>
            <?php echo $form->textField($model, 'need_sword'); ?>
            <?php echo $form->error($model,'need_sword'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'need_baton'); ?>
            <?php echo $form->textField($model, 'need_baton'); ?>
            <?php echo $form->error($model,'need_baton'); ?>
        </td>
    </tr>
    <tr>
        <td colspan="5"><hr></td>
    </tr>
    <tr>
        <td colspan="3">
            <?php echo $form->labelEx($model,'need_align'); ?>
            <?php echo CHtml::activeDropDownList($model, 'need_align', array('0' => 'Не требуется', '6' => 'Свет', '3' => 'Тьма', '2' => 'Нейтрал', '1.5' => 'Паладин')); ?>
            <?php echo $form->error($model,'need_align'); ?>
        </td>
    </tr>
    <tr>
        <td colspan="4" style="text-align: center;font-weight: bold;font-size: 15px;">
            Действует на
        </td>
    </tr>
    <tr>
        <td colspan="5"><hr></td>
    </tr>
    <tr>
        <td>
            <?php echo $form->labelEx($model,'give_strange'); ?>
            <?php echo $form->textField($model, 'give_strange'); ?>
            <?php echo $form->error($model,'give_strange'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'give_agility'); ?>
            <?php echo $form->textField($model, 'give_agility'); ?>
            <?php echo $form->error($model,'give_agility'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'give_intuition'); ?>
            <?php echo $form->textField($model, 'give_intuition'); ?>
            <?php echo $form->error($model,'give_intuition'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'give_intellect'); ?>
            <?php echo $form->textField($model, 'give_intellect'); ?>
            <?php echo $form->error($model,'give_intellect'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'give_wisdom'); ?>
            <?php echo $form->textField($model, 'give_wisdom'); ?>
            <?php echo $form->error($model,'give_wisdom'); ?>
        </td>
    </tr>
    <tr>
        <td colspan="5"><hr></td>
    </tr>
    <tr>
        <td>
            <?php echo $form->labelEx($model,'min_damage'); ?>
            <?php echo $form->textField($model, 'min_damage'); ?>
            <?php echo $form->error($model,'min_damage'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'max_damage'); ?>
            <?php echo $form->textField($model, 'max_damage'); ?>
            <?php echo $form->error($model,'max_damage'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'give_hp'); ?>
            <?php echo $form->textField($model, 'give_hp'); ?>
            <?php echo $form->error($model,'give_hp'); ?>
        </td>
    </tr>
    <tr>
        <td colspan="5"><hr></td>
    </tr>
    <tr>
        <td>
            <?php echo $form->labelEx($model,'mf_critical'); ?>
            <?php echo $form->textField($model, 'mf_critical'); ?>
            <?php echo $form->error($model,'mf_critical'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'mf_p_critical'); ?>
            <?php echo $form->textField($model, 'mf_p_critical'); ?>
            <?php echo $form->error($model,'mf_p_critical'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'mf_flee'); ?>
            <?php echo $form->textField($model, 'mf_flee'); ?>
            <?php echo $form->error($model,'mf_flee'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'mf_p_flee'); ?>
            <?php echo $form->textField($model, 'mf_p_flee'); ?>
            <?php echo $form->error($model,'mf_p_flee'); ?>
        </td>
    </tr>
    <tr>
        <td colspan="5"><hr></td>
    </tr>
    <tr>
        <td>
            <?php echo $form->labelEx($model,'give_knife'); ?>
            <?php echo $form->textField($model, 'give_knife'); ?>
            <?php echo $form->error($model,'give_knife'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'give_ax'); ?>
            <?php echo $form->textField($model, 'give_ax'); ?>
            <?php echo $form->error($model,'give_ax'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'give_baton'); ?>
            <?php echo $form->textField($model, 'give_baton'); ?>
            <?php echo $form->error($model,'give_baton'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'give_sword'); ?>
            <?php echo $form->textField($model, 'give_sword'); ?>
            <?php echo $form->error($model,'give_sword'); ?>
        </td>
    </tr>
    <tr>
        <td colspan="5"><hr></td>
    </tr>
    <tr>
        <td>
            <?php echo $form->labelEx($model,'armor_head'); ?>
            <?php echo $form->textField($model, 'armor_head'); ?>
            <?php echo $form->error($model,'armor_head'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'armor_body'); ?>
            <?php echo $form->textField($model, 'armor_body'); ?>
            <?php echo $form->error($model,'armor_body'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'armor_belt'); ?>
            <?php echo $form->textField($model, 'armor_belt'); ?>
            <?php echo $form->error($model,'armor_belt'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'armor_feet'); ?>
            <?php echo $form->textField($model, 'armor_feet'); ?>
            <?php echo $form->error($model,'armor_feet'); ?>
        </td>
    </tr>
    <tr>
        <td colspan="5"><hr></td>
    </tr>
    <tr>
        <td>
            <?php echo $form->labelEx($model,'exp'); ?>
            <?php echo $form->textField($model, 'exp'); ?>
            <?php echo $form->error($model,'exp'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'weight'); ?>
            <?php echo $form->textField($model, 'weight'); ?>
            <?php echo $form->error($model,'weight'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'free_stats'); ?>
            <?php echo $form->textField($model, 'free_stats'); ?>
            <?php echo $form->error($model,'free_stats'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'free_mf'); ?>
            <?php echo $form->textField($model, 'free_mf'); ?>
            <?php echo $form->error($model,'free_mf'); ?>
        </td>
    </tr>
    <tr>
        <td colspan="5"><hr></td>
    </tr>
    <tr>
        <td>
            <?php echo $form->labelEx($model,'increased_damage'); ?>
            <?php echo $form->textField($model, 'increased_damage'); ?><br>
            <?php echo $form->checkBox($model, 'enabled_rune_increased_damage') ?> (Активировать если для руны)
            <?php echo $form->error($model,'increased_damage'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'increased_armor'); ?>
            <?php echo $form->textField($model, 'increased_armor'); ?><br>
            <?php echo $form->checkBox($model, 'enabled_rune_increased_armor') ?> (Активировать если для руны)
            <?php echo $form->error($model,'increased_armor'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'increased_mf'); ?>
            <?php echo $form->textField($model, 'increased_mf'); ?><br>
            <?php echo $form->checkBox($model, 'enabled_rune_increased_mf') ?> (Активировать если для руны)
            <?php echo $form->error($model,'increased_mf'); ?>
        </td>
    </tr>
    <tr>
        <td colspan="5"><hr></td>
    </tr>
    <tr>
        <td>
            <?php echo $form->checkBox($model, 'is_art'); ?>
            <?php echo $form->labelEx($model,'is_art'); ?>
            <?php echo $form->error($model,'is_art'); ?>
        </td>
        <td>
            <?php echo $form->checkBox($model, 'can_mf'); ?>
            <?php echo $form->labelEx($model,'can_mf'); ?>
            <?php echo $form->error($model,'can_mf'); ?>
        </td>
        <td>
            <?php echo $form->checkBox($model, 'can_ap'); ?>
            <?php echo $form->labelEx($model,'can_ap'); ?>
            <?php echo $form->error($model,'can_ap'); ?>
        </td>
        <td>
            <?php echo $form->checkBox($model, 'can_podgon'); ?>
            <?php echo $form->labelEx($model,'can_podgon'); ?>
            <?php echo $form->error($model,'can_podgon'); ?>
        </td>
    </tr>
    <tr>
        <td colspan="5"><hr></td>
    </tr>
    <tr>
        <td colspan="4" style="text-align: center;font-weight: bold;font-size: 15px;">
            Прокат
        </td>
    </tr>
    <tr>
        <td>
            <?php echo $form->checkBox($model, 'prokat_7'); ?>
            <?php echo $form->labelEx($model,'prokat_7'); ?>
            <?php echo $form->error($model,'prokat_7'); ?>
        </td>
        <td>
            <?php echo $form->checkBox($model, 'prokat_8'); ?>
            <?php echo $form->labelEx($model,'prokat_8'); ?>
            <?php echo $form->error($model,'prokat_8'); ?>
        </td>
        <td>
            <?php echo $form->checkBox($model, 'prokat_9'); ?>
            <?php echo $form->labelEx($model,'prokat_9'); ?>
            <?php echo $form->error($model,'prokat_9'); ?>
        </td>
        <td>
            <?php echo $form->checkBox($model, 'prokat_10'); ?>
            <?php echo $form->labelEx($model,'prokat_10'); ?>
            <?php echo $form->error($model,'prokat_10'); ?>
        </td>
        <td>
            <?php echo $form->checkBox($model, 'prokat_11'); ?>
            <?php echo $form->labelEx($model,'prokat_11'); ?>
            <?php echo $form->error($model,'prokat_11'); ?>
        </td>
        <td>
            <?php echo $form->checkBox($model, 'prokat_12'); ?>
            <?php echo $form->labelEx($model,'prokat_12'); ?>
            <?php echo $form->error($model,'prokat_12'); ?>
        </td>
    </tr>
</table>
<?php
echo GxHtml::submitButton(Yii::t('app', 'Сохранить'));
$this->endWidget();
?>
</div><!-- form -->