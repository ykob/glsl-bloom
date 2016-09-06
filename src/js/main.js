import PlaneBright from './modules/plane_bright.js';
import PlaneBlur from './modules/plane_blur.js';
import PlaneBloom from './modules/plane_bloom.js';
import Sphere from './modules/sphere.js';

const canvas = document.getElementById('canvas-webgl');
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas,
});
const render_base = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
const render_bright = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
const render_blurh = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
const render_blurv = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
const scene_base = new THREE.Scene();
const scene_bright = new THREE.Scene();
const scene_blurh = new THREE.Scene();
const scene_blurv = new THREE.Scene();
const scene_last = new THREE.Scene();
const camera_base = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
const camera_last = new THREE.PerspectiveCamera(45, 1, 1, 10000);
const clock = new THREE.Clock();

const sphere = new Sphere();
const plane_bright = new PlaneBright(render_base.texture);
const plane_blurh = new PlaneBlur(render_bright.texture, new THREE.Vector2(1.0, 0.0));
const plane_blurv = new PlaneBlur(render_blurh.texture, new THREE.Vector2(0.0, 1.0));
const plane_last = new PlaneBloom(render_base.texture, render_blurv.texture);

const resizeWindow = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  camera_base.aspect = window.innerWidth / window.innerHeight;
  camera_base.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  sphere.resize();
}
const setEvent = () => {
  $(window).on('resize', () => {
    resizeWindow();
  });
}
const initDatGui = () => {
  const gui = new dat.GUI();
  const controller = {
    radius: gui.add(sphere, 'radius', 0, 1000).name('Sphere Radius')
  }
  controller.radius.onChange((value) => {
    sphere.mesh.material.uniforms.radius.value = value;
  });
}
const render = () => {
  sphere.render(clock.getDelta());
  renderer.render(scene_base, camera_base, render_base);
  renderer.render(scene_bright, camera_last, render_bright);
  renderer.render(scene_blurh, camera_last, render_blurh);
  renderer.render(scene_blurv, camera_last, render_blurv);
  renderer.render(scene_last, camera_last);
}
const renderLoop = () => {
  render();
  requestAnimationFrame(renderLoop);
}

const init = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x333333, 1.0);
  camera_base.position.set(1000, 1000, 1000);
  camera_base.lookAt(new THREE.Vector3());

  scene_base.add(sphere.mesh);
  scene_bright.add(plane_bright.mesh);
  scene_blurh.add(plane_blurh.mesh);
  scene_blurv.add(plane_blurv.mesh);
  scene_last.add(plane_last.mesh);

  setEvent();
  initDatGui();
  resizeWindow();
  renderLoop();
}
init();
