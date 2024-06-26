import g from "../game";

g.defineLocation("hills", ({ describe, onLeave, interaction }) => {
  onLeave("forest", () => {
    g.onState(g.character("horse").hasState("following"), () => {
      g.text(
        "Together with {b}[characters.horse.name]{/b} you venture east, towards the forest."
      );
    }).else(() => {
      g.text("You walk east, towards the forest.");
    });
  });

  onLeave("mine", () => {
    g.text("You follow the road, towards the entrance of the mine.");
  });

  onLeave("mill", () => {
    g.text("You walk towards the mill.");
  });

  onLeave("swamp", () => {
    g.text("You go south, over a soggy trail, towards the swamp.");
  });

  describe(() => {
    g.text(
      "You are in the hills. The sun is shining lovely.",
      "There is a nice view of the environment."
    );
    g.descriptionText("");
    g.text(
      "A bit farther on the road you see a {b}mine{/b}.",
      "A bit higher up the hill is a {b}windmill{/b}."
    );
    g.descriptionText("");
    g.text(
      "There is a road to the {b}forest{/b} to the {b}east{/b}.",
      "To the {b}south{/b}, there is a soggy path going into a {b}swamp{/b}."
    );
  });

  interaction("Follow the path to the mine", g.always(), () => {
    g.location("mine").travel();
  });

  interaction("Go towards the mill", g.always(), () => {
    g.location("mill").travel();
  });

  interaction(
    "Go east, to the forest",
    g.always(),
    () => {
      g.location("forest").travel();
    },
    { shortcutKey: "e" }
  );

  interaction(
    "Go south, to the swamp",
    g.always(),
    () => {
      g.onState(g.character("horse").hasFlag("cart"), () => {
        g.text(
          "You want to go into the {b}swamp{/b}, but the wheels of the carriage would get stuck in the soggy underground.",
          "You turn around."
        );
      }).else(() => {
        g.location("swamp").travel();
      });
    },
    { shortcutKey: "s" }
  );
});
