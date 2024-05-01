import g from "../game";

g.defineLocation(
  "cabin",
  ({ describe, onLeave, interaction, hasFlag, onEnter, hasState }) => {
    describe(() => {
      g.onState(hasFlag("visited"), () => {
        g.descriptionText(
          "You are in front of the cabin of {b}[characters.witch.name]{/b}.",
          "Behind the cabin the swamp starts to be really wet, so there is no way further.",
          "a small windy trail leads back where you came from."
        );
      }).else(() => {
        g.descriptionText(
          "Strange smells and fumes come out. You carefully approach the door and are in doubt if you should {b}knock{/b}."
        );
        g.descriptionText("");
        g.descriptionText(
          "You won't get much time to think about it, because the door sweeps open:"
        );
        g.overlay("witchConversation").open();
      });
    });

    onEnter("cabinInside", () => {
      g.text("You leave the cabin and go outside.", "");
    });

    onLeave("swamp", () => {
      g.onState(g.character("horse").hasState("following"), () => {
        g.text(
          "Together with [characters.horse.name] you walk into the swamp."
        );
      }).else(() => {
        g.text("You walk over the windy trail, into the swamp.");
      });
    });

    interaction("Knock on door", g.not(hasState("accessible")), () => {
      g.overlay("witchConversation").open();
    });

    interaction("Go inside", hasState("accessible"), () => {
      g.location("cabinInside").travel();
    });

    interaction("Go back to swamp", g.always(), () => {
      g.location("swamp").travel();
    });
  }
);
