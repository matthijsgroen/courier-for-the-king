import g from "../game";

g.defineOverlay(
  "millerConversation",
  ({ onEnter, interaction, closeOverlay, setPrompt }) => {
    setPrompt("What will you say:");

    onEnter(() => {
      g.character("miller").say("Hey hello there!");
    });

    interaction(
      "Any idea how I could get any transportation?",
      g.always(),
      () => {
        g.character("player").say(
          "Any idea how I could get any transportation?"
        );
        g.text("The old miller looks at you.");
        g.character("miller").say(
          "I no longer have a horse, just a carriage.",
          "If I need a horse, I borrow [characters.horse.defaultName] from farmer {b}[characters.farmer.defaultName]{/b}.",
          "It is a really dependable animal. Ideal for pulling the {b}carriage{/b}!"
        );
      }
    );

    interaction("Any idea how I could get any medicine?", g.always(), () => {
      g.character("player").say("Any idea how I could get any medicine?");
      g.text("The old miller looks at you.");

      g.onState(g.character("player").hasFlag("male"), () => {
        g.character("miller").say("Sorry kid{#male/}, I wouldn't know.");
      }).else(() => {
        g.character("miller").say("Sorry kid{#female/}, I wouldn't know.");
      });
    });

    interaction(
      "What did you need again for the repairs?",
      g.not(g.location("mill").hasState("fixed")),
      () => {
        g.character("player").say("What did you need again for the repairs?");
        g.character("miller").say("I need a new sail for one of the blades.");
        g.character("player").say("Ah ok, thanks.");
      }
    );

    interaction(
      "I have some fabric that could be used",
      g.list("inventory").isInList("fabric"),
      () => {
        g.character("player").say("I have some fabric that could be used.");
        g.item("fabric").setState("used");
        g.list("inventory").remove("fabric");
        g.text(
          "Together with the {b}miller{/b} you climb onto the blades of the windmill.",
          "After some pulling and knotting the {b}underpants{/b} are fitting nicely onto the blade.",
          "You both climb back down."
        );
        g.character("miller").say("Well, let's see if this works!");
        g.text(
          "The miller turns the windmill towards the wind.",
          "Slowly but surely the blades start to turn."
        );
        g.character("miller").say("Well done!");
        g.location("mill").setState("fixed");
      }
    );

    interaction(
      "Could I borrow your carriage?",
      g.and(
        g.character("horse").hasState("following"),
        g.not(g.character("horse").hasFlag("cart"))
      ),
      () => {
        g.character("player").say("Could I borrow your carriage?");
        g.onState(g.location("mill").hasState("fixed"), () => {
          g.character("miller").say(
            "Sure, no problem! Thanks for fixing the mill with me."
          );

          g.text(
            "Together you hitch the carriage of the {b}miller{/b} behind {b}[characters.horse.name]{/b}."
          );
          g.character("horse").setFlag("cart");

          g.character("miller").say(
            "Be aware, with {b}[characters.horse.name]{/b} hitched to the carriage you cannot ride him."
          );
        }).else(() => {
          g.character("miller").say(
            "Sorry I rather not. I could need it to get my repairs done."
          );
        });
      }
    );

    interaction(
      "Could you grind this grain for me?",
      g.and(
        g.item("grain").hasState("cart"),
        g.or(
          g.character("horse").hasState("following"),
          g.not(g.character("horse").hasFlag("cart"))
        )
      ),
      () => {
        g.character("player").say(
          "Hello, I got some grain from farmer {b}[characters.farmer.name]{/b}.",
          "Could you {b}grind{/b} it to {b}flour{/b}?"
        );
        g.character("miller").say(
          "Sure! Thanks to you the mill is working again!",
          "This would be a nice way to test if everything works!"
        );

        g.text(
          "Together you get the grain from the carriage and attach a millstone to the grain supply.",
          "After a few turns, fine {b}flour{/b} starts pouring out."
        );

        g.character("miller").say(
          "Nice! The mill is fully functional again! This is really nice {b}flour{/b}.",
          "I think the {b}baker{/b} in the village will pay good money for this."
        );

        g.text("Together you put bags of {b}flour{/b} on the carriage.");
        g.item("grain").setState("flour");
      }
    );

    interaction(
      "Did you also hear that there is a treasure hidden somewhere?",
      g.not(g.item("treasureNotes").hasState("unknown")),
      () => {
        g.character("player").say(
          "Did you also hear that there is a treasure hidden somewhere?"
        );
        g.character("miller").say(
          "Its just the latest gossip as of late.",
          "Don't make too much of it. I guess you heard if of those {b}smiths in the village{/b} right?",
          "I think they believe everything. A treasure route that starts at the {b}river{/b}?",
          "I've been at the river plenty of times, but believe me, there is nothing there."
        );
        g.text("You find this very interesting, and make a note of it.");
        g.list("inventory").addUnique("treasureNotes");
        g.item("treasureNotes").setFlag("startPoint");
      }
    );

    interaction(
      "Can I have the millstone?",
      g.item("millstone").hasState("seen"),
      () => {
        g.character("player").say("Can I have the millstone?");
        g.character("miller").say(
          "What could you possibly want with this millstone?",
          "It is only {b}heavy{/b} and worn out."
        );
        g.onState(g.character("dragon").hasState("found"), () => {
          g.character("player").say("I have still a use for it.");
          g.character("miller").say("Well, I don't mind you having it.");

          g.onState(
            g.and(
              g.character("horse").hasState("following"),
              g.character("horse").hasFlag("cart")
            ),
            () => {
              g.character("miller").say(
                "We will need to lift the stone together, it is impossible to do alone. The stone is too heavy for that."
              );
              g.text("Together you lift the stone on the carriage.");
              g.item("millstone").setState("cart");
            }
          ).else(() => {
            g.character("miller").say(
              "You need to have the {b}carriage{/b} here with your {b}horse{/b}, it is too heavy to transport otherwise."
            );
          });
        });
      }
    );

    interaction("Goodbye", g.always(), () => {
      closeOverlay();
    });
  }
);
