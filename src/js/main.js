import PlaneFb from './modules/plane_fb.js';
import Sphere from './modules/sphere.js';

const canvas = document.getElementById('canvas-webgl');
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas,
});
const render_target = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();
const scene_fb = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 1, 10000);
const camera_fb = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
const clock = new THREE.Clock();

const plane_fb = new PlaneFb(render_target.texture);
const sphere = new Sphere();

const resizeWindow = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
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
  renderer.render(scene_fb, camera_fb, render_target);
  plane_fb.texture.needUpdate = true;
  renderer.render(scene, camera);
}
const renderLoop = () => {
  render();
  requestAnimationFrame(renderLoop);
}

const init = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 1.0);
  camera_fb.position.set(1000, 1000, 1000);
  camera_fb.lookAt(new THREE.Vector3());

  scene.add(plane_fb.mesh);
  scene_fb.add(sphere.mesh);

  setEvent();
  initDatGui();
  resizeWindow();
  renderLoop();
}
init();
