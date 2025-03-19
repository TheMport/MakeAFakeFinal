class escapeWin extends Phaser.Scene {
    constructor() {
        super('escapeWin');
    }

    preload() {
        // Load the win screen image and winner music
        this.load.image('youWin', 'assets/otherImages/YouWin.png');
        this.load.audio('winnermusic', 'assets/Intros/winnermusic.mp3');
    }

    create() {
        // Add the win screen image
        this.add.image(640, 360, 'youWin').setOrigin(0.5, 0.5);

        // Stop any previous music before playing winner theme
        this.sound.stopAll();

        // Play winner music (non-looping)
        this.winnerMusic = this.sound.add('winnermusic', { loop: false, volume: 0.5 });
        this.winnerMusic.play();

        // Handle input: "R" to Restart
        this.input.keyboard.on('keydown-R', () => {
            this.winnerMusic.stop(); // Stop music before restarting
            this.scene.start('PlayMain');
        });

        // Handle input: "M" to return to Main Menu
        this.input.keyboard.on('keydown-M', () => {
            this.winnerMusic.stop(); // Stop music before going to Main Menu
            this.scene.start('mainMenu');
        });
    }
}

