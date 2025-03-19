class instructions extends Phaser.Scene {
    constructor() {
        super('instructions');
    }

    preload() {
        this.load.image('instructions', 'assets/otherImages/instructions.png')
        }

    create() {
        this.add.image(640, 360, 'instructions').setOrigin(0.5, 0.5)


        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    }

    update() {
        

        if (this.keySpace.isDown) {
            this.scene.start('mainMenu')
        }

    }
}