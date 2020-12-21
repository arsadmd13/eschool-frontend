function sendData(){
    var x = JSON.parse(localStorage.getItem("currentUser"))
    let frame = document.getElementById('iframe');
    frame.contentWindow.postMessage(x, 'https://eschool-in.herokuapp.com');
  }