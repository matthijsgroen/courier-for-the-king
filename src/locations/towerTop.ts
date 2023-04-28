import g from "../game";

g.defineLocation(
  "towerTop",
  ({ describe, interaction, hasState, setState }) => {
    describe(() => {
      g.text(
        "Now and then you come by a window that lets in a shaft of light, so that it is not entirely pitch black.",
        "At the top of the stairs is a {b}door{/b}."
      );
      g.text("", "{b}{i}<GGRROOAAAAARRRRH!!!!!>{/i}{/b}", "");
      g.text(
        "Suddenly, underneath the sound of the loud roar, you also hear a women's voice.",
        "But you can not make out what she is saying.",
        "",
        "Would that be {b}[characters.daughter.name]{/b}? Is she still alive!?"
      );
    });

    interaction("Open the door, and storm in", hasState("unknown"), () => {
      g.text(
        "With your sword in your hand you brace yourself. You push open the door hard and storm into the room. You will see a giant dragon lying on the floor. He has a huge tail, huge wings and big teeth.",
        "At the other side of the room you see a {b}young women{/b}."
      );

      g.openOverlay("daughterConversation");
    });

    interaction("Open the door, and sneak in", hasState("unknown"), () => {
      g.text(
        "With sword in hand you try to open the door as silent as possible...",
        "To your luck, this door does not squeak and creak!",
        "You carefully take a step inside the room."
      );
      g.text(
        "",
        "You see a gigantic dragon lying on the floor.",
        "He has an enormous tail, enormous wings and large teeth.",
        "",
        "At the other side of the room you see a {b}young women{/b}.",
        "",
        "{i}<creaaaaak!>{/i}",
        "",
        "Oh no! A loose floorboard!"
      );
      setState("sneakIn");
    });

    interaction("Dive left, behind some boxes", hasState("sneakIn"), () => {
      g.text("You try to dive away behind some stuff.");
      setState("unknown");
      g.openOverlay("daughterConversation");
    });
    interaction(
      "Dive right, behind a pile of books",
      hasState("sneakIn"),
      () => {
        g.text("You try to dive away behind some stuff.");
        setState("unknown");
        g.openOverlay("daughterConversation");
      }
    );
  }
);
