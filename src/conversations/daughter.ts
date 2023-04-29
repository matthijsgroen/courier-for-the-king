import g from "../game";

g.defineOverlay(
  "daughterConversation",
  ({ onEnter, interaction, hasState, setState, closeOverlay, setPrompt }) => {
    setPrompt("What will you say:");

    onEnter(() => {
      g.onState(hasState("visited"), () => {
        g.character("daughter").say(
          "Hi {b}[characters.player.name]{/b}, are you here to help with the toothache?"
        );
      }).else(() => {
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
    });

    interaction("How can I help?", hasState("visited"), () => {
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
    });

    interaction(
      "You have to come with me, your dad is worried!",
      hasState("visited"),
      () => {
        g.character("player").say(
          "You have to come with me, your dad is worried!"
        );
        g.character("daughter").say(
          "My dad? {b}[characters.baker.name]{/b} is only good at baking, and only cares for {b}money{/b}.",
          "I'm staying here till I've helped this dragon. Why didn't {i}he{/i} come here himself?",
          "That's why he sent you here right? Because he could not afford a proper knight."
        );

        // "1=17;2=0;17=2;4=3;45!0", "*c3", "$n: 'Je moet meekomen, je vader is hartstikke ongerust!'"
        // "", "*c13", "Bloem: 'Ja, je hebt gelijk. Die tand trekken was echt super! Mijn carrière"
        // "  voor tandarts maakt zo wel een geweldige start, denk je niet?'"
        // "", "Bloem: 'Nou dan ga ik nu wel naar de bakkerij. Zie ik je later misschien daar weer?'"
        // "", "*c2", "Bloem geeft jou en de draak een knuffel en gaat de toren uit richting de bakkerij.", "&4=0;46=1;20=1"
      }
    );

    interaction("What do you know of this dragon?", hasState("visited"), () => {
      // "1=17;2=0;17=2;4=4", "*c3", "$n: 'Wat weet je van deze draak?'"
      // "", "*c13", "Bloem: 'Ow best wel wat eigenlijk. Deze draak is een Dins.'"
      // "", "*c3", "$n: 'Een Dins?'", "", "*c13", "Bloem: 'Ja, een Dins... Hij kan vliegen, vuur spuwen en is gek op appels."
      // "  Waarschijnlijk heeft hij appels proberen te eten bij de boer, en is hij toen aangevallen.'"
      // "", "*c3", "$n: 'Aangevallen?? Deze draak?'", "", "&"
      // "1=17;2=0;17=2;4=4;30=18;45=0", "*c13", "Bloem: 'Ja, en de dader staat beneden. Er zat een hoefijzer in de tand van de Dins. Hij is door jouw paard getrapt. De hoefijzer en de tand moeten eruit.'", "&4=1"
      // "1=17;2=0;17=2;4=4;30!18;45=0", "*c13", "Bloem: 'Ja, en de dader is een paard. Er zat een hoefijzer in de tand van de Dins. De hoefijzer en de tand moeten eruit.'", "&4=1"
      // "1=17;2=0;17=2;4=4;45!0", "*c13", "Bloem: 'Ja, maar gelukkig hebben we de tand er nu uitgetrokken!'", "&4=1"
    });

    interaction("I will see what I can do", hasState("visited"), () => {
      g.character("player").say("I will see what I can do.");
      g.character("daughter").say("Ok.");
      g.location("towerTop").setFlag("visited");
      g.location("tower").setState("visited");
      //   "1=17;2=0;17=2;4=5;45=0", "*c3", "$n: 'Ik ga kijken wat ik kan doen.'";
      //   "", "*c13", "Bloem: 'Oké.'", "&4=0;20=1";
      closeOverlay();
    });

    // "2=0;1=17;17=2;4=1;45=0", "Zeg: 'Hoe kan ik je helpen?'", "4=2"
    // "2=0;1=17;17=2;4=1", "Zeg: 'Je moet meekomen, je vader is hartstikke ongerust!'", "4=3"
    // "2=0;1=17;17=2;4=1", "Zeg: 'Wat weet je van deze draak?'", "4=4"
    // "2=0;1=17;17=2;4=1;30=18;44=2;29=4", "Zeg: 'Zou je me kunnen helpen uitladen?'", "4=8"
    // "2=0;1=17;17=2;4=1;45=0", "Zeg: 'Ik ga kijken wat ik kan doen'", "4=5"
    // "2=0;1=17;17=2;4=1;45!0", "Zeg: 'Tot later'", "4=5"
  }
);
