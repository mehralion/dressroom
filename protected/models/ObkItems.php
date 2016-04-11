<?php

Yii::import('application.models._base.BaseObkItems');

class ObkItems extends BaseObkItems
{
	public static function model($className=__CLASS__) {
		return parent::model($className);
	}

    public $prokat_7;
    public $prokat_8;
    public $prokat_9;
    public $prokat_10;
    public $prokat_11;
    public $prokat_12;

    public function beforeSave()
    {
        if($this->prokat_7 || $this->prokat_8 || $this->prokat_9 || $this->prokat_10 || $this->prokat_11
            || $this->prokat_12)
            $this->in_prokat = true;

        $this->prokat_level = $this->prokat_7.';'.$this->prokat_8.';'.$this->prokat_9.';'.$this->prokat_10.';'.
            $this->prokat_11.';'.$this->prokat_12.';';

        return parent::beforeSave();
    }

    public function getProkat()
    {

    }

    public function afterFind()
    {
        if(!$this->prokat_level)
            $this->prokat_level = '0;0;0;0;0;0;';

        $array = explode(';', $this->prokat_level);
        $this->prokat_7 = $array[0];
        $this->prokat_8 = $array[1];
        $this->prokat_9 = $array[2];
        $this->prokat_10 = $array[3];
        $this->prokat_11 = $array[4];
        $this->prokat_12 = $array[5];

        return parent::afterFind();
    }

