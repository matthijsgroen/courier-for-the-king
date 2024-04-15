import g from "../game";

g.defineLocation("towerBaseElevator", ({ describe, onEnter, interaction }) => {
  onEnter("towerTopElevator", () => {
    g.text(
      "You take the elevator down. It is very unstable and wobbly.",
      "Lucky for you it holds and you step off with a relief.",
      ""
    );

    g.item("elevator").setState("down");
  });

  describe(() => {
    g.text("You are at the side of the {b}tower{/b}.");
    g.onState(g.character("dragon").hasFlag("toothPulled"), () => {
      g.text(
        "There was a wooden elevator construction here. But now it is completely destroyed. Debris is lying everywhere."
      );
      g.text(
        "Next to the remains of the elevator is a large wooden {b}hatch door{/b}.",
        "Which could lead to a basement below."
      );
    }).else(() => {
      g.text(
        "There is a wooden elevator construction here. It does not look very stable."
      );
      g.text(
        "Next to the elevator is a large wooden {b}hatch door{/b}.",
        "Which could lead to a basement below."
      );
    });
  });

  interaction("Open cellar door", g.always(), () => {
    g.text(
      "You try to open the hatch to the cellar, but the hatch seems to be {b}locked{/b}."
    );
  });

  interaction(
    "Use elevator",
    g.not(g.character("dragon").hasFlag("toothPulled")),
    () => {
      g.onState(g.item("elevator").hasState("down"), () => {
        g.onState(g.item("millstone").hasState("elevator"), () => {
          g.character("player").say(
            "The rope is so under tension, I don't think it is wise if I would also stand on the elevator. The rope could snap."
          );
        }).else(() => {
          g.text("You use the elevator to go up the tower.");
          g.text("");
          g.item("elevator").setState("unknown");
          g.travel("towerTopElevator");
        });
      }).else(() => {
        g.text(
          "The elevator is currently at the top of the tower.",
          "There is no way to lower it from here."
        );
      });
    }
  );

  interaction(
    "Search the debris of the elevator",
    g.item("tooth").hasState("pulled"),
    () => {
      g.text(
        "You search through the debris of the elevator.",
        "Pieces of the millstone and the wooden construction are everywhere.",
        "After a while of searching, you find the {b}tooth of the dragon{/b}.",
        "",
        "You pick up the {b}tooth{/b}."
      );
      g.item("ingredientList").setFlag("tooth");
      g.list("inventory").add("dragonTooth");
      g.item("tooth").setState("possession");
    }
  );

  interaction("Go to front of tower", g.always(), () => {
    g.travel("tower");
  });
});
