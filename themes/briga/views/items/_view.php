<div class="view">

	<?php echo GxHtml::encode($data->getAttributeLabel('id')); ?>:
	<?php echo GxHtml::link(GxHtml::encode($data->id), array('view', 'id' => $data->id)); ?>
	<br />

	<?php echo GxHtml::encode($data->getAttributeLabel('category_id')); ?>:
	<?php echo GxHtml::encode($data->category_id); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('name')); ?>:
	<?php echo GxHtml::encode($data->name); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('repa_cost')); ?>:
	<?php echo GxHtml::encode($data->repa_cost); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('cost')); ?>:
	<?php echo GxHtml::encode($data->cost); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('nlevel')); ?>:
	<?php echo GxHtml::encode($data->nlevel); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('nsila')); ?>:
	<?php echo GxHtml::encode($data->nsila); ?>
	<br />
	<?php /*
	<?php echo GxHtml::encode($data->getAttributeLabel('nlovk')); ?>:
	<?php echo GxHtml::encode($data->nlovk); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('ninta')); ?>:
	<?php echo GxHtml::encode($data->ninta); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('nvinos')); ?>:
	<?php echo GxHtml::encode($data->nvinos); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('nnoj')); ?>:
	<?php echo GxHtml::encode($data->nnoj); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('ntopor')); ?>:
	<?php echo GxHtml::encode($data->ntopor); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('nmech')); ?>:
	<?php echo GxHtml::encode($data->nmech); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('ndubina')); ?>:
	<?php echo GxHtml::encode($data->ndubina); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('nalign')); ?>:
	<?php echo GxHtml::encode($data->nalign); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('minu')); ?>:
	<?php echo GxHtml::encode($data->minu); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('maxu')); ?>:
	<?php echo GxHtml::encode($data->maxu); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('gsila')); ?>:
	<?php echo GxHtml::encode($data->gsila); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('glovk')); ?>:
	<?php echo GxHtml::encode($data->glovk); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('ginta')); ?>:
	<?php echo GxHtml::encode($data->ginta); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('gintel')); ?>:
	<?php echo GxHtml::encode($data->gintel); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('gmudra')); ?>:
	<?php echo GxHtml::encode($data->gmudra); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('ghp')); ?>:
	<?php echo GxHtml::encode($data->ghp); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('mfkrit')); ?>:
	<?php echo GxHtml::encode($data->mfkrit); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('mfakrit')); ?>:
	<?php echo GxHtml::encode($data->mfakrit); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('mfuvorot')); ?>:
	<?php echo GxHtml::encode($data->mfuvorot); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('mfauvorot')); ?>:
	<?php echo GxHtml::encode($data->mfauvorot); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('gnoj')); ?>:
	<?php echo GxHtml::encode($data->gnoj); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('gtopor')); ?>:
	<?php echo GxHtml::encode($data->gtopor); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('gdubina')); ?>:
	<?php echo GxHtml::encode($data->gdubina); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('gmech')); ?>:
	<?php echo GxHtml::encode($data->gmech); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('img')); ?>:
	<?php echo GxHtml::encode($data->img); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('bron1')); ?>:
	<?php echo GxHtml::encode($data->bron1); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('bron2')); ?>:
	<?php echo GxHtml::encode($data->bron2); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('bron3')); ?>:
	<?php echo GxHtml::encode($data->bron3); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('bron4')); ?>:
	<?php echo GxHtml::encode($data->bron4); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('massa')); ?>:
	<?php echo GxHtml::encode($data->massa); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('freestats')); ?>:
	<?php echo GxHtml::encode($data->freestats); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('freemf')); ?>:
	<?php echo GxHtml::encode($data->freemf); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('usil_uron')); ?>:
	<?php echo GxHtml::encode($data->usil_uron); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('usil_bron')); ?>:
	<?php echo GxHtml::encode($data->usil_bron); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('usil_max_mf')); ?>:
	<?php echo GxHtml::encode($data->usil_max_mf); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('is_art')); ?>:
	<?php echo GxHtml::encode($data->is_art); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('can_mf')); ?>:
	<?php echo GxHtml::encode($data->can_mf); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('can_ap')); ?>:
	<?php echo GxHtml::encode($data->can_ap); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('can_podgon')); ?>:
	<?php echo GxHtml::encode($data->can_podgon); ?>
	<br />
	*/ ?>

</div>