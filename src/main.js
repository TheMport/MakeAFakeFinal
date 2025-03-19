// Name: Jennie Le & Miguel Comonfort
// Game: Severance: Get To The OTC!
// Completion Time: 40 Hours

// Components used in this scene:
// Physics system (for movement and collisions)
// Animation manager (for sprite animations)
// Tilemaps (for level design) 
// UI (for displaying game information) 
// Audio (for sound effects and music
// Input (for player controls) 
// Scenes (for managing different parts of the game) 
// Camera (for following the player) 
// Tweens (for animations and transitions) 
// Time (for tracking game time) 

// Music Credit: Free sounds from Pixabay.com 
// https://www.youtube.com/watch?v=lBzegiTr1Ao&list=PL32bE3Gvp-kTMQMJ1lz9_2AgLiOt_YYLr&index=2&ab_channel=TheodoreShapiro-Topic
// https://www.youtube.com/watch?v=i2cU70DLj1k&ab_channel=MrGrappl

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
    scene: [preload,mainMenu,PlayIntro1,instructions,credits,Talking,Elevator,PlayMain,GameOver,escapeWin]
}
// define game
let game = new Phaser.Game(config)

// define globals

let keySpace,keyReset