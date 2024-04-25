import g from "../game";

g.defineLocation("cabinInside", ({ describe, interaction }) => {
  describe(() => {
    g.text(
      "You are in the cabin of {b}[characters.witch.name]{/b}. In the middle of the cabin is a large {b}cauldron{/b} bubbling.",
      "There are books, beakers, pots and other stuff everywhere. Most of these things you see you have no idea what they are."
    );

    g.text(
      "",
      "{b}[characters.witch.name]{/b} lies on the ground, it looks like she's sleeping."
    );
  });

  interaction("Wake up [characters.witch.name]", g.always(), () => {
    g.text(
      "You go to {b}[characters.witch.name]{/b}. She is lying on the ground near the {b}cauldron{/b}.",
      "You try to wake her up."
    );
    g.character("player").say("{b}[characters.witch.name]{/b}, wake up.");
    g.text("You shake her, but there is no reaction.");
  });

  interaction("Check books", g.always(), () => {
    g.text("You walk to some books that are lying on a workbench.");
    g.openOverlay("books");
  });

  interaction("Go to cauldron", g.always(), () => {
    //
  });

  interaction("Leave cabin", g.always(), () => {
    g.travel("cabin");
  });
});
