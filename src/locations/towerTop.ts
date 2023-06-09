import g from "../game";

g.defineLocation(
  "towerTop",
  ({ describe, interaction, hasState, setState, hasFlag, onEnter }) => {
    onEnter("tower", () => {
      g.onState(hasFlag("visited"), () => {
        g.text("You go up the stairs to the top of the tower.", "");
      });
    });

    describe(() => {
      g.onState(hasFlag("visited"), () => {
        g.text(
          "You are at the top of the tower. There is a great opening in the wall, with an wooden elevator going outside."
        );

        g.text(
          "The daughter of the baker, {b}[characters.daughter.name]{/b} is here."
        );

        g.text(
          "",
          "A large dragon is lying on the floor, roaring of pain.",
          "{b}{i}<GGRROOAAAAARRRRH!!!!!>{/i}{/b}"
        );

        // "1=17;2=0;17=2;4=0;6=0;45!0", "Een grote draak ligt op de grond te suffen.", "&"

        // "1=17;2=0;17=2;4=0;6=0;31=2", "", "*c2", "Een touw loopt van de tand van de draak naar het midden van de kamer.", "&"
        // "1=17;2=0;17=2;4=0;6=0;31=3", "", "*c2", "Een touw loopt van de molensteen naar het midden van de kamer.", "&"
        // "1=17;2=0;17=2;4=0;6=0;31=4", "", "*c2", "Een touw loopt van de molensteen naar de zere tand van de draak.", "&"
      }).else(() => {
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
    });

    interaction(
      "Open the door, and storm in",
      g.and(hasState("unknown"), g.not(hasFlag("visited"))),
      () => {
        g.text(
          "With your sword in your hand you brace yourself. You push open the door hard and storm into the room. You will see a giant dragon lying on the floor. He has a huge tail, huge wings and big teeth.",
          "At the other side of the room you see a {b}young women{/b}."
        );

        g.openOverlay("daughterConversation");
      }
    );

    interaction(
      "Open the door, and sneak in",
      g.and(hasState("unknown"), g.not(hasFlag("visited"))),
      () => {
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
      }
    );

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

    interaction("Go to the elevator", hasFlag("visited"), () => {
      g.onState(g.character("daughter").hasState("unloadStone"), () => {
        g.character("player").say(
          "{b}[characters.daughter.name]{/b} will go down the elevator, I should use the stairs."
        );
      }).else(() => {
        g.travel("towerTopElevator");
      });
    });

    interaction(
      "Talk to [characters.daughter.name]",
      hasFlag("visited"),
      () => {
        g.onState(g.character("daughter").hasState("unloadStone"), () => {
          g.character("daughter").say(
            "I wanted to go downstairs to help you, we talk later ok?"
          );
        }).else(() => {
          g.openOverlay("daughterConversation");
        });
      }
    );

    interaction("Go down the stairs", hasFlag("visited"), () => {
      g.travel("tower");
    });

    // "2=0;1=17;17=2;4=0;6=0;46=0", "Praat met Bloem", "4=1"
    // "2=0;1=17;17=2;4=0;6=0", "Ga naar de draak", "4=10"
    // "2=0;1=17;17=2;4=0;6=0;31=3", "Knoop touw aan tand van de draak", "4=13"
    // "2=0;1=17;17=2;4=0;6=0;31=2;44=4;43=0", "Knoop touw aan molensteen", "4=14"
  }
);
