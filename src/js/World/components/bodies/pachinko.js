import { cube } from "../bodies/cube";
import { sphere } from "../bodies/sphere";
import { cylinder } from "../bodies/cylinder";
import { defaultColorMattPlastic } from "../materials/defaultColorMattPlastic";
import { hslToHex } from "../../utils/colorUtils";
import { MathUtils } from 'three';
import { mapNumber } from "../../utils/numUtils";


const pachinko = (
  scene,
  loop,
  physicsWorld,
  envMap
) => {
  const colorBack = hslToHex(0.6, 0, 0.9);
  const backMaterial = defaultColorMattPlastic(colorBack, 1, envMap);

  const colorBorder = hslToHex(0.4, 0, 0.6);
  const borderMaterial = defaultColorMattPlastic(colorBorder, 1, envMap);
  
  const colorCylinder = hslToHex(0.4, 0, 0.4);
  const cylinderMaterial = defaultColorMattPlastic(colorCylinder, 1, envMap);

  const colorBall = hslToHex(Math.random(), 0.0, 0.08);
  const ballMaterial = defaultColorMattPlastic(colorBall, 1, envMap);

  // back

  const backDepth = 0.02;
  const borderDepth = 0.04
  
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

  // front

  const frontDepth = 0.02;
  const front = cube(
    backMaterial,
    {
      width:  1,
      height: 1,
      depth:  backDepth
    },
    {
      x: 0,
      y: 0.5,
      z: frontDepth/2 + borderDepth
    },
    {
      x: 0,
      y: 0,
      z: 0
    },
    physicsWorld,
    'fixed'
  );
  // dont add it to scene because we don't want it
  // scene.add(front.mesh);
  loop.bodies.push(front);

  // borders

  const borderTop = cube(
    borderMaterial,
    {
      width:  1,
      height: borderDepth,
      depth:  borderDepth
    },
    {
      x: 0,
      y: 1 -borderDepth/2,
      z: borderDepth/2
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
      height: borderDepth,
      depth:  borderDepth
    },
    {
      x: 0,
      y: borderDepth/2,
      z: borderDepth/2
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
      width:  borderDepth,
      height: 1 - borderDepth*2,
      depth:  borderDepth
    },
    {
      x: -1/2 + borderDepth/2,
      y: 1/2,
      z: borderDepth/2
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
      width:  borderDepth,
      height: 1 - borderDepth*2,
      depth:  borderDepth
    },
    {
      x: 1/2 - borderDepth/2,
      y: 1/2,
      z: borderDepth/2
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

  // cylinder structure

  const cylinderRadius = 0.006;
  // const cylinderRadius = Math.random() * 0.008 + 0.004;
  const cylinderHeight = borderDepth;
  const cylinderMargin = 0.048;

  const marginRect = {
    right:  0.5 - borderDepth - cylinderRadius - cylinderMargin,
    left:  -0.5 + borderDepth + cylinderRadius + cylinderMargin,
    top:      1 - borderDepth - cylinderRadius - cylinderMargin,
    bottom:       borderDepth + cylinderRadius + cylinderMargin,
  }

  const nc = Math.round(Math.random()*4) + 12;
  // const nc = 16;
  console.log('grid:     ', nc);
  const ncy = nc;
  const ncx = nc;
  for (let i = 0; i < ncx; i++) {

    let jn = ncy;
    let x_shift = 0;
    if (i % 2 !== 0) {
      jn = ncx - 1;
      x_shift = -(marginRect.left - marginRect.right)/nc/2;
    }

    for (let j = 0; j < jn; j++) {      
      const cylinderItem = cylinder(
        cylinderMaterial,
        {
          radius: cylinderRadius,
          height: cylinderHeight,
        },
        {
          x: mapNumber(j, 0, ncx-1, marginRect.left + x_shift, marginRect.right + x_shift),
          y: mapNumber(i, 0, ncy-1, marginRect.top, marginRect.bottom),
          z: cylinderHeight/2
        },
        {
          x: MathUtils.degToRad(90),
          y: 0,
          z: 0
        },
        physicsWorld,
        'fixed'
      );
      scene.add(cylinderItem.mesh);
      loop.bodies.push(cylinderItem);
    }
  }

  // ball
  
  const nOfBalls = Math.round(Math.random()*40) + 1;
  console.log('balls:    ', nOfBalls);
  for (let i = 0; i < nOfBalls; i++) {
    // const sphereRadius = 0.020;
    const sphereRadius = Math.random()*0.011 + 0.008;
    const sphereItem = sphere(
      ballMaterial,
      {
        radius: sphereRadius
      },
      {
        // x: 0.5 - borderDepth - sphereRadius,
        // x: -0.5 + borderDepth + sphereRadius,
        x: Math.random() * (1 - borderDepth*2 - sphereRadius*2) + (-0.5 + borderDepth + sphereRadius),
        y: 1 - borderDepth - sphereRadius,
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
  }

  return back.mesh;
}

export { pachinko };