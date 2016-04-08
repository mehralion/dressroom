<div class="form">


<?php $form = $this->beginWidget('GxActiveForm', array(
	'id' => 'obk-items-form',
	'enableAjaxValidation' => false,
));
?>
<style type="text/css">
    input {
        width: 50px;
    }
    .need label {
        width: 210px;
        text-align: right;
    }
    .need .row label, .need input {
         display: inline-block;
    }
    .row {
        margin-left: 0px;
    }
    .block .row {
        display: inline-block;
    }
</style>
    <div class="" style="width: 100%;display: inline-block;">
        <div class="row" style="display: inline-block">
            <?php echo $form->labelEx($model,'category_id'); ?>
            <?php echo CHtml::activeDropDownList($model, 'category_id', GxHtml::listDataEx(Category::model()->findAllAttributes(null, true))); ?>
            <?php echo $form->error($model,'category_id'); ?>
        </div><!-- row -->
        <div class="row" style="display: inline-block">
            <?php echo $form->labelEx($model,'name'); ?>
            <?php echo $form->textField($model, 'name', array('maxlength' => 255)); ?>
            <?php echo $form->error($model,'name'); ?>
        </div><!-- row -->
        <div class="row" style="display: inline-block">
            <?php echo $form->labelEx($model,'repa_cost'); ?>
            <?php echo $form->textField($model, 'repa_cost'); ?>
            <?php echo $form->error($model,'repa_cost'); ?>
        </div><!-- row -->
        <div class="row" style="display: inline-block">
            <?php echo $form->labelEx($model,'cost'); ?>
            <?php echo $form->textField($model, 'cost'); ?>
            <?php echo $form->error($model,'cost'); ?>
        </div><!-- row -->
        <div class="row" style="display: inline-block">
            <?php echo $form->labelEx($model,'nlevel'); ?>
            <?php echo $form->textField($model, 'nlevel'); ?>
            <?php echo $form->error($model,'nlevel'); ?>
        </div><!-- row -->
    </div>
<div class="need">
    <fieldset>
        <legend>Требования:</legend>
        <div class="" style="float:  left;">
            <div class="row">
                <?php echo $form->labelEx($model,'nsila'); ?>
                <?php echo $form->textField($model, 'nsila'); ?>
                <?php echo $form->error($model,'nsila'); ?>
            </div><!-- row -->
            <div class="row">
                <?php echo $form->labelEx($model,'nlovk'); ?>
                <?php echo $form->textField($model, 'nlovk'); ?>
                <?php echo $form->error($model,'nlovk'); ?>
            </div><!-- row -->
            <div class="row">
                <?php echo $form->labelEx($model,'ninta'); ?>
                <?php echo $form->textField($model, 'ninta'); ?>
                <?php echo $form->error($model,'ninta'); ?>
            </div><!-- row -->
            <div class="row">
                <?php echo $form->labelEx($model,'nvinos'); ?>
                <?php echo $form->textField($model, 'nvinos'); ?>
                <?php echo $form->error($model,'nvinos'); ?>
            </div><!-- row -->
        </div>
        <div style="float: left">
            <div class="row">
                <?php echo $form->labelEx($model,'nnoj'); ?>
                <?php echo $form->textField($model, 'nnoj'); ?>
                <?php echo $form->error($model,'nnoj'); ?>
            </div><!-- row -->
            <div class="row">
                <?php echo $form->labelEx($model,'ntopor'); ?>
                <?php echo $form->textField($model, 'ntopor'); ?>
                <?php echo $form->error($model,'ntopor'); ?>
            </div><!-- row -->
            <div class="row">
                <?php echo $form->labelEx($model,'nmech'); ?>
                <?php echo $form->textField($model, 'nmech'); ?>
                <?php echo $form->error($model,'nmech'); ?>
            </div><!-- row -->
            <div class="row">
                <?php echo $form->labelEx($model,'ndubina'); ?>
                <?php echo $form->textField($model, 'ndubina'); ?>
                <?php echo $form->error($model,'ndubina'); ?>
            </div><!-- row -->
            <div class="row">
                <?php echo $form->labelEx($model,'nalign'); ?>
                <?php echo CHtml::activeDropDownList($model, 'category_id', array('6' => 'Свет', '3' => 'Тьма', '1.3' => 'Паладин')); ?>
                <?php echo $form->error($model,'nalign'); ?>
            </div><!-- row -->
        </div>
    </fieldset>
