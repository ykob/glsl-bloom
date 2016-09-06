const glslify = require('glslify');

export default class PlaneBright {
  constructor(texture) {
    this.uniforms = null;
    this.texture = texture;
    this.mesh = this.createMesh();
  }
  createMesh() {
    this.uniforms = {
      minBright: {
        type: 'f',
        value: 0.4,
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
        vertexShader: glslify('../../glsl/bright.vs'),
        fragmentShader: glslify('../../glsl/bright.fs'),
      })
    );
  }
}
