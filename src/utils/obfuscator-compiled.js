const JavaScriptObfuscator = require('javascript-obfuscator');

// Obfuscate the code providen as first argument
var obfuscationResult = JavaScriptObfuscator.obfuscate(`
(function(a){
    var encodedData = window.btoa(a);
    return encodedData;
})('123');
`);

module.exports = {
    obfuscationResult
};

//# sourceMappingURL=obfuscator-compiled.js.map