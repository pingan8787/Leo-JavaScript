// Level-4 拓展 DI

class Bed {
    constructor(){
        console.log("This is a bed!")
    }
    put (place) {
        console.log("The bed is on the " + place)
    }
}

const BedModule = {
    put (room) {
        room.bed = new Bed(room.options.bed);
        room.bed.put('left');
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

const DeskModule = {
    put (room) {
        room.desk = new Desk(room.options.desk);
        room.desk.move('right');
    } 
}


class Chair {
    constructor(){
        console.log("This is a chair!")
    }
    move (place) {
        console.log("The chair moves to the " + place)
    }
}

const ChairModule = {
    put (room) {
        room.chair = new Chair();
        room.moveChair = data => room.chair.move(data.position);
    } 
}

class Room {
    static things = [];
    constructor(options){
        this.options = options;
        this.layout();
    }
    layout () {
        this.initThings();
        this.options.onReady(this);
    }
    initThings () {
        Room.things.map(thing => {
            thing.put &&
            typeof thing.put === 'function' &&
            thing.put(this);
        })
    }
    static use(thing) {
        Array.isArray(thing) ? thing.map(item => Room.use(item)) : Room.things.push(thing);
    }
}

// 测试用例
Room.use([BedModule, DeskModule, ChairModule]);

new Room({
    bed: {},
    desk: {},
    onReady(room) {
        room.moveChair({position: 'left'});
        console.log("The room is set up!");
    }
})