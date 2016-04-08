<?php

class SiteController extends Controller
{
    public function actionError()
    {
        if($error=Yii::app()->errorHandler->error)
        {
            echo $error['message'];
        }
    }

    private $CatToCat = array(
        4 => 'ser', 41 => 'kl', 23 => 'br', 42 => 'r1', 24 => 'sh', 21 => 'pr', 3 => 'st',
        2 => 'ob', 1 => 'knife', 12 => 'baton', 11 => 'ax', 13 => 'sword', 22 => 'fb', 6 => 'pl',
        10000 => 'runa1', 61 => 'eat'
    );

    public function actionGetitems()
    {
        $result = array();
        $criteria = new CDbCriteria();
        $criteria->addCondition('`t`.category_id = :id');
        $criteria->params = array(
            ':id' => 4,
        );
        $sergi = ObkItems::model()->findAll($criteria);

        $criteria->params = array(
            ':id' => 41,
        );
        $kulon = ObkItems::model()->findAll($criteria);

        $criteria->params = array(
            ':id' => 23,
        );
        $bron = ObkItems::model()->findAll($criteria);

        $criteria->params = array(
            ':id' => 42,
        );
        $ring = ObkItems::model()->findAll($criteria);

        $criteria->params = array(
            ':id' => 24,
        );
        $shlem = ObkItems::model()->findAll($criteria);

        $criteria->params = array(
            ':id' => 21,
        );
        $perchatki = ObkItems::model()->findAll($criteria);

        $criteria->params = array(
            ':id' => 3,
        );
        $shit = ObkItems::model()->findAll($criteria);

        $criteria->params = array(
            ':id' => 2,
        );
        $ob = ObkItems::model()->findAll($criteria);

        $criteria->params = array(
            ':id' => 13,
        );
        $mech = ObkItems::model()->findAll($criteria);

        $criteria->params = array(
            ':id' => 11,
        );
        $topor = ObkItems::model()->findAll($criteria);

        $criteria->params = array(
            ':id' => 1,
        );

        $nog = ObkItems::model()->findAll($criteria);

        $criteria->params = array(
            ':id' => 12,
        );
        $dubina = ObkItems::model()->findAll($criteria);

        $criteria->params = array(
            ':id' => 22,
        );
        $fb = ObkItems::model()->findAll($criteria);

        $criteria->params = array(
            ':id' => 6,
        );
        $pl = ObkItems::model()->findAll($criteria);

        $criteria->params = array(
            ':id' => 10000,
        );
        $runes = ObkItems::model()->findAll($criteria);

        //$criteria->params = array(
        //    ':id' => 10001,
        //);
        //$elka = ObkItems::model()->findAll($criteria);

        $criteria->params = array(
            ':id' => 61,
        );
        $eat = ObkItems::model()->findAll($criteria);

        $result['ser'] = $this->prepareArray($sergi);
        $result['kl'] = $this->prepareArray($kulon);
        $result['br'] = $this->prepareArray($bron);
        $result['r1'] = $this->prepareArray($ring);
        $result['r2'] = $this->prepareArray($ring);
        $result['r3'] = $this->prepareArray($ring);
        $result['sh'] = $this->prepareArray($shlem);
        $result['pr'] = $this->prepareArray($perchatki);
        $result['st'] = $this->prepareArray($shit);
        $result['ob'] = $this->prepareArray($ob);
        $result['knife'] = $this->prepareArray($nog);
        $result['baton'] = $this->prepareArray($dubina);
        $result['ax'] = $this->prepareArray($topor);
        $result['sword'] = $this->prepareArray($mech);
        $result['fb'] = $this->prepareArray($fb);
        $result['pl'] = $this->prepareArray($pl);
        $result['runa1'] = $this->prepareArray($runes);
        $result['runa2'] = $this->prepareArray($runes);
        $result['runa3'] = $this->prepareArray($runes);
        //$result['elka'] = $this->prepareArray($elka);
        $result['eat'] = $this->prepareArray($eat);

        $runeInfo = array();
        $RuneLevels = RuneLevel::model()->findAll();
        foreach($RuneLevels as $model) {
            $runeInfo[$model->level] = array();
            foreach ($model->attributes as $name => $value)
                $runeInfo[$model->level][$name] = (int)$value;
        }

        echo CJSON::encode(
            array(
                'items' => $result,
                'runeInfo' => $runeInfo
            )
        );
    }

