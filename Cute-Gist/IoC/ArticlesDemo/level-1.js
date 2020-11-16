// Level-1 直接实现

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
        this.bed = new Bed();
        this.desk  = new Desk();
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
    onReady() {
        console.log("The room is set up!")
    }
})