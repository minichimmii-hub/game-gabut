class DayNightSystem {
    constructor(scene) {
        this.scene = scene;
        this.time = 0;
    }

    update(delta) {
        this.time += delta*0.001;
        let brightness = (Math.sin(this.time)+1)/2;
        this.scene.cameras.main.setAlpha(0.7 + brightness*0.3);
    }

    getTime() {
        return this.time;
    }
}