    /**
     * @param ObkItems[] $array
     * @param array $settings
     * @return array
     */
    private function prepareArray($array, $settings = array())
    {
        $result = array();
        foreach ($array as $item) {
            $prokat = array(
                7 => (int)$item->prokat_7,
                8 => (int)$item->prokat_8,
                9 => (int)$item->prokat_9,
                10 => (int)$item->prokat_10,
                11 => (int)$item->prokat_11,
                12 => (int)$item->prokat_12);

            $result[$item->id] = array(
                'img' => Yii::app()->baseUrl . '/images/dressroom/' . $item->img,
                'id' => $item->id,
                'dataType' => $this->CatToCat[$item->category_id],
                'name' => $item->name,
                'price' => (int)$item->price,
                'price_reputation' => (int)$item->price_reputation,
                'price_ekr' => (int)$item->price_ekr,
                'durability' => (int)$item->durability,
                'weight' => (int)$item->weight,
                'is_art' => (int)$item->is_art,
                'can_mf' => (int)$item->can_mf,
                'can_ap' => (int)$item->can_ap,
                'unique' => (int)$item->unique,
                'in_prokat' => (int)$item->in_prokat,
                'prokat_info' => $prokat,
                'chooseProkat' => false,
                'create_art' => 0,
                'can_podgon' => (int)$item->can_podgon,
                'align' => floatval($item->need_align),
                'params_need' => array(
                    'levelInfo' => array(
                        'level' => (int)$item->need_level,
                    ),
                    'stats' => array(
                        'strange' => (int)$item->need_strange,
                        'agility' => (int)$item->need_agility,
                        'intuition' => (int)$item->need_intuition,
                        'endurance' => (int)$item->need_endurance,
                        'intellect' => 0,
                        'wisdom' => 0,
                    ),
                    'possession' => array(
                        'knife' => (int)$item->need_knife,
                        'ax' => (int)$item->need_ax,
                        'sword' => (int)$item->need_sword,
                        'baton' => (int)$item->need_baton,
                    ),
                    'possession_m' => array(
                        'fire' => 0,
                        'water' => 0,
                        'earth' => 0,
                        'air' => 0,
                        'grey' => 0,
                        'light' => 0,
                        'dark' => 0
                    ),
                ),
                'params_give' => array(
                    'stats' => array(
                        'strange' => (int)$item->give_strange,
                        'agility' => (int)$item->give_agility,
                        'intuition' => (int)$item->give_intuition,
                        'intellect' => (int)$item->give_intellect,
                        'wisdom' => (int)$item->give_wisdom,
                    ),
                    'other' => array(
                        'hp' => (int)$item->give_hp,
                    ),
                    'damage' => array(
                        'min_damage' => (int)$item->min_damage,
                        'max_damage' => (int)$item->max_damage
                    ),
                    'mf' => array(
                        'critical' => (int)$item->mf_critical,
                        'p_critical' => (int)$item->mf_p_critical,
                        'flee' => (int)$item->mf_flee,
                        'p_flee' => (int)$item->mf_p_flee,
                    ),
                    'possession' => array(
                        'knife' => (int)$item->give_knife,
                        'ax' => (int)$item->give_ax,
                        'baton' => (int)$item->give_baton,
                        'sword' => (int)$item->give_sword,
                    ),
                    'possession_m' => array(
                        'fire' => 0,
                        'water' => 0,
                        'earth' => 0,
                        'air' => 0,
                        'grey' => 0,
                        'light' => 0,
                        'dark' => 0
                    ),
                    'armor' => array(
                        'head' => (int)$item->armor_head,
                        'body' => (int)$item->armor_body,
                        'belt' => (int)$item->armor_belt,
                        'feet' => (int)$item->armor_feet,
                    ),
                    'increased' => array(
                        'damage' => (int)$item->increased_damage,
                        'armor' => (int)$item->increased_armor,
                        'mf' => (int)$item->increased_mf,
                    )
                ),
                'free_give' => array(
                    'stats' => (int)$item->free_stats,
                    'mf' => (int)$item->free_mf,
                ),
                'enabled_rune_increased_damage' => (int)$item->enabled_rune_increased_damage,
                'enabled_rune_increased_armor' => (int)$item->enabled_rune_increased_armor,
                'enabled_rune_increased_mf' => (int)$item->enabled_rune_increased_mf
            );
        }
        return $result;
    }

