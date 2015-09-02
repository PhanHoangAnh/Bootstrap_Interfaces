calendar.writeOut = function(arg) {
    console.log("writeOut:", arg);
}


function calendar() {
    this.writeOut = function(arg) {
        console.log("writeOut:", arg);
    };


    writeOut("meo");
}

calendar.prototype.print = function(arg) {
    console.log("print: ", arg)
}


check = new calendar();
check.writeOut("okie");
