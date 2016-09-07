const glslify = require('glslify');

export default class PlaneBright {
  constructor(texture) {
    this.uniforms = null;
    this.minBright = 0.2;
    this.texture = texture;
    this.mesh = this.createMesh();
  }
  createMesh() {
    this.uniforms = {
      minBright: {
        type: 'f',
        value: this.minBright,
      },
      texture: {
        type: 't',
        value: this.texture,
      }
    };
    return new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: glslify('../../../glsl/bright.vs'),
        fragmentShader: glslify('../../../glsl/bright.fs'),
      })
    );
  }
}
