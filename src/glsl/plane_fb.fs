uniform vec2 resolution;
uniform sampler2D texture;

const float blur = 32.0;

varying vec2 vUv;

void main(void) {
  vec4 colorBase = texture2D(texture, vUv);
  vec4 color = vec4(0.0);

  // for (float x = 0.0; x < blur; x += 1.0){
  //   for (float y = 0.0; y < blur; y += 1.0){
  //     color += texture2D(texture, vUv + vec2(x / resolution.x, y / resolution.y)) * 0.1;
  //   }
  // }
  color += texture2D(texture, vUv + vec2(-2.0, -2.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(-2.0, -1.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(-2.0, 0.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(-2.0, 1.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(-2.0, 2.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(-1.0, -2.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(-1.0, -1.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(-1.0, 0.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(-1.0, 1.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(-1.0, 2.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(0.0, -2.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(0.0, -1.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(0.0, 0.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(0.0, 1.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(0.0, 2.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(1.0, -2.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(1.0, -1.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(1.0, 0.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(1.0, 1.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(1.0, 2.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(2.0, -2.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(2.0, -1.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(2.0, 0.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(2.0, 1.0) / resolution) * 0.04;
  color += texture2D(texture, vUv + vec2(2.0, 2.0) / resolution) * 0.04;

  gl_FragColor = color;
}
