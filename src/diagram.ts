import g from "./game";

type MetaData = {
  state: "text" | "progress" | "images" | "animated";
  languages: "en" | "nl";
};

g.definePuzzleDependencies<MetaData>({
  getOutOfBed: {
    tags: {},
    hierarchy: ["home"],
  },
  openWindow: {
    dependsOn: ["getOutOfBed"],
    tags: {},
    hierarchy: ["home"],
  },
  getBagFromDoor: {
    dependsOn: ["openWindow"],
    tags: {},
    hierarchy: ["home"],
  },
  getKeyFromBag: {
    dependsOn: ["getBagFromDoor"],
    tags: {},
    hierarchy: ["home"],
  },
  getFoodFromCloset: {
    dependsOn: ["getKeyFromBag"],
    tags: {},
    hierarchy: ["home"],
  },
  feedRaven: {
    dependsOn: ["getFoodFromCloset"],
    tags: {},
    hierarchy: ["home"],
  },
  getLetterFromRaven: {
    dependsOn: ["feedRaven"],
    tags: {},
    hierarchy: ["home"],
  },
  readLetter: {
    dependsOn: ["getLetterFromRaven"],
    tags: {},
    hierarchy: ["home"],
  },
  mainAct: {
    name: "Main Act",
    type: "chapter",
    dependsOn: ["readLetter"],
    tags: { state: "text" },
  },
  getWood: {
    dependsOn: ["mainAct"],
    tags: { state: ["text"], languages: ["en", "nl"] },
    hierarchy: ["forest"],
  },
  payTwoCoins: {
    dependsOn: ["mainAct"],
    tags: { state: ["text"], languages: ["en", "nl"] },
    hierarchy: ["village"],
  },
  buyCookies: {
    dependsOn: ["payTwoCoins", "get100CoinsFromFlour"],
    gateType: "or",
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["village", "bakery"],
  },
  giveFood: {
    dependsOn: ["buyCookies", "talkToDwarf"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["hills", "mine"],
  },
  talkToDwarf: {
    dependsOn: ["mainAct"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["hills", "mine"],
  },
  getBrokenPickAxe: {
    dependsOn: ["talkToDwarf"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["hills", "mine"],
  },
  repairPickAxe: {
    dependsOn: ["getWood", "getBrokenPickAxe"],
    tags: { state: "text", languages: ["en", "nl"] },
  },
  givePickAxe: {
    dependsOn: ["repairPickAxe"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["hills", "mine"],
  },
  getGem: {
    dependsOn: ["giveFood", "givePickAxe"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["hills", "mine"],
  },
  talkToBaker: {
    dependsOn: ["mainAct"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["village", "bakery"],
  },
  talkToWitch: {
    dependsOn: ["getEntranceToSwamp"],
    tags: { state: "progress", languages: ["en", "nl"] },
    hierarchy: ["swamp", "cabin"],
  },
  createJewelryAtSmith: {
    dependsOn: ["getGem", "getGoldInForest", "talkToWitch"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["village", "smithy"],
  },
  giveJewelryToWitch: {
    dependsOn: ["createJewelryAtSmith", "talkToWitch"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["swamp", "cabin"],
  },
  getIngredientList: {
    dependsOn: ["giveJewelryToWitch"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["swamp", "cabin"],
  },
  pluckMushrooms: {
    dependsOn: ["getIngredientList", "theMonster"],
    tags: { state: "progress", languages: ["en", "nl"] },
    hierarchy: ["darkWood"],
  },
  pluckPlants: {
    dependsOn: ["getIngredientList"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["swamp"],
  },
  getAccessToCabin: {
    dependsOn: ["pluckMushrooms", "pluckPlants", "getDragonTooth"],
    tags: {},
    hierarchy: ["swamp", "cabin"],
  },
  getBeaker: {
    dependsOn: ["getAccessToCabin"],
    tags: {},
    hierarchy: ["swamp", "cabin"],
  },
  dissolvePotion: {
    dependsOn: ["getAccessToCabin"],
    tags: {},
    hierarchy: ["swamp", "cabin"],
  },
  getAccessToBasement: {
    dependsOn: ["dissolvePotion"],
    tags: {},
    hierarchy: ["darkWood", "tower"],
  },
  getWineFromCellar: {
    dependsOn: ["getBeaker", "getAccessToBasement"],
    tags: {},
    hierarchy: ["darkWood", "tower"],
  },
  brewWakeUpPotion: {
    dependsOn: ["getWineFromCellar"],
    tags: {},
    hierarchy: ["darkWood", "tower"],
  },
  wakeUpWitch: {
    dependsOn: ["brewWakeUpPotion"],
    tags: {},
    hierarchy: ["swamp", "cabin"],
  },
  createMedicine: {
    dependsOn: ["wakeUpWitch"],
    tags: {},
    hierarchy: ["swamp", "cabin"],
  },
  payFarrier: {
    dependsOn: ["payTwoCoins", "getCoinsFromSmith"],
    gateType: "or",
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["village", "smithy"],
  },
  getHorse: {
    dependsOn: ["talkToFarmer"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["river"],
  },
  getCoinsFromSmith: {
    dependsOn: ["createJewelryAtSmith"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["village", "smithy"],
  },
  fixHorseshoe: {
    dependsOn: ["getHorse", "payFarrier"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["village", "smithy"],
  },
  getGiantTrunks: {
    dependsOn: ["mainAct"],
    tags: { state: ["text"], languages: ["en", "nl"] },
    hierarchy: ["river"],
  },
  repairMill: {
    dependsOn: ["getGiantTrunks"],
    tags: { state: ["text"], languages: ["en", "nl"] },
    hierarchy: ["hills", "mill"],
  },
  getCart: {
    dependsOn: ["repairMill", "fixHorseshoe"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["hills", "mill"],
  },
  putGrainOnCart: {
    dependsOn: ["getCart", "talkToFarmer"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["farm"],
  },
  deliverGrainToMiller: {
    dependsOn: ["putGrainOnCart"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["hills", "mill"],
  },
  getFlourFromMiller: {
    dependsOn: ["deliverGrainToMiller"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["hills", "mill"],
  },
  deliverFlourToBaker: {
    dependsOn: ["getFlourFromMiller"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["village", "bakery"],
  },
  get100CoinsFromFlour: {
    dependsOn: ["deliverFlourToBaker"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["village", "bakery"],
  },
  buySword: {
    dependsOn: ["talkToBaker", "get100CoinsFromFlour"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["village", "smithy"],
  },
  talkToSmiths: {
    dependsOn: ["mainAct"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["village", "smithy"],
  },
  getTreasureSubject: {
    dependsOn: ["talkToSmiths"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["village", "smithy"],
  },
  getPlantHintOfBaker: {
    dependsOn: ["getTreasureSubject"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["village", "bakery"],
  },
  getRiverHintFromMiller: {
    dependsOn: ["getTreasureSubject"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["hills", "mill"],
  },
  getRouteHintFromFarmer: {
    dependsOn: ["getTreasureSubject"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["farm"],
  },
  getEntranceToSwamp: {
    dependsOn: ["talkToBaker"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["village", "bakery"],
  },
  completeTreasureRouteInfo: {
    dependsOn: ["getRiverHintFromMiller", "getRouteHintFromFarmer"],
    tags: { state: "text", languages: ["en", "nl"] },
  },
  findMoonStoneInSwamp: {
    dependsOn: ["getPlantHintOfBaker", "getEntranceToSwamp"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["swamp"],
  },
  followMoonStoneTrail: {
    dependsOn: ["findMoonStoneInSwamp", "completeTreasureRouteInfo"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["river"],
  },
  getRuneStone: {
    dependsOn: ["followMoonStoneTrail"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["forest"],
  },
  talkToFarmer: {
    dependsOn: ["mainAct"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["farm"],
  },
  getRope: {
    dependsOn: ["mainAct"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["farm"],
  },
  getInfoAboutMonster: {
    dependsOn: ["talkToBaker", "talkToFarmer"],
    tags: { state: "text", languages: ["en", "nl"] },
  },
  theMonster: {
    name: "The Monster",
    dependsOn: ["buySword", "getInfoAboutMonster"],
    tags: { state: "text", languages: ["en", "nl"] },
    type: "chapter",
    hierarchy: ["darkWood"],
  },
  climbTower: {
    dependsOn: ["theMonster"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["darkWood", "tower"],
  },
  talkToDaughter: {
    dependsOn: ["climbTower"],
    tags: { state: "progress", languages: ["en", "nl"] },
    hierarchy: ["darkWood", "tower"],
  },
  putMillstoneOnCart: {
    dependsOn: ["talkToDaughter"],
    tags: {},
    hierarchy: ["hills", "mill"],
  },
  putMillstoneOnElevator: {
    dependsOn: ["putMillstoneOnCart", "talkToDaughter"],
    tags: {},
    hierarchy: ["darkWood", "tower"],
  },
  raiseElevatorWithMillstone: {
    dependsOn: ["putMillstoneOnElevator"],
    tags: {},
    hierarchy: ["darkWood", "tower"],
  },
  bindRopeToMillstone: {
    dependsOn: ["raiseElevatorWithMillstone", "getRope"],
    tags: {},
    hierarchy: ["darkWood", "tower"],
  },
  bindRopeToTeeth: {
    dependsOn: ["getRope", "talkToDaughter"],
    tags: {},
    hierarchy: ["darkWood", "tower"],
  },
  cutRopeOfElevator: {
    dependsOn: ["bindRopeToMillstone", "bindRopeToTeeth"],
    tags: {},
    hierarchy: ["darkWood", "tower"],
  },
  pullToothOfDragon: {
    dependsOn: ["cutRopeOfElevator"],
    tags: {},
    hierarchy: ["darkWood", "tower"],
  },
  getDragonTooth: {
    dependsOn: ["getIngredientList", "pullToothOfDragon"],
    tags: {},
    hierarchy: ["darkWood", "tower"],
  },
  bringDaughterToBaker: {
    dependsOn: ["pullToothOfDragon"],
    tags: {},
    hierarchy: ["darkWood", "tower"],
  },
  getApplePieFromBaker: {
    dependsOn: ["bringDaughterToBaker"],
    tags: {},
    hierarchy: ["village", "bakery"],
  },
  giveApplePieToDragon: {
    dependsOn: ["getApplePieFromBaker"],
    tags: {},
    hierarchy: ["darkWood", "tower"],
  },
  getMoss: {
    dependsOn: ["getAccessToCabin"],
    tags: {},
    hierarchy: ["forest"],
  },
  createPotionToTalkToDragon: {
    dependsOn: ["getRuneStone", "getMoss", "getAccessToCabin"],
    tags: {},
    hierarchy: ["swamp", "cabin"],
  },
  talkToDragon: {
    dependsOn: ["createPotionToTalkToDragon"],
    tags: {},
    hierarchy: ["darkWood", "tower"],
  },
  getPaintingFromBasement: {
    dependsOn: ["talkToDragon"],
    tags: {},
    hierarchy: ["darkWood", "tower"],
  },
  findSaddleInBasement: {
    dependsOn: ["getAccessToBasement"],
    tags: {},
    hierarchy: ["darkWood", "tower"],
  },
  putSaddleOnDragon: {
    dependsOn: [
      "getPaintingFromBasement",
      "findSaddleInBasement",
      "giveApplePieToDragon",
    ],
    tags: {},
    hierarchy: ["darkWood", "tower"],
  },
  getGoldInForest: {
    dependsOn: ["followMoonStoneTrail"],
    tags: { state: "text", languages: ["en", "nl"] },
    hierarchy: ["forest"],
  },
  getMedicineToKing: {
    dependsOn: ["putSaddleOnDragon", "createMedicine"],
    type: "chapter",
  },
});
