class PlayIntro1 extends Phaser.Scene {
    constructor() {
        super('PlayIntro1');
    }

    create() {
        
        let video = this.add.video(640, 360, 'tempIntro').setOrigin(0.5, 0.5);
        video.play(true);

        video.on('complete', () => {
            this.scene.start('PlayIntro2');
        });
    }
}
