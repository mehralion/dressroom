<?php

class ApiController extends Controller
{

    /** @var array Раздел => Тип */
    private $_oldBkCategoriesAndTypes = array(
        1   => 3,  //Оружие:кастеты,ножи
        2   => 11, //Сапоги
        3   => 10, //Щиты
        4   => 1,  //Cерьги
        6   => 27, //Плащи
        11  => 3,  //Оружие:топоры
        12  => 3,  //Оружие:дубины,булавы
        13  => 3,  //Оружие:мечи
        21  => 9,  //Перчатки
        22  => 28, //Легкая броня
        23  => 4,  //Тяжелая броня
        24  => 8,  //Шлемы
        41  => 2,  //Ожерелья
        42  => 5   //Кольца
    );

    private $_oldBkCategoriesAndTypesHelp = array(
        'Оружие:кастеты,ножи'   => array('Раздел' => 1, 'Тип' => 3),
        'Сапоги'                => array('Раздел' => 2, 'Тип' => 11),
        'Щиты'                  => array('Раздел' => 3, 'Тип' => 10),
        'Cерьги'                => array('Раздел' => 4, 'Тип' => 1),
        'Плащи'                 => array('Раздел' => 6, 'Тип' => 27),
        'Оружие:топоры'         => array('Раздел' => 11, 'Тип' => 3),
        'Оружие:дубины,булавы'  => array('Раздел' => 12, 'Тип' => 3),
        'Оружие:мечи'           => array('Раздел' => 13, 'Тип' => 3),
        'Перчатки'              => array('Раздел' => 21, 'Тип' => 9),
        'Легкая броня'          => array('Раздел' => 22, 'Тип' => 28),
        'Тяжелая броня'         => array('Раздел' => 23, 'Тип' => 4),
        'Шлемы'                 => array('Раздел' => 24, 'Тип' => 8),
        'Ожерелья'              => array('Раздел' => 41, 'Тип' => 2),
        'Кольца'                => array('Раздел' => 42, 'Тип' => 5)
    );

    /** @var array Раздел => Категория у меня в БД */
    private  $_categories = array(
        1   => 1, //Оружие:кастеты,ножи
        2   => 2, //Сапоги
        3   => 3, //Щиты
        4   => 4, //Cерьги
        6   => 6, //Плащи
        11  => 11, //Оружие:топоры
        12  => 12, //Оружие:дубины,булавы
        13  => 13, //Оружие:мечи
        21  => 21, //Перчатки
        22  => 22, //Легкая броня
        23  => 23, //Тяжелая броня
        24  => 24, //Шлемы
        41  => 41, //Ожерелья
        42  => 42  //Кольца
    );

    public function actionGet()
    {
        $categoriesAndTypes = $this->_oldBkCategoriesAndTypes;

        $razdelGET = Yii::app()->request->getPost('razdel');
        $limitGET = Yii::app()->request->getPost('limit');
        $offsetGET = Yii::app()->request->getPost('offset');

        $result = array();
        $criteria = new CDbCriteria();
        $criteria->addCondition('`t`.category_id = :category_id');
        $criteria->addCondition('`t`.id >= :start_id');
        if($limitGET !== null && $offsetGET !== null) {
            $criteria->limit = $limitGET;
            $criteria->offset = $offsetGET;
        }

        if($razdelGET !== null) {
            if(!isset($categoriesAndTypes[$razdelGET])) {
                echo CJSON::encode(
                    array(
                        'error' => 001,
                        'msg' => 'Некорректный раздел'
                    )
                );
                Yii::app()->end();
            }
            $categoriesAndTypes = array($razdelGET => $categoriesAndTypes[$razdelGET]);
        }

        $items_count = 0;
        foreach ($categoriesAndTypes as $razdel => $type) {
            $criteria->params = array(':category_id' => $this->_categories[$razdel], ':start_id' => 946);
            $items = ObkItems::model()->findAll($criteria);

            $result[$razdel] = $this->prepareArray($items, $razdel, $type);

            $items_count += count($items);
        }

        echo CJSON::encode(
            array(
                'items' => $result,
                'count' => $items_count,
                'success' => true
            )
        );
    }

