const glslify = require('glslify');

export default class Sphere {
  constructor() {
    this.time = 3;
    this.hue = 0.1;
    this.uniforms = null;
    this.mesh = this.createMesh();
    this.setEvent();
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
      cursor: {
        type: 'v2',
        value: new THREE.Vector2(-0.5, 1),
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
  setEvent() {
    document.getElementById('canvas-webgl').addEventListener('click', (event) => {
      this.uniforms.cursor.value.set(
        event.clientX / window.innerWidth * 2 - 1,
        (window.innerHeight - event.clientY) / window.innerHeight * 2 - 1
      );
    });
  }
  render(time) {
    this.uniforms.time.value += time * this.time;
  }
}
