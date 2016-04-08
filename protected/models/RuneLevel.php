<?php

/**
 * This is the model class for table "rune_level".
 *
 * The followings are the available columns in table 'rune_level':
 * @property integer $id
 * @property integer $level
 * @property integer $stats
 * @property integer $mf
 * @property integer $hp
 * @property integer $mp
 * @property integer $armor
 * @property integer $strange
 * @property integer $agility
 * @property integer $intuition
 * @property integer $intellect
 * @property integer $wisdom
 * @property integer $increased
 * @property integer $min_damage
 * @property integer $max_damage
 * @property integer $possession_m
 */
class RuneLevel extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'rune_level';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('id, level, stats, mf, hp, mp, armor, strange, agility, intuition, intellect, wisdom, increased, min_damage, max_damage, possession_m', 'numerical', 'integerOnly'=>true),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, level, stats, mf, hp, mp, armor, strange, agility, intuition, intellect, wisdom, increased, min_damage, max_damage, possession_m', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'level' => 'Уровень',
			'stats' => 'Свободные статы',
			'mf' => 'Свободные МФ (%)',
			'hp' => 'Уровень жизней',
			'mp' => 'Уровень маны',
			'armor' => 'Ко всей броне',
			'strange' => 'Сила',
			'agility' => 'Ловкость',
			'intuition' => 'Интуиция',
			'intellect' => 'Интеллект',
			'wisdom' => 'Мудрость',
			'increased' => 'Усиление',
			'min_damage' => 'Минимальный урон',
			'max_damage' => 'Максимальный урон',
			'possession_m' => 'Ко всей магии стихий',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('level',$this->level);
		$criteria->compare('stats',$this->stats);
		$criteria->compare('mf',$this->mf);
		$criteria->compare('hp',$this->hp);
		$criteria->compare('mp',$this->mp);
		$criteria->compare('armor',$this->armor);
		$criteria->compare('strange',$this->strange);
		$criteria->compare('agility',$this->agility);
		$criteria->compare('intuition',$this->intuition);
		$criteria->compare('intellect',$this->intellect);
		$criteria->compare('wisdom',$this->wisdom);
		$criteria->compare('increased',$this->increased);
		$criteria->compare('min_damage',$this->min_damage);
		$criteria->compare('max_damage',$this->max_damage);
		$criteria->compare('possession_m',$this->possession_m);
        $criteria->order = 'level asc';

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return RuneLevel the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

    public function getInfo()
    {
        $string = '';
        foreach ($this->attributes as $name => $value) {
            if($name == 'id' || $name == 'level' || $value == 0)
                continue;

            if($name == 'increased')
                $value = str_replace(array(0, 1), array('Вык', 'Вкл'), $value);

            $string .= $this->getAttributeLabel($name).': '.$value.'<br>';
        }

        return $string;
    }

    public static function getLevels()
    {
        $levels = array();
        for($i = 1; $i <= 100; $i++)
            $levels[$i] = 'Уровень '.$i;

        return $levels;
    }
}
