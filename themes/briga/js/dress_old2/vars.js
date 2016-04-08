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
    sila:'Сила',
    lovka:'Ловкость',
    inta:'Интуиция',
    intel:'Интеллект',
    vinos:'Выносливость',
    mudra:'Мудрость',
    hp:'Уровень жизни',
    mp:'Уровень маны',
    krit:'Мф. критических ударов',
    uvor:'Мф. увертливости',
    pkrit:'Мф. против крит. ударов',
    puvor:'Мф. против увертлив.',
    korp:'Броня корпуса',
    poyas:'Броня пояса',
    golova:'Броня головы',
    nogi:'Броня ног',
    level:'Уровень',
    mech:'Мастерство владения мечами',
    dubina:'Мастерство владения дубинами и булавами',
    topor:'Мастерство владения топорами и секирами',
    nog:'Мастерство владения ножами и кастетами',
    minu:'Минимальный урон',
    maxu:'Максимальный урон',
    usil_uron:'к урону',
    usil_bron:'брони',
    usil_max_mf:'к макс МФ'

};
var statToMf = {
    stats:{
        sila:{
            other:{
                minu:1/3,
                maxu:1/3
            }
        },
        lovka:{
            mf:{
                uvor:5,
                puvor:5,
                pkrit:2
            }
        },
        inta:{
            mf:{
                krit:5,
                pkrit:5,
                puvor:2
            }
        },
        vinos:{
            other:{
                hp:6
            }
        }
    }
};
var sharpen = {
    nog: {
        1: baseUrl + '/images/dress/sharpen/sharpen_knife_1.gif',
        2: baseUrl + '/images/dress/sharpen/sharpen_knife_2.gif',
        3: baseUrl + '/images/dress/sharpen/sharpen_knife_3.gif',
        4: baseUrl + '/images/dress/sharpen/sharpen_knife_4.gif',
        5: baseUrl + '/images/dress/sharpen/sharpen_knife_5.gif',
        6: baseUrl + '/images/dress/sharpen/sharpen_6a.gif',
        7: baseUrl + '/images/dress/sharpen/sharpen_7a.gif'
    },
    mech: {
        1: baseUrl + '/images/dress/sharpen/sharpen_sword_1.gif',
        2: baseUrl + '/images/dress/sharpen/sharpen_sword_2.gif',
        3: baseUrl + '/images/dress/sharpen/sharpen_sword_3.gif',
        4: baseUrl + '/images/dress/sharpen/sharpen_sword_4.gif',
        5: baseUrl + '/images/dress/sharpen/sharpen_sword_5.gif',
        6: baseUrl + '/images/dress/sharpen/sharpen_6a.gif',
        7: baseUrl + '/images/dress/sharpen/sharpen_7a.gif'
    },
    topor: {
        1: baseUrl + '/images/dress/sharpen/sharpen_axe_1.gif',
        2: baseUrl + '/images/dress/sharpen/sharpen_axe_2.gif',
        3: baseUrl + '/images/dress/sharpen/sharpen_axe_3.gif',
        4: baseUrl + '/images/dress/sharpen/sharpen_axe_4.gif',
        5: baseUrl + '/images/dress/sharpen/sharpen_axe_5.gif',
        6: baseUrl + '/images/dress/sharpen/sharpen_6a.gif',
        7: baseUrl + '/images/dress/sharpen/sharpen_7a.gif'
    },
    dubina: {
        1: baseUrl + '/images/dress/sharpen/sharpen_molot_1.gif',
        2: baseUrl + '/images/dress/sharpen/sharpen_molot_2.gif',
        3: baseUrl + '/images/dress/sharpen/sharpen_molot_3.gif',
        4: baseUrl + '/images/dress/sharpen/sharpen_molot_4.gif',
        5: baseUrl + '/images/dress/sharpen/hammers_5.gif',
        6: baseUrl + '/images/dress/sharpen/sharpen_6a.gif',
        7: baseUrl + '/images/dress/sharpen/sharpen_7a.gif'
    }
};
var sharpenInfo = {
    nog: {
        cost: 6,
        params_give: {
            other: {
                minu: 1,
                maxu: 1
            }
        },
        params_need: {
            stats: {
                sila: 0,
                lovka: 0,
                inta: 1,
                vinos: 0,
                intel: 0,
                mudra: 0
            },
            vlad: {
                topor: 0,
                nog: 1,
                dubina: 0,
                mech: 0
            }
        }
    },
    mech: {
        cost: 6,
        params_give: {
            other: {
                minu: 1,
                maxu: 1
            }
        },
        params_need: {
            stats: {
                sila: 0,
                lovka: 0,
                inta: 0,
                vinos: 1,
                intel: 0,
                mudra: 0
            },
            vlad: {
                topor: 0,
                nog: 0,
                dubina: 0,
                mech: 1
            }
        }
    },
    topor: {
        cost: 6,
        params_give: {
            other: {
                minu: 1,
                maxu: 1
            }
        },
        params_need: {
            stats: {
                sila: 1,
                lovka: 0,
                inta: 0,
                vinos: 0,
                intel: 0,
                mudra: 0
            },
            vlad: {
                topor: 1,
                nog: 0,
                dubina: 0,
                mech: 0
            }
        }
    },
    dubina: {
        cost: 6,
        params_give: {
            other: {
                minu: 1,
                maxu: 1
            }
        },
        params_need: {
            stats: {
                sila: 0,
                lovka: 1,
                inta: 0,
                vinos: 0,
                intel: 0,
                mudra: 0
            },
            vlad: {
                topor: 0,
                nog: 0,
                dubina: 1,
                mech: 0
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
}
var podgon = {
    br:{
        1:baseUrl+'/images/dress/podgon/armor_1.gif',
        2:baseUrl+'/images/dress/podgon/armor_2.gif',
        3:baseUrl+'/images/dress/podgon/armor_3.gif',
        4:baseUrl+'/images/dress/podgon/armor_4.gif',
        5:baseUrl+'/images/dress/podgon/armor_5.gif'
    },
    ser:{
        1:baseUrl+'/images/dress/podgon/earrings_1.gif',
        2:baseUrl+'/images/dress/podgon/earrings_2.gif',
        3:baseUrl+'/images/dress/podgon/earrings_3.gif',
        4:baseUrl+'/images/dress/podgon/earrings_4.gif',
        5:baseUrl+'/images/dress/podgon/earrings_5.gif'
    },
    pr:{
        1:baseUrl+'/images/dress/podgon/gloves_1.gif',
        2:baseUrl+'/images/dress/podgon/gloves_2.gif',
        3:baseUrl+'/images/dress/podgon/gloves_3.gif',
        4:baseUrl+'/images/dress/podgon/gloves_4.gif',
        5:baseUrl+'/images/dress/podgon/gloves_5.gif'
    },
    sh:{
        1:baseUrl+'/images/dress/podgon/helmet_1.gif',
        2:baseUrl+'/images/dress/podgon/helmet_2.gif',
        3:baseUrl+'/images/dress/podgon/helmet_3.gif',
        4:baseUrl+'/images/dress/podgon/helmet_4.gif',
        5:baseUrl+'/images/dress/podgon/helmet_5.gif'
    },
    kl:{
        1:baseUrl+'/images/dress/podgon/necklace_1.gif',
        2:baseUrl+'/images/dress/podgon/necklace_2.gif',
        3:baseUrl+'/images/dress/podgon/necklace_3.gif',
        4:baseUrl+'/images/dress/podgon/necklace_4.gif',
        5:baseUrl+'/images/dress/podgon/necklace_5.gif'
    },
    r1:{
        1:baseUrl+'/images/dress/podgon/ring_1.gif',
        2:baseUrl+'/images/dress/podgon/ring_2.gif',
        3:baseUrl+'/images/dress/podgon/ring_3.gif',
        4:baseUrl+'/images/dress/podgon/ring_4.gif',
        5:baseUrl+'/images/dress/podgon/ring_5.gif'
    },
    r2:{
        1:baseUrl+'/images/dress/podgon/ring_1.gif',
        2:baseUrl+'/images/dress/podgon/ring_2.gif',
        3:baseUrl+'/images/dress/podgon/ring_3.gif',
        4:baseUrl+'/images/dress/podgon/ring_4.gif',
        5:baseUrl+'/images/dress/podgon/ring_5.gif'
    },
    r3:{
        1:baseUrl+'/images/dress/podgon/ring_1.gif',
        2:baseUrl+'/images/dress/podgon/ring_2.gif',
        3:baseUrl+'/images/dress/podgon/ring_3.gif',
        4:baseUrl+'/images/dress/podgon/ring_4.gif',
        5:baseUrl+'/images/dress/podgon/ring_5.gif'
    },
    st:{
        1:baseUrl+'/images/dress/podgon/shield_1.gif',
        2:baseUrl+'/images/dress/podgon/shield_2.gif',
        3:baseUrl+'/images/dress/podgon/shield_3.gif',
        4:baseUrl+'/images/dress/podgon/shield_4.gif',
        5:baseUrl+'/images/dress/podgon/shield_5.gif'
    },
    ob:{
        1:baseUrl+'/images/dress/podgon/shoes_1.gif',
        2:baseUrl+'/images/dress/podgon/shoes_2.gif',
        3:baseUrl+'/images/dress/podgon/shoes_3.gif',
        4:baseUrl+'/images/dress/podgon/shoes_4.gif',
        5:baseUrl+'/images/dress/podgon/shoes_5.gif'
    }
};
var levelGive = {
    0:{
        stats:15,
        vinos:0,
        ap:3,
        vlad:0
    },
    1:{
        stats:3,
        vinos:1,
        ap:4,
        vlad:1

    },
    2:{
        stats:3,
        vinos:1,
        ap:5,
        vlad:1
    },
    3:{
        stats:3,
        vinos:1,
        ap:5,
        vlad:1
    },
    4:{
        stats:5,
        vinos:1,
        ap:5,
        vlad:1
    },
    5:{
        stats:3,
        vinos:1,
        ap:7,
        vlad:1
    },
    6:{
        stats:3,
        vinos:1,
        ap:7,
        vlad:1
    },
    7:{
        stats:5,
        vinos:1,
        ap:8,
        vlad:1
    },
    8:{
        stats:5,
        vinos:1,
        ap:9,
        vlad:1
    },
    9:{
        stats:5,
        vinos:2,
        ap:9,
        vlad:1
    },
    10:{
        stats:9,
        vinos:3,
        ap:21,
        vlad:1
    },
    11:{
        stats:10,
        vinos:3,
        ap:13,
        vlad:1
    },
    12:{
        stats:10,
        vinos:4,
        ap:1,
        vlad:2
    }
}
var empty = {
    br:baseUrl+'/images/img_stats_6.jpg',
    ser:baseUrl+'/images/img_stats_1.jpg',
    kl:baseUrl+'/images/img_stats_4.jpg',
    or:baseUrl+'/images/img_stats_5.jpg',
    r1:baseUrl+'/images/img_stats_7.jpg',
    r2:baseUrl+'/images/img_stats_7.jpg',
    r3:baseUrl+'/images/img_stats_7.jpg',
    sh:baseUrl+'/images/img_stats_8.jpg',
    pr:baseUrl+'/images/img_stats_9.jpg',
    st:baseUrl+'/images/img_stats_10.jpg',
    ob:baseUrl+'/images/img_stats_11.jpg',
    fb:baseUrl+'/images/img_stats_2.jpg',
    pl:baseUrl+'/images/img_stats_3.jpg'
};
var apImg = {
    1:baseUrl+'/images/dress/ap/up7.gif',
    2:baseUrl+'/images/dress/ap/up8.gif',
    3:baseUrl+'/images/dress/ap/up9.gif',
    4:baseUrl+'/images/dress/ap/up10.gif',
    5:baseUrl+'/images/dress/ap/up11.gif'
};
var apImgRunes = {
    1:baseUrl+'/images/dress/ap/up7.gif',
    2:baseUrl+'/images/dress/ap/up8.gif',
    3:baseUrl+'/images/dress/ap/up9.gif',
    4:baseUrl+'/images/dress/ap/up10.gif',
    5:baseUrl+'/images/dress/ap/up11.gif',
    6:baseUrl+'/images/dress/ap/up11.gif',
    7:baseUrl+'/images/dress/ap/up11.gif',
    8:baseUrl+'/images/dress/ap/up11.gif',
    9:baseUrl+'/images/dress/ap/up11.gif',
    10:baseUrl+'/images/dress/ap/up11.gif'
};
var apInfo = {
    1:{
        level:7,
        minu:1,
        maxu:1,
        hp:6,
        bron:1,
        stat:1,
        mf:5,
        iznos:5
    },
    2:{
        level:8,
        minu:2,
        maxu:2,
        hp:8,
        bron:1,
        stat:1,
        mf:7,
        iznos:5
    },
    3:{
        level:9,
        minu:3,
        maxu:3,
        hp:10,
        bron:1,
        stat:1,
        mf:10,
        iznos:10
    },
    4:{
        level:10,
        minu:4,
        maxu:4,
        hp:12,
        bron:1,
        stat:1,
        mf:12,
        iznos:10
    },
    5:{
        level:11,
        minu:1,
        maxu:1,
        hp:15,
        bron:1,
        stat:1,
        mf:15,
        iznos:15
    }
};
var runes = {
    1:{
        params_give: {

        }
    },
    2:{
        stat:1,
        hp:5
    },
    3:{
        mf:10,
        intel:1,
        bron:1
    },
    4:{
        mudra:1,
        hp:5
    },
    5:{
        mf:10,
        bron:1
    },
    6:{
        stat:1,
        hp:5
    },
    7:{
        mf:10,
        bron:1
    },
    8:{
        stat:1,
        mudra:1
    },
    9:{
        mf:10,
        intel:1,
        bron:1,
        hp:5
    },
    10:{
        stat:2,
        hp:10,
        minu:1,
        maxu:2,
        vladm:1
    }
};
var artGive = {
    stats: 6,
    minu: 2,
    maxu:2,
    mf: 70,
    bron: 3,
    hp: 50
}