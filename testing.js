const U = require('./utils.js');



// LOADING
function smoothStep(x) {
    if (x < 0) return 0;
    if (x > 1) return 1;
    return x*x*(3 - 2*x);
}
for (let i = 0; i < 1000; i++) {

    // Takes up some time
    for (let j = 0; j < 300000; j++) {
        let x = Math.random();
    }

    if (i % 7 == 0) {
        console.clear();
        U.loadingBar(smoothStep(i/1000), 30);
    }
}

for (let i = 0; i < 1000; i++) {

    // Takes up some time
    for (let j = 0; j < 300000; j++) {
        let x = Math.random();
    }

    if (i % 7 == 0) {
        console.clear();
        U.loadingBar((1+Math.sin(i/100))/2, 40, "red");
        U.loadingBar((1+Math.cos(i/100))/2, 30, "green");
        U.loadingBar(1-(1+Math.sin(i/100))/2, 20, "blue");
        U.loadingBar(1-(1+Math.cos(i/100))/2, 10, "purple");
    }
}


 U.tests.testAll();
// U.tests.runPrintTests();

U.permutations([1,2,3,4]);
let myArr = new U.array(new U.range(-5, 7), 10);
let myArr2 = new U.array(new U.range(45, 3), -10);


{
    let myArr = new U.array(new U.range(0, 10), 10);

    let myArr2 = new U.array(myArr);
}

const C = U.characters;

console.log(
    C.cornerDR + C.segmentLR + C.intersectionDLR + C.segmentLR + C.cornerDL + '\n' +
    C.segmentUD + " " + C.segmentUD + " " + C.segmentUD + '\n' +
    C.intersectionRUD + C.segmentLR + C.intersectionLRUD + C.segmentLR + C.intersectionLUD + '\n' +
    C.segmentUD + " " + C.segmentUD + " " + C.segmentUD + '\n' +
    C.cornerUR + C.segmentLR + C.intersectionULR + C.segmentLR + C.cornerUL
)  