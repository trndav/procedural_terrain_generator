let seed = 1337;
let frequency = 0.02;
let scaleValue = 1;
let amplitude = 1;
let octaves = 1;
let persistence = 0.1;
let lacunarity = 6;

const WIDTH = 500;
const HEIGHT = 500;

let seedSlider;
let seedInput;

let frequencySlider;
let frequencyInput;

let scaleValueSlider;
let scaleValueInput;

let amplitudeSlider;
let amplitudeInput;

let octavesSlider;
let octavesInput;

let persistenceSlider;
let persistenceInput;

let lacunaritySlider;
let lacunarityInput;

let greyScaleCheckbox;
let useGreyScale = false;

let scrollScaleCheckbox;
let scrollAffectsScale = true;

let cachedSeed = 0;
let cachedFrequency = 0;
let cachedScaleValue = 0;
let cachedAmplitude = 0;
let cachedOctaves = 0;
let cachedPersistence = 0;
let cachedLacunarity = 0;

let cachedGreyScale = false;

let waterColor = [15, 94,156, 255];
let sandColor = [194, 178, 128, 255];
let grassColor = [86, 125, 70, 255];
let mountainColor = [129, 131, 153, 255];

function setup() {
  frameRate(15);
  pixelDensity(1);
  noiseSeed(seed);

  createCanvas(WIDTH, HEIGHT);
  createSeedModifiers();
  createFrequencyModifiers();
  createScaleValueModifiers();
  createAmplitudeModifiers();
  
  createOctavesModifiers();
  createPersistenceModifiers();
  createLacunarityModifiers();
  
  createGreyScaleCheckbox();
  createScrollScaleCheckbox();
}

function draw(){
  if (cachedSeed != seed ||
      cachedFrequency != frequency ||
      cachedScaleValue != scaleValue ||
      cachedAmplitude != amplitude ||
      cachedGreyScale != useGreyScale ||    
      cachedOctaves != octaves ||
      cachedPersistence != persistence ||
      cachedLacunarity != lacunarity) {
    generateTerain();
  }
}

function mouseWheel(event){
  if (!scrollAffectsScale){
    return;
  }
  let scrollStep = event.delta / -100;
  setScaleValue(constrain(scaleValue + scrollStep, 1, 100));
}

function setScaleValue(newValue){
  scaleValue = newValue;
  scaleValueInput.value(newValue);
  scaleValueSlider.value(newValue);
}

function createSeedModifiers(){
  seedLabel = createDiv("Seed");
  seedLabel.position(WIDTH + 20, 0);
  seedSlider = createSlider(1, 1000000, seed, 0.001);
  seedSlider.parent(seedLabel);
  seedSlider.position(100);
  seedSlider.input(seedInputEvent);
  
  seedInput = createInput(seed.toString());
  seedInput.parent(seedLabel);
  seedInput.position(250, 0);
  seedInput.input(seedInputEvent);
}

function createFrequencyModifiers(){
  frequencyLabel = createDiv("Frequency");
  frequencyLabel.position(WIDTH + 20, 30);
  frequencySlider = createSlider(0.001, 1, frequency, 0.001);
  frequencySlider.parent(frequencyLabel);
  frequencySlider.position(100);
  frequencySlider.input(frequencyInputEvent);
  
  frequencyInput = createInput(frequency.toString());
  frequencyInput.parent(frequencyLabel);
  frequencyInput.position(250, 0);
  frequencyInput.input(frequencyInputEvent);
}

function createScaleValueModifiers(){
  scaleValueLabel = createDiv("Scale");
  scaleValueLabel.position(WIDTH + 20, 60);
  scaleValueSlider = createSlider(1, 100, scaleValue, 1);
  scaleValueSlider.parent(scaleValueLabel);
  scaleValueSlider.position(100);
  scaleValueSlider.input(scaleValueInputEvent);
  
  scaleValueInput = createInput(scaleValue.toString());
  scaleValueInput.parent(scaleValueLabel);
  scaleValueInput.position(250, 0);
  scaleValueInput.input(scaleValueInputEvent);
}

function createAmplitudeModifiers(){
  amplitudeLabel = createDiv("Amplitude");
  amplitudeLabel.position(WIDTH + 20, 90);
  amplitudeSlider = createSlider(1, 5, amplitude, 0.1);
  amplitudeSlider.parent(amplitudeLabel);
  amplitudeSlider.position(100);
  amplitudeSlider.input(amplitudeInputEvent);
  
  amplitudeInput = createInput(amplitude.toString());
  amplitudeInput.parent(amplitudeLabel);
  amplitudeInput.position(250, 0);
  amplitudeInput.input(amplitudeInputEvent);
}

function createOctavesModifiers(){
 octavesLabel = createDiv("Octaves");
 octavesLabel.position(WIDTH + 20, 120);
 octavesSlider = createSlider(1, 5, octaves, 1);
 octavesSlider.parent(octavesLabel);
 octavesSlider.position(100);
 octavesSlider.input(octavesInputEvent);
  
 octavesInput = createInput(octaves.toString());
 octavesInput.parent(octavesLabel);
 octavesInput.position(250, 0);
 octavesInput.input(octavesInputEvent);
}

