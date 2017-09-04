precision mediump float;
uniform vec2 resolution;

float PI = 3.14159265;

float circleSDF(vec2 uv){
  return length(uv );
}

float vesicaSDF(vec2 uv, float w){
  vec2 offset = vec2(w*.5, 0.);
  return max(circleSDF(uv+offset),
            circleSDF(uv-offset));
}

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

void main(){
  vec3 color = vec3(0.);
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / resolution.y;

  float vesica = fill(vesicaSDF(uv, 0.5), .5);

  color += flip(vesica, step((uv.x+uv.y)*.5, 0.));

  gl_FragColor = vec4(color, 1.);
}
