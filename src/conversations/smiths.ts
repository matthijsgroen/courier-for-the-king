import g from "../game";

g.defineOverlay(
  "smithsConversation",
  ({ onEnter, closeOverlay, interaction, setState, hasState, setPrompt }) => {
    setPrompt("What will you say:");

    onEnter(() => {
      g.character("goldsmith").say("Yes?");
    });

    interaction(
      "Do you know how I could get some medication?",
      hasState("unknown"),
      () => {
        g.character("player").say(
          "Do you know how I could get some medication?"
        );
        g.character("farrier").say("No clue. I am never sick.");
        g.character("armorer").say("Hah! You big baby! You are plenty sick.");
        g.character("goldsmith").say(
          "And then you are begging at the {b}bakery{/b} for some medication!"
        );
        g.character("farrier").say("Not true!");
        g.text("[characters.farrier.name]'s head is getting red.");
      }
    );

    interaction(
      "Do you know how I could get some transportation?",
      hasState("unknown"),
      () => {
        g.character("player").say(
          "Do you know how I could get some transportation?"
        );

        g.onState(
          g.character("horse").hasState("following"),
          () => {
            g.character("goldsmith").say("Euhm, didn't you...");
            g.character("armorer").say("...just get here...");
            g.character("goldsmith").say("...with a horse?");
            g.text("You feel a bit dumb.");
          },
          () => {
            g.character("goldsmith").say(
              "I think {b}farmer [characters.farmer.name]{/b} has a horse?"
            );
            g.character("armorer").say(
              "It is a workhorse, so it won't bring you large distances."
            );
            g.character("farrier").say("We do everything by foot around here.");
            g.character("armorer").say("Walking is good for your health!");
          }
        );
      }
    );

    interaction(
      "Could you fix the horseshoe of my horse?",
      g.and(
        hasState("unknown"),
        g.character("horse").hasState("following"),
        g.not(g.character("horse").hasFlag("hooves"))
      ),
      () => {
        g.character("player").say("Could you fix the horseshoe of my horse?");
        g.text("{b}[characters.farrier.name]{/b} comes to you.");
        g.character("farrier").say("No problem, that will be 2 coins.");
        setState("fixHorseshoe");
      }
    );

    interaction(
      "What do you know of the monster in the woods?",
      g.and(g.character("dragon").hasState("known"), hasState("unknown")),
      () => {
        g.character("player").say(
          "What do you know of the monster in the woods?"
        );
        g.character("armorer").say(
          "Oi, I think that is a really dangerous one. He has a long tail."
        );
        g.character("farrier").say("And has a really loud {i}roar{/i}.");
        g.character("goldsmith").say(
          "We have no idea what his diet looks like, maybe he still needs to eat."
        );
        g.character("armorer").say("brr.");
        g.text("They all shiver.");
      }
    );

    interaction(
      "Could you make an ornament?",
      g.and(hasState("unknown"), g.item("necklace").hasState("need")),
      () => {
        g.character("player").say("Could you make an ornament?");
        g.text("{b}[characters.goldsmith.name]{/b} approaches you.");
        g.character("goldsmith").say(
          "Sure. But you need to bring me materials to work with.",
          "For example, with some {b}gold{/b} and a {b}gem{/b} I could make a nice {b}necklace{/b} for you."
        );
        g.onState(
          g.and(
            g.item("gemstone").hasState("possession"),
            g.item("gold").hasState("possession")
          ),
          () => {
            setState("createNecklace");
          }
        );
      }
    );

    interaction("I think I'll browse", hasState("unknown"), () => {
      g.character("armorer").say("See you later!");
      closeOverlay();
    });

    interaction(
      "Oops, I don't have enough money",
      g.and(
        hasState("fixHorseshoe"),
        g.character("player").hasCounter("coins").lessThan(2)
      ),
      () => {
        g.character("player").say("Oops, I don't have enough money");
        g.character("farrier").say("Ok, please come back when you do.");
        setState("unknown");
      }
    );

    interaction(
      "Here you go, 2 coins",
      g.and(
        hasState("fixHorseshoe"),
        g.character("player").hasCounter("coins").moreThanEquals(2)
      ),
      () => {
        g.character("player").say("Here you go, 2 coins");
        g.text(
          "{b}[characters.farrier.name]{/b} starts to work.",
          "{b}[characters.horse.name]{/b} doesn't mind all the fumbling with his feet."
        );
        g.descriptionText("{i}<Ting, Ting, Ting>{#horseshoe/}{/i}");
        g.text(
          "After a while the farrier is finished, and {b}[characters.horse.name]{/b} received new horseshoes."
        );
        g.character("farrier").say(
          "All done. As good as new. You could {b}ride{/b} him now if you want."
        );
        g.character("player").decreaseCounter("coins", 2);
        g.character("horse").setFlag("hooves");
        setState("unknown");
      }
    );

    interaction(
      "Here you go, some gold and a gem",
      hasState("createNecklace"),
      () => {
        g.character("player").say("Here you go, some gold and a gem.");

        g.text("{b}[characters.goldsmith.name]{/b} starts to work.");
        // TODO: Add color
        g.descriptionText("{i}<Ting, Ting, Ting>{#jewelry/}{/i}");

        g.text(
          "After a while, {b}[characters.goldsmith.name]{/b} is finished.",
          "He made a beautiful {b}necklace{/b}."
        );
        g.character("goldsmith").say(
          "A beautiful necklace, no doubt for a beautiful lady.",
          "By the way, I didn't use up all the material. Do you mind if I compensate you for the leftover materials?"
        );

        g.text("You put the {b}necklace{/b} and {b}15 coins{/b} in your bag.");
        g.character("player").say("Wow, thank you!");

        g.item("gemstone").setState("used");
        g.item("gold").setState("used");
        g.character("player").increaseCounter("coins", 15);
        g.item("necklace").setState("possession");
        g.list("inventory").remove("gem");
        g.list("inventory").remove("gold");
        g.list("inventory").add("necklace");
        setState("unknown");
      }
    );

    interaction(
      "Hmm, maybe another time",
      g.or(
        g.and(
          hasState("fixHorseshoe"),
          g.character("player").hasCounter("coins").moreThanEquals(2)
        ),
        hasState("createNecklace")
      ),
      () => {
        g.character("player").say("Hmm, maybe another time");
        g.onState(
          hasState("fixHorseshoe"),
          () => {
            g.character("farrier").say("Sure, no problem.");
          },
          () => {
            g.character("goldsmith").say("Sure, maybe later.");
          }
        );
        setState("unknown");
      }
    );
  }
);
