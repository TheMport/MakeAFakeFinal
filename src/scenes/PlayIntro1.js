class PlayIntro1 extends Phaser.Scene {
    constructor() {
        super('PlayIntro1');
    }

    create() {
        // Play the intro video
        let video = this.add.video(640, 360, 'PlayIntro1').setOrigin(0.5, 0.5);
        video.play();

        // Wait for a user interaction to start audio
        this.input.once('pointerdown', () => {
            console.log('User interacted, starting audio...');
            if (!this.sound.context.state || this.sound.context.state === 'suspended') {
                this.sound.context.resume().then(() => {
                    console.log('AudioContext resumed');
                });
            }
        });

        // Once the video finishes, transition to the main menu
        video.on('complete', () => {
            console.log('PlayIntro1 video finished.');
            this.scene.start('mainMenu');
        });

        // Allow skipping the intro by pressing SPACE
        this.input.keyboard.on('keydown-SPACE', () => {
            console.log('Skipping PlayIntro1...');
            video.stop();
            this.scene.start('mainMenu');
        });
    }
}

