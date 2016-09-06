uniform vec2 resolution;
uniform vec2 direction;
uniform sampler2D texture;

varying vec2 vUv;

#pragma glslify: blur13 = require('glsl-fast-gaussian-blur/13')
#pragma glslify: blur9 = require('glsl-fast-gaussian-blur/9')
#pragma glslify: blur5 = require('glsl-fast-gaussian-blur/5')

void main(void) {
  vec4 colorBase = texture2D(texture, vUv);
  gl_FragColor = blur13(texture, vUv, resolution, direction);
}
