uniform float minBright;
uniform sampler2D texture;

varying vec2 vUv;

void main(void) {
  vec3 bright = max(vec3(0.0), (texture2D(texture, vUv) - minBright).rgb);
  gl_FragColor = vec4(bright, 1.0);
}
