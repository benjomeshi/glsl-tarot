precision mediump float;
uniform vec2 resolution;

float PI = 3.14159265;

void main(){
  vec3 color = vec3(0.);
  vec2 st = gl_FragCoord.xy
    / resolution;

  color += step(.5,
    (st.x + st.y)*0.5);
  gl_FragColor = vec4(color, 1.);
}
