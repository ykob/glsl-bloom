uniform vec2 cursor;

varying vec4 vColor;
varying vec4 vPosition;
varying mat4 vInvertMatrix;

void main(void) {
  vec3 normal = normalize(cross(dFdx(vPosition.xyz), dFdy(vPosition.xyz)));
  vec3 inv_light = normalize(vInvertMatrix * vec4(vec3(cursor.x, cursor.y, 1.0 - abs(cursor.x)), 0.0)).xyz;
  float diff = (dot(normal, inv_light) + 1.0) / 2.0;
  vec3 light = vec3(0.4) * diff;
  vec4 color = vColor;
  gl_FragColor = color + vec4(light, 1.0);
}
