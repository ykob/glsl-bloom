uniform float tone;
uniform sampler2D tex_base;
uniform sampler2D tex_blur;

varying vec2 vUv;

void main(void) {
  gl_FragColor = (texture2D(tex_base, vUv) * tone + texture2D(tex_blur, vUv));
}
