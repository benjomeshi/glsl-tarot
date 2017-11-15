precision mediump float;
uniform vec2 resolution;
uniform float time;

float PI = 3.14159265;
float TAU = 6.28318;

// Signed Distance Fields
float rectSDF(vec2 st, vec2 size){
  return max(abs(st).x * size.x, abs(st).y * size.y);
}

float crossSDF(vec2 st, float s){
  vec2 size = vec2(.25, s);
  return min(rectSDF(st, size.xy),
    rectSDF(st, size.yx));
}

float circleSDF(vec2 uv){
  return length(uv);
}

float vesicaSDF(vec2 uv, float w){
  vec2 offset = vec2(w*.5, 0.);
  return max(circleSDF(uv+offset),
            circleSDF(uv-offset));
}

float raySDF(vec2 uv, int count){
  return fract(atan(uv.x, uv.y)/TAU*float(count));
}

float polySDF(vec2 uv, int vertices){
  float a = atan(uv.x, uv.y)+PI;
  float r = length(uv);
  float v = TAU / float(vertices);
  return cos(floor(.5+a/v)*v-a)*r;
}

float triSDF(vec2 uv){
  return max(abs(uv.x) * .866025 + uv.y * .5,
              -uv.y * .5);
}

float rhombSDF(vec2 uv){
  vec2 offset = vec2(0., .1);
  return max(triSDF(uv-offset),
    triSDF(vec2(uv.x, -uv.y)+offset));
}

float starSDF(vec2 uv, int V, float s){
  float a = atan(uv.y, uv.x)/TAU;
  float seg = a * float(V);
  a = ((floor(seg) + .5)/float(V) +
    mix(s, -s, step(.5, fract(seg)))) * TAU;
  return abs(dot(vec2(cos(a), sin(a)),uv));
}

float heartSDF(vec2 uv){
  uv -= vec2(0, .3);
  float r = length(uv)*5.;
  uv = normalize(uv);
  return r - ((uv.y*pow(abs(uv.x), 0.67))/
    (uv.y+1.5)-(2.)*uv.y+1.26);
}


//ENDSDF

//STEPPERS

float fill(float x, float size){
  return 1.-step(size, x);
}

float stroke(float x, float s, float w){
  float d = step(s, x+w*.5) -
            step(s, x-w*.5);
  return clamp(d, 0., 1.);
}

float flip(float v, float pct){
  return mix(v, 1.-v, pct);
}

vec2 rotate(vec2 uv, float angle){
  return mat2(cos(angle), -sin(angle),
       sin(angle), cos(angle)) * uv;
}

vec3 bridge(vec3 c, float d, float s, float w){
  c *= 1. - stroke(d,s,w*2.);
  return c + stroke(d,s,w);
}

//ENDSTEPPERS

void main(){
  vec3 color = vec3(0.);
  vec2 st = gl_FragCoord.xy / resolution.xy;
  // vec2 uv = st;
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / resolution.y;


  float angle = -PI/4.;
  float inv = step(0., uv.y);
  uv = rotate(uv, angle);
  uv = mix(+uv, -uv, step(.5, inv));
  uv -= .4;

  vec2 scale = vec2(1.);
  for(int i = 0; i < 5; i++){
      float rect = rectSDF(uv, scale);
      float size = .25;
      size -= abs(.1 * float(i) - .2);
      color = bridge(color, rect, size, .05);
      uv += .2;
  }

  gl_FragColor = vec4(color, 1.);
}
