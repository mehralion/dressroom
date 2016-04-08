<?php /** @var BootActiveForm $form */
$form = $this->beginWidget('bootstrap.widgets.TbActiveForm', array(
    'id' => 'horizontalForm',
    'type' => 'horizontal',
    'htmlOptions' => array('style' => 'width:500px;margin: 0 auto ')
)); ?>

<fieldset>

    <legend><?php echo Yii::t('app', 'Authorization'); ?></legend>

    <?php echo $form->textFieldRow($model, 'email'); ?>
    <?php echo $form->passwordFieldRow($model, 'password'); ?>

</fieldset>

<div class="form-actions">
    <?php $this->widget('bootstrap.widgets.TbButton', array('buttonType' => 'submit', 'type' => 'primary', 'icon' => 'ok white', 'label' => Yii::t('app', 'Submit'))); ?>
</div>

<?php $this->endWidget(); ?>