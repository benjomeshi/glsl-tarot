precision mediump float;
uniform vec2 resolution;
uniform float time;

float PI = 3.14159265;

float stroke(float x, float s, float w){
  float d = step(s, x+w*.5) -
            step(s, x-w*.5);
  return clamp(d, 0., 1.);
}

void main(){
  vec3 color = vec3(0.);
  vec2 st = gl_FragCoord.xy / resolution;
  float wave = cos((st.y)*PI)*.15;

  color += stroke(st.x, .25+wave, .1);
  color += stroke(st.x, .5+wave, .1);
  color += stroke(st.x, .75+wave, 0.15);

  gl_FragColor = vec4(color, 1.);
}
