((global, factory) => {
    factory(global.AnimationsConf = {});
})(this, (exports) => {
    const player = {
        var : {
            bool : {
                isRunning : false
            },
            number : {
                speed : 0,
            }
        },

        nodes : [
            "idle",
            "run"
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

            idle : {
                childs  : [
                    {
                        name : "run",
                        conditions : [
                            {
                                type : "number",
                                varName : "speed",
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
                                varName : "speed",
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