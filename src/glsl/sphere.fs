varying vec4 vPosition;
varying mat4 vInvertMatrix;

void main(void) {
  vec3 normal = normalize(cross(dFdx(vPosition.xyz), dFdy(vPosition.xyz)));
  vec3 inv_light = normalize(vInvertMatrix * vec4(vec3(0.0, -1.0, 0.0), 0.0)).xyz;
  float diff = (dot(normal, inv_light) + 1.0) / 2.0;
  vec3 light = vec3(0.4) * diff;
  vec4 color = vec4(0.7, 0.6, 0.42, 1.0);
  gl_FragColor = color + vec4(light, 1.0);
}
