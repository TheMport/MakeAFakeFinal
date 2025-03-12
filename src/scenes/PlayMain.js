class PlayMain extends Phaser.Scene {
    constructor() {
        super('PlayMain')

        this.keyCollected = 0
    }

    preload() {
        //Need to load in map assets in main scene otherwise it wont load

        //load PlayMain assets & sounds
        //load tiles & tilemap
        this.load.image("gameTileset", 'assets/GameTileset/1_Room_Builder_Office/Room_Builder_Office_32x32.png')
        this.load.tilemapTiledJSON("map", 'assets/SeveranceMap/SeveranceMap1.json')
        //console.log(map)


        //load spritesheets
        this.load.spritesheet("playerIdle",'assets/OfficeWorker/Office_Boss_Idle.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet("playerWalk",'assets/OfficeWorker/Office_Boss_Walk.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet("rotatingKey",'assets/keyAsset/key_32x32_24f.png', {frameWidth: 32, frameHeight: 32})

    }
    create() {

        //load PlayMain assets & sounds
        const  map = this.add.tilemap("map")
        console.log(map)
        const tileset = map.addTilesetImage("Room_Builder_Office_32x32","gameTileset")    //adjust to tilesheet name when i get it
        const floorLayer = map.createLayer("Floors", tileset)
        const wallLayer = map.createLayer("Walls", tileset)
        const wallBoundsLayer = map.getObjectLayer("WallBounds") //get wall bounds from tilemap

        //PlayMain load objects

        //Player character sprite and animations
        this.player = this.physics.add.sprite(64,544, 'playerIdle')
        //this.player.collider = world:wallRectangleCollider

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
            repeat: -1
        })

        this.player.play('idle')

        //add rotating key sprite and animations
        this.keyNotCollected = this.physics.add.sprite(1184,128, 'rotatingKey')

        this.anims.create({
            key:'rotate',
            frames: this.anims.generateFrameNumbers('rotatingKey', {start: 0, end:23}),
            frameRate:12,
            repeat: -1
        })

        this.keyNotCollected.play('rotate')


        //add camera and collidable walls 
        this.cameras.main.startFollow(this.player)
        this.cameras.main.setZoom(2.2)

        
        // Enable collision for player on the tilemap layer for walls

        this.physics.add.collider(this.player, wallLayer)
        //need to add list of all tiles used for bounds
        wallLayer.setCollisionBetween(149, 151)


        // Key HUD
        console.log(this.cameras.main.scrollX)
        console.log(this.cameras.main.scrollY)
        this.keyCollectedText = this.add.text(this.cameras.main.scrollX *2.2 + this.cameras.main.displayWidth *2.2 / 2,this.cameras.main.scrollY*2.2 + 16, 'Keys Collected: 0', {
            fontSize: '32px',
            fill: '#FFF'
        })
        console.log(this.keyCollectedText)

        this.physics.add.overlap(this.player, this.keyNotCollected, this.collectKey, null, this)

        //add timer if fail game over

        //add timer HUD

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
        }

        if(this.cursors.up.isDown){
            this.player.setVelocityY(-160)
            this.player.play('walk',true
            )
        }else if(this.cursors.down.isDown){
            this.player.setVelocityY(160)
            this.player.play('walk',true)
        }else{
            this.player.setVelocityY(0)
        }

        if(!this.cursors.left.isDown &&
            !this.cursors.right.isDown &&
            !this.cursors.up.isDown &&
            !this.cursors.down.isDown){
            this.player.play('idle')
        }
        

    }

    collectKey(player, key) {
        this.keyCollected++
        this.keyCollectedText.setText(`Keys Collected: ${this.keyCollected}`)
        key.destroy()
        console.log(`Key Collected: ${this.keyCollected}`)
    }
    


}
