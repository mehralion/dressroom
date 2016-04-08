<?php

Yii::import('application.models._base.BaseModer');

class Moder extends BaseModer
{
	public static function model($className=__CLASS__) {
		return parent::model($className);
	}

    public function attributeLabels() {
        return array(
            'id' => Yii::t('app', 'ID'),
            'login' => Yii::t('app', 'Логин'),
        );
    }
}