const glslify = require('glslify');

export default class Sphere {
  constructor() {
    this.time = 3;
    this.hue = 0.1;
    this.uniforms = null;
    this.mesh = this.createMesh();
  }
  createMesh() {
    this.uniforms = {
      time: {
        type: 'f',
        value: 0,
      },
      hue: {
        type: 'f',
        value: this.hue,
      },
    };
    return new THREE.Mesh(
      new THREE.OctahedronGeometry(240, 7),
      new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: glslify('../../glsl/sphere.vs'),
        fragmentShader: glslify('../../glsl/sphere.fs'),
        transparent: true,
        side: THREE.DoubleSide,
        shading: THREE.FlatShading,
      })
    );
  }
  render(time) {
    this.uniforms.time.value += time * this.time;
  }
}
