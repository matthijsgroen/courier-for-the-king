import g from "../game";

g.defineOverlay(
  "daughterConversation",
  ({ onEnter, interaction, hasState, setState, closeOverlay, setPrompt }) => {
    setPrompt("What will you say:");

    onEnter(() => {
      g.onState(g.character("dragon").hasFlag("toothPulled"), () => {
        g.character("daughter").say(
          "Wow, we pulled the tooth! That was incredible!"
        );
        g.character("player").say("Yes, that was quite a job, but we did it!");

        g.text("You give {b}[characters.daughter.name]{/b} a high-five.", "");

        g.text(
          "The dragon lies tired but now without pain in the corner, slightly dozing off."
        );
      })
        .else(hasState("visited"), () => {
          g.character("daughter").say(
            "Hi {b}[characters.player.name]{/b}, are you here to help with the toothache?"
          );
        })
        .else(() => {
          g.character("daughter").say(
            "Hey! Who are you? What are you doing here? Put that sword away!",
            "You might hurt someone!"
          );
          g.text("You are perplexed.");
          g.character("daughter").say(
            "Yes you! What are you doing here? It is difficult enough as it is already!"
          );

          g.text(
            "Difficult enough? What is she talking about?",
            "You decide to put away your sword."
          );
        });
    });

    interaction(
      "Are you [characters.daughter.name]?",
      hasState("unknown"),
      () => {
        g.character("player").say(
          "Are you {b}[characters.daughter.name]{/b}? The daughter of the {b}baker{/b}?"
        );
        g.character("daughter").say("Yes that's me. And who are you?");
        g.character("player").say(
          "I'm {b}[characters.player.name]{/b}, I'm here to rescue you!"
        );
        g.character("daughter").say(
          "Rescue me? Why? I don't need to be rescued. I came here on my own account. We need to {b}save the dragon{/b}!"
        );
        setState("intro");
      }
    );

    interaction(
      "Look out! There is a dragon over there!",
      hasState("unknown"),
      () => {
        g.character("player").say("Look out! There is a dragon over there!");
        g.character("daughter").say(
          "Ha, I know that, I came to him myself. He is really not dangerous you know. Who are you anyway?"
        );
        g.character("player").say(
          "I'm {b}[characters.player.name]{/b}, I'm here to rescue you!"
        );
        g.character("daughter").say(
          "Rescue me? Why? I don't need to be rescued. We need to {b}save the dragon{/b}!"
        );
        setState("intro");
      }
    );

    interaction("I'm coming to save you!", hasState("unknown"), () => {
      g.character("player").say("I'm here to rescue you!");
      g.character("daughter").say(
        "Rescue me? Ha! I can take care of myself! Who are you anyway?"
      );
      g.character("player").say("I am {b}[characters.player.name]{/b}.");
      g.character("daughter").say(
        "If you desperately want to save someone here, you can help me {b}save this dragon{/b}!"
      );
      setState("intro");
    });

    interaction("The dragon needs to be rescued?", hasState("intro"), () => {
      g.character("player").say("The dragon needs to be rescued?");
      g.character("daughter").say(
        "Yes, didn't you hear the terrible roars?",
        "The poor beast has a terrible toothache. His {b}tooth{/b} needs to be pulled, but I can't."
      );
      setState("visited");
      g.character("dragon").setState("found");
    });

    interaction(
      "How can I help?",
      g.and(
        hasState("visited"),
        g.not(g.character("dragon").hasFlag("toothPulled"))
      ),
      () => {
        g.character("player").say("How can I help you?");

        g.character("daughter").say(
          "We have to think of something to {b}pull{/b} his teeth out.",
          "I'm studying to be {b}a dentist{/b}. With so many people eating the pastries of my father there should be enough work for me.",
          "Never thought my first client would be a dragon."
        );

        g.character("daughter").say(
          "The problem with a dragon is that everything is bigger and stronger than by people.",
          "With people you could tie the tooth with {b}a rope{/b} to a door, and slam the door shut.",
          "We need to think bigger here. Could you arrange a {b}heavy stone{/b}?"
        );
      }
    );

    interaction(
      "You have to come with me, your dad is worried!",
      hasState("visited"),
      () => {
        g.onState(g.character("dragon").hasFlag("toothPulled"), () => {
          g.character("player").say(
            "You have to come with me, your dad is worried!"
          );
          g.character("daughter").say(
            "Yes, you are right. Pulling that tooth was awesome!",
            "My career as dentist is making a great start, don't you think?"
          );
          g.text("...");
          g.character("daughter").say(
            "Well, I'm off to the bakery. Will I see you there later?"
          );
          g.text(
            "{b}[characters.daughter.name]{/b} gives you and the {b}dragon{/b} a hug and leaves for the bakery."
          );
          g.character("daughter").setState("bakery");
          g.descriptionText("");
          closeOverlay();
        }).else(() => {
          g.character("player").say(
            "You have to come with me, your dad is worried!"
          );
          g.character("daughter").say(
            "My dad? {b}[characters.baker.name]{/b} is only good at baking, and only cares for {b}money{/b}.",
            "I'm staying here till I've helped this dragon. Why didn't {i}he{/i} come here himself?",
            "That's why he sent you here right? Because he could not afford a proper knight."
          );
        });
      }
    );

    interaction("What do you know of this dragon?", hasState("visited"), () => {
      g.character("player").say("What do you know of this dragon?");
      g.character("daughter").say(
        "Oh quite a bit actually. This dragon is called a {b}[characters.dragon.name]{/b}."
      );
      g.character("player").say("A {b}[characters.dragon.name]{/b}?");
      g.character("daughter").say(
        "Yes, a {b}[characters.dragon.name]{/b}... He can fly, breathe fire and loves {b}apples{/b}.",
        "That is probably why he wanted to eat some {b}apples{/b} at the farm. And that is when he was {b}attacked{/b}."
      );
      g.character("player").say("{b}Attacked??{/b} This dragon?");

      g.onState(g.character("dragon").hasFlag("toothPulled"), () => {
        g.character("daughter").say(
          "Yes, but luckily we got the bad tooth out now!"
        );
      }).else(() => {
        g.onState(g.character("horse").hasState("following"), () => {
          g.character("daughter").say(
            "Yes, and the perpetrator is downstairs. There is a horseshoe stuck in the teeth of the [characters.dragon.name].",
            "He got kicked by your horse."
          );
        }).else(() => {
          g.character("daughter").say(
            "Yes, and the perpetrator is {b}a horse{/b}. There is a horseshoe stuck in the teeth of the [characters.dragon.name]."
          );
        });
        g.character("daughter").say(
          "The horseshoe and the teeth need to be taken out."
        );
      });
    });

    interaction(
      "Could you help me unload?",
      g.and(
        hasState("visited"),
        g.character("horse").hasState("following"),
        g.character("horse").hasFlag("cart"),
        g.item("millstone").hasState("cart")
      ),
      () => {
        g.character("player").say("Could you help me unload?");
        g.character("daughter").say("Sure, what did you bring?");
        g.character("player").say(
          "I brought an old millstone, but it is too heavy to get of the carriage by myself."
        );
        g.character("daughter").say(
          "Ah nice! I think we both have the same plan in mind. I'll take the elevator. Do I see you downstairs?"
        );
        g.character("daughter").setState("unloadStone");
        closeOverlay();
      }
    );

    interaction(
      "I will see what I can do",
      g.and(
        hasState("visited"),
        g.not(g.character("dragon").hasFlag("toothPulled"))
      ),
      () => {
        g.character("player").say("I will see what I can do.");
        g.character("daughter").say("Ok.");
        g.location("towerTop").setFlag("visited");
        g.location("tower").setState("visited");
        closeOverlay();
      }
    );

    interaction(
      "See you later",
      g.and(hasState("visited"), g.character("dragon").hasFlag("toothPulled")),
      () => {
        g.character("player").say("I will see you later!");
        g.character("daughter").say("Ok.");
        closeOverlay();
      }
    );
  }
);
