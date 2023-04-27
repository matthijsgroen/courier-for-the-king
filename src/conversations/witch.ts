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
  }) => {
    setPrompt("What will you say:");

    onEnter(() => {
      g.onState(g.location("cabin").hasFlag("visited"), () => {
        g.character("witch").say(
          "Hi {b}[characters.player.name]{/b}, nice to see you back!"
        );
      }).else(() => {
        g.onState(g.character("player").hasFlag("male"), () => {
          g.character("witch").say(
            "Hello handsome stud, what can I do for you!?"
          );
        }).else(() => {
          g.character("witch").say(
            "Hello gorgeous lady, what can I do for you!?"
          );
        });
        g.text("You startle and jump backwards.");
      });
    });

    onLeave(() => {
      g.onState(g.isLocation("cabin"), () => {
        g.descriptionText(
          "You say goodbye to {b}[characters.witch.name]{/b} and she closes her door."
        );
      });
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
      hasState("visited"),
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
      hasState("visited"),
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

    interaction("Goodbye", hasState("visited"), () => {
      closeOverlay();
    });
  }
);
