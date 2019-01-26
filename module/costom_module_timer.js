var EventEmitter = require('events');

//1. setInterval 함수가 동작하는 interval 값을 설정한다. 1초
var sec = 1;

//2. timer 변수를 EventEmitter로 초기화
exports.timer = new EventEmitter();

//3. javascript 내장함수인 setInterval을 사용하여 1초에 한번식 timer 객체에 이벤트 발생
setInterval(function(){
    exports.timer.emit('tick');
}, sec*1000);