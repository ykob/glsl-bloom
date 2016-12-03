uniform float time;
uniform float hue;

varying vec4 vColor;
varying vec4 vPosition;
varying mat4 vInvertMatrix;

#pragma glslify: inverse = require(glsl-inverse);
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d);
#pragma glslify: hsv2rgb = require(./modules/hsv2rgb.glsl);

void main(void) {
  float noise1 = cnoise3(
      vec3(
        position.x * 0.006 + time * 0.5,
        position.y * 0.012,
        position.z * 0.006
      )
    );
  float noise2 = cnoise3(
      vec3(
        position.x * 0.02,
        position.y * 0.06,
        position.z * 0.02 + time
      )
    );
  vec4 noisePosition = vec4(position + (normalize(position) * (50.0 * noise1 + 10.0 * noise2)), 1.0);
  vColor = vec4(hsv2rgb(vec3(hue, 0.65, 0.0 + (length(noisePosition) - 240.0) / 60.0)), 1.0);
  vPosition = noisePosition;
  vInvertMatrix = inverse(modelMatrix);
  gl_Position = projectionMatrix * modelViewMatrix * noisePosition;
}
