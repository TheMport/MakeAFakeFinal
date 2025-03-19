class Elevator extends Phaser.Scene {
    constructor() {
        super("Elevator");
    }

    preload() {
        let pixelFont = new FontFace('PixelFont', 'url(assets/fonts/pixel.ttf)');
        pixelFont.load().then((font) => {
            document.fonts.add(font);
            console.log("Pixel font loaded!");
        });

        // ✅ Load Elevator Background Image
        this.load.image('elevator', 'assets/otherImages/elevator.png');

        // ✅ Load Elevator-Specific Dialogue JSON
        this.load.json('elevatorDialog', 'assets/json/elevator.json');

        // ✅ Load Ambient Background Audio
        this.load.audio('ambient', 'assets/Intros/Ambient.mp3');
    }

    create() {
        console.log("Elevator scene started!");

        // ✅ Stop Any Previous Audio Before Playing This Scene
        this.sound.stopAll();

        // ✅ Play Ambient Background Audio (Looping)
        if (this.cache.audio.has('ambient')) {
            this.ambientMusic = this.sound.add('ambient', { loop: true, volume: 0.5 });
            this.ambientMusic.play();
        } else {
            console.error("❌ Audio file 'ambient' is missing from cache!");
        }

        // ✅ Add Elevator Background Image
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'elevator')
            .setOrigin(0.5, 0.5)
            .setDisplaySize(this.scale.width, this.scale.height);

        // ✅ Move Dialogue Box and Text to the Very Bottom
        this.TEXT_X = 50;  
        this.TEXT_Y = this.scale.height - 120;  
        this.TEXT_MAX_WIDTH = this.scale.width - 100;
        this.TEXT_SIZE = "32px";
        this.LETTER_TIMER = 30;
        this.NEXT_TEXT = "Press Space to Continue";

        this.dialogConvo = 0;
        this.dialogLine = 0;
        this.dialogTyping = false;
        this.dialog = this.cache.json.get('elevatorDialog');

        // ✅ Create a **FULL** Black Transparent Border Covering the Entire Bottom
        this.dialogBox = this.add.graphics();
        this.dialogBox.fillStyle(0x000000, 0.6); // 60% transparent black
        this.dialogBox.fillRect(0, this.scale.height - 150, this.scale.width, 150); // Covers entire bottom

        // ✅ Create Dialogue Text (WHITE FONT)
        this.dialogText = this.add.text(this.TEXT_X, this.TEXT_Y, "", {
            fontFamily: "PixelFont",
            fontSize: this.TEXT_SIZE,
            color: "#ffffff",
            wordWrap: { width: this.TEXT_MAX_WIDTH }
        });

        // ✅ Create "Press Space to Continue" Text at the **VERY BOTTOM**
        this.nextText = this.add.text(this.scale.width - 50, this.scale.height - 30, this.NEXT_TEXT, {
            fontFamily: "PixelFont",
            fontSize: "24px",
            color: "#ffffff"
        }).setOrigin(1);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.typeText();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space) && !this.dialogTyping) {
            this.typeText();
        }
    }

    typeText() {
        if (!this.dialog || this.dialogConvo >= this.dialog.length) {
            console.log("End of Conversations");

            // ✅ Stop Ambient Music Before Transitioning to the Next Scene
            if (this.ambientMusic && this.ambientMusic.isPlaying) {
                this.ambientMusic.stop();
            }

            this.scene.start("PlayMain");
            return;
        }

        let convo = this.dialog[this.dialogConvo];

        if (this.dialogLine >= convo.length) {
            this.dialogLine = 0;
            this.dialogConvo++;

            if (this.dialogConvo >= this.dialog.length) {
                console.log("No more conversations, exiting...");

                // ✅ Stop Ambient Music Before Transitioning
                if (this.ambientMusic && this.ambientMusic.isPlaying) {
                    this.ambientMusic.stop();
                }

                this.scene.start("PlayMain");
                return;
            }
        }

        let lineData = convo[this.dialogLine];
        let speaker = lineData.speaker;
        let text = `${speaker.toUpperCase()}: ${lineData.dialog}`;

        this.dialogTyping = true;
        this.dialogText.setText("");
        this.nextText.setText("");

        let currentChar = 0;
        let textTimer = this.time.addEvent({
            delay: this.LETTER_TIMER,
            repeat: text.length - 1,
            callback: () => {
                this.dialogText.text += text[currentChar];
                currentChar++;

                if (textTimer.getRepeatCount() === 0) {
                    this.nextText.setText(this.NEXT_TEXT);
                    this.dialogTyping = false;
                    textTimer.destroy();
                }
            },
            callbackScope: this
        });

        this.dialogLine++;
    }
}

