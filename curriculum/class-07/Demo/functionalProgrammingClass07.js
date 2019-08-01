// functional example

let numbers = [1,2,3,4];

const functionalSquares = ([...list]) => {
    for(let i=0; i<list.length; i++){
        list[i] = list[i] * list[i];
    }
    return list;
} 

let newNumbersFunctional = functionalSquares(numbers);

newNumbersFunctional
numbers

// Non-Functional approach

let nonFuncNumbers = [1,2,3,4];

const squares =(list) => {
    for(let i=0; i < list.length; i++)
    {
        list[i] = list[i] * list[i];
    }
    return list;
}
let newNonFuncNumbers = squares(nonFuncNumbers);
nonFuncNumbers
newNonFuncNumbers

// MAP=> Functional programming 
// returns a new array OF THE SAME LENGTH!!!!!

let mapNumbers = [ 4,8,15,16,23,42];

let newMapNumbers = mapNumbers.map((value, indx) =>{
    return value*2;
} );

newMapNumbers
mapNumbers

let cats = [
    {name: 'Josie', attitude: 'Sassy'},
    {name: 'Belle', attitude: 'Lazy'},
    {name: 'Frodo', attitude: 'Crazy'}
]

let kitties = cats.map((val) => val.attitude);

cats
kitties


// Higher Order Functions

/**The ability to have functions nested in other functions (they can be returned as well) */

function greet(person){
    return function(greeting){
        return `${greeting}, ${person}`;
    };
}

var hello = greet('amanda');
let answer = hello("greetings");

answer 