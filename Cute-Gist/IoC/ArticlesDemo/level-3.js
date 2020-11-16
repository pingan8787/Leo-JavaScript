// Level-3 使用简单 DI
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

class Room {
    static things = [];
    constructor(options){
        this.options = options;
        this.layout();
    }
    layout () {
        this.initThings();
        this.options.onReady();
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
Room.use([BedModule, DeskModule]);

new Room({
    bed: {},
    desk: {},
    onReady(room) {
        console.log("The room is set up!")
    }
})