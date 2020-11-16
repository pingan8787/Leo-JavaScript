// Level-2 简单抽取通用配置

class Bed {
    constructor(){
        console.log("This is a bed!")
    }
    put (place) {
        console.log("The bed is on the " + place)
    }
}

class Desk {
    constructor(){
        console.log("This is a desk!")
    }
    move (place) {
        console.log("The desk moves to the " + place)
    }
}

class Room {
    constructor(options){
        this.options = options;
        this.bed = options.bed;
        this.desk  = options.desk;
        this.layout();
    }
    layout () {
        this.bed.put('left');
        this.desk.move('right');
        this.options.onReady();
    }
}

// 测试用例
new Room({
    bed: new Bed(),
    desk: new Desk(),
    onReady() {
        console.log("The room is set up!")
    }
})