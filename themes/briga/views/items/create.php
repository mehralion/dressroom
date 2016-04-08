<div class="tab_content">
<h1><?php echo Yii::t('app', 'Добавить вещь'); ?></h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model,
		'buttons' => 'create'));
?>
    </div>

<script>
    $(function(){
        var cat = $('#ObkItems_category_id').val();
        if(cat != 10000) {
            $('#ObkItems_enabled_rune_usil_uron').hide();
            $('#ObkItems_enabled_rune_usil_bron').hide();
            $('#ObkItems_enabled_rune_usil_max_mf').hide();
        } else {
            $('#ObkItems_enabled_rune_usil_uron').show();
            $('#ObkItems_enabled_rune_usil_bron').show();
            $('#ObkItems_enabled_rune_usil_max_mf').show();
        }

        $(document.body).on('change', '#ObkItems_category_id', function(){
            var cat = $(this).val();
            if(cat != 10000) {
                $('#ObkItems_enabled_rune_usil_uron').hide();
                $('#ObkItems_enabled_rune_usil_bron').hide();
                $('#ObkItems_enabled_rune_usil_max_mf').hide();
            } else {
                $('#ObkItems_enabled_rune_usil_uron').show();
                $('#ObkItems_enabled_rune_usil_bron').show();
                $('#ObkItems_enabled_rune_usil_max_mf').show();
            }
        });
    });
</script>