class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    create() {
        this.add.text(20, 20, 'Game Over', { fontSize: '32px', fill: '#fff' });
        this.add.text(20, 60, 'Press R to restart', { fontSize: '32px', fill: '#fff' });

        this.input.keyboard.on('keydown-R', () => {
            this.scene.start('PlayMain');
        });
    }
}