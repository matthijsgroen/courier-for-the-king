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
    g.onState(g.item("millstone").hasState("elevator"), () => {
      g.text("A {b}heavy{/b} millstone lies on the elevator.");
    });

    g.onState(g.item("rope").hasState("tying"), () => {
      g.text("");
      g.onState(g.not(g.item("rope").hasFlag("tiedElevator")), () => {
        g.text(
          "A rope lies on the floor, with one end tied to the {b}tooth of the dragon{/b}."
        );
      })
        .else(g.not(g.item("rope").hasFlag("tiedTooth")), () => {
          g.text(
            "A rope leads further into the room, with one end tied to the {b}elevator{/b}."
          );
        })
        .else(() => {
          g.text(
            "A rope is tied between the {b}elevator{/b} and the {b}tooth of the dragon{/b}."
          );
        });
    });

    // "1=17;2=0;44!3;17=2;4=0;6=2;43>1", "De lift is kapot. Beneden liggen allerlei stukken verspreid op de grond.", "&"

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
    "Tie rope to elevator",
    g.and(
      g.item("rope").hasState("tying"),
      g.not(g.item("rope").hasFlag("tiedElevator"))
    ),
    () => {
      // "1=17;2=0;17=2;4=14;6=0", "*c2", "Je loopt met de andere kant van touw voorzichtig naar de lift."
      // "Je knoopt het touw stevig vast aan de molensteen. De lift kraakt een beetje onder het zware gewicht van de steen.", "&31=4;6=2"
      g.text("You tie the rope firmly to the elevator.");
      g.item("rope").setFlag("tiedElevator");
    }
  );

  interaction(
    "Take the elevator down",
    g.item("elevator").hasState("unknown"),
    () => {
      g.onState(g.item("millstone").hasState("elevator"), () => {
        g.character("player").say(
          "The rope is so under tension, I don't think it is wise if I would also stand on the elevator. I could fall down."
        );
      }).else(() => {
        g.travel("towerBaseElevator");
      });
    }
  );

  interaction("Use handle", g.always(), () => {
    g.onState(g.item("elevator").hasState("unknown"), () => {
      g.onState(g.item("millstone").hasState("elevator"), () => {
        g.text("You are about to pull the lever to lower the elevator.");
        g.character("player").say(
          "I don't think it is wise to mess with this handle now."
        );
      }).else(() => {
        g.text(
          "You pull the handle.",
          "The elevator slowly starts moving {b}down{/b}."
        );
        g.item("elevator").setState("down");
      });
    }).else(g.item("elevator").hasState("down"), () => {
      g.onState(g.item("millstone").hasState("elevator"), () => {
        g.text(
          "You push the handle. A thick rope slowly starts moving at the outside of the tower.",
          "The elevator slowly starts moving {b}up{/b}, carrying the {b}millstone{/b}.",
          "The elevator creaks. It really has trouble lifting the heavy weight."
        );
      }).else(() => {
        g.text(
          "You push the handle.",
          "The elevator slowly starts moving {b}up{/b}."
        );
      });
      g.item("elevator").setState("unknown");
    });
  });

  interaction("Walk back into the room", g.always(), () => {
    g.travel("towerTop");
  });
});
