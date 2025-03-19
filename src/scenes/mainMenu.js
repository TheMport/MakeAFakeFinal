class mainMenu extends Phaser.Scene {
    constructor() { 
        super('mainMenu')
    }

    create() { 

        let video = this.add.video(640, 360, 'MainMenuIntro').setOrigin(0.5, 0.5);
        video.play(true)    //makes it loop until space is pressed


        
        //main menu key commands (space to start, I for instructions)
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        
        this.input.keyboard.on('keydown-T', () => {
            this.scene.start('instructions')
        })

        this.input.keyboard.on('keydown-C', () => {
            this.scene.start('credits')
        })

    }

    update() {
        

        if (this.keySpace.isDown) {
            this.scene.start('PlayIntro1')
        }

    }

};