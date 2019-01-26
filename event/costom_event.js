/**
 * EventEmitter : node.js의 모든 이벤트가 정의된 기본 객체 
 * 이벤트를 사용하기 위해서는 이 객체를 재정의해서 사용해야 합니다.
 * 
 * on('이벤트', function(){}) :  이벤트를 연결하는 함수
 * 
 * emit() :  이벤트를 발생시키는 함수
 */

//1. 이벤트가 정의되어 있는 events 모듈 생성, 이전 버전의 process.EventEmitter는 deprecated.
var EventEmitter = require("events");

//2. 생성된 이벤트 모듈을 위해 costom_ovejct로 초기화
var costomEvent = new EventEmitter();

//3. events 모듈에 선언되어 있는 on() 함수를 재정의 하여 'call' 이벤트 처리
costomEvent.on('call', ()=> {
    console.log("called events");
});

//4. call 이벤트를 강제로 발생 
costomEvent.emit('call');
