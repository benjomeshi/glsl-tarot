
precision mediump float;
uniform vec2 resolution;

float PI = 3.14159265;

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

  float rhomb = rhombSDF(uv);
  float tri = triSDF(uv);
  color += flip(fill(rhomb, 0.3), fill(tri, 0.4));


  gl_FragColor = vec4(color, 1.);
}
