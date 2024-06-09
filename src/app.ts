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
console.log(extractAndConvert({ name: "Andrea" }, "name")); // Output: Value: Andrea

// Generic Classes

// this not works with reference types, works only with primitive types
// the only way to make it works with objects is to use the same object
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

/*
// Object Storage
const objStorage = new DataStorage<object>();
const andreaObj = { name: "Andrea" };
objStorage.addItem(andreaObj);
objStorage.addItem({ name: "Mark" });
*/

// Number Storage
const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
numberStorage.removeItem(1);
console.log(numberStorage.getItems()); // Output: [2]

// Generic Utility Types - Partial
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  // Partial<CourseGoal> is a utility type that makes all properties of CourseGoal optional
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

// Readonly
const names: Readonly<string[]> = ["Andrea", "Mark"];
// names.push("John"); // this is not valid
// names.pop(); // this is not valid

// Generic Types vs Union Types
// Generic types are more flexible and can be used with any type, while union types are more restrictive
// and can only be used with a specific set of types.
// In other words, generic types allow you to create reusable components that work with any type, while
// union types allow you to create components that work with a specific set of types.
