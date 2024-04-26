import g from "../game";

g.defineOverlay(
  "witchConversation",
  ({
    onEnter,
    interaction,
    closeOverlay,
    onLeave,
    setPrompt,
    hasState,
    setState,
    increaseCounter,
    hasCounter,
  }) => {
    setPrompt(
      "What will you say:",
      g.or(
        g.not(hasState("brewing")),
        g.and(hasState("brewing"), hasCounter("brewStep").equals(3))
      )
    );

    onEnter(() => {
      g.text("You knock on the door.");
      g.text("A few seconds later, the door swings open.");
      g.onState(g.location("cabin").hasFlag("visited"), () => {
        g.character("witch").say(
          "Hi {b}[characters.player.name]{/b}, nice to see you back!"
        );
      })
        .else(g.character("player").hasFlag("male"), () => {
          g.character("witch").say(
            "Hello handsome stud, what can I do for you!?"
          );
          g.text("You startle and jump backwards.");
        })
        .else(() => {
          g.character("witch").say(
            "Hello gorgeous lady, what can I do for you!?"
          );
          g.text("You startle and jump backwards.");
        });
    });

    onLeave(() => {
      g.onState(
        g.and(
          g.isLocation("cabin"),
          g.not(g.location("cabin").hasState("accessible"))
        ),
        () => {
          g.descriptionText(
            "You say goodbye to {b}[characters.witch.name]{/b} and she closes her door."
          );
        }
      );
    });

    const intro1 = () => {
      g.text("You are stammering, not knowing what to say.");
      g.text("");
      g.text("The woman comes across as quite friendly and enthusiastic.");

      g.text("");
      g.text("... is this a witch?");
      g.text("You imagined her very differently.");
      g.character("player").say("...");
      g.character("witch").say("No need to be scared. I was expecting you!");
      setState("intro");
    };

    interaction("Euhm...", hasState("unknown"), intro1);
    interaction("Uh oh...", hasState("unknown"), intro1);
    interaction("Well...", hasState("unknown"), intro1);

    const intro2 = () => {
      g.character("player").say("...");
      g.text("You are rendered {b}speechless{/b}.");
      g.character("witch").say(
        "My name is {b}[.name]{/b}. You must be {b}[characters.player.name]{/b}.",
        "Let me guess, you are here for a healingpotion?"
      );
      g.text("How does she know all these things?");
      g.character("witch").say("Yes, {i}magic{/i} is a powerful thing!");
      g.text(
        "In the corner of your eye, you see a {b}raven{/b} fly away from a windowsill."
      );
      g.text("You start to suspect she received a letter as well...");
      setState("visited");
      g.location("cabin").setFlag("visited");
    };

    interaction("But how...", hasState("intro"), intro2);
    interaction("That is not possible...", hasState("intro"), intro2);

    interaction(
      "Could you help me with a medicine?",
      g.and(
        hasState("visited"),
        g.not(g.list("inventory").isInList("ingredientList"))
      ),
      () => {
        g.text(
          "{b}[characters.witch.name]{/b} looks at you. There is a smile on her face."
        );

        g.character("witch").say(
          "Of course I can help you!",
          "But it won't be for free {b}honey{/b}.",
          "I want something from you first. A nice gift befitting of a lady."
        );
        g.character("witch").say(
          "If you can surprise me with a nice {b}Ornament{/b},",
          "I will help you with your with your medicine problem."
        );
        g.text("You let her know you will try your best.");

        g.onState(g.item("necklace").hasState("unknown"), () => {
          g.item("necklace").setState("need");
        });
      }
    );

    interaction(
      "Give gemstone to [characters.witch.name]",
      g.and(
        hasState("visited"),
        g.item("necklace").hasState("need"),
        g.item("gemstone").hasState("possession")
      ),
      () => {
        g.text(
          "{b}[characters.witch.name]{/b} looks at you. There is a smile on her face."
        );
        g.character("witch").say(
          "That gem is a real beauty! But it is not an {b}Ornament{/b}."
        );
      }
    );

    interaction(
      "Give necklace to [characters.witch.name]",
      g.and(hasState("visited"), g.item("necklace").hasState("possession")),
      () => {
        g.item("necklace").setState("given");
        g.list("inventory").remove("necklace");
        g.text(
          "{b}[characters.witch.name]{/b} looks at you. There is a smile on her face."
        );
        g.character("witch").say(
          "That {b}necklace{/b} is {i}super{/i}! This will be a magnificent preset for my {b}daughter{/b}!",
          "One second, I will write you a list of the items I will need for the {b}medicine{/b}."
        );
        g.text(
          "{b}[characters.witch.name]{/b} goes inside and closes the door."
        );
        g.text("A while later she returns with a list of items.");
        g.onState(g.character("player").hasFlag("male"), () => {
          g.character("witch").say(
            "Here, this is what I need.",
            "Some items could be tricky to come by, but that should be no problem for a strong man like you."
          );
        }).else(() => {
          g.character("witch").say(
            "Here, this is what I need.",
            "Some items could be tricky to come by, but that should be no problem for a strong woman like you."
          );
        });
        g.item("ingredientList").setState("possession");
        g.list("inventory").add("ingredientList");
      }
    );

    interaction(
      "Did you also hear that there is a treasure hidden somewhere?",
      g.and(
        hasState("visited"),
        g.not(g.item("treasureNotes").hasState("unknown"))
      ),
      () => {
        g.character("player").say(
          "Did you also hear that there is a treasure hidden somewhere?"
        );
        g.character("witch").say(
          "Ah, you should not care about such things.",
          "The powers of {b}plants{/b} and {b}magic{/b} is much bigger than that of money."
        );
        g.text("This doesn't help you.");
      }
    );

    interaction(
      "I collected all the ingredients",
      g.and(
        hasState("visited"),
        g.item("ingredientList").hasFlag("roundLeaves"),
        g.item("ingredientList").hasFlag("thornyLeaves"),
        g.item("ingredientList").hasFlag("toadstools"),
        g.item("ingredientList").hasFlag("tooth")
      ),
      () => {
        g.character("player").say("I collected all the ingredients.");
        g.text(
          "You give all the ingredients to {b}[characters.witch.name]{/b}."
        );
        g.character("witch").say(
          "Thanks! Please wait here, I will brew the medicine for you."
        );
        g.text(
          "{b}[characters.witch.name]{/b} goes inside and closes the door."
        );
        setState("brewing");

        g.list("inventory").remove("dragonTooth");
        g.item("plants").decreaseCounter("roundLeaves", 2);
        g.item("mushrooms").decreaseCounter("lightblue", 2);
        g.item("plants").decreaseCounter("thornyLeaves", 3);

        g.item("tooth").setState("workbench");
      }
    );

    interaction(
      "Wait a bit",
      g.and(hasState("brewing"), hasCounter("brewStep").equals(0)),
      () => {
        g.text(
          "You are waiting for a while. You hear all kinds of {b}noises{/b} coming from the cabin.",
          "Things are grabbed, you hear walking. You hear jars rattling and a fire burning.",
          "Smoke rises from the chimney."
        );

        g.character("player").say("It seems the medicine is being brewed.");
        increaseCounter("brewStep", 1);
      }
    );

    interaction(
      "Wait a bit more",
      g.and(hasState("brewing"), hasCounter("brewStep").equals(1)),
      () => {
        g.text(
          "You start pacing while you wait.",
          "You hear a bubbling sound coming out of a cauldron. Now and then you hear a small splash, as if extra ingredients are added.",
          "It seems the brewing has really started now.",
          "",
          "You're hoping that your patience gets rewarded."
        );
        g.character("player").say("Well... waiting a little bit more then...");

        increaseCounter("brewStep", 1);
      }
    );

    interaction(
      "Wait a little bit more",
      g.and(hasState("brewing"), hasCounter("brewStep").equals(2)),
      () => {
        g.text(
          "You still hear the bubbling noise coming from the cauldron. A weird smell is coming out of the cabin.",
          "You don't hear any footsteps anymore."
        );
        g.character("player").say("Hmm, this takes longer than I expected...");

        increaseCounter("brewStep", 1);
      }
    );

    interaction(
      "Is everything alright?",
      g.and(hasState("brewing"), hasCounter("brewStep").equals(3)),
      () => {
        g.character("player").say("Is everything alright?");
        g.text(
          "You don't get any reaction. The smell coming from the cabin seems {b}intoxicating{/b}."
        );
        g.character("player").say("Hmm, something doesn't feel right.");
        increaseCounter("brewStep", 1);
      }
    );

    interaction(
      "Open door of the cabin",
      g.and(hasState("brewing"), hasCounter("brewStep").equals(4)),
      () => {
        setState("visited");
        g.location("cabin").setState("accessible");

        g.text(
          "You decide to open the door.",
          "",
          "You push the door open. A huge fume that smells intoxicating goes through the door outside.",
          "You quickly go inside and open all windows, so that the fume disappears.",
          ""
        );

        closeOverlay();
        g.travel("cabinInside");
      }
    );

    interaction("Goodbye", hasState("visited"), () => {
      closeOverlay();
    });
  }
);