</div>
<div class="need">
    <fieldset>
        <legend>Действует на:</legend>
        <div class="" style="float:left">
            <div class="row">
                <?php echo $form->labelEx($model,'gsila'); ?>
                <?php echo $form->textField($model, 'gsila'); ?>
                <?php echo $form->error($model,'gsila'); ?>
            </div><!-- row -->
            <div class="row">
                <?php echo $form->labelEx($model,'glovk'); ?>
                <?php echo $form->textField($model, 'glovk'); ?>
                <?php echo $form->error($model,'glovk'); ?>
            </div><!-- row -->
            <div class="row">
                <?php echo $form->labelEx($model,'ginta'); ?>
                <?php echo $form->textField($model, 'ginta'); ?>
                <?php echo $form->error($model,'ginta'); ?>
            </div><!-- row -->
            <div class="row">
                <?php echo $form->labelEx($model,'gintel'); ?>
                <?php echo $form->textField($model, 'gintel'); ?>
                <?php echo $form->error($model,'gintel'); ?>
            </div><!-- row -->
            <div class="row">
                <?php echo $form->labelEx($model,'gmudra'); ?>
                <?php echo $form->textField($model, 'gmudra'); ?>
                <?php echo $form->error($model,'gmudra'); ?>
            </div><!-- row -->
        </div>
        <div class="" style="float:left">
            <div class="row">
                <?php echo $form->labelEx($model,'minu'); ?>
                <?php echo $form->textField($model, 'minu'); ?>
                <?php echo $form->error($model,'minu'); ?>
            </div><!-- row -->
            <div class="row">
                <?php echo $form->labelEx($model,'maxu'); ?>
                <?php echo $form->textField($model, 'maxu'); ?>
                <?php echo $form->error($model,'maxu'); ?>
            </div><!-- row -->
            <div class="row">
                <?php echo $form->labelEx($model,'ghp'); ?>
                <?php echo $form->textField($model, 'ghp'); ?>
                <?php echo $form->error($model,'ghp'); ?>
            </div><!-- row -->
        </div>
        <div class="clear"></div>
        <div class="" style="float:left">
            <div class="row">
                <?php echo $form->labelEx($model,'mfkrit'); ?>
                <?php echo $form->textField($model, 'mfkrit'); ?>
                <?php echo $form->error($model,'mfkrit'); ?>
            </div><!-- row -->
            <div class="row">
                <?php echo $form->labelEx($model,'mfakrit'); ?>
                <?php echo $form->textField($model, 'mfakrit'); ?>
                <?php echo $form->error($model,'mfakrit'); ?>
            </div><!-- row -->
            <div class="row">
                <?php echo $form->labelEx($model,'mfuvorot'); ?>
                <?php echo $form->textField($model, 'mfuvorot'); ?>
                <?php echo $form->error($model,'mfuvorot'); ?>
            </div><!-- row -->
            <div class="row">
                <?php echo $form->labelEx($model,'mfauvorot'); ?>
                <?php echo $form->textField($model, 'mfauvorot'); ?>
                <?php echo $form->error($model,'mfauvorot'); ?>
            </div><!-- row -->
        </div>
        <div class="" style="float:left">
            <div class="row">
                <?php echo $form->labelEx($model,'gnoj'); ?>
                <?php echo $form->textField($model, 'gnoj'); ?>
                <?php echo $form->error($model,'gnoj'); ?>
            </div><!-- row -->
            <div class="row">
                <?php echo $form->labelEx($model,'gtopor'); ?>
                <?php echo $form->textField($model, 'gtopor'); ?>
                <?php echo $form->error($model,'gtopor'); ?>
            </div><!-- row -->
            <div class="row">
                <?php echo $form->labelEx($model,'gdubina'); ?>
                <?php echo $form->textField($model, 'gdubina'); ?>
                <?php echo $form->error($model,'gdubina'); ?>
            </div><!-- row -->
            <div class="row">
                <?php echo $form->labelEx($model,'gmech'); ?>
                <?php echo $form->textField($model, 'gmech'); ?>
                <?php echo $form->error($model,'gmech'); ?>
            </div><!-- row -->
        </div>
    </fieldset>
