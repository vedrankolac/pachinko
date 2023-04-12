import { CylinderGeometry, Mesh, Quaternion, Euler } from 'three';
import {
  RigidBodyDesc,
  ColliderDesc,
  ActiveEvents
} from '@dimforge/rapier3d-compat';
import { hslToHex } from '../../utils/colorUtils';
import { defaultColorMattPlastic } from '../materials/defaultColorMattPlastic';

const cylinder = (
  envMap,
    size,
    translation,
    rotation,
    physicsWorld,
    props = {
      rigidBodyType: 'dynamic',
      collisionEvents: false
    },
    radialSegments = 64,
    heightSegments = 1,
  ) => {

  const color = hslToHex(0.4, 0, 0.4);
  const material = defaultColorMattPlastic(color, 1, envMap);

  const geometry = new CylinderGeometry(
    size.radius,
    size.radius,
    size.height,
    radialSegments,
    heightSegments,
  );
  const mesh = new Mesh( geometry, material );
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  let rigidBodyDesc = null;
  if (props.rigidBodyType === 'dynamic') {
    rigidBodyDesc = RigidBodyDesc.dynamic();
  } else if (props.rigidBodyType === 'fixed') {
    rigidBodyDesc = RigidBodyDesc.fixed();
  }

  rigidBodyDesc.setTranslation(translation.x, translation.y, translation.z);
  const q = new Quaternion().setFromEuler(
    new Euler( rotation.x, rotation.y, rotation.z, 'XYZ' )
  )
  rigidBodyDesc.setRotation({ x: q.x, y: q.y, z: q.z, w: q.w });

  const rigidBody = physicsWorld.createRigidBody(rigidBodyDesc);
  rigidBody.iname = 'cylinder';
  rigidBody.mesh = mesh;

  let collider = null;
  if (!props.collisionEvents) {
    collider = ColliderDesc.cylinder(size.height / 2, size.radius);
  } else {
    collider = ColliderDesc.cylinder(size.height / 2, size.radius).setActiveEvents(ActiveEvents.COLLISION_EVENTS);
  }
  
  physicsWorld.createCollider(collider, rigidBody);

  return {
    mesh: mesh,
    collider: collider,
    rigidBody: rigidBody
  };
}

export { cylinder };