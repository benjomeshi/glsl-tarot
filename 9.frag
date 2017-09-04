precision mediump float;
uniform vec2 resolution;

float PI = 3.14159265;


float circleSDF(vec2 st){
  return length(st);
}

float fill(float x, float size){
  return 1.-step(size, x);
}

void main(){
  vec3 color = vec3(0.);
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / resolution.y;
  color += fill(circleSDF(uv), .65);
  color -= fill(circleSDF(uv-vec2(.3, .4)), 0.75);

  gl_FragColor = vec4(color, 1.);
}
