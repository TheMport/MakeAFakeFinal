class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    preload() {
        this.load.image('gameOver', 'assets/otherImages/gameOver.png')
        }

    create() {
        this.add.image(640, 360, 'gameOver').setOrigin(0.5, 0.5)



        this.input.keyboard.on('keydown-R', () => {
            this.scene.start('PlayMain');
        });

        this.input.keyboard.on('keydown-M', () => {
            this.scene.start('mainMenu');
        });
    }
}