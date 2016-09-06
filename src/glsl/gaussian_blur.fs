uniform vec2 resolution;
uniform vec2 direction;
uniform sampler2D texture;

varying vec2 vUv;

#pragma glslify: blur = require('./modules/blur13.glsl');

void main(void) {
  vec4 colorBase = texture2D(texture, vUv);
  gl_FragColor = blur(texture, vUv, resolution, direction);
}
