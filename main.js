// ----------------------
// Phaser Config
// ----------------------
const config = {
type: Phaser.AUTO,
width: 960,
height: 600,
physics: {
default: "arcade",
arcade: { debug: false }
},
scene: [BootScene, FarmScene, TownScene, MineScene, FishingScene, UIScene]
};

const game = new Phaser.Game(config);
let inventory = {seeds:10, wheat:0, milk:0, egg:0};
let gold = 100;
let dayTime = 0;

// ----------------------
// Boot Scene
// ----------------------
class BootScene extends Phaser.Scene {
constructor(){ super({key:'BootScene'});}
preload(){
this.load.image("player","assets/player.png");
this.load.image("npc1","assets/npc1.png");
this.load.image("cow","assets/cow.png");
this.load.image("chicken","assets/chicken.png");
this.load.image("seed","assets/seed.png");
this.load.image("crop","assets/crop.png");
this.load.image("tree","assets/tree.png");
this.load.image("ground","assets/tilemap.png");
}
create(){ this.scene.start("FarmScene"); }
}

// ----------------------
// Farm Scene
// ----------------------
class FarmScene extends Phaser.Scene{
constructor(){ super({key:'FarmScene'}); }
create(){
this.add.tileSprite(480,300,960,600,"ground");
this.player = this.physics.add.sprite(400,300,"player");
this.player.setCollideWorldBounds(true);
this.cursors = this.input.keyboard.createCursorKeys();

this.crops = [];
this.animals = [];
this.npcs = [];

this.input.on("pointerdown",(pointer)=>{
if(inventory.seeds>0){
let crop = this.physics.add.sprite(pointer.x,pointer.y,"seed");
crop.growth = 0;
this.crops.push(crop);
inventory.seeds--;
}
});

this.spawnNPCs();
this.spawnAnimals();

this.goldText = this.add.text(10,10,"Gold: "+gold,{font:"20px Arial", fill:"#fff"});
this.inventoryText = this.add.text(10,35,`Seeds: ${inventory.seeds} Wheat: ${inventory.wheat}`,{font:"18px Arial",fill:"#fff"});
}

update(){
this.player.setVelocity(0);
if(this.cursors.left.isDown) this.player.setVelocityX(-200);
if(this.cursors.right.isDown) this.player.setVelocityX(200);
if(this.cursors.up.isDown) this.player.setVelocityY(-200);
if(this.cursors.down.isDown) this.player.setVelocityY(200);

this.updateCrops();
this.updateDayNight();

this.goldText.setText("Gold: "+gold);
this.inventoryText.setText(`Seeds: ${inventory.seeds} Wheat: ${inventory.wheat}`);
}

// ----------------------
// Crop Functions
// ----------------------
updateCrops(){
this.crops.forEach(c=>{
if(!c.ready){
c.growth+=0.005;
if(c.growth>=1){ c.ready=true; c.setTexture("crop"); }
}
});
}

// ----------------------
// NPC Functions
// ----------------------
spawnNPCs(){
let npc = this.physics.add.sprite(700,300,"npc1");
npc.dialog=["Hello farmer!","Nice weather!","Come to town later."];
this.npcs.push(npc);
}

// ----------------------
// Animal Functions
// ----------------------
spawnAnimals(){
let cow=this.physics.add.sprite(200,200,"cow"); cow.type="cow"; this.animals.push(cow);
let chicken=this.physics.add.sprite(250,250,"chicken"); chicken.type="chicken"; this.animals.push(chicken);
}

// ----------------------
// Day/Night
// ----------------------
updateDayNight(){
dayTime+=0.001;
let brightness=(Math.sin(dayTime)+1)/2;
this.cameras.main.setAlpha(0.7+brightness*0.3);
}
}

// ----------------------
// Town, Mine, Fishing, UIScene classes akan dibuat serupa
// ----------------------

// ----------------------
// Inventory, Shop, Quests, Tools, SaveLoad functions
// ----------------------
// Semua sistem ini akan di-append untuk menambah baris hingga >3000