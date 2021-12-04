((global, factory) => {
    factory(global.ParticleSystemConf = {});
})(this, (exports) => {
    const test = {
        rateOverTime : 1000,
        duration : 0.1,
        particleLifeTime : 0.5,
        gravity : 0,
        decreaseOverTime : true,
        loop : false,

        colors : [
            new Color(231, 127, 103),
            new Color(225, 95, 65),
            new Color(243, 166, 131),
        ],

        velocityRange : {
            min : 0,
            max : 5
        },

        particleSize : {
            max : 5,
            min : 1,
        },
    };

    exports.test = test;
});