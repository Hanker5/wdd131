
console.log("Hello World");

const PI = 3.14; //constants stay the same
let radius = 3;  //let is a variable that can change

let area = PI * radius * radius;

console.log(area);

const one = 1;
const two = '2';
                    
let course = "CSE131"; //global scope
if (true) {
    let student = "Henry";
    console.log(course);  //works just fine, course is global
    console.log(student); //works just fine, it's being accessed within the block
}
console.log(course); //works fine, course is global
console.log(student); //does not work, can't access a block variable outside the block


                    