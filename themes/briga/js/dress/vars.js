var vak = {
    fb:'Футболка',
    pl:'Плащ',
    ser:'Серьги',
    kl:'Кулон',
    or:'Оружие',
    br:'Бронь',
    r1:'Кольцо',
    r2:'Кольцо',
    r3:'Кольцо',
    sh:'Шлем',
    pr:'Перчатки',
    st:'Щит',
    ob:'Обувь',
    eat:'Еда',
    strange:'Сила',
    agility:'Ловкость',
    intuition:'Интуиция',
    intellect:'Интеллект',
    endurance:'Выносливость',
    wisdom:'Мудрость',
    hp:'Уровень жизни',
    mp:'Уровень маны',
    critical:'Мф. критических ударов',
    flee:'Мф. увертливости',
    p_critical:'Мф. против крит. ударов',
    p_flee:'Мф. против увертлив.',
    body:'Броня корпуса',
    belt:'Броня пояса',
    head:'Броня головы',
    feet:'Броня ног',
    level:'Уровень',
    sword:'Мастерство владения мечами',
    baton:'Мастерство владения дубинами и булавами',
    ax:'Мастерство владения топорами и секирами',
    knife:'Мастерство владения ножами и кастетами',
    fire:'Магия огня',
    water:'Магия воды',
    earth:'Магия земли',
    air:'Магия воздухом',
    dark:'Магия тьмы',
    grey:'Магия серая',
    light:'Магия света',
    min_damage:'Минимальный урон',
    max_damage:'Максимальный урон',
    increased_damage:'к урону',
    increased_armor:'брони',
    increased_mf:'к макс МФ',
    item_type_0:'Предмет из магазина (гос/березка)',
    item_type_1:'Предмет из проката',
    item_type_2:'Предмет из хромовой лавки'

};

var duhInfo = {
    4 : {'other' : {'hp' : 10}},
    5 : {'other' : {'hp' : 20}},
    6 : {'other' : {'hp' : 30}},
    7 : {'other' : {'hp' : 40}},
    8 : {'other' : {'hp' : 60}},
    9 : {'other' : {'hp' : 80}},
    10 : {'other' : {'hp' : 100}},
    11 : {'other' : {'hp' : 120}},
    12 : {'other' : {'hp' : 140}},
    13 : {'other' : {'hp' : 160}}
};

var alignInfo = {
    0   : '<img src="http://i.oldbk.com/i/align_0.gif"> Серая',
    1.5 : '<img src="http://i.oldbk.com/i/align_1.5.gif"> Паладин',
    2   : '<img src="http://i.oldbk.com/i/align_2.gif"> Нейтрал',
    3   : '<img src="http://i.oldbk.com/i/align_3.gif"> Тьма',
    6   : '<img src="http://i.oldbk.com/i/align_6.gif"> Свет'
};

var statToMf = {
    strange:{
        damage:{
            min_damage:1/3,
            max_damage:1/3
        }
    },
    agility:{
        mf:{
            flee:5,
            p_flee:5,
            p_critical:2
        }
    },
    intuition:{
        mf:{
            critical:5,
            p_critical:5,
            p_flee:2
        }
    },
    endurance:{
        other:{
            hp:6
        }
    },
    wisdom:{
        other:{
            mp:10
        }
    }
};

var sharpenInfo = {
    knife: {
        cost: 6,
        params_give: {
            damage: {
                min_damage: 1,
                max_damage: 1
            }
        },
        params_need: {
            stats: {
                strange: 0,
                agility: 0,
                intuition: 1,
                endurance: 0,
                intellect: 0,
                wisdom: 0
            },
            possession: {
                ax: 0,
                knife: 1,
                baton: 0,
                sword: 0
            }
        }
    },
    sword: {
        cost: 6,
        params_give: {
            damage: {
                min_damage: 1,
                max_damage: 1
            }
        },
        params_need: {
            stats: {
                strange: 0,
                agility: 0,
                intuition: 0,
                endurance: 1,
                intellect: 0,
                wisdom: 0
            },
            possession: {
                ax: 0,
                knife: 0,
                baton: 0,
                sword: 1
            }
        }
    },
    ax: {
        cost: 6,
        params_give: {
            damage: {
                min_damage: 1,
                max_damage: 1
            }
        },
        params_need: {
            stats: {
                strange: 1,
                agility: 0,
                intuition: 0,
                endurance: 0,
                intellect: 0,
                wisdom: 0
            },
            possession: {
                ax: 1,
                knife: 0,
                baton: 0,
                sword: 0
            }
        }
    },
    baton: {
        cost: 6,
        params_give: {
            damage: {
                min_damage: 1,
                max_damage: 1
            }
        },
        params_need: {
            stats: {
                strange: 0,
                agility: 1,
                intuition: 0,
                endurance: 0,
                intellect: 0,
                wisdom: 0
            },
            possession: {
                ax: 0,
                knife: 0,
                baton: 1,
                sword: 0
            }
        }
    }
};

var podgonInfo = {
    1:{
        mf:2,
        cost:0.2
    },
    2:{
        mf:3,
        cost:0.2
    },
    3:{
        mf:4,
        cost:0.4
    },
    4:{
        mf:6,
        cost:0.7
    },
    5:{
        mf:10,
        cost:0.1
    }
};

var levelGive = {
    0:{
        stats:15,
        endurance:0,
        ap:3,
        possession:0
    },
    1:{
        stats:3,
        endurance:1,
        ap:4,
        possession:1

    },
    2:{
        stats:3,
        endurance:1,
        ap:5,
        possession:1
    },
    3:{
        stats:3,
        endurance:1,
        ap:5,
        possession:1
    },
    4:{
        stats:5,
        endurance:1,
        ap:5,
        possession:1
    },
    5:{
        stats:3,
        endurance:1,
        ap:7,
        possession:1
    },
    6:{
        stats:3,
        endurance:1,
        ap:7,
        possession:1
    },
    7:{
        stats:5,
        endurance:1,
        ap:9,
        possession:1
    },
    8:{
        stats:5,
        endurance:1,
        ap:9,
        possession:1
    },
    9:{
        stats:7,
        endurance:2,
        ap:9,
        possession:1
    },
    10:{
        stats:9,
        endurance:3,
        ap:21,
        possession:1
    },
    11:{
        stats:10,
        endurance:3,
        ap:13,
        possession:1
    },
    12:{
        stats:10,
        endurance:4,
        ap:13,
        possession:2
    },
    13: {
        stats:10,
        endurance:5,
        ap:0,
        possession:1
    }
};

var apInfo = {
    1:{
        level:7,
        min_damage:1,
        max_damage:1,
        hp:6,
        armor:1,
        stats:1,
        mf:5,
        iznos:5
    },
    2:{
        level:8,
        min_damage:2,
        max_damage:2,
        hp:8,
        armor:1,
        stats:1,
        mf:7,
        iznos:5
    },
    3:{
        level:9,
        min_damage:3,
        max_damage:3,
        hp:10,
        armor:1,
        stats:1,
        mf:10,
        iznos:10
    },
    4:{
        level:10,
        min_damage:4,
        max_damage:4,
        hp:12,
        armor:1,
        stats:1,
        mf:12,
        iznos:10
    },
    5:{
        level:11,
        min_damage:1,
        max_damage:1,
        hp:15,
        armor:1,
        stats:1,
        mf:15,
        iznos:15
    },
    6: {
        level:12,
        min_damage:1,
        max_damage:1,
        hp:20,
        stats:1,
        armor:1,
        mf:17,
        iznos:15
    }
};