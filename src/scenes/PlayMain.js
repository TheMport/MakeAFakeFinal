class PlayMain extends Phaser.Scene {
    constructor() {
        super('PlayMain')
    }

    preload() {
        //Need to load in map assets in main scene otherwise it wont load

        //load PlayMain assets & sounds
        //load tiles & tilemap
        this.load.image("gameTileset", 'assets/GameTileset/1_Room_Builder_Office/Room_Builder_Office_32x32.png')
        this.load.tilemapTiledJSON("map", 'assets/SeveranceMap/SeverenceMap.json')

        //load spritesheets
        this.load.spritesheet("playerIdle",'assets/OfficeWorker/Office_Boss_Idle.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet("playerWalk",'assets/OfficeWorker/Office_Boss_Walk.png', {frameWidth: 32, frameHeight: 32})

    }
    create() {

        //load PlayMain assets & sounds
        const  map = this.add.tilemap("map")
        const tileset = map.addTilesetImage("Room_Builder_Office_32x32","gameTileset")    //adjust to tilesheet name when i get it
        const floorLayer = map.createLayer("Floors", tileset)
        const wallLayer = map.createLayer("Walls", tileset)
        const wallBoundsLayer = map.getObjectLayer("WallBounds") //get wall bounds from tilemap

        //PlayMain load objects

        //Player character sprite and animations
        this.player = this.physics.add.sprite(64,544, 'playerIdle')

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


        //add camera and collidable walls 
        this.cameras.main.startFollow(this.player)
        this.cameras.main.setZoom(2)

        
        // Enable collision on the tilemap layer for walls
        // not working properly
        wallLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, wallLayer);
        

        //this.physics.add.collider(this.player, wall);
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

    }



















};