import g from "../game";

g.defineLocation("towerTopElevator", ({ describe, onEnter, interaction }) => {
  onEnter("towerTop", () => {
    g.text(
      "You walk to a large opening in the top of the tower. This has to be where the {b}dragon{/b} can fly in and out. You can see all over the {b}dark wood{/b}. In the distance, you can even see a {b}mill on a hill{/b}."
    );
    g.onState(g.item("elevator").hasState("broken"), () => {
      g.text(
        "On the outside of the tower are some broken remains of what once was an elevator."
      );
    }).else(() => {
      g.text("On the outside of the tower is a wooden elevator.");
    });
    g.text("");
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
    })
      .else(g.item("elevator").hasState("unknown"), () => {
        g.text(
          "At this moment the elevator is {b}at the top{/b} of the tower."
        );
        g.text("There is a {b}handle{/b} here to control the elevator.");
      })
      .else(() => {
        g.text(
          "The elevator is {b}broken{/b}. Down below you see all kinds of debris from the collapse."
        );
      });
    g.onState(
      g.and(
        g.item("millstone").hasState("elevator"),
        g.not(g.item("elevator").hasState("broken"))
      ),
      () => {
        g.text("A {b}heavy{/b} millstone lies on the elevator.");
      }
    );

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
        g.location("towerBaseElevator").travel();
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
    })
      .else(g.item("elevator").hasState("down"), () => {
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
      })
      .else(g.item("elevator").hasState("broken"), () => {
        g.text(
          "You pull the lever of the elevator. Nothing happens.",
          "Maybe it is because the elevator lies in ruins?"
        );
      });
  });

  interaction(
    "Cut rope of elevator",
    g.and(
      g.item("rope").hasFlag("tiedElevator"),
      g.item("rope").hasFlag("tiedTooth"),
      g.item("rope").hasState("tying"),
      g.list("inventory").isInList("sword")
    ),
    () => {
      g.text(
        "You take your sword and in one fluent motion you cut through the thick rope of the elevator.",
        "With a loud rattle the elevator with the {b}millstone{/b} falls down.",
        "",
        "The rope tied to the {b}millstone{/b} is instantly at full tension. With a sharp jerk the dragon's tooth flies {b}out of the window{/b}.",
        ""
      );
      // TODO: Add color
      g.text("{b}{i}<Gggrrrrrooaaaaaaaarggggggggh!!!!!>{/i}{/b}");
      g.text(
        "",
        "The enormous dragon's roar echoes far into the distance.",
        "",
        "And like that, it is silent again."
      );

      g.item("rope").setState("cut");
      g.item("tooth").setState("pulled");
      g.item("elevator").setState("broken");
      g.character("dragon").setFlag("toothPulled");
    }
  );

  interaction("Walk back into the room", g.always(), () => {
    g.location("towerTop").travel();
  });
});
