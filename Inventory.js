class InventorySystem {
    constructor() {
        this.items = {seeds:10, wheat:0, milk:0, egg:0};
    }

    addItem(item, qty=1) {
        if(!this.items[item]) this.items[item]=0;
        this.items[item] += qty;
    }

    removeItem(item, qty=1) {
        if(this.items[item]>=qty) this.items[item]-=qty;
    }

    getItemCount(item) {
        return this.items[item]||0;
    }
}