<?php
/**
 * @var GxActiveForm $form
 * @var RuneLevel $model
 */
?>
<div class="form">


<?php $form = $this->beginWidget('GxActiveForm', array(
	'id' => 'rune-level-form',
	'enableAjaxValidation' => false,
));
?>
<table style="width: 100%;">
    <tr>
        <td>
            <?php echo $form->labelEx($model,'level'); ?>
            <?php echo CHtml::activeDropDownList($model, 'level', RuneLevel::getLevels()); ?>
            <?php echo $form->error($model,'level'); ?>
        </td>
    </tr>
    <tr>
        <td>
            <?php echo $form->labelEx($model,'hp'); ?>
            <?php echo CHtml::activeTextField($model, 'hp'); ?>
            <?php echo $form->error($model,'hp'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'mp'); ?>
            <?php echo CHtml::activeTextField($model, 'mp'); ?>
            <?php echo $form->error($model,'mp'); ?>
        </td>
    </tr>
    <tr>
        <td>
            <?php echo $form->labelEx($model,'stats'); ?>
            <?php echo CHtml::activeTextField($model, 'stats'); ?>
            <?php echo $form->error($model,'stats'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'mf'); ?>
            <?php echo CHtml::activeTextField($model, 'mf'); ?>
            <?php echo $form->error($model,'mf'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'increased'); ?>
            <?php echo CHtml::activeCheckBox($model, 'increased'); ?>
            <?php echo $form->error($model,'increased'); ?>
        </td>
    </tr>
    <tr>
        <td>
            <?php echo $form->labelEx($model,'strange'); ?>
            <?php echo CHtml::activeTextField($model, 'strange'); ?>
            <?php echo $form->error($model,'strange'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'agility'); ?>
            <?php echo CHtml::activeTextField($model, 'agility'); ?>
            <?php echo $form->error($model,'agility'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'intuition'); ?>
            <?php echo CHtml::activeTextField($model, 'intuition'); ?>
            <?php echo $form->error($model,'intuition'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'intellect'); ?>
            <?php echo CHtml::activeTextField($model, 'intellect'); ?>
            <?php echo $form->error($model,'intellect'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'wisdom'); ?>
            <?php echo CHtml::activeTextField($model, 'wisdom'); ?>
            <?php echo $form->error($model,'wisdom'); ?>
        </td>
    </tr>
    <tr>
        <td>
            <?php echo $form->labelEx($model,'armor'); ?>
            <?php echo CHtml::activeTextField($model, 'armor'); ?>
            <?php echo $form->error($model,'armor'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'possession_m'); ?>
            <?php echo CHtml::activeTextField($model, 'possession_m'); ?>
            <?php echo $form->error($model,'possession_m'); ?>
        </td>
    </tr>
    <tr>
        <td>
            <?php echo $form->labelEx($model,'min_damage'); ?>
            <?php echo CHtml::activeTextField($model, 'min_damage'); ?>
            <?php echo $form->error($model,'min_damage'); ?>
        </td>
        <td>
            <?php echo $form->labelEx($model,'max_damage'); ?>
            <?php echo CHtml::activeTextField($model, 'max_damage'); ?>
            <?php echo $form->error($model,'max_damage'); ?>
        </td>
    </tr>
</table>
<?php
echo GxHtml::submitButton(Yii::t('app', 'Сохранить'));
$this->endWidget();
?>
</div><!-- form -->