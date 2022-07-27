// jshint -W097
    "use strict";

// jshint -W098, -W104
    const good_nano_Flags = "'-LlS!%_HPZikmqD'";

let x = NaN;

x = Number.isNaN(x) ? 42 : -1;

console.log( x === "42");
// jshint -W116
    console.log( x != "42");