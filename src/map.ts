import { WorldMap } from "point-n-click";
import g from "./game";
import { GameWorld } from "../../point-n-click/packages/types/dist";

g.defineMap({
  start: "forest",
  locations: {
    home: {
      connections: {
        forest: {
          direction: "teleport",
          availability: "End of prolog.",
        },
      },
    },
    forest: {
      connections: {
        hills: {
          direction: "west",
        },
        farmland: {
          direction: "east",
        },
      },
    },
    farmland: {
      connections: {
        forest: {
          direction: "west",
        },
        village: {
          direction: "south",
        },
        farm: {
          direction: "contains",
        },
      },
    },
    farm: {
      characters: {
        farmer: {},
        horse: { availability: "when put in stable" },
      },
      connections: {
        farmland: {
          direction: "parent",
        },
      },
    },
    village: {
      connections: {
        smithy: { direction: "contains" },
        bakery: { direction: "contains" },
        farmland: { direction: "north" },
        darkwoods: { direction: "east", availability: "sword and dragon info" },
        river: { direction: "south" },
      },
    },
    river: {
      characters: { horse: { availability: "parking for drinking" } },
      connections: {
        village: { direction: "north" },
      },
    },
    smithy: {
      characters: {
        armorer: {},
        farrier: {},
        goldsmith: {},
      },
      connections: {
        village: { direction: "parent" },
      },
    },
    darkwoods: {
      connections: {
        village: { direction: "west" },
        tower: { direction: "contains" },
      },
    },
    tower: {
      connections: {
        darkwoods: { direction: "parent" },
        towerTop: { direction: "floor-up" },
        towerBaseElevator: { direction: "northeast" },
      },
    },
    towerTop: {
      characters: {
        dragon: {},
        daughter: { availability: "till tooth pulled" },
      },
      connections: {
        tower: { direction: "floor-down" },
        towerTopElevator: { direction: "east" },
      },
    },
    towerTopElevator: {
      connections: {
        towerTop: { direction: "west" },
        towerBaseElevator: { direction: "floor-down" },
      },
    },
    towerBaseElevator: {
      connections: {
        towerTopElevator: { direction: "floor-up" },
        tower: { direction: "southwest" },
      },
    },
    bakery: {
      characters: {
        baker: {},
      },
      connections: {
        village: { direction: "parent" },
      },
    },
    hills: {
      connections: {
        forest: { direction: "east" },
        swamp: {
          direction: "south",
          availability: "When gaining knowledge about witch",
        },
        mill: { direction: "contains" },
        mine: { direction: "contains" },
      },
    },
    mine: {
      characters: {
        dwarf: {},
      },
      connections: {
        hills: { direction: "parent" },
      },
    },
    mill: {
      characters: {
        miller: {},
      },
      connections: {
        hills: { direction: "parent" },
      },
    },
    swamp: {
      connections: {
        cabin: { direction: "contains" },
        hills: { direction: "north" },
      },
    },
    cabin: {
      characters: { witch: {} },
      connections: {
        swamp: { direction: "parent" },
        cabinInside: { direction: "contains" },
      },
    },
    cabinInside: {
      characters: { witch: {} },
      connections: {
        cabin: { direction: "parent" },
      },
    },
  },
});
