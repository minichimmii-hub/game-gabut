class NPCSystem {
    constructor(scene) {
        this.scene = scene;
        this.npcs = [];
    }

    spawn(x, y, sprite, dialogArray) {
        let npc = this.scene.physics.add.sprite(x, y, sprite);
        npc.dialog = dialogArray;
        this.npcs.push(npc);
    }

    interact(player) {
        this.npcs.forEach(npc => {
            let dx = player.x - npc.x;
            let dy = player.y - npc.y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if(dist < 50){
                let index = Math.floor(Math.random()*npc.dialog.length);
                return npc.dialog[index];
            }
        });
        return null;
    }
}