class CropSystem {
    constructor(scene) {
        this.scene = scene;
        this.crops = [];
    }

    plant(x, y) {
        let crop = this.scene.physics.add.sprite(x, y, "seed");
        crop.growth = 0;
        crop.ready = false;
        this.crops.push(crop);
    }

    update() {
        this.crops.forEach(crop => {
            if(!crop.ready) {
                crop.growth += 0.005;
                if(crop.growth >= 1) {
                    crop.ready = true;
                    crop.setTexture("crop");
                }
            }
        });
    }

    harvest() {
        let harvested = 0;
        this.crops.forEach(crop => {
            if(crop.ready) {
                crop.destroy();
                harvested++;
            }
        });
        this.crops = this.crops.filter(c => !c.ready);
        return harvested;
    }
}