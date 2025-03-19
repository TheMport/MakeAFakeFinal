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
        //loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)

        //preview aike mp4 intro

        //load the bg music 
        this.load.audio('themeSong', 'assets/Intros/ThemeSong.mp3');

        //load the winner bg music 
        this.load.audio('winnermusic', 'assets/Intros/winnermusic.mp3');

        //load intro1 theme 
        this.load.audio('ambient', 'assets/Intros/Ambient.mp3');

        //load gameplay bg music 
        this.load.audio('gamePlay', 'assets/Intros/Gameplay.mp3');

        //load main menu assets & sounds
        this.load.video('MainMenuIntro','assets/Intros/Severance_MM.mp4')

        //load PlayIntro1 assets & sounds
        this.load.video('PlayIntro1', 'assets/Intros/PlayIntro1.mp4')
        
        //load PlayIntro2 assets & sounds
        this.load.video('PlayIntro2', 'assets/Intros/PlayIntro2.mp4')

        //load gameOver assets & sounds
        this.load.image('gameOver', 'assets/otherImages/gameOver.png')

        // elevator scene bg
        this.load.image('elevator', 'assets/otherImages/elevator.png')

        this.load.image('youWin', 'assets/otherImages/youWin.png')
        //load escapeWin assets & sounds


    }
    create() { 

        this.scene.start('mainMenu')
        
    }


};