    public function actionLoadbynick()
    {
        $findItems = array();
        $nick = Yii::app()->request->getParam('login');
        if (!empty($nick)) {
            $pers = GetContent::getItems($nick);
            $align = 0;
            if(preg_match('/align=(.+?);/ui', $pers, $alignOut))
                $align = $alignOut[1];

            if (preg_match('/dress=(.*?);/ui', $pers, $out)) {
                $items = explode(',', $out[1]);
                foreach ($items as $item) {
                    $item = trim($item);
                    if ($item == '')
                        continue;
                    if(!preg_match('/([а-яА-Я -]*) /ui', $item, $name))
                        continue;
                    $criteria = new CDbCriteria();
                    $criteria->addSearchCondition('name', $name[1]);
                    $dbItem = ObkItems::model()->find($criteria);
                    if (isset($dbItem)) {
                        $type = $this->CatToCat[$dbItem->category_id];
                        if ($type == 'r1') {
                            for ($i = 1; $i < 4; $i++) {
                                if (!isset($findItems['r' . $i])) {
                                    $type = 'r' . $i;
                                    break;
                                }
                            }
                        } elseif ($type == 'runa1') {
                            for ($i = 1; $i < 4; $i++) {
                                if (!isset($findItems['runa' . $i])) {
                                    $type = 'runa' . $i;
                                    break;
                                }
                            }
                        }
                        $findItems[$type] = current($this->prepareArray(array($dbItem)));
                    }
                }
                if (!empty($findItems))
                    echo CJSON::encode(array(
                        'items' => $findItems,
                        'align' => floatval($align)
                    ));
                else
                    echo CJSON::encode(array(
                        'error' => 'Не удалось найти предметы'
                    ));
            } else
                echo CJSON::encode(array(
                    'error' => 'Не удалось разобрать персонажа'
                ));
        } else
            echo CJSON::encode(array(
                'error' => 'Вы не ввели логин'
            ));
    }

    public function actionSaveDummy()
    {
        $key = md5(time() . time() . time());
        $DressModel = new Dressroom();
        $DressModel->key = $key;
        $DressModel->dressed = serialize(Yii::app()->request->getParam('dressed'));
        $DressModel->params = serialize(Yii::app()->request->getParam('params'));
        $DressModel->is_old = false;
        $DressModel->save();
        echo CJSON::encode(
            array(
                'key' => $key
            )
        );
    }

    public function actionLoad()
    {
        $key = Yii::app()->request->getParam('key');
        $paramsView = array();
        if (!empty($key)) {
            $DressModel = Dressroom::model()->find('`t`.key = :key and `t`.is_old = 0', array(
                ':key' => Yii::app()->request->getParam('key')
            ));
            if (isset($DressModel)) {
                $params = unserialize($DressModel->params);
                if($params === null)
                    $params = array();
                array_walk_recursive($params, 'recurs');
                $dressed = unserialize($DressModel->dressed);
                if ($dressed === null)
                    $dressed = array();

                array_walk_recursive($dressed, 'recurs');
                $paramsView = array(
                    'params' => $params,
                    'dressed' => $dressed
                );
                echo CJSON::encode($paramsView);
            } else
                Yii::app()->user->setFlash('error', 'Комплект не найден или устарел!');
        }
    }

	public function actionIndex()
    {
        Yii::app()->clientScript->registerScriptFile(Yii::app()->theme->baseUrl . '/js/all.js?'.time(), CClientScript::POS_HEAD);
        $this->render('index');
    }

