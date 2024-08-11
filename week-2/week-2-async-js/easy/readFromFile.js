// ## Reading the contents of a file

// Write code to read contents of a file and print it to the console. 
// You can use the fs library to as a black box, the goal is to understand async tasks. 
// Try to do an expensive operation below the file read and see how it affects the output. 
// Make the expensive operation more and more expensive and see how it affects the output. 

const fs = require('fs');

function expensiveOperation(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {

    }
    console.log(`Expensive operation took ${duration} ms`);
}

fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    console.log("File contents: ", data);
});

expensiveOperation(1000);
expensiveOperation(2000);