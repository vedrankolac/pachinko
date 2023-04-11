import { GUI } from 'dat.gui';
import { 
  AmbientLight,
  SpotLight,
} from 'three';
import { PerlinNoise } from '../canvasMaps/PerlinNoise';

const createLights = scene => {
  let map = new PerlinNoise();
  
  // mobile phone optimisation
  // setting lower mapSize makes it much faster on iPhone 12 Pro Max
  // const spot = new SpotLight(0xffffff, 840);

  const spot = new SpotLight(0xffffff, 920);
  spot.penumbra = 1.6;
  spot.decay = 2;
  spot.angle = Math.PI/4;
  spot.position.set(0, 20, 0);
  spot.target.position.set(0, 0, 0);
  spot.castShadow = true;
  spot.map = map.colorMap;
  spot.shadow.focus = 1;
  spot.shadow.mapSize.width = 4096;
  spot.shadow.mapSize.height = 4096;
  scene.add(spot);
  map.colorMap = null;
  // scene.add(new SpotLightHelper(spot));

  const ambient = new AmbientLight(0x404040, 3.4); // soft white light
  scene.add(ambient);

  // const gui = new GUI();
  // gui.close()
  // gui.add(spot, 'intensity', 0.0, 1600.0 );
  // gui.add(ambient, 'intensity', 0.0, 10.0 );

}

export { createLights };