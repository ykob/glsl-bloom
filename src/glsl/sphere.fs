uniform float radius;

varying vec4 vPosition;

void main(void) {
  float light = (-vPosition.y / radius + 1.0) / 10.0;
  vec3 color = vec3(1.0) - light;
  gl_FragColor = vec4(color, 1.0);
}
