import g from "../game";

g.defineOverlay(
  "farmerConversation",
  ({ onEnter, onLeave, interaction, closeOverlay, setPrompt }) => {
    setPrompt("What will you say:");

    onEnter(() => {
      g.onState(g.not(g.character("farmer").hasFlag("visited")), () => {
        g.character("player").say("Can I help you? I hope nobody got hurt?");
        g.character("farmer").say(
          "Nobody got hurt, but that is the only good thing.",
          "My entire orchard has been burned to the ground,",
          "and my horse ran off."
        );
        g.character("farmer").say(
          "That monstrous beast in the tower burned everything down! We have to get rid of it!"
        );
        g.text(
          "You want to ask something about possible transportation,",
          "but since his horse is gone, it would not be appropriate to ask."
        );
        g.character("farmer").setFlag("visited");
        g.onState(g.character("dragon").hasState("unknown"), () => {
          g.character("dragon").setState("known");
        });
      }).else(() => {
        g.character("player").say("Hey, Can I help you?");
        g.character("farmer").say("Heya pal, I don't know.");
      });
    });

    onLeave(() => {
      g.text("You say goodbye to {b}[characters.farmer.name]{/b}.");
    });

    interaction("Can I help putting out the fire?", g.always(), () => {
      g.character("player").say("Can I help putting out the fire?");
      g.character("farmer").say(
        "It's of no use, we can best just leave it smoldering for now.",
        "It's a pity of the apple harvest."
      );
    });

    interaction(
      "Can I help find your horse?",
      g.not(g.character("horse").hasFlag("found")),
      () => {
        g.character("player").say("Can I help find your horse?");
        g.character("farmer").say(
          "I think that {b}[characters.horse.name]{/b} scared off.",
          "Drinking water calms him, maybe he is at the {b}river{/b}?"
        );
        g.character("horse").setFlag("known");
      }
    );

    interaction(
      "I found [characters.horse.name]!",
      g.character("horse").hasFlag("found"),
      () => {
        g.character("player").say("I found [characters.horse.name]!");
        g.character("farmer").say("Fantastic!");
        g.text("The farmer goes directly to [characters.horse.name].");
        g.character("farmer").say(
          "Hi sweet [characters.horse.name], are you ok?"
        );
        g.text("The farmer is petting [characters.horse.name].");

        g.onState(g.character("horse").hasFlag("hooves"), () => {
          g.character("farmer").say(
            "Thank you for taking care of {b}[characters.horse.name]{/b}.",
            "I wish I could give something in return!",
            "Too bad I can't give you any of my {b}delicious apples{/b}, but if you want, I can give you some of my {b}grain{/b}."
          );
          g.character("farmer").say(
            "Also, if you want to borrow {b}[characters.horse.name]{/b} or any other {b}items{/b} from my farm, go ahead."
          );
          g.item("grain").setState("access");
        }).else(() => {
          g.character("farmer").say("Hey boy, are you hurt?");
          g.text(
            "Farmer [characters.farmer.name] inspects the legs of [characters.horse.name]."
          );
          g.character("farmer").say(
            "Ah, I see! There is a horseshoe missing!",
            "[characters.horse.name] can't work on the land this way, or pull {b}a cart{/b}.",
            "Could you bring him to the {b}farrier{/b} for a {b}new horseshoe{/b}?"
          );
        });
      }
    );

    interaction(
      "Did you also hear that there is a treasure hidden somewhere?",
      g.not(g.item("treasureNotes").hasState("unknown")),
      () => {
        g.character("player").say(
          "Did you also hear that there is a treasure hidden somewhere?"
        );
        g.character("farmer").say(
          "Haha sure! But you should not believe all that rubbish!",
          "Someone told me once you had to walk a certain route: {i}NNWNNES{/i}"
        );
        g.character("farmer").say("No idea what that is supposed to mean.");

        g.text("You find this very interesting, and make a note of it.");
        g.item("treasureNotes").setState("possession");
        g.list("inventory").addUnique("treasureNotes");
        g.item("treasureNotes").setFlag("route");
      }
    );

    interaction(
      "Could I get some of your grain?",
      g.item("grain").hasState("access"),
      () => {
        g.character("player").say("Could I get some of your grain?");
        g.character("farmer").say(
          "Sure, no problem, if you have a carriage, I could help load some in."
        );
        g.onState(g.character("horse").hasFlag("cart"), () => {
          g.text(
            "Together you put some bags of {b}grain{/b} on the {b}carriage{/b}."
          );
          g.item("grain").setState("cart");
        }).else(() => {
          g.character("player").say("Hmm I don't have a {b}carriage{/b}.");
        });
      }
    );

    interaction(
      "What could you tell me about the monster?",
      g.character("dragon").hasState("known"),
      () => {
        g.character("player").say(
          "What could you tell me about the monster in the woods?"
        );
        g.character("farmer").say(
          "It's a big firebreathin' monsta'! Yeah that's it! My entire apple harvest is destoyed! Those flames are so hot, yes they are.",
          "There is no {b}armor{/b} in existence that could protect you from it! Its better to be licht on your feet so that you can run!"
        );
        g.text("Hmm... buying an {b}armor{/b} would not help in this case.");
        g.character("farmer").setFlag("toldDragon");
      }
    );

    interaction("Goodbye", g.always(), () => {
      closeOverlay();
    });
  }
);
