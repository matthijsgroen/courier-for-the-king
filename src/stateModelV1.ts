import { GameDefinition } from "point-n-click";

export type GameState = GameDefinition<
  1,
  {
    version: 1;
    locations: {
      home: { states: "home" };
      forest: { flags: "visited" };
      farmland: { flags: "visited" };
      farm: { flags: "visited" };
      hills: { flags: "visited" };
      mine: { flags: "visited" };
      mill: { flags: "visited"; states: "fixed" };
      swamp: { flags: "allowEntrance" };
      cabin: { flags: "visited" };
      village: { flags: "visited" };
      bakery: { flags: "visited" };
      smithy: { flags: "visited"; states: "browsing" };
      darkwoods: { flags: "visited" };
      tower: { flags: "visited"; states: "firstVisit" | "inside" | "visited" };
      towerTop: { flags: "visited"; states: "sneakIn" };
      towerTopElevator: {};
      towerBaseElevator: {};
      river: { flags: "visited" };
      treasureRoute: { counters: "steps" };
    };
    items: {
      testDice: { counters: "dice1" | "dice2" | "dice3" };
      elevator: { states: "down" | "broken" };
      bag: { states: "known" | "possession" };
      branch: { states: "possession" | "used" };
      pickaxe: { states: "broken" | "fixed" | "given" };
      rope: { states: "possession" };
      millstone: { states: "seen" | "cart" | "elevator" | "used" | "rope" };
      grain: { states: "access" | "cart" | "flour" | "delivered" };
      fabric: { states: "possession" | "used" };
      medicine: { flags: "recipe" };
      cookies: { states: "price" | "possession" | "given" };
      gemstone: { states: "chopped" | "possession" | "used" };
      sword: { states: "need" | "possession" };
      necklace: { states: "need" | "possession" | "given" };
      treasureNotes: {
        states: "existence" | "possession";
        flags: "moonStone" | "route" | "startPoint";
      };
      ingredientList: {
        states: "possession";
        flags: "seen" | "roundLeaves" | "thornyLeaves" | "tooth" | "toadstools";
      };
      treasureHunt: { flags: "active" | "done" };
      moonStone: { states: "possession" };
      gold: { states: "possession" | "used" };
      runeStone: { states: "possession" };
      plants: { counters: "roundLeaves" | "thornyLeaves" };
      mushrooms: { counters: "lightblue" };
    };
    characters: {
      player: { counters: "coins"; flags: "male" };
      dwarf: { flags: "nameKnown"; states: "happy" };
      miller: {};
      horse: {
        states: "river" | "following" | "stable";
        flags: "hooves" | "cart" | "found" | "known";
      };
      dragon: { states: "known" | "found" };
      farmer: { flags: "visited" | "toldDragon" | "returnedHorse" };
      daughter: {};
      witch: {};
      baker: { flags: "toldDragon" };
      farrier: {};
      goldsmith: {};
      armorer: {};
    };
    overlays: {
      dwarfConversation: {};
      millerConversation: {};
      farmerConversation: {};
      bakerConversation: {
        states: "buyCookies" | "intro" | "visiting";
      };
      smithsConversation: { states: "fixHorseshoe" | "createNecklace" };
      witchConversation: { states: "intro" | "visited" };
      daughterConversation: { states: "intro" | "visited" };
      inventory: {};
      travel: {};
      treasureNotes: {};
      ingredientList: {};
      plants: {};
      mushrooms: {};
      gameIntro: { states: "name" };
    };
    lists: {
      inventory:
        | "branch"
        | "rope"
        | "gem"
        | "gold"
        | "necklace"
        | "coins"
        | "cookies"
        | "runeStone"
        | "moonStone"
        | "fabric"
        | "treasureNotes"
        | "ingredientList"
        | "brokenPickaxe"
        | "thornyLeaves"
        | "roundLeaves"
        | "lightblueMushrooms"
        | "sword"
        | "repairedPickaxe";
    };
  }
>;
