class preload extends Phaser.Scene {
    constructor() { 
        super('preload')
    }

    preload(){ 

        //loading bar
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })
        

        //simulate load time
        this.load.on('progress', (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
        })

        //preview aike mp4 intro


        //load main menu assets & sounds
        this.load.video('MainMenuIntro','assets/Intros/MainMenuIntro.mp4')
        //  Once space is hit send to PlayIntro1 scene to begin game

        //load dialogbox intro scene
        this.load.image('IntroDialogue', 'asset/IntroDialogue/dialogbox.png')

        //load PlayIntro1 assets & sounds
        this.load.video('PlayIntro1', 'assets/Intros/PlayIntro1.mp4')
        
        //load PlayIntro2 assets & sounds
        this.load.video('PlayIntro2', 'assets/Intros/PlayIntro2.mp4')

        //load PlayIntro3 assets & sounds


        //load PlayMain assets & sounds
        //load tiles & tilemap
        this.load.image("gameTileset", 'assets/GameTileset/1_Room_Builder_Office/Room_Builder_Office_32x32.png')
        this.load.tilemapTiledJSON("map", 'assets/SeverenceMap.json')

        //load spritesheets
        this.load.spritesheet('playerIdle','assets/Office_Boss_Idle.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('playerWalk','assets/Office_Boss_Walk.png', {frameWidth: 32, frameHeight: 32})




        //load in game sounds
        //this.load.audio('SAMPLE', 'assets/SAMPLE.MP3')        
        //music and sound effects


    }
    create() { 



        this.scene.start('mainMenu')
        
    }


};