let contador = [22233473, 14160988, 3783243];

let index = 0;

let rectWidth;

let song;

let osc, fft;

function setup() {
  createCanvas(windowWidth, windowHeight);
  createP('Estadísticas del covid-19, link del mapa del coronavirus en tiempo real');
  createP('https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6');
  song = loadSound('covid.mp3');
  frameRate(1);
  textSize(30);
  noStroke();
  rectWidth = width / 4;
  
  osc = new p5.TriOsc(); // set frequency and type
  osc.amp(0.5);

  fft = new p5.FFT();
  osc.start();
  
  
}

function draw() {

  let waveform = fft.waveform(); // analyze the waveform
  beginShape();
  strokeWeight(5);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, height, 0);
    vertex(x, y);
  }
  endShape();

  // change oscillator frequency based on mouseX
  let freq = map(mouseX, 0, width, 50, 100);
  osc.freq(freq);

  let amp = map(mouseY, 0, height, 1, 0.09);
  osc.amp(amp);
    
    background(0);
    noStroke();
    fill(255,0,0);
    textAlign(CENTER);   
    text(contador[index] + frameCount, width / 2, height / 2);
} 


  function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
    
}

function mousePressed() {
  index = index + 1;
  
  if (index == 3) {
    index = 0;
  } 
} 

function keyPressed() {
  let keyIndex = -1;
  if (key >= 'a' && key <= 'z') {
    keyIndex = key.charCodeAt(0) - 'a'.charCodeAt(0);
  }
  if (keyIndex === -1) {
    // If it's not a letter key, clear the screen
    
    
  } else {
    // It's a letter key, fill a rectangle
    randFill_r = Math.floor(Math.random() * 300 + 1);
    randFill_g = Math.floor(Math.random() * 255 + 1);
    randFill_b = Math.floor(Math.random() * 255 + 1);
    fill(randFill_r, randFill_g, randFill_b);
    let x = map(keyIndex, 0, 25, 0, width - rectWidth);
    rect(x, 0, rectWidth, height);
  }
  
  
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
    
  } else {
    song.play();
    
  }
  
}