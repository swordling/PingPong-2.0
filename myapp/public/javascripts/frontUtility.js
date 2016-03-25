var socket = io({
    'reconnection': true,
    'reconnectionDelay': 1000,
    'reconnectionDelayMax' : 5000,
    'reconnectionAttempts': 5
});
vari = {
    recievedEMETClass: 'container wifix parent container_ping',
    recievedEMITClass: 'container wifix parent container_pong',
    btnDangerClass: 'button btn btn-danger btn-lg Roboto_Condensed btn-alizarin',
    btnDangerClassHide: 'button btn btn-danger btn-lg Roboto_Condensed btn-alizarin hide',
    btnPrimaryClass: 'button btn btn-primary btn-lg Roboto_Condensed btn-peter_river',
    btnPrimaryClassHide: 'button btn btn-primary btn-lg Roboto_Condensed btn-peter_river hide',
    alertClass: 'alert alert-danger alert-dismissible fade in fixed',
    alertClassHide: 'alert alert-danger alert-dismissible fade in fixed hide',
};
init = {
    EMIT: function() {
        socket.emit('int', 'Ping');
    },
    EMET: function() {
        socket.emit('int', 'Pong');
    },
    recievedEMIT: function() {
        document.querySelector('.container').className = vari.recievedEMITClass;
        document.querySelector('.btn-danger').className = vari.btnDangerClassHide;
        document.querySelector('.btn-primary').className = vari.btnPrimaryClass;
    },
    recievedEMET: function() {
        document.querySelector('.container').className = vari.recievedEMETClass;
        document.querySelector('.btn-primary').className = vari.btnPrimaryClassHide;
        document.querySelector('.btn-danger').className = vari.btnDangerClass;
    },
};
socket.on('int', function(content){
    console.log('Recieved response');
    if(content === 'Ping') {
        init.recievedEMIT();
        audio.play();
        console.log('Recieved Ping');
    } else {
        init.recievedEMET();
        audio.play();
        console.log('Recieved Pong');
    }
});
socket.on('count', function(val){
    var content = val - 1;
    if (content !== 1) {
        document.querySelector('.connectCounter').innerHTML = content + ' stangers.';
    } else {
        document.querySelector('.connectCounter').innerHTML = content + ' stanger.';
    }
});
socket.on('connect', function() {
    document.querySelector('.btn-alizarin').innerHTML = "Ping";
    document.querySelector('.btn-peter_river').innerHTML = "Pong";
});
socket.on('connect_error', function() {
    document.querySelector('.btn-alizarin').innerHTML = "Reconnecting...";
    document.querySelector('.btn-peter_river').innerHTML = "Reconnecting...";
});
socket.on('reconnect_error', function() {
    document.querySelector('.btn-alizarin').innerHTML = "Failed...";
    document.querySelector('.btn-peter_river').innerHTML = "Failed...";
});