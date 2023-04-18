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

    interaction("Play as a {b}boy{/b}", hasState("unknown"), () => {
      g.character("player").setFlag("male");
      g.text("Nice! And how do you want to name the hero of our story?");

      g.character("player").setName("Matthijs");

      g.character("player").say("My name is {b}[.name]{/b}");

      g.location("home").setState("home");
      closeOverlay();
    });

    interaction("Play as a {b}girl{/b}", hasState("unknown"), () => {
      g.character("player").clearFlag("male");
      g.text("Nice! And how do you want to name the hero of our story?");

      g.character("player").setName("Pat-Jos");

      g.character("player").say("My name is {b}[.name]{/b}");

      g.location("home").setState("home");
      closeOverlay();
    });
  }
);

g.defineLocation("home", ({ describe, interaction, hasState }) => {
  describe(() => {
    g.onState(
      hasState("unknown"),
      () => {
        g.openOverlay("gameIntro");
      },
      () => {
        g.text("Once upon a time, there was a stalwart courier...");
        g.onState(
          g.character("player").hasFlag("male"),
          () => {
            g.text("His name was {b}[characters.player.name]{/b}.");
            g.text("He was super fast in the delivery of letters and parcels.");
            g.text("Delivering items was his passion and his life.");
          },
          () => {
            g.text("Her name was {b}[characters.player.name]{/b}.");
            g.text(
              "She was super fast in the delivery of letters and parcels."
            );
            g.text("Delivering items was her passion and her life.");
          }
        );
      }
    );
  });

  interaction("Skip the rest of the intro for now", g.always(), () => {
    g.travel("forest");
  });
});
