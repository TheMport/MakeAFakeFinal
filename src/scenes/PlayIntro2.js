class PlayIntro2 extends Phaser.Scene {
    constructor() {
        super('PlayIntro2')
    }

    create() {
        

        let video = this.add.video(640, 360, 'PlayIntro2').setOrigin(0.5, 0.5)
        video.play()
        

        video.on('complete', () => {
            console.log('PlayIntro2 video finished.') // debug message in case video doesn't play again
            this.scene.start('PlayMain')
        })
    }
}