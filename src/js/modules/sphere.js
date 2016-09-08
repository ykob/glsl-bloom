const glslify = require('glslify');

export default class Sphere {
  constructor() {
    this.time = 2;
    this.radius = 200;
    this.uniforms = null;
    this.mesh = this.createMesh();
  }
  createMesh() {
    this.uniforms = {
      time: {
        type: 'f',
        value: 0,
      },
      resolution: {
        type: 'v2',
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      radius: {
        type: 'f',
        value: this.radius,
      },
    };
    return new THREE.Mesh(
      new THREE.OctahedronGeometry(300, 5),
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
  resize() {
    this.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
  }
}
