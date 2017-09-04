precision mediump float;
uniform vec2 resolution;

float PI = 3.14159265;

float circleSDF(vec2 uv, vec2 center){
  return length(uv - center);
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

  float circle1 = fill(circleSDF(uv, vec2(.25, 0.)), .5);
  float circle2 = stroke(circleSDF(uv, vec2(-.25, 0.)), .45, .05);

  color += flip(circle1, circle2);

  gl_FragColor = vec4(color, 1.);
}
