import { cube } from "../bodies/cube";
import { sphere } from "../bodies/sphere";
import { defaultColorMattPlastic } from "../materials/defaultColorMattPlastic";
import { hslToHex } from "../../utils/colorUtils";

const pachinko = (
  scene,
  loop,
  physicsWorld,
  envMap
) => {
  const colorBack = hslToHex(0.6, 0, 0.9);
  const backMaterial = defaultColorMattPlastic(colorBack, 1, envMap);

  const colorBorder = hslToHex(0.6, 0, 0.8);
  const borderMaterial = defaultColorMattPlastic(colorBorder, 1, envMap);

  const colorBall = hslToHex(0.6, 1, 0.3);
  const ballMaterial = defaultColorMattPlastic(colorBall, 1, envMap);

  const backDepth = 0.06;
  const back = cube(
    backMaterial,
    {
      width:  1,
      height: 1,
      depth:  backDepth
    },
    {
      x: 0,
      y: 0.5,
      z: -backDepth/2
    },
    {
      x: 0,
      y: 0,
      z: 0
    },
    physicsWorld,
    'fixed'
  );
  scene.add(back.mesh);
  loop.bodies.push(back);

  const borderTop = cube(
    borderMaterial,
    {
      width:  1,
      height: backDepth,
      depth:  backDepth
    },
    {
      x: 0,
      y: 1 -backDepth/2,
      z: backDepth/2
    },
    {
      x: 0,
      y: 0,
      z: 0
    },
    physicsWorld,
    'fixed'
  );
  scene.add(borderTop.mesh);
  loop.bodies.push(borderTop);

  const borderBottom = cube(
    borderMaterial,
    {
      width:  1,
      height: backDepth,
      depth:  backDepth
    },
    {
      x: 0,
      y: backDepth/2,
      z: backDepth/2
    },
    {
      x: 0,
      y: 0,
      z: 0
    },
    physicsWorld,
    'fixed'
  );
  scene.add(borderBottom.mesh);
  loop.bodies.push(borderBottom);

  const borderLeft = cube(
    borderMaterial,
    {
      width:  backDepth,
      height: 1 - backDepth*2,
      depth:  backDepth
    },
    {
      x: -1/2 + backDepth/2,
      y: 1/2,
      z: backDepth/2
    },
    {
      x: 0,
      y: 0,
      z: 0
    },
    physicsWorld,
    'fixed'
  );
  scene.add(borderLeft.mesh);
  loop.bodies.push(borderLeft);

  const borderRight = cube(
    borderMaterial,
    {
      width:  backDepth,
      height: 1 - backDepth*2,
      depth:  backDepth
    },
    {
      x: 1/2 - backDepth/2,
      y: 1/2,
      z: backDepth/2
    },
    {
      x: 0,
      y: 0,
      z: 0
    },
    physicsWorld,
    'fixed'
  );
  scene.add(borderRight.mesh);
  loop.bodies.push(borderRight);
  
  const sphereRadius = 0.02;
  const sphereItem = sphere(
    ballMaterial,
    {
      radius: sphereRadius
    },
    {
      x: 0,
      y: 1/2,
      z: sphereRadius/2
    },
    {
      x: 0,
      y: 0,
      z: 0
    },
    physicsWorld
  );
    scene.add(sphereItem.mesh);
    loop.bodies.push(sphereItem);

  return back.mesh;
}

export { pachinko };