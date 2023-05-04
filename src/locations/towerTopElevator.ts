import g from "../game";

g.defineLocation("towerTopElevator", ({ describe, onEnter, interaction }) => {
  onEnter("towerTop", () => {
    g.text(
      "You walk to a large opening in the top of the tower. This has to be where the {b}dragon{/b} can fly in and out. You can see all over the {b}dark wood{/b}. In the distance, you can even see a {b}mill on a hill{/b}. On the outside of the tower is a wooden elevator.",
      ""
    );
  });

  onEnter("towerBaseElevator", () => {
    g.text(
      "At the top of the tower, you step off.",
      "You are now at the top of the tower.",
      ""
    );
  });

  describe(() => {
    g.onState(g.item("elevator").hasState("down"), () => {
      g.text(
        "At this moment the elevator is {b}at the bottom{/b} of the tower."
      );
      g.text("There is a {b}handle{/b} here to control the elevator.");
    }).else(() => {
      g.text("At this moment the elevator is {b}at the top{/b} of the tower.");
      g.text("There is a {b}handle{/b} here to control the elevator.");
    });

    // "1=17;2=0;44!3;17=2;4=0;6=2;44=4;43!2", "Een zware molensteen ligt op de lift.", "&"
    // "1=17;2=0;44!3;17=2;4=0;6=2;43>1", "De lift is kapot. Beneden liggen allerlei stukken verspreid op de grond.", "&"

    // "1=17;2=0;44!3;17=2;4=0;6=2;44=4;31=3", "Een touw loopt van de molensteen de kamer in.", "&"
    // "1=17;2=0;44!3;17=2;4=0;6=2;44=4;31=4", "Een touw loopt van de molensteen naar de zere tand van de draak.", "&"

    g.onState(
      g.and(
        g.character("horse").hasState("following"),
        g.character("horse").hasFlag("cart")
      ),
      () => {
        g.text(
          "",
          "If you look down, you see {b}[characters.horse.name]{/b} with the carriage."
        );
      }
    ).else(g.character("horse").hasState("following"), () => {
      g.text("", "If you look down, you see {b}[characters.horse.name]{/b}.");
    });
  });

  interaction(
    "Take the elevator down",
    g.item("elevator").hasState("unknown"),
    () => {
      g.travel("towerBaseElevator");
    }
  );

  interaction("Use handle", g.always(), () => {
    g.onState(g.item("elevator").hasState("unknown"), () => {
      g.text(
        "You pull the handle.",
        "The elevator slowly starts moving {b}down{/b}."
      );
      g.item("elevator").setState("down");
    }).else(g.item("elevator").hasState("down"), () => {
      g.text(
        "You push the handle.",
        "The elevator slowly starts moving {b}up{/b}."
      );
      g.item("elevator").setState("unknown");
    });
  });

  interaction("Walk back into the room", g.always(), () => {
    g.travel("towerTop");
  });
});
