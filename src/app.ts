//              Generics
// generics are used to create reusable components, functions, and classes
// that work with a variety of types rather than a single one, while still
// maintaining type safety. In other words, generics allow you to write a
// function or a class that can work with any data type.

/* Intro
const names: Array<string> = []; // string[]
// names[0].split(" ");

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("This is done!");
  }, 2000);
});

promise.then((data) => {
  data.split(" ");
});
*/

//             Generics in Practice - Creating a Generic Function
function merge(objA: object, objB: object) {
  return Object.assign(objA, objB);
}

// merge two objects
console.log(merge({ name: "Andrea" }, { age: 28 }));

// problem with this approach, we can't access the properties of the object
const mergeObj = merge({ name: "Andrea" }, { age: 28 });
// console.log(mergeObj.age);       // this is not valid

// Solution: generics with constraints
function mergeWithGenerics<T extends object, U extends object>(
  objA: T,
  objB: U
) {
  return Object.assign({}, objA, objB);
}

const mergeObjGenerics = mergeWithGenerics(
  { name: "Andrea", hobbies: ["Sports"] },
  { age: 28 }
);
// we can be more specific with the type
const mergeObjGenerics2 = mergeWithGenerics<
  { name: string; hobbies: string[] },
  { age: number }
>({ name: "Andrea", hobbies: ["Sports"] }, { age: 28 });

console.log(mergeObjGenerics); // Output: { name: "Andrea", age: 28 }
console.log(mergeObjGenerics2); // Output: { name: "Andrea", age: 28 }

// Interface & Generics
interface Lengthy {
  length: number;
}
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value";
  if (element.length > 0) {
    descriptionText = "Got 1 value";
  } else {
    descriptionText = "Got " + element.length + " values";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe("Hi there!")); // Output: ["Hi there!", "Got 9 values"]

// the keyof constraint
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}

// Generic Classes
