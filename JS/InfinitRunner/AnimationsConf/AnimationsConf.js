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
    }

    const pnj = {
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

            walk : {
                childs  : [],
                parents : [],
            },
        }
    }

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
    }

    exports.player          = player;
    exports.drone           = drone;
    exports.pnj             = pnj;
    exports.explosion1      = explosion1
});