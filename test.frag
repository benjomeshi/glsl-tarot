precision highp float;
uniform vec2 resolution;
uniform float time;

uniform sampler2D spectrum;
uniform sampler2D backbuffer;
uniform float volume;
uniform vec2 mouse;

uniform sampler2D camera;


float rectSDF(vec2 st, vec2 size){
  return max(abs(st).x * size.x, abs(st).y * size.y);
}

vec2 rotate(vec2 uv, float angle){
  return mat2(cos(angle), -sin(angle),
       sin(angle), cos(angle)) * uv;
}


void main(){
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.y, resolution.x);
  // uv = rotate(uv, volume);


  float h = texture2D(spectrum, vec2(abs(uv.x*.5)), 0.).x;
  float m = texture2D(spectrum, vec2(abs(uv.x*.3)), 0.).x;
  float l = texture2D(spectrum, vec2(abs(uv.x*.1)), 0.).x;



  float sdf = rectSDF(uv, vec2(1.));
  gl_FragColor = vec4(h,m,l,1.) * (.05/abs(sdf - .5));
  // gl_FragColor += texture2D(camera, (uv+1.)*.5);
}
