precision mediump float;
uniform vec2 resolution;

float PI = 3.14159265;

void main(){
  vec3 color = vec3(0.);
  vec2 st = gl_FragCoord.xy
    / resolution;

  color += step(.5+cos(st.y*PI)*.25,
    st.x);
  gl_FragColor = vec4(color, 1.);
}
