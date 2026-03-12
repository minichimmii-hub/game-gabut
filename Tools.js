class ToolSystem {
    constructor(player) {
        this.player = player;
        this.selectedTool = "hoe";
    }

    useTool(crops) {
        if(this.selectedTool=="hoe") {
            // implement logic for tilling/planting
        }
        else if(this.selectedTool=="watering") {
            crops.forEach(c=>{
                c.growth += 0.1;
            });
        }
    }

    selectTool(tool) {
        this.selectedTool = tool;
    }
}