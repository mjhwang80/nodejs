var module = require("./module/costom_module_timer");

module.timer.on('tick', function(timer){
    var time = new Date();
    console.log("now : " + time);
});