import g from "../game";

g.defineLocation("forest", ({ describe, interaction, onLeave }) => {
  onLeave("farmland", () => {
    g.onState(g.character("horse").hasState("following"), () => {
      g.text(
        "You walk east, accompanied by {b}[characters.horse.name]{/b}, to the farmlands."
      );
    }).else(() => {
      g.text("You walk east, to the farmlands.");
    });
  });
  onLeave("hills", () => {
    g.text("You walk west, towards the hills.");
  });

  describe(() => {
    g.descriptionText(
      "You are in the forest. It is a beautiful day.",
      "The wind is rustling the leaves."
    );
    g.descriptionText("");
    g.descriptionText(
      "There are {b}farmlands{/b} in the {b}east{/b}.",
      "There are {b}hills{/b} in the {b}west{/b}."
    );
    g.location("forest").setFlag("visited");
    g.onState(g.not(g.item("bag").hasState("possession")), () => {
      g.descriptionText(
        "Your bag is on the ground, surrounded by shards of glass of the bottle of medicine."
      );
      g.character("player").say("Drat, the medicine is truly lost.");
      g.text("You pick up your bag.");
      g.item("bag").setState("possession");
      g.character("player").setCounter("coins", 3);
      g.list("inventory").add("coins");
    });

    g.onState(g.item("branch").hasState("unknown"), () => {
      g.descriptionText(
        "There is a freshly broken {b}branch{/b} on the ground."
      );
    });
  });

  interaction(
    "Search for moss",
    g.character("player").hasFlag("mossKnowledge"),
    () => {
      g.overlay("moss").open();
    }
  );

  interaction("Pick up branch", g.item("branch").hasState("unknown"), () => {
    g.text(
      "You pick up the branch. You feel a small bump on your head.",
      "This branch hurt you quite a bit."
    );
    g.item("branch").setState("possession");
    g.list("inventory").add("branch");
  });

  interaction(
    "Go east, to the farmlands",
    g.always(),
    () => {
      g.location("farmland").travel();
    },
    { shortcutKey: "e" }
  );

  interaction(
    "Go west, to the hills",
    g.always(),
    () => {
      g.location("hills").travel();
    },
    { shortcutKey: "w" }
  );
});
