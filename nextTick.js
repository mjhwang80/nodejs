function func(callback){

    /**
     * nextTick
     * func 함수 내에서 비동기적으로 콜백하려면 process.nextTick 함수를 이용 
     * process.nextTick 함수는 특정 함수를 호출하기전 CPU가 다른 높은 우선순위의 명령을 수행하가 한다. 
     */
    process.nextTick(callback, "callback!!");
}

try{
    func((param) => {
        a.a = 0;
    });
}catch(e){
    console.log("exception!!")
}