const steps = ['one','two','three'];

// .forEach()

steps.forEach(function(item){
    console.log(item);
})

let myList = document.querySelector('#myList');

// .map()

const stepsHtml = steps.map(listTemplate);

function listTemplate(item) {
    return `<li>${item}</li>`
}

console.log(stepsHtml);

myList.innerHTML = stepsHtml.join('');

let grades = ['A','B','A','C'];
let points;

let gpaPoints = grades.map(convert);

function convert(grade) {
    switch (grade){
        case 'A':
            points = 4;
            break;
        case 'B':
            points = 3;
            break;
        case 'C':
            points = 2;
            break;
        case 'D':
            points = 1;
            break;
        case 'F':
            points = 0;
            break;
        default:
            alert('not a valid grade');
    }
    return points;
}

console.log(gpaPoints);

let totalPoints = gpaPoints.reduce(getTotal);

function getTotal(total, item) {
    return total + item;
}

let gpaAverage = totalPoints / gpaPoints.length;

console.log(gpaAverage);

// .filter
const words = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];

const shortWords = words.filter(function(word){
    return word.length < 6;
});

console.log(shortWords);

const studentContainer = document.querySelector('#studentContainer');
const students = [
    {last: 'Andrus', first: 'Aaron'},
    {last: 'Masa', first:'Manny'},
    {last: 'Tanda', first: 'Tamanda'}
];

students.forEach(function(item){
    let name = document.createElement('div');
    let html = `
        <span>${item.first}</span>
        <span>${item.last}</span>
    `

    name.innerHTML = html;
    studentContainer.appendChild(name);
});