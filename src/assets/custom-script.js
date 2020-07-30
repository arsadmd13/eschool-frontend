function addStream(){
  const players = Array.from(document.querySelectorAll('video')).map(p => new Plyr(p));
}
