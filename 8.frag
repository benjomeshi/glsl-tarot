precision mediump float;
uniform vec2 resolution;

float PI = 3.14159265;


float circleSDF(vec2 st){
  return length(st);
}

float stroke(float x, float s, float w){
  float d = step(s, x+w*.5) -
            step(s, x-w*.5);
  return clamp(d, 0., 1.);
}

void main(){
  vec3 color = vec3(0.);
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / resolution.y;
  color += stroke(circleSDF(uv), .65, .1);

  gl_FragColor = vec4(color, 1.);
}
