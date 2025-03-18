//// Name: Jennie Le & Miguel Comonfort
// Game: Severance: Get To The OTC!
// Completion Time: 
// Physics system (for movement and collisions) +1
// Animation manager (for sprite animations) +1
// Tilemaps (for level design) +1

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
    //scene: [preload,mainMenu,PlayIntro1,Talking,PlayMain]
    scene: [PlayMain,GameOver]
}

// define game
let game = new Phaser.Game(config)

// define globals

let keySpace,keyReset