uniform float time;

varying vec4 vColor;
varying vec4 vPosition;
varying mat4 vInvertMatrix;

#pragma glslify: inverse = require(glsl-inverse);
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d);

void main(void) {
  float noise = smoothstep(-0.1, 0.1, cnoise3(
      vec3(
        position.x * 0.007,
        position.y * 0.024 + time,
        position.z * 0.007
      )
    ));
  vec4 noise_position = vec4(position + (normalize(position) * 6.0 * noise), 1.0);
  vColor = vec4(0.85 - (1.0 - noise) * 0.8, 0.55 - (1.0 - noise) * 0.45, 0.35 - (1.0 - noise) * 0.25, 1.0);
  vPosition = noise_position;
  vInvertMatrix = inverse(modelMatrix);
  gl_Position = projectionMatrix * modelViewMatrix * noise_position;
}
