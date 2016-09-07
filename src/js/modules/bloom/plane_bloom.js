const glslify = require('glslify');

export default class PlaneBloom {
  constructor(tex_base, tex_blur) {
    this.uniforms = null;
    this.tone = 0.7;
    this.strength = 1;
    this.texBase = tex_base;
    this.texBlur = tex_blur;
    this.mesh = this.createMesh();
  }
  createMesh() {
    this.uniforms = {
      tone: {
        type: 'f',
        value: this.tone,
      },
      strength: {
        type: 'f',
        value: this.strength,
      },
      texBase: {
        type: 't',
        value: this.texBase,
      },
      texBlur: {
        type: 't',
        value: this.texBlur,
      }
    };
    return new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: glslify('../../../glsl/bloom/bloom.vs'),
        fragmentShader: glslify('../../../glsl/bloom/bloom.fs'),
      })
    );
  }
}
