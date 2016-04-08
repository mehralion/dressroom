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