class PlayMain extends Phaser.Scene {
    constructor() {
        super('PlayMain')
    }

    create() {

        //load PlayMain assets & sounds
        const  map = this.add.tilemap("map")
        const tileset = map.addTilesetImage("Room_Builder_Office_32x32","gameTileset")    //adjust to tilesheet name when i get it
        const walkableLayer = map.createLayer("Floors", tileset)
        const wallLayer = map.createLayer("Walls", tileset)
        const wallBounds = map.getObjectLayer("WallBounds") //get wall bounds from tilemap



        
        //this.physics.add.collider(player, wallBounds)



        //PlayMain load objects

        //Player character sprite and animations
        this.player = this.physics.add.sprite(1,1, 'playerIdle')

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
        this.camera.main.startFollow(this.player)
        this.camera.main.setZoom(2)

        //add player movement and controls
        this.cursors = this.input.keyboard.createCursorKeys()

                //set collision for wall layer
        wallBounds.setCollisionByProperty({collides:true})
        wallLayer.setCollisionByProperty({collides:true})
        this.physics.add.collider(player, wallBounds)
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