</div>
<div class="need" style="width: 100%;display: inline-block;">
    <div class="row" style="display: inline-block">
        <?php echo $form->labelEx($model,'bron1'); ?>
        <?php echo $form->textField($model, 'bron1'); ?>
        <?php echo $form->error($model,'bron1'); ?>
    </div><!-- row -->
    <div class="row" style="display: inline-block">
        <?php echo $form->labelEx($model,'bron2'); ?>
        <?php echo $form->textField($model, 'bron2'); ?>
        <?php echo $form->error($model,'bron2'); ?>
    </div><!-- row -->
    <div class="row" style="display: inline-block">
        <?php echo $form->labelEx($model,'bron3'); ?>
        <?php echo $form->textField($model, 'bron3'); ?>
        <?php echo $form->error($model,'bron3'); ?>
    </div><!-- row -->
    <div class="row" style="display: inline-block">
        <?php echo $form->labelEx($model,'bron4'); ?>
        <?php echo $form->textField($model, 'bron4'); ?>
        <?php echo $form->error($model,'bron4'); ?>
    </div><!-- row -->
</div>

<div class="need" style="width: 100%;display: inline-block;">
   <div style="float:left;">
		<div class="row">
		<?php echo $form->labelEx($model,'img'); ?>
		<?php echo $form->textField($model, 'img', array('maxlength' => 255)); ?>
		<?php echo $form->error($model,'img'); ?>
		</div><!-- row -->

		<div class="row">
		<?php echo $form->labelEx($model,'massa'); ?>
		<?php echo $form->textField($model, 'massa'); ?>
		<?php echo $form->error($model,'massa'); ?>
		</div><!-- row -->
		<div class="row">
		<?php echo $form->labelEx($model,'freestats'); ?>
		<?php echo $form->textField($model, 'freestats'); ?>
		<?php echo $form->error($model,'freestats'); ?>
		</div><!-- row -->
		<div class="row">
		<?php echo $form->labelEx($model,'freemf'); ?>
		<?php echo $form->textField($model, 'freemf'); ?>
		<?php echo $form->error($model,'freemf'); ?>
		</div><!-- row -->
		<div class="row">
		<?php echo $form->labelEx($model,'usil_uron'); ?>
		<?php echo $form->textField($model, 'usil_uron'); ?>
		<?php echo $form->error($model,'usil_uron'); ?>
		</div><!-- row -->
		<div class="row">
		<?php echo $form->labelEx($model,'usil_bron'); ?>
		<?php echo $form->textField($model, 'usil_bron'); ?>
		<?php echo $form->error($model,'usil_bron'); ?>
		</div><!-- row -->
		<div class="row">
		<?php echo $form->labelEx($model,'usil_max_mf'); ?>
		<?php echo $form->textField($model, 'usil_max_mf'); ?>
		<?php echo $form->error($model,'usil_max_mf'); ?>
		</div><!-- row -->
   </div>
    <div style="float: left;margin-left: 20px;">
		<div class="row">
		<?php echo $form->labelEx($model,'is_art'); ?>
		<?php echo $form->checkBox($model, 'is_art'); ?>
		<?php echo $form->error($model,'is_art'); ?>
		</div><!-- row -->
		<div class="row">
		<?php echo $form->labelEx($model,'can_mf'); ?>
		<?php echo $form->checkBox($model, 'can_mf'); ?>
		<?php echo $form->error($model,'can_mf'); ?>
		</div><!-- row -->
		<div class="row">
		<?php echo $form->labelEx($model,'can_ap'); ?>
		<?php echo $form->checkBox($model, 'can_ap'); ?>
		<?php echo $form->error($model,'can_ap'); ?>
		</div><!-- row -->
		<div class="row">
		<?php echo $form->labelEx($model,'can_podgon'); ?>
		<?php echo $form->checkBox($model, 'can_podgon'); ?>
		<?php echo $form->error($model,'can_podgon'); ?>
		</div><!-- row -->
    </div>
</div>
<?php
echo GxHtml::submitButton(Yii::t('app', 'Сохранить'));
$this->endWidget();
?>
</div><!-- form -->