class PlayerSystem {
    constructor(scene, playerSprite) {
        this.scene = scene;
        this.player = playerSprite;
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.speed = 200;
    }

    update() {
        this.player.setVelocity(0);
        if(this.cursors.left.isDown) this.player.setVelocityX(-this.speed);
        if(this.cursors.right.isDown) this.player.setVelocityX(this.speed);
        if(this.cursors.up.isDown) this.player.setVelocityY(-this.speed);
        if(this.cursors.down.isDown) this.player.setVelocityY(this.speed);
    }

    getPosition() {
        return {x: this.player.x, y: this.player.y};
    }
}