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
    g.text(
      "There is a wooden elevator construction here. It does not look very stable."
    );
    g.text(
      "Next to the elevator is a large wooden {b}hatch door{/b}.",
      "Which could lead to a basement below."
    );
  });

  interaction("Open cellar door", g.always(), () => {});

  interaction("Use elevator", g.always(), () => {
    g.onState(g.item("elevator").hasState("down"), () => {
      g.text("You use the elevator to go up the tower.");
      g.text("");
      g.item("elevator").setState("unknown");
      g.travel("towerTopElevator");
    }).else(() => {
      g.text(
        "The elevator is currently at the top of the tower.",
        "There is no way to lower it from here."
      );
    });
  });

  interaction("Go to front of tower", g.always(), () => {
    g.travel("tower");
  });
});
