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
        this.load.image('MainMenuPage', 'assets/tempMM.png')

        //load instructions assets


        //load tilemap

        //load spritesheets

        //load in game sounds
        //this.load.audio('SAMPLE', 'assets/SAMPLE.MP3')        
        //music and sound effects


    }
    create() { 
        this.scene.start('mainMenu')
        
    }


};