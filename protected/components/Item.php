<?php
/**
 * Created by PhpStorm.
 * User: Николай
 * Date: 05.06.14
 * Time: 2:45
 */

/**
 * Class Item
 */
class Item
{
    public $img;
    public $id;
    public $name;
    public $price;
    public $price_reputation;
    public $weight;
    public $is_art;
    public $can_mf;
    public $can_ap;
    public $can_podgon;
    public $align;
    public $unique;
    public $create_art;
    public $params_need;
    public $params_give;
    public $free_give;
    public $enabled_rune_increased_damage;
    public $enabled_rune_increased_armor;
    public $enabled_rune_increased_mf;
    public $dataType;
    public $chooseProkat;
    public $prokat_info;

    public function __construct($params)
    {
        $this->img                              = $params['img'];
        $this->id                               = $params['id'];
        $this->name                             = $params['name'];
        $this->price                            = $params['price'];
        $this->price_reputation                 = $params['price_reputation'];
        $this->weight                           = $params['weight'];
        $this->is_art                           = $params['is_art'];
        $this->unique                           = $params['unique'];
        $this->create_art                       = $params['create_art'];
        $this->can_mf                           = $params['can_mf'];
        $this->can_ap                           = $params['can_ap'];
        $this->can_podgon                       = $params['can_podgon'];
        $this->align                            = $params['align'];
        $this->params_need                      = new Need($params['params_need']);
        $this->params_give                      = new Give($params['params_give']);
        $this->free_give                        = new FreeGive($params['free_give']);
        $this->enabled_rune_increased_damage    = $params['enabled_rune_increased_damage'];
        $this->enabled_rune_increased_armor     = $params['enabled_rune_increased_armor'];
        $this->enabled_rune_increased_mf        = $params['enabled_rune_increased_mf'];
        $this->dataType                         = $params['dataType'];
        $this->chooseProkat                     = $params['chooseProkat'] == 'true' ? true : false;
        $this->prokat_info                      = $params['prokat_info'];
    }

    public function isRune()
    {
        return $this->dataType == 'runa1' || $this->dataType == 'runa2' || $this->dataType == 'runa3';
    }
}

/**
 * Class Need
 */
class Need
{
    public $levelInfo;
    public $stats;
    public $possession;
    public $possession_m;

    public function __construct($params)
    {
        $this->levelInfo    = new LevelInfo($params['levelInfo']);
        $this->stats        = new Stats($params['stats']);
        $this->possession   = new Possession($params['possession']);
        $this->possession_m = new PossessionM($params['possession_m']);
    }
}

/**
 * Class Give
 */
class Give
{
    public $stats;
    public $other;
    public $damage;
    public $mf;
    public $possession;
    public $possession_m;
    public $armor;
    public $increased;

    public function __construct($params)
    {
        $this->stats        = new Stats($params['stats']);
        $this->other        = new Other($params['other']);
        $this->damage       = new Damage($params['damage']);
        $this->mf           = new Mf($params['mf']);
        $this->possession   = new Possession($params['possession']);
        $this->possession_m = new PossessionM($params['possession_m']);
        $this->armor        = new Armor($params['armor']);
        $this->increased    = new Increased($params['increased']);
    }
}

/**
 * Class FreeGive
 */
class FreeGive
{
    public $stats;
    public $mf;

    public function __construct($params)
    {
        $this->stats    = $params['stats'];
        $this->mf       = $params['mf'];
    }
}

/**
 * Class LevelInfo
 */
class LevelInfo
{
    public $level;

    public function __construct($params)
    {
        $this->level = $params['level'];
    }
}

/**
 * Class Stats
 */
class Stats
{
    public $strange;
    public $agility;
    public $intuition;
    public $endurance;
    public $intellect;
    public $wisdom;

    public function __construct($params)
    {
        $this->strange      = $params['strange'];
        $this->agility      = $params['agility'];
        $this->intuition    = $params['intuition'];
        if(isset($params['endurance']))
            $this->endurance    = $params['endurance'];
        if(isset($params['intellect']))
            $this->intellect    = $params['intellect'];
        if(isset($params['wisdom']))
            $this->wisdom       = $params['wisdom'];
    }
}

/**
 * Class Possession
 */
class Possession
{
    public $knife;
    public $ax;
    public $sword;
    public $baton;

    public function __construct($params)
    {
        $this->knife    = $params['knife'];
        $this->ax       = $params['ax'];
        $this->sword    = $params['sword'];
        $this->baton    = $params['baton'];
    }
}

/**
 * Class PossessionM
 */
class PossessionM
{
    public $fire;
    public $water;
    public $earth;
    public $air;
    public $grey;
    public $light;
    public $dark;

    public function __construct($params)
    {
        $this->fire     = $params['fire'];
        $this->water    = $params['water'];
        $this->earth    = $params['earth'];
        $this->air      = $params['air'];
        $this->grey     = $params['grey'];
        $this->light    = $params['light'];
        $this->dark     = $params['dark'];
    }
}

/**
 * Class Damage
 */
class Damage
{
    public $min_damage;
    public $max_damage;

    public function __construct($params)
    {
        $this->min_damage = $params['min_damage'];
        $this->max_damage = $params['max_damage'];
    }
}

/**
 * Class Mf
 */
class Mf
{
    public $critical;
    public $p_critical;
    public $flee;
    public $p_flee;

    public function __construct($params)
    {
        $this->critical     = $params['critical'];
        $this->p_critical   = $params['p_critical'];
        $this->flee         = $params['flee'];
        $this->p_flee       = $params['p_flee'];
    }
}

/**
 * Class Armor
 */
class Armor
{
    public $head;
    public $body;
    public $belt;
    public $feet;

    public function __construct($params)
    {
        $this->head = $params['head'];
        $this->body = $params['body'];
        $this->belt = $params['belt'];
        $this->feet = $params['feet'];
    }
}

/**
 * Class Increased
 */
class Increased
{
    public $damage;
    public $armor;
    public $mf;

    public function __construct($params)
    {
        $this->damage   = $params['damage'];
        $this->armor    = $params['armor'];
        $this->mf       = $params['mf'];
    }
}

/**
 * Class Other
 */
class Other
{
    public $hp;

    public function __construct($params)
    {
        $this->hp = $params['hp'];
    }
}