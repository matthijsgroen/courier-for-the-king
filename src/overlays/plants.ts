import g from "../game";

g.defineOverlay("plants", ({ onEnter, interaction, closeOverlay }) => {
  onEnter(() => {
    g.text(
      "You take your time to take a closer look at all the different plants that grow here in the {b}swamp{/b}.",
      "There are plants with {b}thorny{/b} leaves, {b}round{/b} leaves, {b}diamond-shaped{/b} leaves and {b}heart-shaped{/b} leaves."
    );
    g.onState(g.character("player").hasFlag("herbKnowledge"), () => {
      g.character("player").say(
        "Convenient that I now know everything about these plants!"
      );
    });
  });

  interaction("Pick plant with thorny leaves", g.always(), () => {
    g.onState(
      g.and(
        g.item("ingredientList").hasFlag("seen"),
        g.item("plants").hasCounter("thornyLeaves").lessThan(10)
      ),
      () => {
        g.text(
          "You bend over to pick a few of the plants with {b}thorny leaves{/b}, and put them in your bag"
        );
        g.item("plants").setCounter("thornyLeaves", 10);
        g.item("ingredientList").setFlag("thornyLeaves");
        g.list("inventory").addUnique("thornyLeaves");
      }
    )
      .else(g.item("ingredientList").hasFlag("seen"), () => {
        g.character("player").say("Hmm, I have enough of those.");
      })
      .else(() => {
        g.text(
          "You bend over to pick the plant with {b}thorny{/b} leaves.",
          "Just before you touch it, you stop.",
          "This plant could be {b}poisonous{/b}."
        );
      });
  });

  interaction("Pick plant with round leaves", g.always(), () => {
    g.onState(
      g.and(
        g.item("ingredientList").hasFlag("seen"),
        g.item("plants").hasCounter("roundLeaves").lessThan(10)
      ),
      () => {
        g.text(
          "You bend over to pick a few of the plants with {b}round leaves{/b}, and put them in your bag"
        );
        g.item("plants").setCounter("roundLeaves", 10);
        g.item("ingredientList").setFlag("roundLeaves");
        g.list("inventory").addUnique("roundLeaves");
      }
    )
      .else(g.item("ingredientList").hasFlag("seen"), () => {
        g.character("player").say("Hmm, I have enough of those.");
      })
      .else(() => {
        g.text(
          "You bend over to pick the plant with {b}round{/b} leaves.",
          "Just before you touch it, you stop.",
          "This plant could be {b}poisonous{/b}."
        );
      });
  });

  interaction("Pick plant with diamond-shaped leaves", g.always(), () => {
    g.text(
      "You bend over to pick the plant with {b}diamond-shaped{/b} leaves.",
      "Just before you touch it, you stop.",
      "This plant could be {b}poisonous{/b}."
    );
    g.onState(
      g.and(
        g.item("treasureNotes").hasFlag("moonStone"),
        g.item("moonStone").hasState("unknown")
      ),
      () => {
        g.text(
          "Then you remember what {b}[characters.baker.name]{/b} said about a {b}Moonstone{/b}.",
          "You start digging at the roots of the plant, and discover a smooth small stone.",
          "The {b}color{/b} seems a bit off. You put it in your bag."
        );
        g.item("moonStone").setState("possession");
        g.list("inventory").add("moonStone");
      }
    );
  });

  interaction("Pick plant with heard-shaped leaves", g.always(), () => {
    g.onState(
      g.and(
        g.character("player").hasFlag("herbKnowledge"),
        g.item("plants").hasCounter("heartLeaves").lessThan(10)
      ),
      () => {
        g.text(
          "You bend over to pick a few of the plants with {b}heart-shaped leaves{/b}, and put them in your bag"
        );
        g.item("plants").setCounter("heartLeaves", 10);
        g.list("inventory").addUnique("heartLeaves");
      }
    )
      .else(g.character("player").hasFlag("herbKnowledge"), () => {
        g.character("player").say("Hmm, I have enough of those.");
      })
      .else(() => {
        g.text(
          "You bend over to pick the plant with {b}heart-shaped{/b} leaves.",
          "Just before you touch it, you stop.",
          "This plant could be {b}poisonous{/b}."
        );
      });
  });

  interaction("Stop looking at the plants", g.always(), () => {
    closeOverlay();
  });
});