    public function actionChange()
    {
        $post = Yii::app()->request->getPost('item', array());

        $criteria = new CDbCriteria();
        $criteria->group = 'level';
        $runeLevel = RuneLevel::model()->count($criteria);

        /** @var Item $Item */
        $Item = new Item($post);
        $view = $this->renderPartial('changeItem', array(
            'Item' => $Item,
            'model' => new ObkItems(),
            'rune_level' => $runeLevel
        ), true, false);

        echo CJSON::encode(array(
            'ok' => true,
            'content' => $view
        ));
    }

    public function actionFix()
    {
        $src = 'http://i.oldbk.com/i/sh/';
        /** @var ObkItems[] $items */
        $items = ObkItems::model()->findAll();
        foreach ($items as $item) {
            if(file_exists(Yii::app()->basePath.'/../images/dressroom/'.$item->img))
                continue;

            file_put_contents(Yii::app()->basePath.'/../images/dressroom/'.$item->img, file_get_contents($src.$item->img));
        }
    }

    /** @var array Раздел => Тип */
    private $_oldBkCategoriesAndTypes = array(
        1   => 'knives',  //Оружие:кастеты,ножи
        2   => 'boots', //Сапоги
        3   => 'shields', //Щиты
        4   => 'earrings',  //Cерьги
        6   => 'cloak', //Плащи
        11  => 'axes',  //Оружие:топоры
        12  => 'maces',  //Оружие:дубины,булавы
        13  => 'swords',  //Оружие:мечи
        21  => 'gloves',  //Перчатки
        22  => 'light_armor', //Легкая броня
        23  => 'heavy_armor',  //Тяжелая броня
        24  => 'helmets',  //Шлемы
        41  => 'necklaces',  //Ожерелья
        42  => 'rings'   //Кольца
    );

