// 普通情况，间隔越差越多
function timerSetTimeout() {
    var speed = 50, // 设定间隔
    counter = 1,  // 计数
    start = new Date().getTime();
    
    function instance()
    {
     var ideal = (counter * speed),
     real = (new Date().getTime() - start);
     
     counter++;
    //  form.ideal.value = ideal; // 记录理想值
    //  form.real.value = real;   // 记录真实值
 
     var diff = (real - ideal);
    //  form.diff.value = diff;  // 差值
        console.log(`记录理想值:${ideal},记录真实值:${real},差值:${diff}`)
     setTimeout(function() { instance(); }, speed);
    };
    
    setTimeout(function() { instance(); }, speed);
 }
//  timerSetTimeout();


// while 模拟
function timerWhile(time) {
    const startTime = Date.now();
    while(true) {
        const now = Date.now();
        if(now - startTime >= time) {
            console.log('误差', now - startTime - time);
            return;
        }
    }
}
// timerWhile(5000);


// requestAnimationFrame 模拟
function timerRequestAnimationFrame (cb, delay) {
    let startTime = Date.now()
    loop()
  
    function loop () {
      const now = Date.now()
      if (now - startTime >= delay) {
        cb();
        return;
      }
      timerRequestAnimationFrame(loop)
    }
}

// setTimeout 系统时间补偿模拟
function timerSetTimeoutFull() {
    var speed = 50, // 设定间隔
    counter = 1,  // 计数
    start = new Date().getTime();
    
    function instance()
    {
     var ideal = (counter * speed),
     real = (new Date().getTime() - start);
     
     counter++;
    //  form.ideal.value = ideal; // 记录理想值
    //  form.real.value = real;   // 记录真实值
 
     var diff = (real - ideal);
    //  form.diff.value = diff;  // 差值
        console.log(`记录理想值:${ideal},记录真实值:${real},差值:${diff}`)
     setTimeout(function() { instance(); }, (speed - diff));
    };
    
    setTimeout(function() { instance(); }, speed);
 }
 timerSetTimeoutFull();