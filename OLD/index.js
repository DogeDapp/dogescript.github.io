var dogescript = require('dogescript');
var fs = require('fs');

var input  = document.getElementById('dogescript');
var output = document.getElementById('javascript');

var editor = new Behave({
    textarea: input,
    replaceTab: true,
    softTabs: true,
    tabSize: 4,
    autoOpen: true,
    overwrite: true,
    autoStrip: true,
    autoIndent: true,
    fence: false
});

BehaveHooks.add('keyup', function(data){
    output.value = dogescript(input.value, true);
});

function fixSize() {
    var top = input.getBoundingClientRect().top + document.body.scrollTop;
    var height = (window.innerHeight - top - 10) + 'px';
    input.style.height = height;
    output.style.height = height; 
}

fixSize();

var debounce = 0;

window.addEventListener('resize', function(e) {
    if (debounce) {
        debounce = clearTimeout(debounce);
    }
    debounce = setTimeout(fixSize, 50);
});

var content = fs.readFileSync('./demo.djs', 'utf8');
input.value = content;
output.value = dogescript(input.value, true);
