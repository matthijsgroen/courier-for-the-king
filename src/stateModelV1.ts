import { GameDefinition } from "point-n-click";

export type GameState = GameDefinition<
  1,
  {
    version: 1;
    locations: {
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
      smithy: { flags: "visited" };
      darkwoods: { flags: "visited" };
      river: { flags: "visited" };
      treasureRoute: { counters: "steps" };
    };
    items: {
      bag: { states: "known" | "possession" };
      branch: { states: "possession" | "used" };
      pickaxe: { states: "broken" | "fixed" | "given" };
      rope: { states: "possession" };
      millstone: { states: "seen" };
      grain: { states: "cart" | "flour" | "delivered" };
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
    };
    // lists: { // useful for inventory management
    //   inventory:
    //     | "branch"
    //     | "coins"
    //     | "pickaxe"
    //     | "brokenPickaxe"
    //     | "rope"
    //     | "fabric"
    //     | "cookies"
    //     | "gemstone"
    //     | "sword";
    // };
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
      inventory: {};
      travel: {};
      treasureNotes: {};
      ingredientList: {};
      plants: {};
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
        | "repairedPickaxe";
    };
  }
>;
