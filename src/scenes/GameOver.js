class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    preload() {
        this.load.image('gameOver', 'assets/otherImages/gameOver.png');
        this.load.audio('themeSong', 'assets/Intros/ThemeSong.mp3');
    }

    create() {
        this.add.image(640, 360, 'gameOver').setOrigin(0.5, 0.5);

        this.sound.stopAll();

        // Play the game over theme song (non-looping)
        this.gameOverMusic = this.sound.add('themeSong', { loop: false, volume: 0.5 });
        this.gameOverMusic.play();

        // Handle input: R to Restart, M to return to Main Menu
        this.input.keyboard.on('keydown-R', () => {
            this.gameOverMusic.stop(); // Stop music before restarting
            this.scene.start('PlayMain');
        });

        this.input.keyboard.on('keydown-M', () => {
            this.gameOverMusic.stop(); // Stop music before going to Main Menu
            this.scene.start('mainMenu');
        });
    }
}
