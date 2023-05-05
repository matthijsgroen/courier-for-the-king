import g from "../game";

g.defineLocation(
  "tower",
  ({ describe, interaction, hasState, setState, onEnter }) => {
    describe(() => {
      g.onState(hasState("unknown"), () => {
        setState("firstVisit");
      });

      g.text(
        "To the {b}right side{/b} of the tower is a wooden elevator.",
        "At the {b}front{/b} of the tower a big heavy door."
      );

      g.onState(hasState("visited"), () => {
        g.text("", "A trail goes from the tower into the wood.");
      });

      g.onState(g.character("horse").hasState("following"), () => {
        g.text(
          "{b}[characters.horse.name]{/b} is tied to the base of the tower."
        );
      });
    });

    onEnter("towerTop", () => {
      g.text("You go down the stairs to the base of the tower.", "");
    });

    onEnter("darkwoods", () => {
      g.text(
        "{b}[characters.player.name]{/b} walked to the base of the tower."
      );

      g.onState(g.character("horse").hasState("following"), () => {
        g.onState(hasState("firstVisit"), () => {
          g.character("player").say(
            "{b}[characters.horse.name]{/b} I need to tie you up here, I hope to be back soon."
          );
        }).else(() => {
          g.character("player").say(
            "{b}[characters.horse.name]{/b}, I'll tie you up here."
          );
        });
      });
    });

    onEnter("towerBaseElevator", () => {
      g.text("You walk to the front side of the tower.", "");
    });

    interaction("Take the elevator up", hasState("firstVisit"), () => {
      g.text(
        "You walk to the wooden elevator.",
        "It looks like the platform of the elevator is {b}at the top{/b} of the tower.",
        "You cannot get on from this side. You do not see a way to lower the elevator here.",
        "",
        "Behind the elevator you see a hatch towards a basement.",
        "But the hatch is {b}locked{/b}."
      );
    });

    interaction("Open the door", hasState("firstVisit"), () => {
      g.text(
        "You push against the door. It squeaks and creaks terribly. The door starts to move.",
        "You open it just enough to squeeze through.",
        "",
        "You are now inside the tower. It is {i}really{/i} {b}dark{/b}."
      );
      g.text("", "{i}<Ggrrooaaaaarrrrh!!!!!>{/i}", "");
      g.text(
        "You startle and dive aside. That sound was really close. Still it seems to come from the top of the tower.",
        "For a moment you are lying still in the {b}darkness{/b} and decide to stand up.",
        "Your vision starts to adjust to the darkness. You can slowly make out a spiraling staircase leading upwards."
      );
      setState("inside");
    });

    interaction("Go up the stairs", hasState("inside"), () => {
      g.text(
        "You tremble with {i}fear{/i}. You have no idea what you are up against.",
        "The {b}monster{/b} does not sound friendly.",
        "",
        "You grip your sword tightly and slowly creep up the stairs, step by step.",
        "You try to peek into the darkness to make out your surroundings.",
        ""
      );
      g.travel("towerTop");
    });

    interaction("Enter the tower", hasState("visited"), () => {
      g.travel("towerTop");
    });

    interaction(
      "Place millstone on elevator",
      g.and(
        g.item("millstone").hasState("cart"),
        g.character("horse").hasState("following"),
        g.character("horse").hasFlag("cart")
      ),
      () => {
        g.onState(g.character("daughter").hasState("unloadStone"), () => {
          g.text(
            "You lead {b}[characters.horse.name]{/b} with the carriage towards the elevator.",
            "{b}[characters.daughter.name]{/b} is just arriving at the bottom."
          );
          g.character("player").say(
            "Let's try to lift this thing on the elevator."
          );
          g.text(
            "Even with the two of you it is a heavy struggle to push the stone from the cart onto the elevator.",
            "After a while you succeed."
          );

          g.character("daughter").say(
            "Phew! We made it! I see you back inside ok?"
          );

          g.text(
            "{b}[characters.daughter.name]{/b} hurries back inside and runs up the stairs."
          );
        }).else(() => {
          g.text(
            "You want to carry the {b}millstone{/b} from the carriage to the elevator, but it is way too heavy to lift by yourself."
          );
        });
        g.character("daughter").setState("unknown");
        g.item("millstone").setState("elevator");
      }
    );

    interaction("Go to the elevator", hasState("visited"), () => {
      g.travel("towerBaseElevator");
    });

    interaction("Go into the dark wood", hasState("visited"), () => {
      g.onState(g.character("daughter").hasState("unloadStone"), () => {
        g.character("player").say(
          "{b}[characters.daughter.name]{/b} should be here soon to help unload the millstone."
        );
      }).else(() => {
        g.travel("darkwoods");
      });
    });
  }
);