    public function actionDump()
    {
        $xml = new DOMDocument("1.0", 'utf-8');
        $root = $xml->createElement('items');

        /** @var DOMElement[] $children */
        $children = array();
        foreach ($this->_oldBkCategoriesAndTypes as $key => $item) {
            try {
                $children[$key] = $xml->createElement($item);
            } catch (Exception $ex) {
                var_dump($ex->getMessage());
                var_dump($item);
            }
        }



        /** @var Shop[] $Shop */
        $Shop = Shop::model()->findAll();
        foreach ($Shop as $item) {
            /** @var DOMElement $xmlChild */
            $xmlChild = $children[$item->razdel];

            $itemRoot = $xml->createElement('item');
            //$itemRoot->setAttribute('id', $item->id);

            $mainInfo = $xml->createElement('main');
            $mainInfo->appendChild($xml->createElement('name', $item->name));
            $mainInfo->appendChild($xml->createElement('img', $item->img));
            $mainInfo->appendChild($xml->createElement('weight', $item->massa));
            $mainInfo->appendChild($xml->createElement('price', $item->cost));
            $mainInfo->appendChild($xml->createElement('eprice', $item->ecost));
            $mainInfo->appendChild($xml->createElement('max_duration', $item->maxdur));
            $itemRoot->appendChild($mainInfo);

            $infoDamage = $xml->createElement('damage');
            $infoDamage->appendChild($xml->createElement('min_damage', $item->minu));
            $infoDamage->appendChild($xml->createElement('max_damage', $item->maxu));
            $itemRoot->appendChild($infoDamage);

            $infoNeed = $xml->createElement('need');
            $infoNeed->appendChild($xml->createElement('need_level', $item->nlevel));
            $infoNeed->appendChild($xml->createElement('need_strange', $item->nsila));
            $infoNeed->appendChild($xml->createElement('need_agility', $item->nlovk));
            $infoNeed->appendChild($xml->createElement('need_intuition', $item->ninta));
            $infoNeed->appendChild($xml->createElement('need_endurance', $item->nvinos));
            $infoNeed->appendChild($xml->createElement('need_intelligence', $item->nintel));
            $infoNeed->appendChild($xml->createElement('need_wisdom', $item->nmudra));
            $infoNeed->appendChild($xml->createElement('need_knife', $item->nnoj));
            $infoNeed->appendChild($xml->createElement('need_ax', $item->ntopor));
            $infoNeed->appendChild($xml->createElement('need_sword', $item->nmech));
            $infoNeed->appendChild($xml->createElement('need_baton', $item->ndubina));
            $infoNeed->appendChild($xml->createElement('need_align', $item->nalign));
            $infoNeed->appendChild($xml->createElement('need_fire', $item->nfire));
            $infoNeed->appendChild($xml->createElement('need_water', $item->nwater));
            $infoNeed->appendChild($xml->createElement('need_air', $item->nair));
            $infoNeed->appendChild($xml->createElement('need_earth', $item->nearth));
            $infoNeed->appendChild($xml->createElement('need_light', $item->nlight));
            $infoNeed->appendChild($xml->createElement('need_gray', $item->ngray));
            $infoNeed->appendChild($xml->createElement('need_dark', $item->ndark));
            $itemRoot->appendChild($infoNeed);

            $infoGive = $xml->createElement('give');
            $infoGive->appendChild($xml->createElement('give_hp', $item->ghp));
            $infoGive->appendChild($xml->createElement('give_mp', $item->gmp));
            $infoGive->appendChild($xml->createElement('give_critical', $item->mfkrit));
            $infoGive->appendChild($xml->createElement('give_p_critical', $item->mfakrit));
            $infoGive->appendChild($xml->createElement('give_flee', $item->mfuvorot));
            $infoGive->appendChild($xml->createElement('give_p_flee', $item->mfauvorot));
            $infoGive->appendChild($xml->createElement('give_strange', $item->gsila));
            $infoGive->appendChild($xml->createElement('give_agility', $item->glovk));
            $infoGive->appendChild($xml->createElement('give_intuition', $item->ginta));
            $infoGive->appendChild($xml->createElement('give_intelligence', $item->gintel));
            $infoGive->appendChild($xml->createElement('give_knife', $item->gnoj));
            $infoGive->appendChild($xml->createElement('give_ax', $item->gtopor));
            $infoGive->appendChild($xml->createElement('give_sword', $item->gmech));
            $infoGive->appendChild($xml->createElement('give_baton', $item->gdubina));
            $infoGive->appendChild($xml->createElement('give_fire', $item->gfire));
            $infoGive->appendChild($xml->createElement('give_water', $item->gwater));
            $infoGive->appendChild($xml->createElement('give_air', $item->gair));
            $infoGive->appendChild($xml->createElement('give_earth', $item->gearth));
            $infoGive->appendChild($xml->createElement('give_light', $item->glight));
            $infoGive->appendChild($xml->createElement('give_gray', $item->ggray));
            $infoGive->appendChild($xml->createElement('give_dark', $item->gdark));
            $itemRoot->appendChild($infoGive);

            $infoArmor = $xml->createElement('armor');
            $infoArmor->appendChild($xml->createElement('armor_head', $item->bron1));
            $infoArmor->appendChild($xml->createElement('armor_body', $item->bron2));
            $infoArmor->appendChild($xml->createElement('armor_belt', $item->bron3));
            $infoArmor->appendChild($xml->createElement('armor_feet', $item->bron4));
            $itemRoot->appendChild($infoArmor);

            $infoUsil = $xml->createElement('increased');
            $infoUsil->appendChild($xml->createElement('increased_damage', $item->ab_mf));
            $infoUsil->appendChild($xml->createElement('increased_armor', $item->ab_bron));
            $infoUsil->appendChild($xml->createElement('increased_mf', $item->ab_uron));
            $itemRoot->appendChild($infoUsil);

            $infoBonus = $xml->createElement('bonus');
            $infoBonus->appendChild($xml->createElement('free_mf', $item->mfbonus));
            $infoBonus->appendChild($xml->createElement('free_stats', $item->stbonus));
            $itemRoot->appendChild($infoBonus);

            $xmlChild->appendChild($itemRoot);
        }

        foreach ($children as $item) {
            $root->appendChild($item);
        }
        $xml->appendChild($root);

        $xml->save(Yii::app()->basePath.'/../api/new_items.xml');
    }
}

function recurs(&$item, $key)
{
    if (is_numeric($item))
        $item = (int)$item;
    else if ($item == 'true')
        $item = true;
    else if ($item == 'false')
        $item = false;
}