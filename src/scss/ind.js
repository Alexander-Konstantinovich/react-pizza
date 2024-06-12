function fun () {
	console.log(this);
} fun() // Window

const obj = {
  name: 'Alice',
  greet: function() {
    console.log(`Hello, ${this.name}`);
  },
  greetArrow: () => {
    console.log(`Hello, ${this.name}`);
  }
};
obj.greet(); // Hello, Alice
obj.greetArrow(); // Hello, undefined
Примеры:

1. Глобальный контекст:

"use strict";
console.log(this); // Выведет undefined


2. В контексте метода объекта:

"use strict";
const obj = {
  name: "Alice",
  greet: function() {
    console.log(this.name); // Выведет "Alice"
  }
};
obj.greet();


3. Вызов функции с использованием "call" или "apply":

"use strict";
function greet() {
  console.log(this.name);
}
const obj1 = { name: "Bob" };
const obj2 = { name: "Charlie" };
greet.call(obj1); // Выведет "Bob"
greet.call(obj2); // Выведет "Charlie"

