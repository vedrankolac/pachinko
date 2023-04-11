import { CylinderGeometry, Mesh, Quaternion, Euler } from 'three';
import {
  RigidBodyDesc,
  ColliderDesc
} from '@dimforge/rapier3d-compat';

const cylinder = (
    material,
    size,
    translation,
    rotation,
    physicsWorld,
    rigidType = 'dynamic',
    radialSegments = 64,
    heightSegments = 1,
  ) => {

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
  if (rigidType === 'dynamic') {
    rigidBodyDesc = RigidBodyDesc.dynamic();
  } else if (rigidType === 'fixed') {
    rigidBodyDesc = RigidBodyDesc.fixed();
  }

  rigidBodyDesc.setTranslation(translation.x, translation.y, translation.z);
  const q = new Quaternion().setFromEuler(
    new Euler( rotation.x, rotation.y, rotation.z, 'XYZ' )
  )
  rigidBodyDesc.setRotation({ x: q.x, y: q.y, z: q.z, w: q.w });

  const rigidBody = physicsWorld.createRigidBody(rigidBodyDesc);
  const collider = ColliderDesc.cylinder(size.height / 2, size.radius);

  physicsWorld.createCollider(collider, rigidBody);

  return {
    mesh: mesh,
    collider: collider,
    rigidBody: rigidBody
  };
}

export { cylinder };