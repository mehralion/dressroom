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