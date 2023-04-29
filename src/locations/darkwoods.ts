import g from "../game";

g.defineLocation("darkwoods", ({ describe, interaction, onLeave, hasFlag }) => {
  describe(() => {
    g.text(
      "You are on the edge of a dark wood. It looks dangerous.",
      "The sunlight can barely reach the forest floor, and trees seem to look at you.",
      "There is a thick fog between the bare branches.",
      "It is eerily quiet. No animal lives here."
    );
    g.onState(hasFlag("visited"), () => {
      // Mushrooms if list of witch?
    }).else(() => {
      g.onState(g.character("dragon").hasState("known"), () => {
        g.character("player").say(
          "If there really is a monster here, I need to prepare before I dare enter here."
        );

        g.onState(g.character("farmer").hasFlag("toldDragon"), () => {
          g.character("player").say(
            "It sounds like a flying firebreathing dragon.",
            "Having a heavy armor is useless."
          );
        }).else(() => {
          g.character("player").say("Maybe I need to buy some {b}armor{/b}.");
        });

        g.onState(
          g.and(
            g.character("baker").hasFlag("toldDragon"),
            g.item("sword").hasState("possession")
          ),
          () => {
            g.character("player").say(
              "At least I have a {b}weapon{/b} to defend myself."
            );
          }
        )
          .else(g.character("baker").hasFlag("toldDragon"), () => {
            g.character("player").say(
              "I still need a {b}weapon{/b} to defend myself."
            );
          })
          .else(() => {
            g.character("player").say(
              "And maybe I need a {b}weapon{/b} to defend myself?"
            );
          });

        g.onState(
          g.and(
            g.character("baker").hasFlag("toldDragon"),
            g.character("farmer").hasFlag("toldDragon")
          ),
          () => {
            g.character("player").say("I know enough about the monster.");
          }
        ).else(() => {
          g.character("player").say(
            "I don't know enough about the monster yet...",
            "(Maybe other people can {b}tell me more?{/b})"
          );
        });
      }).else(() => {
        g.character("player").say("Brr... I have {b}no reason{/b} to be here.");
      });
    });
  });

  onLeave("village", () => {
    g.onState(g.character("horse").hasState("following"), () => {
      g.text(
        "Together with [characters.horse.name] you walk westwards, towards the village."
      );
    }).else(() => {
      g.text("You walk westwards, towards the village.");
    });
  });

  interaction("Go west, towards the village", g.always(), () => {
    g.travel("village");
  });

  interaction(
    "Continue into the dark woods anyway",
    g.and(
      g.item("sword").hasState("possession"),
      g.character("baker").hasFlag("toldDragon"),
      g.character("farmer").hasFlag("toldDragon"),
      g.not(hasFlag("visited"))
    ),
    () => {
      g.onState(
        g.and(
          g.character("horse").hasState("following"),
          g.character("horse").hasFlag("cart")
        ),
        () => {
          g.text(
            "There went {b}[characters.player.name]{/b}, with {b}[characters.horse.name]{/b} pulling the carriage."
          );
        }
      )
        .else(
          g.and(
            g.character("horse").hasState("following"),
            g.character("player").hasFlag("male")
          ),
          () => {
            g.text(
              "There went {b}[characters.player.name]{/b}, with {b}[characters.horse.name]{/b} by his side."
            );
          }
        )
        .else(
          g.and(
            g.character("horse").hasState("following"),
            g.not(g.character("player").hasFlag("male"))
          ),
          () => {
            g.text(
              "There went {b}[characters.player.name]{/b}, with {b}[characters.horse.name]{/b} by her side."
            );
          }
        )
        .else(() => {
          g.text("There went {b}[characters.player.name]{/b}, all alone.");
        });

      g.onState(g.character("player").hasFlag("male"), () => {
        g.text(
          "He took a deep breath and mustered up his courage.",
          "With only his sword to protect him, he stepped into the dark woods."
        );
      }).else(() => {
        g.text(
          "She took a deep breath and mustered up her courage.",
          "With only her sword to protect her, she stepped into the dark woods."
        );
      });

      g.text(
        "",
        "In the distance, between the branches of half-dead trees, a silhouette of {b}a tower{/b} started to form.",
        "The tower was incredibly high, and rose high above the trees. A loud {i}roar{/i} could be heard from the top of the tower."
      );

      g.character("player").say("Oh help, where have I gotten myself into.");

      g.location("darkwoods").setFlag("visited");

      g.travel("tower");
    }
  );

  interaction("Continue into the dark woods", hasFlag("visited"), () => {
    g.travel("tower");
  });
});
