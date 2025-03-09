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



    }
    create() { 

        this.scene.start('mainMenu')
        
    }


};