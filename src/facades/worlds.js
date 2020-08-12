import { worlds as worldsService } from '../services';

async function getAllWorlds(format = (w) => w) {
  const worldsL1 = await worldsService.getWorld1s();
  const worldsL2 = await worldsService.getWorld2s();
  const worldsL3 = await worldsService.getWorld3s();
  const worldsL4 = await worldsService.getWorld4s();

  return {
    worldsL1: worldsL1.map(format),
    worldsL2: worldsL2.map(format),
    worldsL3: worldsL3.map(format),
    worldsL4: worldsL4.map(format),
  };
}

export default {
  getAllWorlds,
};
