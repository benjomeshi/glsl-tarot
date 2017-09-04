precision mediump float;
uniform vec2 resolution;

float PI = 3.14159265;

float triSDF(vec2 uv){
  return max(abs(uv.x) * .866025 + uv.y * .5,
              -uv.y * .5);
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

  vec2 vu =  vec2(uv.x, -uv.y);
  color += flip(fill(triSDF(uv), .4),
    fill(triSDF(vu - vec2(0., .4)), .2));

  gl_FragColor = vec4(color, 1.);
}
