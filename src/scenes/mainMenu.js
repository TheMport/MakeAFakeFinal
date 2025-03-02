class mainMenu extends Phaser.Scene {
    constructor() { 
        super('mainMenu')
    }

    create() { 

        this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,'MainMenuPage').setOrigin(0.5,0.5).setDepth(2)




        
        //main menu key commands (space to start, I for instructions)
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)


    }

    update() {
        

        if (this.keySpace.isDown) {
            this.scene.start('PlayIntro')
        }

    }

};