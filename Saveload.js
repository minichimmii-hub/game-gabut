class SaveLoadSystem {
    constructor(inventory, gold) {
        this.inventory = inventory;
        this.gold = gold;
    }

    save() {
        localStorage.setItem("inventory", JSON.stringify(this.inventory.items));
        localStorage.setItem("gold", JSON.stringify(this.gold));
    }

    load() {
        let inv = JSON.parse(localStorage.getItem("inventory"));
        if(inv) this.inventory.items = inv;
        let g = JSON.parse(localStorage.getItem("gold"));
        if(g) this.gold = g;
    }
}