<?php

Yii::import('application.models._base.BaseShop');

class Shop extends BaseShop
{
	public static function model($className=__CLASS__) {
		return parent::model($className);
	}
}