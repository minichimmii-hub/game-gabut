// ----------------------
// Town Scene
// ----------------------
class TownScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TownScene' });
    }

    preload() {
        this.load.image("townGround", "assets/ground.png");
        this.load.image("npc2", "assets/npc1.png");
        this.load.image("shop", "assets/tree.png"); // Placeholder for shop
        this.load.image("player", "assets/player.png");
    }

    create() {
        // Background
        this.add.tileSprite(480, 300, 960, 600, "townGround");

        // Player
        this.player = this.physics.add.sprite(400, 500, "player");
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();

        // NPCs
        this.npcs = [];
        this.spawnNPCs();

        // Shop
        this.shop = this.physics.add.sprite(700, 300, "shop");
        this.shop.setInteractive();
        this.shop.on("pointerdown", () => {
            this.openShop();
        });

        // Dialog text
        this.dialogBox = this.add.text(10, 550, "", { font: "16px Arial", fill: "#fff", wordWrap: { width: 940 } });
        this.dialogTimer = 0;
        this.dialogActive = false;

        // HUD
        this.goldText = this.add.text(10, 10, "Gold: " + gold, { font: "20px Arial", fill: "#fff" });
    }

    update(time, delta) {
        // Player movement
        this.player.setVelocity(0);
        if (this.cursors.left.isDown) this.player.setVelocityX(-200);
        if (this.cursors.right.isDown) this.player.setVelocityX(200);
        if (this.cursors.up.isDown) this.player.setVelocityY(-200);
        if (this.cursors.down.isDown) this.player.setVelocityY(200);

        // Check NPC interaction
        this.npcs.forEach(npc => {
            let dx = this.player.x - npc.x;
            let dy = this.player.y - npc.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 50 && !this.dialogActive) {
                this.showDialog(npc.dialog);
            }
        });

        // Update HUD
        this.goldText.setText("Gold: " + gold);

        // Dialog timer
        if (this.dialogActive) {
            this.dialogTimer += delta;
            if (this.dialogTimer > 3000) { // 3 detik per dialog
                this.dialogBox.setText("");
                this.dialogActive = false;
                this.dialogTimer = 0;
            }
        }
    }

    // ----------------------
    // NPC Functions
    // ----------------------
    spawnNPCs() {
        let npc1 = this.physics.add.sprite(300, 200, "npc2");
        npc1.dialog = ["Hi there!", "Welcome to town!", "Check the shop!"];
        this.npcs.push(npc1);

        let npc2 = this.physics.add.sprite(500, 350, "npc2");
        npc2.dialog = ["Good day farmer!", "Did you sell your crops?", "Come back later."];
        this.npcs.push(npc2);
    }

    showDialog(dialogArray) {
        let index = Math.floor(Math.random() * dialogArray.length);
        this.dialogBox.setText(dialogArray[index]);
        this.dialogActive = true;
        this.dialogTimer = 0;
    }

    // ----------------------
    // Shop
    // ----------------------
    openShop() {
        // Sederhana: pilih seeds
        let buySeeds = confirm("Buy 5 seeds for 10 gold?");
        if (buySeeds && gold >= 10) {
            inventory.seeds += 5;
            gold -= 10;
            alert("Bought 5 seeds!");
        } else if (buySeeds) {
            alert("Not enough gold!");
        }
    }
}