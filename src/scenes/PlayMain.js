class PlayMain extends Phaser.Scene {
    constructor() {
        super('PlayMain')

        this.keyCollected = 0

    }

    preload() {

        //load PlayMain assets & sounds
        //load tiles & tilemap
        this.load.image("gameTileset", 'assets/GameTileset/1_Room_Builder_Office/Room_Builder_Office_32x32.png')
        this.load.image("furnitureTileset", 'assets/GameTileset/2_Modern_Office_Black_Shadow/Modern_Office_Black_Shadow_32x32.png')
        this.load.tilemapTiledJSON("map", 'assets/SeveranceMap/SeveranceMap.json')



        //load spritesheets
        this.load.spritesheet("playerIdle",'assets/OfficeWorker/Office_Boss_Idle.png', {frameWidth: 45, frameHeight: 45})
        this.load.spritesheet("playerWalk",'assets/OfficeWorker/Office_Boss_Walk.png', {frameWidth: 45, frameHeight: 45})

        this.load.spritesheet("rotatingKey1",'assets/keyAsset/key_32x32_24f.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet("rotatingKey2",'assets/keyAsset/key_32x32_24f.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet("rotatingKey3",'assets/keyAsset/key_32x32_24f.png', {frameWidth: 32, frameHeight: 32})

        this.load.audio('gamePlay', 'assets/Intros/Gameplay.mp3');

        // Debug: Track when textures are loaded
        this.textures.on('addtexture', (key) => {
            console.log(`Texture loaded: ${key}`)
        });

    }
    create() {

        //load PlayMain assets & sounds
        const  map = this.add.tilemap("map")
        console.log(map)
        const tileset = map.addTilesetImage("Room_Builder_Office_32x32","gameTileset")    //adjust to tilesheet name when i get it
        const tileset2 = map.addTilesetImage("Modern_Office_Black_Shadow_32x32","furnitureTileset")    //adjust to tilesheet name when i get it
        const floorLayer = map.createLayer("Floors", tileset)
        const wallLayer = map.createLayer("Walls", tileset)
        const furnitureLayer1 = map.createLayer("Funiture", tileset2)
        const furnitureLayer2 = map.createLayer("Funiture 2", tileset2)
        const furnitureLayer3 = map.createLayer("Funiture 3", tileset2)


        if (!this.sound.get('gamePlay')) {
            this.themeMusic = this.sound.add('gamePlay', { loop: true, volume: 0.5 });
            this.themeMusic.play();
        }

        // Set up collision for walls
        if (!wallLayer.layer.properties || !wallLayer.layer.properties.find(p => p.name === "collides")) {
            wallLayer.setCollisionByExclusion([-1])  // Make all tiles collide except empty ones
        }

        if (!furnitureLayer1.layer.properties || !furnitureLayer1.layer.properties.find(p => p.name === "collides")) {
            furnitureLayer1.setCollisionByExclusion([-1])  // Make all tiles collide except empty ones
        }

        if (!furnitureLayer2.layer.properties || !furnitureLayer2.layer.properties.find(p => p.name === "collides")) {
            furnitureLayer2.setCollisionByExclusion([-1])  // Make all tiles collide except empty ones
        }

        if (!furnitureLayer3.layer.properties || !furnitureLayer3.layer.properties.find(p => p.name === "collides")) {
            furnitureLayer3.setCollisionByExclusion([-1])  // Make all tiles collide except empty ones
        }


        //player spawn according to our map
        let playerX = 1600;
        let playerY = 1568;
        
        const spawnPoint = map.getObjectLayer('PlayerSpawn')
        if (spawnPoint && spawnPoint.objects && spawnPoint.objects.length > 0) {
            playerX = spawnPoint.objects[0].x;
            playerY = spawnPoint.objects[0].y;
        }

        

        

        // Enable collision for walls
        wallLayer.setCollisionByProperty({ collides: true })
        furnitureLayer1.setCollisionByProperty({ collides: true })
        furnitureLayer2.setCollisionByProperty({ collides: true })
        furnitureLayer3.setCollisionByProperty({ collides: true })

        // Debug collision detection
        //this.physics.world.createDebugGraphic();
        //wallLayer.renderDebug(this.add.graphics(), {
        //tileColor: null,
        //collidingTileColor: new Phaser.Display.Color(255, 0, 0, 150),
        //});
        //PlayMain load objects

        //Player character sprite and animations
        this.player = this.physics.add.sprite(1600, 1568, 'playerIdle')

        this.physics.world.enable(this.player)
        this.player.body.setSize(32, 32)
        this.player.body.setOffset(6, 14)


        this.physics.add.collider(this.player, wallLayer)
        this.physics.add.collider(this.player, furnitureLayer1)
        this.physics.add.collider(this.player, furnitureLayer2)
        this.physics.add.collider(this.player, furnitureLayer3)


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
        this.keyNotCollected1 = this.physics.add.sprite(64,1312, 'rotatingKey1')
        this.keyNotCollected2 = this.physics.add.sprite(1792,2912, 'rotatingKey2')
        this.keyNotCollected3 = this.physics.add.sprite(1760.00,448.00, 'rotatingKey3')


        this.anims.create({
            key:'rotatingKey1',
            frames: this.anims.generateFrameNumbers('rotatingKey1', {start: 0, end:23}),
            frameRate:12,
            repeat: -1
        })

        this.anims.create({
            key:'rotatingKey2',
            frames: this.anims.generateFrameNumbers('rotatingKey2', {start: 0, end:23}),
            frameRate:12,
            repeat: -1
        })

        this.anims.create({
            key:'rotatingKey3',
            frames: this.anims.generateFrameNumbers('rotatingKey3', {start: 0, end:23}),
            frameRate:12,
            repeat: -1
        })

        this.keyNotCollected1.play('rotatingKey1')
        this.keyNotCollected2.play('rotatingKey2')
        this.keyNotCollected3.play('rotatingKey3')

        this.keysGroup = this.physics.add.group([
            this.keyNotCollected1,
            this.keyNotCollected2,
            this.keyNotCollected3
        ]);

        // Camera setup
        this.cameras.main.startFollow(this.player)

        
       // Set the camera zoom
       const cameraZoom = 2.2;
       this.cameras.main.setZoom(cameraZoom)

       // Get the camera dimensions to make work with zoom
       const cameraWidth = this.cameras.main.width
       const cameraHeight = this.cameras.main.height
       
         // Set the font size based on the camera zoom
       const baseFontSize = 32;
       const adjustedFontSize = Math.ceil(baseFontSize / cameraZoom)
       

        console.log(this.cameras.main.scrollX)
        console.log(this.cameras.main.scrollY)

        this.keyCollectedText = this.add.text(cameraWidth/1.5,cameraHeight/3.4, 'Keys Collected: 0', {
            fontSize: `${adjustedFontSize}px`,
            fill: '#FFF',
            backgroundColor: '#00000080',
            padding: {
                x: Math.ceil(5 / cameraZoom),
                y: Math.ceil(3 / cameraZoom)
            }
        }).setOrigin(0).setScrollFactor(0).setDepth(100)
        this.keyCollectedText.setScrollFactor(0)
        this.keyCollectedText.setDepth(100)

        this.keyCollectedText.setScale(1 / cameraZoom)


        //debugging log
        console.log(this.keyCollectedText)


        this.physics.add.overlap(this.player, this.keysGroup, this.collectKey, null, this)

        //add timer if fail game over

        this.timeInSeconds = 180;
        this.timerCountDown = this.add.text(cameraWidth/1.51,cameraHeight/3.2, 'Seconds Remaining: '+this.timeInSeconds, {
            fontSize: `${adjustedFontSize}px`,
            fill: '#FFF',
            backgroundColor: '#00000080',
            padding: {
                x: Math.ceil(5 / cameraZoom),
                y: Math.ceil(3 / cameraZoom)
            }
        }).setOrigin(0).setScrollFactor(0).setDepth(100)

        this.timerCountDown.setScale(1 / cameraZoom)
        

        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });


        //add player movement and controls
        this.cursors = this.input.keyboard.createCursorKeys()

        // Debug graphics for collision visualization
        if (this.physics.config.debug) {
            const debugGraphics = this.add.graphics().setAlpha(0.7)
            wallLayer.renderDebug(debugGraphics, {
                tileColor: null,
                collidingTileColor: new Phaser.Display.Color(255, 0, 0, 150),
                faceColor: new Phaser.Display.Color(0, 255, 0, 150)
            })
        }
    

        
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

        updateTimer() {
            this.timeInSeconds--;
            this.timerCountDown.setText('Time Remaining: ' + this.timeInSeconds);
            
            // When time runs out go to game over 
            if (this.timeInSeconds <= 0) {
                this.timerEvent.remove();
                this.scene.start('GameOver')
            }
        }


    collectKey(player, key) {
        this.keyCollected++
        this.keyCollectedText.setText(`Keys Collected: ${this.keyCollected}`)
        key.destroy()
        console.log(`Key Collected: ${this.keyCollected}`)

        const originalScale = 1/this.cameras.main.zoom;


        this.tweens.add({
            targets: this.keyCollectedText,
            scale: { from: originalScale *1.2, to: originalScale },
            duration: 300,
            ease: 'Bounce.Out',
            onComplete:() => {
                this.keyCollectedText.setScale(originalScale)
            }
        })
        
        // Check if all keys are collected
        if (this.keyCollected === 3) {
            console.log("All keys collected!")
            this.scene.start('escapeWin')
        }
    }


}
