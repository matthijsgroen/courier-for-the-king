import g from "../game";

g.defineOverlay(
  "dragonConversation",

  ({ onEnter, interaction, closeOverlay, setPrompt }) => {
    onEnter(() => {
      g.text("You walk up to the dragon. He lies dozed off in the corner.");
      g.text("You hear his stomach growling with hunger.");
    });

    setPrompt("What will you say:", g.character("dragon").hasFlag("canTalk"));

    interaction("Walk away", g.always(), () => {
      closeOverlay();
    });
  }
);
