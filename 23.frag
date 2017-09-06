
precision mediump float;
uniform vec2 resolution;
uniform float time;

float PI = 3.14159265;

// Signed Distance Fields
float rectSDF(vec2 st, vec2 size){
  return max(abs(st).x * size.x, abs(st).y * size.y);
}

float crossSDF(vec2 st, float s){
  vec2 size = vec2(.25, s);
  return min(rectSDF(st, size.xy),
    rectSDF(st, size.yx));
}

float triSDF(vec2 uv){
  return max(abs(uv.x) * .866025 + uv.y * .5,
              -uv.y * .5);
}

float rhombSDF(vec2 uv){
  return max(triSDF(uv),
    triSDF(vec2(uv.x, -uv.y)));
}

float circleSDF(vec2 uv){
  return length(uv);
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

  vec2 offset = vec2(.1);
  uv = rotate(uv, -PI/4.);
  vec2 s = vec2(1.);
  float size = .4;
  float rect  = fill(rectSDF(uv+offset, s), size);
  float rect2 = fill(rectSDF(uv-offset, s), size);
  color += flip(rect, rect2);

  gl_FragColor = vec4(color, 1.);
}
