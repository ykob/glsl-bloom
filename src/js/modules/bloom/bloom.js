import PlaneBright from './plane_bright.js';
import PlaneBlur from './plane_blur.js';
import PlaneBloom from './plane_bloom.js';

export default class Bloom {
  constructor(tex_base) {
    this.blurCount = 3;
    this.renderTarget = [
      new THREE.WebGLRenderTarget(window.innerWidth / 10, window.innerHeight / 10),
      new THREE.WebGLRenderTarget(window.innerWidth / 10, window.innerHeight / 10),
    ];
    this.scene = {
      bright: new THREE.Scene(),
      blurh: new THREE.Scene(),
      blurv: new THREE.Scene(),
      bloom: new THREE.Scene(),
    };
    this.camera = new THREE.PerspectiveCamera(45, 1, 1, 2)
    this.plane = {
      bright: new PlaneBright(tex_base),
      blurh: new PlaneBlur(this.renderTarget[0].texture, new THREE.Vector2(1.0, 0.0)),
      blurv: new PlaneBlur(this.renderTarget[1].texture, new THREE.Vector2(0.0, 1.0)),
      bloom: new PlaneBloom(tex_base, this.renderTarget[0].texture),
    };
    this.init();
  }
  init() {
    this.scene.bright.add(this.plane.bright.mesh);
    this.scene.blurh.add(this.plane.blurh.mesh);
    this.scene.blurv.add(this.plane.blurv.mesh);
    this.scene.bloom.add(this.plane.bloom.mesh);
  }
  render(renderer) {
    renderer.render(this.scene.bright, this.camera, this.renderTarget[0]);
    for (var i = 0; i < this.blurCount; i++) {
      renderer.render(this.scene.blurh, this.camera, this.renderTarget[1]);
      renderer.render(this.scene.blurv, this.camera, this.renderTarget[0]);
    }
    renderer.render(this.scene.bloom, this.camera);
  }
  resize() {
    this.renderTarget[0].setSize(window.innerWidth / 10, window.innerHeight / 10);
    this.renderTarget[1].setSize(window.innerWidth / 10, window.innerHeight / 10);
    this.plane.blurh.resize();
    this.plane.blurv.resize();
  }
}
