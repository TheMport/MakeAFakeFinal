class PlayIntro3 extends Phaser.Scene {
    constructor() {
        super('PlayIntro3');
    }

    create() {
        
        let video = this.add.video(640, 360, 'PlayIntro3').setOrigin(0.5, 0.5);
        video.play(true);
        

        video.on('complete', () => {
            this.scene.start('PlayIntro4');
        });
    }

    update(){}
}
