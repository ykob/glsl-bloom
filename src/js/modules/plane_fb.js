const glslify = require('glslify');

export default class PlaneFb {
  constructor(texture) {
    this.uniforms = null;
    this.texture = texture;
    this.mesh = this.createMesh();
  }
  createMesh() {
    this.uniforms = {
      resolution: {
        type: 'v2',
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      texture: {
        type: 't',
        value: this.texture
      }
    };
    return new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: glslify('../../glsl/plane_fb.vs'),
        fragmentShader: glslify('../../glsl/plane_fb.fs'),
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
