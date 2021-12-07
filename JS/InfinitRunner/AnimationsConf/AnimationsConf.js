((global, factory) => {
    factory(global.AnimationsConf = {});
})(this, (exports) => {
    const player = {
        var : {
            bool : {
                isRunning : false,
                isJumping : false
            },
            number : {
                speedX  : 0,
            }
        },

        nodes : [
            "idle",
            "run",
            "jump"
        ],
    
        nodesConf : {
            entry : {
                childs  : [
                    {
                        name : "idle",
                        conditions : []
                    }
                ],
                parents : []
            },

            anyState : {
                childs : [
                    {
                        name : "jump",
                        conditions : [
                            {
                                type : "bool",
                                varName : "isJumping",
                                equalTo : true,
                            }
                        ]
                    }
                ],
                parents : []
            },

            jump : {
                childs : [
                    {
                        name : "run",
                        conditions : [
                            {
                                type : "bool",
                                varName : "isJumping",
                                equalTo : false
                            }
                        ]
                    }
                ],
                parents : [],
            },

            idle : {
                childs  : [
                    {
                        name : "run",
                        conditions : [
                            {
                                type : "number",
                                varName : "speedX",
                                gt : 10
                            }
                        ]
                    }
                ],
                parents : [],
            },

            run : {
                childs  : [],
                parents : [
                    {
                        name : "idle",
                        conditions : [
                            {
                                type : "number",
                                varName : "speedX",
                                st : 50
                            }
                        ]
                    }
                ] 
            }
        }
    };

    const drone = {
        var : {
            bool : {},
            number : {}
        },

        nodes : [
            "fly",
        ],

        nodesConf : {
            entry : {
                childs  : [
                    {
                        name : "fly",
                        conditions : []
                    }
                ],
                parents : []
            },

            anyState : {
                childs : [],
                parents : []
            },

            fly : {
                childs  : [],
                parents : [],
            },
        }
    };

    const pnj = {
        var : {
            bool : {
                isDead : false
            },
            number : {}
        },

        nodes : [
            "walk",
            "hurt"
        ],

        nodesConf : {
            entry : {
                childs  : [
                    {
                        name : "walk",
                        conditions : []
                    }
                ],
                parents : []
            },

            anyState : {
                childs : [],
                parents : []
            },

            walk : {
                childs : [
                    {
                        name : "hurt",
                        conditions : [
                            {
                                type : "bool",
                                varName : "isDead",
                                equalTo : true
                            }
                        ]
                    }
                ],
                parents : [],
            },

            hurt : {
                childs : [],
                parents : []
            }
        }
    };

    const explosion1 = {
        var : {
            bool : {},
            number : {}
        },

        nodes : [
            "explosion1",
        ],

        nodesConf : {
            entry : {
                childs  : [
                    {
                        name : "explosion1",
                        conditions : []
                    }
                ],
                parents : []
            },

            anyState : {
                childs : [],
                parents : []
            },

            walk : {
                childs  : [],
                parents : [],
            },
        }
    };

    const bulletExplosion = {
        var : {
            bool : {},
            number : {}
        },

        nodes : [
            "bulletExplosion",
        ],

        nodesConf : {
            entry : {
                childs  : [
                    {
                        name : "bulletExplosion",
                        conditions : []
                    }
                ],
                parents : []
            },

            anyState : {
                childs : [],
                parents : []
            },

            bulletExplosion : {
                childs  : [],
                parents : [],
            },
        }
    };
    
    const bullet = {
        var : {
            bool : {},
            number : {}
        },

        nodes : [
            "bullet",
        ],

        nodesConf : {
            entry : {
                childs  : [
                    {
                        name : "bullet",
                        conditions : []
                    }
                ],
                parents : []
            },

            anyState : {
                childs : [],
                parents : []
            },

            bullet : {
                childs  : [],
                parents : [],
            },
        }
    };

    const bipedal = {
        var : {
            bool : {},
            number : {}
        },

        nodes : [
            "walk",
        ],

        nodesConf : {
            entry : {
                childs  : [
                    {
                        name : "walk",
                        conditions : []
                    }
                ],
                parents : []
            },

            anyState : {
                childs : [],
                parents : []
            },

            bullet : {
                childs  : [],
                parents : [],
            },
        }
    };

    const smoke = {
        var : {
            bool : {},
            number : {}
        },

        nodes : [
            "smoke",
        ],

        nodesConf : {
            entry : {
                childs  : [
                    {
                        name : "smoke",
                        conditions : []
                    }
                ],
                parents : []
            },

            anyState : {
                childs : [],
                parents : []
            },

            bullet : {
                childs  : [],
                parents : [],
            },
        }
    };

    const shield = {
        var : {
            bool : {},
            number : {}
        },

        nodes : [
            "shield",
        ],

        nodesConf : {
            entry : {
                childs  : [
                    {
                        name : "shield",
                        conditions : []
                    }
                ],
                parents : []
            },

            anyState : {
                childs : [],
                parents : []
            },

            bullet : {
                childs  : [],
                parents : [],
            },
        }
    };

    const groundFire  = {
        var : {
            bool : {},
            number : {}
        },

        nodes : [
            "groundFire",
        ],

        nodesConf : {
            entry : {
                childs  : [
                    {
                        name : "groundFire",
                        conditions : []
                    }
                ],
                parents : []
            },

            anyState : {
                childs : [],
                parents : []
            },

            groundFire : {
                childs  : [],
                parents : [],
            },
        }
    };

    exports.player          = player;
    exports.drone           = drone;
    exports.pnj             = pnj;
    exports.explosion1      = explosion1;
    exports.bulletExplosion = bulletExplosion;
    exports.bullet          = bullet;
    exports.bipedal         = bipedal;
    exports.smoke           = smoke;
    exports.shield          = shield;
    exports.groundFire      = groundFire;
});