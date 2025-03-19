class mainMenu extends Phaser.Scene {
    constructor() { 
        super('mainMenu');
    }

    create() { 
        // Play main menu intro video
        let video = this.add.video(640, 360, 'MainMenuIntro').setOrigin(0.5, 0.5);
        video.play(true); 

        // Check if music is already playing to prevent overlapping
        if (!this.sound.get('themeSong')) {
            this.themeMusic = this.sound.add('themeSong', { loop: true, volume: 0.5 });
            this.themeMusic.play();
        }

        // Main menu key commands (Space to start, T for instructions, C for credits)
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.input.keyboard.on('keydown-T', () => {
            this.scene.start('instructions');
        });

        this.input.keyboard.on('keydown-C', () => {
            this.scene.start('credits');
        });
    }

    update() {
        if (this.keySpace.isDown) {
            this.themeMusic.stop();  // Stop music when transitioning to PlayIntro1
            this.scene.start('PlayIntro1');
        }
    }
}
