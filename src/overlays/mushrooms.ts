import g from "../game";

g.defineOverlay("mushrooms", ({ onEnter, interaction, closeOverlay }) => {
  onEnter(() => {
    g.text(
      "You are searching for mushrooms. After a while you have discovered different kinds.",
      "You see red toadstools with white spots, light brown tree fungi,",
      "light blue toadstools and orange fungi."
    );
  });

  interaction("Collect the red toadstools with white spots", g.always(), () => {
    g.character("player").say(
      "Hmm mushrooms can be poisonous as well.",
      "I need to be careful which ones to pick."
    );
    g.onState(g.character("player").hasFlag("fungiKnowledge"), () => {
      g.character("player").say(
        "I really should not pick these! I could be attacked by forest gnomes!"
      );
    }).else(() => {
      g.character("player").say(
        "I'm not sure if I need the {b}red toadstools with white spots{/b}."
      );
    });
    g.text("You decide not to collect them.");
  });

  interaction("Collect the light brown tree fungi", g.always(), () => {
    g.onState(
      g.and(
        g.character("player").hasFlag("fungiKnowledge"),
        g.item("mushrooms").hasCounter("brown").lessThan(5)
      ),
      () => {
        g.text("You carefully collect some {b}light brown tree fungi{/b}.");
        g.item("mushrooms").setCounter("brown", 5);
        g.list("inventory").addUnique("lightBrownFungi");
      }
    )
      .else(g.character("player").hasFlag("fungiKnowledge"), () => {
        g.character("player").say("I have enough of these fungi already.");
      })
      .else(() => {
        g.character("player").say(
          "Hmm mushrooms can be poisonous as well.",
          "I need to be careful which ones to pick."
        );
        g.character("player").say(
          "I'm not sure if I need the {b}light brown tree fungi{/b}."
        );
        g.text("You decide not to collect them.");
      });
  });

  interaction("Collect the light blue toadstools", g.always(), () => {
    g.onState(
      g.and(
        g.item("ingredientList").hasFlag("seen"),
        g.item("mushrooms").hasCounter("lightblue").lessThan(5)
      ),
      () => {
        g.text("You carefully collect some {b}light blue toadstools{/b}.");

        g.item("mushrooms").setCounter("lightblue", 5);
        g.item("ingredientList").setFlag("toadstools");
        g.list("inventory").addUnique("lightblueMushrooms");
      }
    )
      .else(g.item("ingredientList").hasFlag("seen"), () => {
        g.character("player").say("I have enough of these mushrooms already.");
      })
      .else(() => {
        g.character("player").say(
          "Hmm mushrooms can be poisonous as well.",
          "I need to be careful which ones to pick."
        );
        g.character("player").say(
          "I'm not sure if I need the {b}light blue toadstools{/b}."
        );
        g.text("You decide not to collect them.");
      });
  });

  interaction("Collect the orange fungi", g.always(), () => {
    g.onState(
      g.and(
        g.character("player").hasFlag("fungiKnowledge"),
        g.item("mushrooms").hasCounter("orange").lessThan(5)
      ),
      () => {
        g.text("You carefully collect some {b}orange fungi{/b}.");
        g.item("mushrooms").setCounter("orange", 5);
        g.list("inventory").addUnique("orangeFungi");
      }
    )
      .else(g.character("player").hasFlag("fungiKnowledge"), () => {
        g.character("player").say("I have enough of these fungi already.");
      })
      .else(() => {
        g.character("player").say(
          "Hmm mushrooms can be poisonous as well.",
          "I need to be careful which ones to pick."
        );
        g.character("player").say(
          "I'm not sure if I need the {b}orange fungi{/b}."
        );
        g.text("You decide not to collect them.");
      });
  });

  interaction("Go back to the road", g.always(), () => {
    g.text("You go back to the road.", "");
    closeOverlay();
  });
});
