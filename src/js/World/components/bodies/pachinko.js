import { cube } from "../bodies/cube";
import { defaultColorMattPlastic } from "../materials/defaultColorMattPlastic";
import { hslToHex } from "../../utils/colorUtils";

const pachinko = (
  scene,
  loop,
  physicsWorld,
  envMap
) => {
  const color = hslToHex(0.6, 0, 0.9);
  const blackMaterial = defaultColorMattPlastic(color, 1, envMap);

  const size = {
    width:  1,
    height: 1,
    depth:  0.06
  }
  const translation = {
    x: 0,
    y: size.height,
    z: 0
  }
  const rotation = {
    x: 0,
    y: 0,
    z: 0
  }
  
  const cubeItem = cube(blackMaterial, size, translation, rotation, physicsWorld);
  scene.add(cubeItem.mesh);
  loop.bodies.push(cubeItem);

  return cubeItem.mesh;
}

export { pachinko };