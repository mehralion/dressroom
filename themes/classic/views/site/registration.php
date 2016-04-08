<script type="text/javascript">
    $(function () {
        $("#date_of_birth").datepicker({
            firstDay:1,
            dateFormat:'yy-mm-dd',
            changeMonth:true,
            changeYear:true,
            yearRange:'-90:+1',
            onSelect:function (dateText, inst) {
                var t = $.datepicker.parseDate('yy-mm-dd', dateText);
                var date = $.datepicker.formatDate('MM dd yy', t);
                $('#' + inst.id).val(date);
                $('#Users_datebirth').val(dateText);
            }
        });
    });
</script>
<?php /** @var BootActiveForm $form */
$form = $this->beginWidget('bootstrap.widgets.TbActiveForm', array(
    'id' => 'horizontalForm',
    'type' => 'horizontal',
)); ?>

<fieldset>

    <legend><?php echo Yii::t('app', 'Registration'); ?></legend>

    <?php echo $form->textFieldRow($model, 'email'); ?>
    <?php echo $form->textFieldRow($model, 'first_name'); ?>
    <?php echo $form->textFieldRow($model, 'last_name'); ?>
    <?php
    if ($model->datebirth != '')
        $f = date('F d Y', strtotime($model->datebirth));
    else
        $f = '';
    ?>
    <?php echo $form->textFieldRow($model, 'datebirth', array(
    'id' => 'date_of_birth',
    'name' => 'date_of_birth',
    'readonly' => 'readonly',
    'value' => $f,
)); ?>
    <?php echo $form->hiddenField($model, 'datebirth'); ?>
    <?php echo $form->passwordFieldRow($model, 'password'); ?>
    <?php echo $form->passwordFieldRow($model, 'password2'); ?>
    <?php echo $form->textAreaRow($model, 'about', array('class' => 'span8', 'rows' => 5)); ?>

</fieldset>

<div class="form-actions">
    <?php $this->widget('bootstrap.widgets.TbButton', array('buttonType' => 'submit', 'type' => 'primary', 'icon' => 'ok white', 'label' => Yii::t('app', 'Submit'))); ?>
    <?php $this->widget('bootstrap.widgets.TbButton', array('buttonType' => 'reset', 'icon' => 'remove', 'label' => Yii::t('app', 'Reset'))); ?>
</div>

<?php $this->endWidget(); ?>