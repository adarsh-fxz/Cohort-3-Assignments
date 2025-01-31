let counter = 0;

function count() {
    counter++;
    console.log(counter);
}

setInterval(count, 1000);