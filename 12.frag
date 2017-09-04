precision mediump float;
uniform vec2 resolution;

float PI = 3.14159265;

float rectSDF(vec2 st, vec2 size){
  return max(abs(st).x * size.x, abs(st).y * size.y);
}

float crossSDF(vec2 st, float s){
  vec2 size = vec2(.25, s);
  return min(rectSDF(st, size.xy),
    rectSDF(st, size.yx));
}

float stroke(float x, float s, float w){
  float d = step(s, x+w*.5) -
            step(s, x-w*.5);
  return clamp(d, 0., 1.);
}

float fill(float x, float size){
  return 1.-step(size, x);
}

float flip(float v, float pct){
  return mix(v, 1.-v, pct);
}

void main(){
  vec3 color = vec3(0.);
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / resolution.y;

  float rect = rectSDF(uv, vec2(1., 0.6));

  float diag = stroke((uv.x + uv.y)*.5, 0., .05);

  color += flip(fill(rect, .4),
    diag);

  gl_FragColor = vec4(color, 1.);
}
