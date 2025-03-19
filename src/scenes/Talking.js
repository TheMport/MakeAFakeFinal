class Talking extends Phaser.Scene {
    constructor() {
        super("Talking");
    }

    preload() {
        // Load the font using the FontFace API
        let pixelFont = new FontFace('PixelFont', 'url(assets/fonts/pixel.ttf)');
        pixelFont.load().then((font) => {
            document.fonts.add(font);
            console.log("Pixel font loaded!");
        });

        // Load dialogue JSON data
        this.load.json('dialog', 'assets/json/dialog.json');
    }

    create() {
        console.log("Talking scene started!");

        // Stop any previous sounds before playing this scene
        this.sound.stopAll();

        // Play the background music for this scene
        this.dialogMusic = this.sound.add('intro1Scene', { loop: true, volume: 0.5 });
        this.dialogMusic.play();

        // Dialog Box Constants
        this.TEXT_X = 250;  // Align text to start from the left side
        this.TEXT_Y = this.scale.height / 2 - 70;  // Slightly above center
        this.NEXT_X = this.scale.width / 1.5;  // Centered horizontally
        this.NEXT_Y = this.scale.height - 80; // Positioned at the bottom
        this.TEXT_SIZE = "32px";
        this.TEXT_MAX_WIDTH = 800; // Adjust width for better text wrapping
        this.LETTER_TIMER = 30;
        this.NEXT_TEXT = "Press Space To Continue";

        // Dialog Tracking Variables
        this.dialogConvo = 0;
        this.dialogLine = 0;
        this.dialogTyping = false;

        // Load dialogue JSON data
        this.dialog = this.cache.json.get('dialog');

        // Create text objects
        this.dialogText = this.add.text(this.TEXT_X, this.TEXT_Y, "", {
            fontFamily: "PixelFont",
            fontSize: this.TEXT_SIZE,
            color: "#ffffff",
            wordWrap: { width: this.TEXT_MAX_WIDTH }
        });

        this.nextText = this.add.text(this.NEXT_X, this.NEXT_Y, "", {
            fontFamily: "PixelFont",
            fontSize: this.TEXT_SIZE,
            color: "#ffffff"
        }).setOrigin(1);

        // Handle input
        this.cursors = this.input.keyboard.createCursorKeys();

        // Start first dialogue
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

            // Stop the music before transitioning to the next scene
            if (this.dialogMusic && this.dialogMusic.isPlaying) {
                this.dialogMusic.stop();
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

                // Stop the music before transitioning to the next scene
                if (this.dialogMusic && this.dialogMusic.isPlaying) {
                    this.dialogMusic.stop();
                }

                this.scene.start("PlayMain");
                return;
            }
        }

        let lineData = convo[this.dialogLine];
        let speaker = lineData.speaker;
        let text = `${speaker.toUpperCase()}: ${lineData.dialog}`;

        // Hide previous text and reset prompt
        this.dialogTyping = true;
        this.dialogText.setText("");
        this.nextText.setText("");

        // Typewriter effect
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