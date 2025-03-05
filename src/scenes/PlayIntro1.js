class PlayIntro1 extends Phaser.Scene {
    constructor() {
        super('PlayIntro1')
    }


    create() {

        let video = this.add.video(640, 360, 'PlayIntro1').setOrigin(0.5, 0.5)
        video.play()


        video.on('complete', () => {
            console.log('PlayIntro1 video finished.') // debug message in case video doesn't play again
            this.scene.start('PlayIntro2')
        })
    }
}
