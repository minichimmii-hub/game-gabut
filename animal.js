class AnimalSystem {
    constructor(scene) {
        this.scene = scene;
        this.animals = [];
    }

    spawn(type, x, y) {
        let animal = this.scene.physics.add.sprite(x, y, type);
        animal.type = type;
        this.animals.push(animal);
    }

    produce() {
        let products = {milk:0, egg:0};
        this.animals.forEach(a => {
            if(a.type=="cow") products.milk++;
            if(a.type=="chicken") products.egg++;
        });
        return products;
    }

    update() {
        this.animals.forEach(a => {
            a.x += Math.random()*2-1;
            a.y += Math.random()*2-1;
        });
    }
}