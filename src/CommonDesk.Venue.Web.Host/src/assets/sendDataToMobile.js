function sendTodidRegister(userDetails) {
    console.log('inside sendTodidRegister javascript: ', userDetails);
    if (userDetails && window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.didRegister.postMessage(userDetails);
    }

    var evt = new CustomEvent("RefindUserAccountIdEvent", { detail: userDetails.userAccountId });
    window.dispatchEvent(evt);    
}

function sendToAccount(userDetails) {
    window.webkit.messageHandlers.goToAccounts.postMessage(userDetails);
}

function sendToLogout() {
    window.webkit.messageHandlers.logout.postMessage("");
}

function senToDenyRegistration() {
    window.webkit.messageHandlers.didDenyRegistration.postMessage("true");
}

//var div;
//$(document).on('ready', function () {
//   // alert('inside ready'); 

//    setTimeout(function () { 
//        $('.deny').on('click', function () {
//            window.webkit.messageHandlers.didDenyRegistration.postMessage("true");
//            //alert("logout clicked");
//            console.log("msg" + didDenyRegistration);
//        });
//    }, 3000);


//});

var canvas;
var canvasWidth;
var ctx;

//window.onload = function () {
//    //alert('inside ready');
//    setTimeout(function () {
//        canvas = document.getElementById('doughnutChart');
//        if (canvas.getContext) {
//            //alert('got context');
//            ctx = canvas.getContext("2d");

//            window.addEventListener('resize', resizeCanvas, false);
//            window.addEventListener('orientationchange', resizeCanvas, false);
//            resizeCanvas();
//        }
//    }, 5000);
//};

function chartSizeForDevice() {
   //alert('inside ready'); 
       canvas = document.getElementById('doughnutChart');
       if (canvas.getContext) {
           //alert('got context');
           ctx = canvas.getContext("2d");

           window.addEventListener('resize', resizeCanvas, false);
           window.addEventListener('orientationchange', resizeCanvas, false);
           resizeCanvas();
       } 
}

//function resizeCanvas() {
//    //alert("inside resizecanvas");
//    canvas.width = window.innerWidth-150;
//    canvas.height = window.innerHeight-150;
//}





