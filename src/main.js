

'use strict'

let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [preload, mainMenu, PlayIntro1,PlayIntro2,PlayMain]
}


// define game
let game = new Phaser.Game(config)

// define globals

let keySpace,keyReset