import g from "../game";

g.defineLocation("swamp", ({ describe, interaction, onLeave }) => {
  onLeave("hills", () => {
    g.text("You climb upwards, to the north, towards the hills.");
  });
  onLeave("cabin", () => {
    g.onState(g.location("cabin").hasFlag("visited"), () => {
      g.onState(g.character("horse").hasState("following"), () => {
        g.text(
          "Together with [characters.horse.name] you walk into the swamp."
        );
      }).else(() => {
        g.text("You walk over the windy trail, towards the cabin.");
      });
    });
  });

  describe(() => {
    g.onState(g.location("cabin").hasFlag("visited"), () => {
      g.descriptionText(
        "A windy trail leads to the {b}cabin of [characters.witch.name]{/b}.",
        "All matter of {b}plants{/b} grow here, most of them you haven't seen before."
      );
    }).else(() => {
      g.text("You are at the edge of a swamp.");
      g.text("At the end of the trail, you stop.");

      g.onState(g.location("swamp").hasFlag("allowEntrance"), () => {
        g.character("player").say("Here we go, in search of the witch.");
        g.text(
          "You hear weird bubbling noises in the distance.",
          "You move further into the swamp. You sink up to your ankles in the wetness.",
          "A small {b}cabin{/b} becomes visible, hidden under some crooked trees.",
          "All matter of {b}plants{/b} grow here, most of them you haven't seen before."
        );
      }).else(() => {
        g.character("player").say(
          "I'm not going to walk into a swamp for {b}no reason{/b}!",
          "That is way too dangerous!"
        );

        g.text("You hear weird bubbling noises in the distance.");
      });
    });
    g.text(
      "There is a trail going to the {b}north{/b}, up into the {b}hills{/b}."
    );
  });

  interaction(
    "Walk towards the cabin",
    g.location("swamp").hasFlag("allowEntrance"),
    () => {
      g.location("cabin").travel();
    }
  );

  interaction(
    "Inspect the plants",
    g.and(
      g.location("swamp").hasFlag("allowEntrance"),
      g.item("treasureNotes").hasFlag("moonStone")
    ),
    () => {
      g.overlay("plants").open();
    }
  );

  interaction(
    "Go north, towards the hills",
    g.always(),
    () => {
      g.location("hills").travel();
    },
    { shortcutKey: "n" }
  );
});
