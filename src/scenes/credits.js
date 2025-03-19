class credits extends Phaser.Scene {
    constructor() {
        super('credits');
    }

    preload() {
        this.load.image('credits', 'assets/otherImages/credits.png')
        }

    create() {
        this.add.image(640, 360, 'credits').setOrigin(0.5, 0.5)


        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    }

    update() {
        

        if (this.keySpace.isDown) {
            this.scene.start('mainMenu')
        }

    }
}