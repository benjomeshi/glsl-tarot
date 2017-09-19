
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

float raySDF(vec2 uv, int count){
  return fract(atan(uv.x, uv.y)/TAU*float(count));
}

float polySDF(vec2 uv, int vertices){
  float a = atan(uv.x, uv.y)+PI;
  float r = length(uv);
  float v = TAU / float(vertices);
  return cos(floor(.5+a/v)*v-a)*r;
}

float starSDF(vec2 uv, int V, float s){
  float a = atan(uv.y, uv.x)/TAU;
  float seg = a * float(V);
  a = ((floor(seg) + .5)/float(V) +
    mix(s, -s, step(.5, fract(seg)))) * TAU;
  return abs(dot(vec2(cos(a), sin(a)),uv));
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

//ENDSTEPPERS

void main(){
  vec3 color = vec3(0.);
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / resolution.y;

  float rays = stroke(raySDF(rotate(uv, PI/4.), 8), .5, .2);
  float octogon = polySDF(uv, 8);

  color += rays;
  color *= fill(octogon, .4);
  color *= 1. - fill(octogon, .2);
  color += stroke(octogon, .15, .03);
  color += stroke(octogon, .5, .1);

  gl_FragColor = vec4(color, 1.);
}
