import g from "../game";

g.defineOverlay("moss", ({ onEnter, closeOverlay, interaction }) => {
  onEnter(() => {
    g.text(
      "You go deeper into the forest, in search for different types of moss.",
      "After a while you spotted different kinds:",
      "{b}Starmoss{/b}, {b}Cosmoss{/b}, {b}Atmoss{/b}, {b}Moonmoss{/b} and {b}Thundermoss{/b}"
    );
  });

  interaction("Collect Starmoss", g.always(), () => {
    g.onState(g.item("moss").hasCounter("starmoss").lessThan(6), () => {
      g.text("You bend over to collect some {b}Starmoss{/b}.");
      g.text("You collect a few tufts and put them in your bag.");

      g.item("moss").setCounter("starmoss", 6);
      g.list("inventory").addUnique("starmoss");
    }).else(() => {
      g.character("player").say(
        "I already have plenty of {b}Starmoss{/b} in my bag."
      );
    });
  });

  interaction("Collect Cosmoss", g.always(), () => {
    g.onState(g.item("moss").hasCounter("cosmoss").lessThan(6), () => {
      g.text("You bend over to collect some {b}Cosmoss{/b}.");
      g.text("You collect a few tufts and put them in your bag.");

      g.item("moss").setCounter("cosmoss", 6);
      g.list("inventory").addUnique("cosmoss");
    }).else(() => {
      g.character("player").say(
        "I already have plenty of {b}Cosmoss{/b} in my bag."
      );
    });
  });

  interaction("Collect Atmoss", g.always(), () => {
    g.text(
      "You bend over to collect some {b}Atmoss{/b}.",
      "",
      "Then you remember reading in the {b}Almanac{/b} that this kind of moss is extremely poisonous.",
      "You decide to leave the {b}Atmoss{/b} alone."
    );
  });

  interaction("Collect Moonmoss", g.always(), () => {
    g.onState(g.item("moss").hasCounter("moonmoss").lessThan(6), () => {
      g.text("You bend over to collect some {b}Moonmoss{/b}.");
      g.text("You collect a few tufts and put them in your bag.");

      g.item("moss").setCounter("moonmoss", 6);
      g.list("inventory").addUnique("moonmoss");
    }).else(() => {
      g.character("player").say(
        "I already have plenty of {b}Moonmoss{/b} in my bag."
      );
    });
  });

  interaction("Collect Thundermoss", g.always(), () => {
    g.text(
      "You bend over to collect some {b}Thundermoss{/b}.",
      "",
      "Then you remember reading in the {b}Almanac{/b} that this kind of moss is extremely dangerous.",
      "You decide to not touch the {b}Thundermoss{/b}."
    );
  });

  interaction("Go back to the trail", g.always(), () => {
    g.text("You go back to the trail.");
    closeOverlay();
  });
});
