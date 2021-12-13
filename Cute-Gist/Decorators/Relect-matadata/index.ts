import "reflect-metadata";

const Type = type => Reflect.metadata('design:type', type);
const ParamTypes = (...types) => Reflect.metadata('design:paramtypes', types);
const ReturnType = type => Reflect.metadata('design:returntype', type);


@ParamTypes(String, Number)
class Demo1 {
    constructor(text, i){

    }

    @Type(String)
    get name(){
        return 'text';
    }

    @Type(Function)
    @ParamTypes(Number, Number)
    @ReturnType(Number)
    add(x, y) {
        return x + y;
    }
}

const test1 = new Demo1('hello', 1);
console.log(test1.name)