function createPersistenceModifiers(){
 persistenceLabel = createDiv("Persistence");
 persistenceLabel.position(WIDTH + 20, 150);
 persistenceSlider = createSlider(0, 1, persistence, 0.01);
 persistenceSlider.parent(persistenceLabel);
 persistenceSlider.position(100);
 persistenceSlider.input(persistenceInputEvent);
  
 persistenceInput = createInput(persistence.toString());
 persistenceInput.parent(persistenceLabel);
 persistenceInput.position(250, 0);
 persistenceInput.input(persistenceInputEvent);
}

function createLacunarityModifiers(){
 lacunarityLabel = createDiv("Lacunarity");
 lacunarityLabel.position(WIDTH + 20, 180);
 lacunaritySlider = createSlider(0, 10, lacunarity, 1);
 lacunaritySlider.parent(lacunarityLabel);
 lacunaritySlider.position(100);
 lacunaritySlider.input(lacunarityInputEvent);
  
 lacunarityInput = createInput(amplitude.toString());
 lacunarityInput.parent(lacunarityLabel);
 lacunarityInput.position(250, 0);
 lacunarityInput.input(lacunarityInputEvent);
}
  
function seedInputEvent() {
  seed = this.value();
  seedSlider.value(this.value());
  seedInput.value(this.value());
}

function frequencyInputEvent() {
  frequency = this.value();
  frequencySlider.value(this.value());
  frequencyInput.value(this.value());
}

function scaleValueInputEvent() {
  scaleValue = this.value();
  scaleValueSlider.value(this.value());
  scaleValueInput.value(this.value());
}

function amplitudeInputEvent() {
  amplitude = this.value();
  amplitudeSlider.value(this.value());
  amplitudeInput.value(this.value());
}

function octavesInputEvent() {
  octaves = this.value();
  octavesSlider.value(this.value());
  octavesInput.value(this.value());
}

function persistenceInputEvent() {
  persistence = this.value();
  persistenceSlider.value(this.value());
  persistenceInput.value(this.value());
}

function lacunarityInputEvent() {
  lacunarity = this.value();
  lacunaritySlider.value(this.value());
  lacunarityInput.value(this.value());
}

function createGreyScaleCheckbox() {
  greyScaleCheckbox = createCheckbox("Use greyscale?", useGreyScale);
  greyScaleCheckbox.changed(greyScaleCheckboxEvent);
}

function createScrollScaleCheckbox() {
  scrollScaleCheckbox = createCheckbox("Scroll to Zoom", scrollAffectsScale);
  scrollScaleCheckbox.changed(scrollScaleCheckboxEvent);
}

function greyScaleCheckboxEvent(){
  useGreyScale = greyScaleCheckbox.checked();
}

function scrollScaleCheckboxEvent(){
  scrollAffectsScale = scrollScaleCheckbox.checked();
}

function generateTerain() {
  cachedFrequency = frequency;
  cachedSeed = seed;
  cachedScaleValue = scaleValue;
  cachedAmplitude = amplitude;  
  cachedOctaves = octaves;
  cachedPersistence = persistence;
  cachedLacunarity = lacunarity;  
  cachedGreyScale = useGreyScale;
  noiseSeed(seed);
  loadPixels();
  for (let y = 0; y < HEIGHT; y++){
    for(let x = 0; x < WIDTH; x++){
      let total = 0;
      let octaveFrequency = frequency;
      let octaveAmplitude = amplitude;
      for (let octave = 0; octave < octaves; octave++){        
      
      let noiseValue = noise(((x / scaleValue) * octaveFrequency), ((y / scaleValue) * octaveFrequency)) * octaveAmplitude;
        
        total += noiseValue;
        octaveFrequency *= lacunarity;
        octaveAmplitude *= persistence;
    }
    let index = (x+y*WIDTH) * 4;
    pixels = paintTerrain(total, index);
    
    }
  }
  updatePixels();
}

function paintTerrain(noiseValue, index) {
  let noiseColor, red, green, blue, alpha;
  if (useGreyScale) {    
  noiseColor = noiseValue * 255;
red = noiseColor;
green = noiseColor;
blue = noiseColor;
alpha = 255;
  } else {
    result = getTerrainTile(noiseValue);
    red = result[0];
    green = result[1];
    blue = result[2];
    alpha = result[3];
  }      
      
      pixels[index + 0] = red;
      pixels[index + 1] = green;
      pixels[index + 2] = blue;
      pixels[index + 3] = alpha;
  return pixels;
}

function getTerrainTile(noiseValue) {
    if (noiseValue > 0 && noiseValue <= 0.5) {
      return waterColor;
    } else if (noiseValue > 0.25 && noiseValue <= 0.55) {
      return sandColor;    
    } else if (noiseValue > 0.55 && noiseValue <= 0.75) {
    return grassColor;   
    } else {
      return mountainColor;
    }
}


