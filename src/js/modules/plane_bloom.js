const glslify = require('glslify');

export default class PlaneBloom {
  constructor(tex_base, tex_blur) {
    this.uniforms = null;
    this.tex_base = tex_base;
    this.tex_blur = tex_blur;
    this.mesh = this.createMesh();
  }
  createMesh() {
    this.uniforms = {
      tone: {
        type: 'f',
        value: 0.8,
      },
      tex_base: {
        type: 't',
        value: this.tex_base
      },
      tex_blur: {
        type: 't',
        value: this.tex_blur
      }
    };
    return new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: glslify('../../glsl/bloom.vs'),
        fragmentShader: glslify('../../glsl/bloom.fs'),
      })
    );
  }
  render(time) {
    this.uniforms.time.value += time * this.time;
  }
}
