import { PerspectiveCamera, Group, Vector3 } from 'three';
import { MathUtils } from 'three';

const createCamera = () => {
  const camera = new PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 300 );

  const radius  = 2.2;
  const polar   = MathUtils.degToRad(75);
  const equator = MathUtils.degToRad(0);
  const cameraVector = new Vector3();
  cameraVector.setFromSphericalCoords(radius, polar, equator);
  camera.position.x = cameraVector.x;
  camera.position.y = cameraVector.y;
  camera.position.z = cameraVector.z;

  // camera.position.x = 0;
  // camera.position.y = 0;
  // camera.position.z = 0;

  return camera;
}

const createDolly = (camera, scene) => {
  const dolly = new Group();
  dolly.name = "dolly";
  scene.add(dolly);
  dolly.add(camera);
  dolly.position.set(0, 0, 0);
  return dolly;
}

export { createCamera, createDolly };