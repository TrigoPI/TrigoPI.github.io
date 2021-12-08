((global, factory) => {
    factory(global.GameSettings = {});
})(this, (exports) => {
    const PATHS = {
        audios : {
            slider          : "Ressources/Audios/Menu/slider.wav",
            mouseHover      : "Ressources/Audios/Menu/test.wav",
            gameStart       : "Ressources/Audios/Menu/gameStart.ogg",
            kyaa            : "Ressources/Audios/Menu/kyaa.mp3",
            footStep1       : "Ressources/Audios/Player/boots_step_left_1.wav",
            footStep2       : "Ressources/Audios/Player/boots_step_left_2.wav",
            footStep3       : "Ressources/Audios/Player/boots_step_left_3.wav",
            footStep4       : "Ressources/Audios/Player/boots_step_right_1.wav",
            footStep5       : "Ressources/Audios/Player/boots_step_right_2.wav",
            footStep6       : "Ressources/Audios/Player/boots_step_right_3.wav",
            mainMusic       : "Ressources/Audios/Musics/mainMusic.mp3",
            explosionStart  : "Ressources/Audios/Explosions/explodeStart.wav",
            bulletExplosion : "Ressources/Audios/Explosions/bulletExplosion.wav",
        },

        images : {
            farBuildings    : "Ressources/Images/Backgrounds/far-buildings.png",
            backbuildings   : "Ressources/Images/Backgrounds/back-buildings.png",
            foreground      : "Ressources/Images/Backgrounds/foreground.png",
        },
        
        spriteSheets : {
            playerIdle      : "Ressources/Images/SpriteSheets/Player/idle.png",
            playerRun       : "Ressources/Images/SpriteSheets/Player/run.png",
            playerJump      : "Ressources/Images/SpriteSheets/Player/jump.png",
            menuBackground  : "Ressources/Images/SpriteSheets/Menu/menuBackground.png",
            drone           : "Ressources/Images/SpriteSheets/Drone/drone.png",
            pnj1Walk        : "Ressources/Images/SpriteSheets/PNJ/pnj1/walk.png",
            pnj1Hurt        : "Ressources/Images/SpriteSheets/PNJ/pnj1/hurt.png",
            explosion1      : "Ressources/Images/SpriteSheets/Explosion/explosion-4.png",
            bulletExplosion : "Ressources/Images/SpriteSheets/Explosion/bulletExplosion.png",
            bullet1         : "Ressources/Images/SpriteSheets/Bullets/bullet1.png",
            bullet2         : "Ressources/Images/SpriteSheets/Bullets/bullet2.png",
            flyingUnit      : "Ressources/Images/SpriteSheets/Boss/flyingUnit.png",
            smoke           : "Ressources/Images/SpriteSheets/Effects/smoke.png",
            shield          : "Ressources/Images/SpriteSheets/Effects/shield.png",
            groundFire      : "Ressources/Images/SpriteSheets/Effects/groundFire.png"
        }
    };

    const AUDIOS = {
        mouseHover      : new Sound(PATHS.audios.mouseHover),
        slider          : new Sound(PATHS.audios.slider),
        gameStart       : new Sound(PATHS.audios.gameStart),
        kyaa            : new Sound(PATHS.audios.kyaa),
        footStep1       : new Sound(PATHS.audios.footStep1),
        footStep2       : new Sound(PATHS.audios.footStep2),
        footStep3       : new Sound(PATHS.audios.footStep3),
        footStep4       : new Sound(PATHS.audios.footStep4),
        footStep5       : new Sound(PATHS.audios.footStep5),
        footStep6       : new Sound(PATHS.audios.footStep6),
        mainMusic       : new Sound(PATHS.audios.mainMusic),
        explosionStart  : new Sound(PATHS.audios.explosionStart),
        bulletExplosion : new Sound(PATHS.audios.bulletExplosion),
    };

    const TEXTURES = {
        sprites : {
            foreground      : new Sprite(0, 0, PATHS.images.foreground),
            backbuildings   : new Sprite(0, 0, PATHS.images.backbuildings),
            farBuildings    : new Sprite(0, 0, PATHS.images.farBuildings),
        },

        spriteSheets : {
            playerIdle      : new SpriteSheet(0, 0, PATHS.spriteSheets.playerIdle, 1, 4, 4),
            playerRun       : new SpriteSheet(0, 0, PATHS.spriteSheets.playerRun, 1, 8, 8),
            playerJump      : new SpriteSheet(0, 0, PATHS.spriteSheets.playerJump, 1, 7, 7),
            menuBackground  : new SpriteSheet(0, 0, PATHS.spriteSheets.menuBackground, 6, 12, 72),
            drone           : new SpriteSheet(0, 0, PATHS.spriteSheets.drone, 1, 8, 8),
            pnj1Walk        : new SpriteSheet(0, 0, PATHS.spriteSheets.pnj1Walk, 3, 6, 16),
            pnj1Hurt        : new SpriteSheet(0, 0, PATHS.spriteSheets.pnj1Hurt, 1, 1, 1),
            explosion1      : new SpriteSheet(0, 0, PATHS.spriteSheets.explosion1, 1, 12, 12),
            bulletExplosion : new SpriteSheet(0, 0, PATHS.spriteSheets.bulletExplosion, 1, 8, 8),
            bullet1         : new SpriteSheet(0, 0, PATHS.spriteSheets.bullet1, 6, 5, 30),
            bullet2         : new SpriteSheet(0, 0, PATHS.spriteSheets.bullet2, 8, 8, 61),
            flyingUnit      : new SpriteSheet(0, 0, PATHS.spriteSheets.flyingUnit, 1, 8, 8),
            smoke           : new SpriteSheet(0, 0, PATHS.spriteSheets.smoke, 5, 12, 16),
            shield          : new SpriteSheet(0, 0, PATHS.spriteSheets.shield, 5, 1, 5),
            groundFire      : new SpriteSheet(0, 0, PATHS.spriteSheets.groundFire, 8, 8, 61),
        }
    }

    exports.AUDIOS      = AUDIOS;
    exports.TEXTURES    = TEXTURES; 
    exports.PATHS       = PATHS;
    exports.TEXTURES    = TEXTURES;
});