    public function actionHelp()
    {
        $echo = array();
        $echo['end_point'] = 'http://pr.oldbk.com/api/get';
        $echo['return'] = 'json';
        $echo['params_method'] = 'post';
        $echo['params'] = array(
            'razdel' => 'Фильтровать по разделу',
            'limit' => 'Лимит предметов (используется только в связке с offset)',
            'offset' => 'Смещение (используется только в связке с limit)'
        );

        foreach ($echo as $name => $value) {
            echo $name.': ';
            if(is_array($value)) {
                echo '<br>';
                VarDumper::dump($value);
            }
            else
                echo $value;
            echo '<hr>';
        }

        VarDumper::dump($this->_oldBkCategoriesAndTypesHelp);
    }

    /**
     * @param ObkItems[] $array
     * @param int $razdel
     * @param int $type
     * @return array
     */
    private function prepareArray($array, $razdel, $type)
    {
        $result = array();
        foreach ($array as $item) {
            $result[$item->id] = array(
                'id' => $item->id,
                'img' => 'http://pr.oldbk.com/images/dressroom/' . $item->img,
                'name' => $item->name,
                'duration' => 0,
                'maxdur' => (int)$item->durability,
                'cost' => (int)$item->price,
                'count' => 0,
                'avacount' => 0,
                'angcount' => 0,
                'nlevel' => (int)$item->need_level,
                'nsila' => (int)$item->need_strange,
                'nlovk' => (int)$item->need_agility,
                'ninta' => (int)$item->need_intuition,
                'nvinos' => (int)$item->need_endurance,
                'nintel' => 0,
                'nmudra' => 0,
                'nnoj' => (int)$item->need_knife,
                'ntopor' => (int)$item->need_ax,
                'ndubina' => (int)$item->need_baton,
                'nmech' => (int)$item->need_sword,
                'nalign' => (int)$item->need_align,
                'minu' => (int)$item->min_damage,
                'maxu' => (int)$item->max_damage,
                'gsila' => (int)$item->give_strange,
                'glovk' => (int)$item->give_agility,
                'ginta' => (int)$item->give_intuition,
                'gintel' => (int)$item->give_intellect,
                'ghp' => (int)$item->give_hp,
                'gmp' => 0,
                'mfkrit' => (int)$item->mf_critical,
                'mfakrit' => (int)$item->mf_p_critical,
                'mfuvorot' => (int)$item->mf_flee,
                'mfauvorot' => (int)$item->mf_p_flee,
                'gnoj' => (int)$item->give_knife,
                'gtopor' => (int)$item->give_ax,
                'gdubina' => (int)$item->give_baton,
                'gmech' => (int)$item->give_sword,
                'shshop' => 0,
                'bron1' => (int)$item->armor_head,
                'bron2' => (int)$item->armor_body,
                'bron3' => (int)$item->armor_belt,
                'bron4' => (int)$item->armor_feet,
                'dategoden' => 0,
                'magic' => 0,
                'type' => $type,
                'massa' => (int)$item->weight,
                'goden' => 0,
                'needident' => 0,
                'nfire' => (int)$item->need_fire,
                'nwater' => (int)$item->need_water,
                'nair' => (int)$item->need_air,
                'nearth' => (int)$item->need_earth,
                'nlight' => (int)$item->need_light,
                'ngray' => (int)$item->need_gray,
                'ndark' => (int)$item->need_dark,
                'gfire' => (int)$item->give_fire,
                'gwater' => (int)$item->give_water,
                'gair' => (int)$item->give_air,
                'gearth' => (int)$item->give_earth,
                'glight' => (int)$item->give_light,
                'ggray' => (int)$item->give_gray,
                'gdark' => (int)$item->give_dark,
                'rareitem' => (int)$item->rareitem,
                'can_rep' => (int)$item->can_rep,
                'letter' => 0,
                'isrep' => 0,
                'razdel' => $razdel,
                'nsex' => 0,
                'gmeshok' => 0,
                'group' => 0,
                'wopen' => 0,
                'ab_mf' => (int)$item->increased_mf,
                'ab_bron' => (int)$item->increased_armor,
                'ab_uron' => (int)$item->increased_damage,
                'need_wins' => 0,
                'artproto' => 0,
                'ecost' => (int)$item->price_ekr,
                'glava' => 0,
                'includemagic' => 0,
                'includemagiccost' => 0,
                'includemagicdex' => 0,
                'includemagicekrcost' => 0,
                'includemagicmax' => 0,
                'includemagicname' => 0,
                'includemagicuses' => 0,
                'klan' => 0,
                'owner' => 0,
                'charge_rep' => 0,
                'is_owner' => 0,
                'mfbonus' => (int)$item->free_mf,
                'stbonus' => (int)$item->free_stats,
                'unikflag' => 0
            );
        }

        return $result;
    }
}