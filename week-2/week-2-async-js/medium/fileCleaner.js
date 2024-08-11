// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const fs = require('fs');

function cleanSpaces(text) {
    return text.replace(/\s+/g, ' ').trim();
}

fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    const cleanedData = cleanSpaces(data);

    fs.writeFile('example.txt', cleanedData, 'utf8', (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log("File cleaned successfully");
        }
    });
});