    public function attributeLabels() {
        return array(
            'id' => Yii::t('app', 'ID'),
            'category_id' => Yii::t('app', 'Категория'),
            'name' => Yii::t('app', 'Имя'),
            'price_reputation' => Yii::t('app', 'Цена в репе'),
            'price' => Yii::t('app', 'Цена в кр'),
            'price_ekr' => Yii::t('app', 'Цена в екр'),
            'durability' => Yii::t('app', 'Долговечность'),
            'need_level' => Yii::t('app', 'Требуемый уровень'),
            'need_strange' => Yii::t('app', 'Сила'),
            'need_agility' => Yii::t('app', 'Ловкость'),
            'need_intuition' => Yii::t('app', 'Инта'),
            'need_endurance' => Yii::t('app', 'Вынос'),
            'need_knife' => Yii::t('app', 'Ножи'),
            'need_ax' => Yii::t('app', 'Топоры'),
            'need_sword' => Yii::t('app', 'Мечи'),
            'need_baton' => Yii::t('app', 'Дубины'),
            'need_align' => Yii::t('app', 'Склонность'),
            'min_damage' => Yii::t('app', 'Минимальный урон'),
            'max_damage' => Yii::t('app', 'Максимальный урон'),
            'give_strange' => Yii::t('app', 'Сила'),
            'give_agility' => Yii::t('app', 'Ловкость'),
            'give_intuition' => Yii::t('app', 'Инта'),
            'give_intellect' => Yii::t('app', 'Интеллект'),
            'give_wisdom' => Yii::t('app', 'Мудрость'),
            'give_hp' => Yii::t('app', 'Жизни'),
            'mf_critical' => Yii::t('app', 'МФ. Крит'),
            'mf_p_critical' => Yii::t('app', 'МФ. Антикрит'),
            'mf_flee' => Yii::t('app', 'МФ. Уворот'),
            'mf_p_flee' => Yii::t('app', 'МФ. Противуворота'),
            'give_knife' => Yii::t('app', 'Ножи'),
            'give_ax' => Yii::t('app', 'Топоры'),
            'give_baton' => Yii::t('app', 'Дубины'),
            'give_sword' => Yii::t('app', 'Мечи'),
            'img' => Yii::t('app', 'Картинка'),
            'armor_head' => Yii::t('app', 'Броня головы'),
            'armor_body' => Yii::t('app', 'Броня корпуса'),
            'armor_belt' => Yii::t('app', 'Броня паха'),
            'armor_feet' => Yii::t('app', 'Броня ног'),
            'weight' => Yii::t('app', 'Масса'),
            'free_stats' => Yii::t('app', 'Свободные статы'),
            'free_mf' => Yii::t('app', 'Свободные МФ'),
            'increased_damage' => Yii::t('app', 'Усиление урона'),
            'increased_armor' => Yii::t('app', 'Усиление брони'),
            'increased_mf' => Yii::t('app', 'Усиление макс. МФ'),
            'is_art' => Yii::t('app', 'Арт'),
            'can_mf' => Yii::t('app', 'Возможность модификации'),
            'can_ap' => Yii::t('app', 'Возможность апа'),
            'can_podgon' => Yii::t('app', 'Возможность подгона'),
            'can_rep' => Yii::t('app', 'Возможность ремонта'),
            'level' => Yii::t('app', 'Уровень'),
            'strange' => Yii::t('app', 'Сила'),
            'agility' => Yii::t('app', 'Ловкость'),
            'intuition' => Yii::t('app', 'Интуиция'),
            'endurance' => Yii::t('app', 'Выносливость'),
            'intellect' => Yii::t('app', 'Интеллект'),
            'wisdom' => Yii::t('app', 'Мудрость'),
            'knife' => Yii::t('app', 'Владение Ножами'),
            'ax' => Yii::t('app', 'Владение Топорами'),
            'sword' => Yii::t('app', 'Владение Мечами'),
            'baton' => Yii::t('app', 'Владение Дубинами'),
            'fire' => Yii::t('app', 'Магия огня'),
            'water' => Yii::t('app', 'Магия воды'),
            'earth' => Yii::t('app', 'Магия земли'),
            'air' => Yii::t('app', 'Магия воздуха'),
            'grey' => Yii::t('app', 'Магия серая'),
            'light' => Yii::t('app', 'Магия света'),
            'dark' => Yii::t('app', 'Магия тьма'),
            'critical' => Yii::t('app', 'Критический удар'),
            'p_critical' => Yii::t('app', 'Против крита'),
            'flee' => Yii::t('app', 'Уворот'),
            'p_flee' => Yii::t('app', 'Против уворота'),
            'head' => Yii::t('app', 'Броня головы'),
            'body' => Yii::t('app', 'Броня корпуса'),
            'belt' => Yii::t('app', 'Броня пояса'),
            'feet' => Yii::t('app', 'Броня ног'),
            'damage' => Yii::t('app', 'Усиление урона'),
            'armor' => Yii::t('app', 'Усиление брони'),
            'mf' => Yii::t('app', 'Усиление макс. МФ'),
            'prokat_7' => Yii::t('app', 'Прокат [7]'),
            'prokat_8' => Yii::t('app', 'Прокат [8]'),
            'prokat_9' => Yii::t('app', 'Прокат [9]'),
            'prokat_10' => Yii::t('app', 'Прокат [10]'),
            'prokat_11' => Yii::t('app', 'Прокат [11]'),
            'prokat_12' => Yii::t('app', 'Прокат [12]'),
            'need_fire' => Yii::t('app', 'Магия огня'),
            'need_water' => Yii::t('app', 'Магия воды'),
            'need_air' => Yii::t('app', 'Магия воздуха'),
            'need_earth' => Yii::t('app', 'Магия земли'),
            'need_light' => Yii::t('app', 'Магия света'),
            'need_gray' => Yii::t('app', 'Серая магия'),
            'need_dark' => Yii::t('app', 'Магия тьмы'),
            'give_fire' => Yii::t('app', 'Магия огня'),
            'give_water' => Yii::t('app', 'Магия воды'),
            'give_air' => Yii::t('app', 'Магия воздуха'),
            'give_earth' => Yii::t('app', 'Магия земли'),
            'give_light' => Yii::t('app', 'Магия света'),
            'give_gray' => Yii::t('app', 'Серая магия'),
            'give_dark' => Yii::t('app', 'Магия тьмы'),
            'rareitem' => Yii::t('app', 'Тип предмета'),
        );
    }

