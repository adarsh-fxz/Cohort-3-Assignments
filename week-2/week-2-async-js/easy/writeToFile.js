// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require('fs');

function expensiveOperation(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {

    }
    console.log(`Expensive operation took ${duration} ms`);
}

const content = "100xdevs-Cohort-3-Assignments-week-2"

fs.writeFile('example.txt', content, (err) => {
    if (err) {
        console.error("Error writing to file:", err);
        return;
    }
    console.log("File has been written.");
});

expensiveOperation(1000);
expensiveOperation(2000);