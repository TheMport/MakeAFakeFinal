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
        //this.load.on('progress', (percent) => {
        //    loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
        //s})

        //preview aike mp4 intro

        //load the bg music 
        this.load.audio('themeSong', 'assets/Intros/ThemeSong.mp3');

        //load intro1 theme 
        this.load.audio('intro1Scene', 'assets/Intros/Intro1Theme.mp3');

        //load gameplay bg music 
        this.load.audio('gamePlay', 'assets/Intros/Gameplay.mp3');

        //load main menu assets & sounds
        this.load.video('MainMenuIntro','assets/Intros/Severance_MM.mp4')
        //  Once space is hit send to PlayIntro1 scene to begin game

        //load PlayIntro1 assets & sounds
        this.load.video('PlayIntro1', 'assets/Intros/PlayIntro1.mp4')
        
        //load PlayIntro2 assets & sounds
        this.load.video('PlayIntro2', 'assets/Intros/PlayIntro2.mp4')

        //load gameOver assets & sounds
        this.load.image('gameOver', 'assets/otherImages/gameOver.png')

        //load escapeWin assets & sounds


    }
    create() { 

        this.scene.start('mainMenu')
        
    }


};