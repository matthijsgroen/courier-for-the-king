import g from "../game";

g.defineOverlay(
  "daughterConversation",
  ({ onEnter, interaction, hasState, setState }) => {
    onEnter(() => {
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

    interaction("The dragon needs to be rescued?", hasState("intro"), () => {});
  }
);
