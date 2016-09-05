uniform float radius;

varying vec4 vPosition;

#pragma glslify: scaleMatrix = require(./modules/scale_matrix);

void main(void) {
  vec4 update_position = scaleMatrix(vec3(radius)) * vec4(position, 1.0);
  vPosition = update_position;
  gl_Position = projectionMatrix * modelViewMatrix * update_position;
}
