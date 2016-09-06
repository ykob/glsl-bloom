uniform vec2 resolution;
uniform vec2 direction;
uniform sampler2D texture;
uniform float weight[10];

varying vec2 vUv;

#pragma glslify: blur13 = require('glsl-fast-gaussian-blur/13')
#pragma glslify: blur9 = require('glsl-fast-gaussian-blur/9')
#pragma glslify: blur5 = require('glsl-fast-gaussian-blur/5')

float gaussianPdf(in float x, in float sigma) {
  return 0.39894 * exp( -0.5 * x * x/(sigma * sigma))/sigma;
}

void main(void) {
  gl_FragColor = blur9(texture, vUv, resolution, direction);
}
