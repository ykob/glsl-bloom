uniform float time;

varying vec4 vPosition;
varying mat4 vInvertMatrix;

#pragma glslify: inverse = require(glsl-inverse);
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d);

void main(void) {
  float noise = cnoise3(
      vec3(
        position.x * 0.004 + time,
        position.y * 0.004,
        position.z * 0.004
      )
    );
  vec4 noise_position = vec4(position + vec3(600.0 * noise), 1.0);
  vPosition = noise_position;
  vInvertMatrix = inverse(modelMatrix);
  gl_Position = projectionMatrix * modelViewMatrix * noise_position;
}
