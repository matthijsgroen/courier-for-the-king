import g from "../game";

g.defineOverlay(
  "gameIntro",
  ({ onEnter, interaction, hasState, closeOverlay }) => {
    onEnter(() => {
      g.text(
        "Hello, and welcome to this interactive adventure!",
        "In this adventure you make the choices. Will you go into the swamp? Or do you rather want to talk to the baker? Its your decision.",
        "Let's start with our first choice!",

        "",
        "Do you want to play as a {b}boy{/b} or a {b}girl{/b}?"
      );
    });

    const step2 = () => {
      g.text("Nice! And how do you want to name the hero of our story?");

      g.text("Your name is currently {b}[characters.player.name]{/b}.");
      g.character("player").renameByPlayer("What is your heroes name?");

      g.text("Hello {b}[characters.player.name]{/b}. Welcome the game!");

      g.location("home").setState("home");
      closeOverlay();
    };

    interaction("Play as a {b}boy{/b}", hasState("unknown"), () => {
      g.character("player").setFlag("male");
      step2();
    });

    interaction("Play as a {b}girl{/b}", hasState("unknown"), () => {
      g.character("player").clearFlag("male");
      step2();
    });
  }
);

g.defineLocation("home", ({ describe, interaction, hasState }) => {
  describe(() => {
    g.onState(hasState("unknown"), () => {
      g.overlay("gameIntro").open();
    }).else(() => {
      g.text("Once upon a time, there was a stalwart courier...");

      g.onState(g.character("player").hasFlag("male"), () => {
        g.text("His name was {b}[characters.player.name]{/b}.");
        g.text("He was super fast in the delivery of letters and parcels.");
        g.text("Delivering items was his passion and his life.");
      }).else(() => {
        g.text("Her name was {b}[characters.player.name]{/b}.");
        g.text("She was super fast in the delivery of letters and parcels.");
        g.text("Delivering items was her passion and her life.");
      });

      g.note(() => {
        g.text(
          "A letter of the healer of the king, asking for help",
          "to deliver a medicine to the castle"
        );
        g.note(() => {
          g.text("It even had a smaller note attached");
        });
        g.text("but that is a story for another time...");
      });
    });
  });

  interaction("Roll some dice!", g.always(), () => {
    g.text("You want to roll some dice!");
    g.item("testDice").setCounter("dice3", 1, 5);
    g.item("testDice").setCounter("dice2", 1, 5);
    g.item("testDice").setCounter("dice1", 1, 5);

    g.character("player").say(
      "Ok, I've rolled {b}[items.testDice.counters.dice1.value], [items.testDice.counters.dice2.value] and [items.testDice.counters.dice3.value]{/b}"
    );
  });

  interaction("Skip the rest of the intro for now", g.always(), () => {
    g.location("forest").travel();
  });
});