    public function search() {
        $criteria = new CDbCriteria;

        $criteria->compare('id', $this->id);
        $criteria->compare('category_id', $this->category_id);
        $criteria->compare('name', $this->name, true);
        $criteria->compare('price_reputation', $this->price_reputation);
        $criteria->compare('price', $this->price);
        $criteria->compare('need_level', $this->need_level);
        $criteria->compare('need_strange', $this->need_strange);
        $criteria->compare('need_agility', $this->need_agility);
        $criteria->compare('need_intuition', $this->need_intuition);
        $criteria->compare('need_endurance', $this->need_endurance);
        $criteria->compare('need_knife', $this->need_knife);
        $criteria->compare('need_ax', $this->need_ax);
        $criteria->compare('need_sword', $this->need_sword);
        $criteria->compare('need_baton', $this->need_baton);
        $criteria->compare('need_align', $this->need_align, true);
        $criteria->compare('min_damage', $this->min_damage);
        $criteria->compare('max_damage', $this->max_damage);
        $criteria->compare('give_strange', $this->give_strange);
        $criteria->compare('give_agility', $this->give_agility);
        $criteria->compare('give_intuition', $this->give_intuition);
        $criteria->compare('give_intellect', $this->give_intellect);
        $criteria->compare('give_wisdom', $this->give_wisdom);
        $criteria->compare('give_hp', $this->give_hp);
        $criteria->compare('mf_critical', $this->mf_critical);
        $criteria->compare('mf_p_critical', $this->mf_p_critical);
        $criteria->compare('mf_flee', $this->mf_flee);
        $criteria->compare('mf_p_flee', $this->mf_p_flee);
        $criteria->compare('give_knife', $this->give_knife);
        $criteria->compare('give_ax', $this->give_ax);
        $criteria->compare('give_baton', $this->give_baton);
        $criteria->compare('give_sword', $this->give_sword);
        $criteria->compare('img', $this->img, true);
        $criteria->compare('armor_head', $this->armor_head);
        $criteria->compare('armor_body', $this->armor_body);
        $criteria->compare('armor_belt', $this->armor_belt);
        $criteria->compare('armor_feet', $this->armor_feet);
        $criteria->compare('weight', $this->weight);
        $criteria->compare('free_stats', $this->free_stats);
        $criteria->compare('free_mf', $this->free_mf);
        $criteria->compare('increased_damage', $this->increased_damage);
        $criteria->compare('increased_armor', $this->increased_armor);
        $criteria->compare('increased_mf', $this->increased_mf);
        $criteria->compare('is_art', $this->is_art);
        $criteria->compare('can_mf', $this->can_mf);
        $criteria->compare('can_ap', $this->can_ap);
        $criteria->compare('can_podgon', $this->can_podgon);

        return new CActiveDataProvider($this, array(
            'criteria' => $criteria,
            'pagination' => array(
                'pageSize' => 50
            )
        ));
    }

    public function rules() {
        return array(
            array('need_fire, need_water, need_air, need_earth, need_light, need_gray, need_dark', 'numerical', 'integerOnly'=>true),
            array('give_fire, give_water, give_air, give_earth, give_light, give_gray, give_dark', 'numerical', 'integerOnly'=>true),
            array('rareitem, can_rep', 'numerical', 'integerOnly'=>true),
            array('prokat_7, prokat_8, prokat_9, prokat_10, prokat_11, prokat_12, prokat_level', 'safe'),
            //array('category_id, name, price_reputation, price, need_level, need_strange, need_agility, need_intuition, need_endurance, need_knife, need_ax, need_sword, need_baton, need_align, min_damage, max_damage, give_strange, give_agility, give_intuition, give_intellect, give_wisdom, give_hp, mf_critical, mf_p_critical, mf_flee, mf_p_flee, give_knife, give_ax, give_baton, give_sword, img, armor_head, armor_body, armor_belt, armor_feet, weight, increased_damage, increased_armor, increased_mf', 'required'),
            array('category_id, price_ekr, durability, price_reputation, need_level, need_strange, need_agility, need_intuition, need_endurance, need_knife, need_ax, need_sword, need_baton, min_damage, max_damage, give_strange, give_agility, give_intuition, give_intellect, give_wisdom, give_hp, mf_critical, mf_p_critical, mf_flee, mf_p_flee, give_knife, give_ax, give_baton, give_sword, armor_head, armor_body, armor_belt, armor_feet, weight, free_stats, free_mf, increased_damage, increased_armor, increased_mf, is_art, can_mf, can_ap, can_podgon, enabled_rune_increased_damage, enabled_rune_increased_armor, enabled_rune_increased_mf', 'numerical', 'integerOnly'=>true),
            array('price', 'numerical'),
            array('name, need_align, img', 'length', 'max'=>255),
            array('free_stats, free_mf, is_art, can_mf, can_ap, can_podgon', 'default', 'setOnEmpty' => true, 'value' => null),
            array('id, category_id, name, price_reputation, price, need_level, need_strange, need_agility, need_intuition, need_endurance, need_knife, need_ax, need_sword, need_baton, need_align, min_damage, max_damage, give_strange, give_agility, give_intuition, give_intellect, give_wisdom, give_hp, mf_critical, mf_p_critical, mf_flee, mf_p_flee, give_knife, give_ax, give_baton, give_sword, img, armor_head, armor_body, armor_belt, armor_feet, weight, free_stats, free_mf, increased_damage, increased_armor, increased_mf, is_art, can_mf, can_ap, can_podgon', 'safe'),
        );
    }

    const RARE_RARE         = 1;
    const RARE_GREAT        = 2;
    const RARE_LEGENDARY    = 3;
    const RARE_EPIC         = 4;
    private static $rare_labels = array(
        self::RARE_RARE         => 'Редкий',
        self::RARE_GREAT        => 'Великий',
        self::RARE_LEGENDARY    => 'Легендарный',
        self::RARE_EPIC         => 'Эпичный',
    );

    public static function getRareList()
    {
        return self::$rare_labels;
    }
}