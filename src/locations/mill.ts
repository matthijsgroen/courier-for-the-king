import g from "../game";

g.defineLocation("mill", ({ describe, hasState, onLeave, interaction }) => {
  onLeave("hills", () => {
    g.onState(g.character("horse").hasState("following"), () => {
      g.text(
        "Together with {b}[characters.horse.name]{/b} you walk to the path in the hills."
      );
      g.onState(g.character("horse").hasFlag("cart"), () => {
        g.text(
          "{b}[characters.horse.name]{/b} has no trouble with pulling the carriage."
        );
      });
    }).else(() => {
      g.text("You walk to the path in the hills.");
    });
    g.text("");
  });

  describe(() => {
    g.descriptionText("You are at the windmill.");

    g.onState(hasState("fixed"), () => {
      g.descriptionText(
        "The mill is rotating slowly in the wind. A giant {b}trunk{/b} is used as sail for one of the blades."
      );
    }).else(() => {
      g.descriptionText("The mill misses a {b}sail{/b} of one of its blades.");
    });

    g.onState(
      g.or(
        g.item("millstone").hasState("seen"),
        g.item("millstone").hasState("unknown")
      ),
      () => {
        g.descriptionText("");
        g.descriptionText("A big {b}millstone{/b} lies next to the mill.");
      }
    );

    g.onState(g.not(g.character("horse").hasFlag("cart")), () => {
      g.onState(g.item("grain").hasState("cart"), () => {
        g.descriptionText(
          "A {b}carriage{/b} containing {b}grain{/b} is parked on the other side of the mill."
        );
      })
        .else(g.item("grain").hasState("flour"), () => {
          g.descriptionText(
            "A {b}carriage{/b} containing {b}flour{/b} is parked on the other side of the mill."
          );
        })
        .else(g.item("millstone").hasState("cart"), () => {
          g.descriptionText(
            "A {b}carriage{/b} containing a {b}millstone{/b} is parked on the other side of the mill."
          );
        })
        .else(() => {
          g.descriptionText(
            "An empty {b}carriage{/b} is parked on the other side of the mill."
          );
        });
    });
    g.descriptionText("");
    g.text("An old miller appears to be working on restoring the blade.");

    g.onState(g.not(g.location("mill").hasFlag("visited")), () => {
      g.character("miller").say(
        "Hey hello over there! Could you help me out?",
        "This old mill needs fixin', but I'm missing a sail!"
      );

      g.character("player").say(
        "I'll keep my eyes open for something that could fit your needs!"
      );
      g.character("miller").say("Thanks!");
      g.location("mill").setFlag("visited");
    });
  });

  interaction("Talk to the miller", g.always(), () => {
    g.openOverlay("millerConversation");
  });

  interaction(
    "Bring carriage back",
    g.and(
      g.character("horse").hasFlag("cart"),
      g.character("horse").hasState("following")
    ),
    () => {
      g.text(
        "Together with {b}[characters.miller.name]{/b}, you unhitch the carriage from {b}[characters.horse.name]{/b}."
      );
      g.character("horse").clearFlag("cart");
      g.character("player").say("Thanks for borrowing.");
      g.character("miller").say("No problem.");
      g.onState(g.item("grain").hasState("cart"), () => {
        g.character("miller").say(
          "Don't forget you have bags of {b}grain{/b} still lying on the carriage."
        );
      });
    }
  );

  interaction(
    "Check millstone",
    g.or(
      g.item("millstone").hasState("seen"),
      g.item("millstone").hasState("unknown")
    ),
    () => {
      g.text("You check the millstone. It looks really {b}heavy{/b}.");
      g.character("miller").say("Ah yes, that is an old one, really worn out.");
      g.item("millstone").setState("seen");
    }
  );

  interaction("Walk back to the road", g.always(), () => {
    g.travel("hills");
  });
});
