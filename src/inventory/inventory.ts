import g from "../game";

g.defineOverlay("inventory", ({ onEnter, interaction, closeOverlay }) => {
  onEnter(() => {
    g.descriptionText("You carry the following items:");

    g.list("inventory").display(({ onItem }) => {
      onItem("coins", () => {
        g.onState(g.character("player").hasCounter("coins").equals(1), () => {
          g.descriptionText("- [characters.player.counters.coins] coin");
        }).else(() => {
          g.descriptionText("- [characters.player.counters.coins] coins");
        });
      });
      onItem("branch", () => {
        g.descriptionText("- A branch, picked up in the forest");
      });
      onItem("rope", () => {
        g.descriptionText("- A long rope");
      });
      onItem("brokenPickaxe", () => {
        g.descriptionText("- A pickaxe with a broken hilt");
      });
      onItem("repairedPickaxe", () => {
        g.descriptionText("- A fixed pickaxe");
      });
      onItem("cookies", () => {
        g.descriptionText("- Delicious cookies");
      });
      onItem("necklace", () => {
        g.descriptionText("- A beautiful necklace");
      });
      onItem("gem", () => {
        g.descriptionText("- A sparkling gemstone");
      });
      onItem("gold", () => {
        g.descriptionText("- Pieces of gold");
      });
      onItem("runeStone", () => {
        g.descriptionText("- A runestone with inscriptions");
      });
      onItem("moonStone", () => {
        g.onState(g.isLocation("river"), () => {
          g.descriptionText("- Moonstone, it seems to glow lightly");
        }).else(() => {
          g.descriptionText("- Moonstone, it looks dim");
        });
      });
      onItem("fabric", () => {
        g.descriptionText("- A giant trunk, probably of a giant");
      });
      onItem("treasureNotes", () => {
        g.descriptionText("- Notes on treasure");
      });
      onItem("ingredientList", () => {
        g.descriptionText("- Ingredient list for medicine");
      });
      onItem("thornyLeaves", () => {
        g.onState(
          g.item("plants").hasCounter("thornyLeaves").moreThan(1),
          () => {
            g.descriptionText(
              "- [items.plants.counters.thornyLeaves] plants with thorny leaves"
            );
          }
        ).else(() => {
          g.descriptionText("- 1 plant with thorny leaves");
        });
      });

      onItem("roundLeaves", () => {
        g.onState(
          g.item("plants").hasCounter("roundLeaves").moreThan(1),
          () => {
            g.descriptionText(
              "- [items.plants.counters.roundLeaves] plants with round leaves"
            );
          }
        ).else(() => {
          g.descriptionText("- 1 plant with round leaves");
        });
      });

      onItem("lightblueMushrooms", () => {
        g.onState(
          g.item("mushrooms").hasCounter("lightblue").moreThan(1),
          () => {
            g.descriptionText(
              "- [items.mushrooms.counters.lightblue] lightblue mushrooms"
            );
          }
        ).else(() => {
          g.descriptionText("- 1 lightblue mushroom");
        });
      });

      onItem("sword", () => {
        g.descriptionText("- A nice sharp sword");
      });
    });
  });

  interaction(
    "Repair the pickaxe with the branch from the forest",
    g.and(
      g.item("branch").hasState("possession"),
      g.item("pickaxe").hasState("broken")
    ),
    () => {
      g.text(
        "You remove the old hilt of the pickaxe,",
        "and replace the hilt with the branch from the forest."
      );
      g.text("It fits! The pickaxe is as good as new.");
      g.item("branch").setState("used");
      g.item("pickaxe").setState("fixed");
      g.list("inventory").remove("branch");
      g.list("inventory").remove("brokenPickaxe");
      g.list("inventory").add("repairedPickaxe");
    }
  );

  interaction(
    "Check notes on treasure",
    g.list("inventory").isInList("treasureNotes"),
    () => {
      g.openOverlay("treasureNotes");
    }
  );

  interaction(
    "Check list of ingredients",
    g.item("ingredientList").hasState("possession"),
    () => {
      g.openOverlay("ingredientList");
    }
  );

  interaction("Eat cookies", g.item("cookies").hasState("possession"), () => {
    g.text(
      "The cookies smell delicious, but you decide to keep them for later."
    );
  });

  interaction(
    "Tie rope to millstone",
    g.and(
      g.isLocation("towerTopElevator"),
      g.item("millstone").hasState("elevator"),
      g.item("elevator").hasState("unknown"),
      g.item("rope").hasState("possession")
    ),
    () => {
      g.text(
        "You tie the rope firmly to the {b}millstone{/b}, and toss the other end into the room."
      );
      g.item("rope").setState("tying");
      g.item("rope").setFlag("tiedElevator");
      g.list("inventory").remove("rope");
    }
  );

  interaction(
    "Tie rope to dragon's tooth",
    g.and(
      g.isLocation("towerTop"),
      g.item("millstone").hasState("elevator"),
      g.item("elevator").hasState("unknown"),
      g.item("rope").hasState("possession")
    ),
    () => {
      g.text(
        "The dragon has his eyes closed from the pain. You quietly get closer.",
        "When you reach the dragon, you silently but firmly tie the rope around its {b}aching tooth{/b}.",
        "You toss the other end of the rope towards the elevator."
      );
      g.item("rope").setState("tying");
      g.item("rope").setFlag("tiedTooth");
      g.list("inventory").remove("rope");
    }
  );

  interaction(
    "Wait for darkness",
    g.and(
      g.isLocation("river"),
      g.item("moonStone").hasState("possession"),
      g.item("treasureNotes").hasFlag("startPoint"),
      g.not(g.item("treasureHunt").hasFlag("done"))
    ),
    () => {
      g.item("treasureHunt").setFlag("active");
      g.location("treasureRoute").setCounter("steps", 0);
      closeOverlay();
      g.text(
        "You are patiently sitting at the bank of the river, waiting for darkness.",
        "The darker it gets, the more the moonstone starts to {b}glow{/b}."
      );
      g.onState(g.character("horse").hasState("following"), () => {
        g.character("player").say(
          "{b}[characters.horse.name]{/b} will you wait here for me?"
        );
        g.text(
          "{b}[characters.horse.name]{/b} goes to the waterfront to drink some water."
        );
        g.character("horse").setState("river");
      });
    }
  );

  interaction("Close your bag", g.always(), () => {
    closeOverlay();
  });
});

g.globalInteraction(
  "Open your bag",
  "b",
  g.and(
    g.item("bag").hasState("possession"),
    g.not(g.isOverlayOpen()),
    g.not(g.item("treasureHunt").hasFlag("active"))
  ),
  () => {
    g.openOverlay("inventory");
  }
);
