interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

let list: number[] = [1, 2, 3];
let list1: Array<number> = [1, 2, 3];

list.forEach( (item) => {
    console.log(item)
})

enum Color {
    Red,
    Green,
    Blue
}

let myColor: Color = Color.Red;
let colorName: string = Color[0];

console.log(myColor, colorName);

const someValue: string = "this is a string";
const strLength = (<string>someValue).length;
// const strLength = (someValue as string).length;
console.log(strLength);


// 可选属性
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});

// 只读属性
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point ={ x: 5, y: 6 };

let a:number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

// 额外的类型检查

let mySquare1 = createSquare({colour: "black"} as SquareConfig); // 通过类型断言，绕过检查


//最佳的方式是能够添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性。 如果 SquareConfig带有上面定义的类型的color和width属性，并且还会带有任意数量的其它属性，那么我们可以这样定义它
// interface SquareConfig {
//     color?: string;
//     width?: number;
//     [propName: string]: any;
// }

// 最后一种跳过检查的方式
// let squareOptions = { colour: "red", width: 100 };
// let mySquare = createSquare(squareOptions);

// 函数类型

interface SearchFunc {
    (source: string, subString: string): boolean
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}
// mySearch = function(source, subString) {
//     let result = source.search(subString);
//     return result > -1;
// }

// 可索引类型

interface StringArray {
    [index: number]: string
}

let myArray: StringArray;
myArray = ['Bob', 'fred'];

const myStr: string = myArray[1];
console.log(myStr);



class Animal {
    name: string;
}
class Dog extends Animal {
    breed?: string;
}
// 可以同时使用两种类型的索引
// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
// interface NotOkay {
//     [x: number]: Animal;
//     [x: string]: Dog;
// }


// 正确：数字索引的返回值必须是字符串索引返回值类型的子类型
interface NotOkay {
    [x: number]: Dog;
    [x: string]: Animal;
}

let testData: NotOkay;
testData = { '0': {name: '1'} };  // 通过索引永远拿到的是子类型
// console.log(testData.x);

// 类
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter1 = new Greeter("world");



document.body.innerHTML = greeter(user);