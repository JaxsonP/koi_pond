const width = 480;
const height = 320;

function setup() {
  createCanvas(width, height);
  background(194, 208, 118);

  pond = generate_pond(width, height);
  console.log("Pond: ", pond);

  noLoop();
}

function draw() {
  //background(194, 208, 118);

}

function generate_pond(w, h) {

  let a = w * h;
  print('a:', a)

  // generating metaball positions
  /*let r = a / 3000;
  print("r", r);
  let k = 30;
  let grid = [];
  let cell_size = r / sqrt(2);
  print("cell size", cell_size);
  let active = [];

  let cols = floor(w / cell_size) + 1;
  let rows = floor(h / cell_size) + 1;
  print(str(cols) + 'x' + str(rows))
  for (let i = 0; i < cols * rows; i++) {
    grid[i] = -1;
  }

  let pos = createVector(random(width), random(height));
  grid[floor(pos.x / cell_size) + floor(pos.y / cell_size) * cols] = pos;
  active.push(pos);

  while (active.length > 0) {
    let i = floor(random(active.length));
    let pos = active[i]
    for (let n = 0; n < k; n++ ) {
      let sample = p5.Vector.random2D();
      sample.setMag(random(r, 2 * r));
      sample.add(pos);
    }
  }



  
  print(grid)*/

  function check_metaballs (x, y, metaballs) {

    let closeness = 0;
    for (let i = 0; i < metaballs.length; i++) {
      closeness += 1 / sqrt((metaballs[i].x - x) ** 2 + (metaballs[i].y - y) ** 2);
    }
    if (closeness > a / 2500000) {
      return true
    }
    return false
  }


  let soft_border = 0.1;
  let clipped_w = w - (w * soft_border * 2)
  let clipped_h = h - (h * soft_border * 2)
  let metaballs;

  while (true) {

    // generating metaballs
    metaballs = [];
    for (let y = h * soft_border; y < h - (h * soft_border); y += (h - (h * soft_border * 2)) / 3) {
      for (let x = w * soft_border; x < w - (w * soft_border); x += (w - (w * soft_border * 2)) / 3) {
        metaballs.push(createVector(x + random() * ((w - (w * soft_border * 2)) / 3), y + random() * ((h - (h * soft_border * 2)) / 3)))
      }
    }

    // making sure pond is in bounds
    let inbounds = true;
    for (let x = 0; x < w; x++) {
      if (check_metaballs(x, 0, metaballs)) {
        inbounds = false;
        break;
      }
      if (check_metaballs(x, h, metaballs)) {
        inbounds = false;
        break;
      }
    }
    for (let y = 0; y < h; y++) {
      if (check_metaballs(0, y, metaballs)) {
        inbounds = false;
        break;
      }
      if (check_metaballs(w, y, metaballs)) {
        inbounds = false;
        break;
      }
    }
    if (inbounds) { 
      break; 
    } else {
      print('pond out of bounds, regenerating...')
    }
  }

  print(metaballs);

  let res = 3;
  for (let y = 0; y < h; y += res) {
    for (let x = 0; x < w; x += res) {
      
      if (check_metaballs(x + (res / 2), y + (res / 2), metaballs)) {
        noStroke();
        fill(92, 158, 173);
        rect(x, y, res, res);
      }

    }
  }

  /*for (let i = 0; i < metaballs.length; i++) {
    fill(0);
    noStroke();
    ellipse(metaballs[i].x, metaballs[i].y, 5, 5)
  }*/


  return true;
}