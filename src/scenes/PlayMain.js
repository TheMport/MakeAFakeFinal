class PlayMain extends Phaser.Scene {
    constructor() {
        super('PlayMain')
    }

    create() {

        //load PlayMain assets & sounds
        const  map = this.add.tilemap("map")
        const tileset = map.addTilesetImage("Room_Builder_Office_32x32","gameTileset")    //adjust to tilesheet name when i get it
        const walkableLayer = map.createLayer("Floors", gameTileset)
        const wallLayer = map.createLater("Walls", gameTileset)

        //PlayMain load objects

        //Player character sprite and animations
        this.player = this.physics.add.sprite(x,y, 'playerIdle')

        this.anims.create({
            key:'idle',
            frames: this.anims.generateFrameNumbers('playerIdle', {start: 0, end:5}),
            frameRate:10,
            repeat: -1
        })

        this.anims.create({
            key:'walk',
            frames: this.anims.generateFrameNumbers('playerWalk', {start: 0, end:5}),
            frameRate:12,
            repear: -1
        })

        this.player.play('idle')


        //add camera and collidable walls 


        //add player movement and controls
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {

        //player movement and controls
        if(this.cursors.left.isDown){
            this.player.setVelocityX(-160)
            this.player.play('walk',true)
            this.player.flipX = true;
        }else if(this.cursors.right.isDown){
            this.player.setVelocityX(160)
            this.player.play('walk',true)
            this.player.flipX = false;
        }else{
            this.player.setVelocityX(0)
            this.player.play('idle',true)
        }

    }



















};