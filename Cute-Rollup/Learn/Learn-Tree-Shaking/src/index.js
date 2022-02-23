const a = 1;
const b = 2;
console.log(a)

if(process.env.NODE_ENV !== 'dev'){
    console.log(b)
}