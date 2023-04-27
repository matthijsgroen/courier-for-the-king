import g from "../game";

g.defineLocation(
  "smithy",
  ({ describe, interaction, onEnter, hasState, setState }) => {
    onEnter("village", () => {
      g.onState(g.location("smithy").hasFlag("visited"), () => {
        g.character("armorer").say("Hey, welcome!");
        g.character("goldsmith").say("How can we help you?");
        // TODO: Update text after 'killing' dragon
      }).else(() => {
        g.character("armorer").say("Hey, a new customer! Welcome!");
        g.character("farrier").say(
          "My name is {b}[characters.farrier.name]{/b}, the {b}farrier{/b}. {b}[characters.goldsmith.name]{/b} here is our {b}goldsmith{/b}."
        );
        g.character("goldsmith").say(
          "And our {b}armorer{/b} here is {b}[characters.armorer.name]{/b}."
        );
        g.character("armorer").say("How can we help you?");
        g.location("smithy").setFlag("visited");
      });
    });

    describe(() => {
      g.descriptionText(
        "You are in a large Smithy.",
        "A farrier, a goldsmith and an armorer are standing behind a large counter."
      );
      g.descriptionText(
        "All kinds of {b}armor{/b} and {b}weapons{/b} are on display in the shop."
      );
    });

    interaction("Talk to smiths", hasState("unknown"), () => {
      g.openOverlay("smithsConversation");
    });

    interaction("Browse the shop", hasState("unknown"), () => {
      g.text(
        "You start browsing the smithy. Everywhere is gear with all kinds of price tags.",
        "You decide to take a closer look."
      );
      g.text(
        "In the meantime, the smiths behind the counter are starting a conversation."
      );
      g.character("armorer").say("No, that is really nonsense.");
      g.character("goldsmith").say(
        "I'm telling you its true. There is a treasure hidden here in the area."
      );
      g.character("armorer").say("And who's treasure would that be?");
      g.character("farrier").say(
        "I heard the rumors as well. There should be gold hidden somewhere."
      );
      g.character("armorer").say(
        "{i}Hush!{/i}. Don't talk so loud, we have customers in the shop."
      );
      g.text(
        "They continue to converse in whispers, but you can't understand it anymore."
      );

      g.item("treasureNotes").setState("existence");
      setState("browsing");
    });

    interaction("Leave the shop", hasState("unknown"), () => {
      g.travel("village");
    });

    interaction(
      "Buy a standard sword, for 99 coins",
      g.and(
        hasState("browsing"),
        g.not(g.item("sword").hasState("possession"))
      ),
      () => {
        g.text(
          "You let {b}[characters.armorer.name]{/b} know you are interested in buying {b}the standard sword{/b}."
        );
        g.character("armorer").say(
          "Ah yes, that is some fine craftsmanship. I spent quite some time creating that. It's a real bargain!"
        );
        g.onState(
          g.character("player").hasCounter("coins").moreThanEquals(99),
          () => {
            g.text(
              "You look inside your bag, and see you have {b}[characters.player.counters.coins] coins{/b}."
            );

            g.character("player").say("Here you go, {b}99 coins{/b}.");
            g.character("armorer").say("Thanks! Have fun with the sword!");

            g.text(
              "You put the sword in your bag and start checking the store for other items."
            );

            g.item("sword").setState("possession");
            g.list("inventory").add("sword");
            g.character("player").decreaseCounter("coins", 99);
            g.onState(
              g.character("player").hasCounter("coins").lessThanEquals(0),
              () => {
                g.list("inventory").remove("coins");
              }
            );
          }
        ).else(() => {
          g.onState(g.character("player").hasCounter("coins").equals(1), () => {
            g.text(
              "You look inside your bag, and see you only have {b}[characters.player.counters.coins] coin{/b}."
            );
          }).else(() => {
            g.text(
              "You look inside your bag, and see you only have {b}[characters.player.counters.coins] coins{/b}."
            );
          });
          g.character("player").say(
            "Sorry, I don't have enough coins for that."
          );
          g.character("armorer").say(
            "Ok, feel free to look around for something else."
          );
        });
      }
    );

    interaction("Buy tin armor, for 249 coins", hasState("browsing"), () => {
      g.text(
        "You let {b}[characters.armorer.name]{/b} know you are interested in buying {b}the tin armor{/b}."
      );
      g.character("armorer").say(
        "Ah yes, that is some fine craftsmanship. I spent quite some time creating that. It's a real bargain!"
      );
      g.onState(g.character("player").hasCounter("coins").equals(1), () => {
        g.text(
          "You look inside your bag, and see you only have {b}[characters.player.counters.coins] coin{/b}."
        );
      }).else(() => {
        g.text(
          "You look inside your bag, and see you only have {b}[characters.player.counters.coins] coins{/b}."
        );
      });
      g.character("player").say("Sorry, I don't have enough coins for that.");
      g.character("armorer").say(
        "Ok, feel free to look around for something else."
      );
    });

    interaction(
      "Buy steel armor, for 1,490 coins",
      hasState("browsing"),
      () => {
        g.text(
          "You let {b}[characters.armorer.name]{/b} know you are interested in buying {b}the steel armor{/b}."
        );
        g.character("armorer").say(
          "Ah yes, that is some fine craftsmanship. I spent quite some time creating that. It's a real bargain!"
        );
        g.onState(g.character("player").hasCounter("coins").equals(1), () => {
          g.text(
            "You look inside your bag, and see you only have {b}[characters.player.counters.coins] coin{/b}."
          );
        }).else(() => {
          g.text(
            "You look inside your bag, and see you only have {b}[characters.player.counters.coins] coins{/b}."
          );
        });
        g.character("player").say("Sorry, I don't have enough coins for that.");
        g.character("armorer").say(
          "Ok, feel free to look around for something else."
        );
      }
    );

    interaction(
      "Buy a gigantic sword, for 9,999 coins",
      hasState("browsing"),
      () => {
        g.text(
          "You let {b}[characters.armorer.name]{/b} know you are interested in buying {b}the gigantic sword{/b}."
        );
        g.character("armorer").say(
          "Ah yes, that is some fine craftsmanship. I spent quite some time creating that. It's a real bargain!"
        );
        g.onState(g.character("player").hasCounter("coins").equals(1), () => {
          g.text(
            "You look inside your bag, and see you only have {b}[characters.player.counters.coins] coin{/b}."
          );
        }).else(() => {
          g.text(
            "You look inside your bag, and see you only have {b}[characters.player.counters.coins] coins{/b}."
          );
        });
        g.character("player").say("Sorry, I don't have enough coins for that.");
        g.character("armorer").say(
          "Ok, feel free to look around for something else."
        );
      }
    );

    interaction("Stop browsing the shop", hasState("browsing"), () => {
      setState("unknown");
      g.describeLocation();
    });
  }
);
