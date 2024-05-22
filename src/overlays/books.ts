import g from "../game";

g.defineOverlay("books", ({ onEnter, onLeave, closeOverlay, interaction }) => {
  onEnter(() => {
    g.text("There is a thick almanac called:", "");
    g.text(
      "{b}'100 things you always wanted to know about moss, herbs and toadstools, but never dared to ask'{/b}",
      ""
    );
    g.onState(g.overlay("recipeBook").hasFlag("open"), () => {
      g.text("And there is an opened book, called:", "");
    }).else(() => {
      g.text("And there is a closed book, called:", "");
    });
    g.text("{b}'Potion recipes 101. For starters to master witches'{/b}");
    g.onState(g.overlay("recipeBook").hasCounter("page").equals(1), () => {
      g.text('The recipe "{b}All healing medicinal potion{/b}" is visible.');
    })
      .else(g.overlay("recipeBook").hasCounter("page").equals(2), () => {
        g.text(
          'The recipe "{b}Waking up after a night of partying{/b}" is visible.'
        );
      })
      .else(g.overlay("recipeBook").hasCounter("page").equals(3), () => {
        g.text('The recipe "{b}Foreign languages translator{/b}" is visible.');
      })
      .else(g.overlay("recipeBook").hasCounter("page").equals(4), () => {
        g.text("The recipe \"{b}'Sticky' door{/b}\" is visible.");
      });

    g.text("", "Each book has some bookmarks.");
  });

  interaction("Read the almanac", g.always(), () => {
    g.overlay("ingredientBook").open();
  });

  interaction("Read the recipes", g.always(), () => {
    g.overlay("recipeBook").open();
  });

  interaction("Step away from the books", g.always(), () => {
    g.text("You step away from the books.");
    closeOverlay();
  });
});

g.defineOverlay(
  "recipeBook",
  ({
    onEnter,
    interaction,
    closeOverlay,
    hasCounter,
    increaseCounter,
    decreaseCounter,
    setCounter,
    setFlag,
    clearFlag,
  }) => {
    // TODO: Replace with 'scene'
    const recipePage = (pageNr: number) => {
      g.page(() => {
        if (pageNr === 0) {
          g.text("", "Page 1. -- Introduction --", "");
          g.text(
            "Did you buy the MagicCauldron 3000, but you are unaware of its abilities?",
            "Thanks to this book, creating a magic potion will be child's play.",
            "",
            "All recipes can be made like this:",
            // TODO: Format as bullet list?
            "  - Add all ingredients described in the recipe to the cauldron. The order of adding them does not matter.",
            "  - When all ingredients are added, raise both hands high into the air.",
            "  - Use a mysterious voice, and loudly say the spell that accompanies the recipe.",
            "  - If the recipe is successful, the cauldron will be filled with the magic potion.",
            "  - If the recipe is unsuccessful, the cauldron will be automatically cleaned and you can try again.",
            "  - You will need a runestone to reveal the ingredients of the 'masterwitch'-recipes."
          );
          g.text("", "Have fun!", "");
        }
        if (pageNr === 1) {
          g.text("", "Page 10. -- All healing medicinal potion --", "");
          g.text(
            "Cranky in the morning? Pimples? Are you a very sick king?",
            "This potion is not only fun to brew, it also helps against all ailments!",
            "",
            "Level: Intermediate",
            "",
            "Ingredients:",
            "  - 1 plant with round leaves",
            "  - 2 lightblue toadstools",
            "  - 4 plants with thorny leaves",
            "  - 1 tooth of a dragon",
            "",
            "Spell: &##%$#@",
            ""
          );
        }
        if (pageNr === 2) {
          g.text("", "Page 37. -- Waking up after a night of partying --", "");
          g.text(
            "Having been partying for too long? Can't get out of your bed? This potion will wake you up in no time!",
            "",
            "Level: Beginner",
            "",
            "Ingredients:",
            "  - 4 plants with heart-shaped leaves",
            "  - 2 light brown tree fungi",
            "  - 1 tuft of Starmoss",
            "  - 1 cup of red wine",
            "",
            "Spell: 'Adacadabra hastaclap'",
            ""
          );
        }
        if (pageNr === 3) {
          g.text("", "Page 85. -- Foreign languages translator --", "");
          g.text(
            "On vacation in Texas or Florida? Is someone speaking in three letter acronyms?",
            "Let the person drink this potion and you can understand them!",
            "",
            "Level: Masterwitch",
            "",
            "Ingredients:",
            "  - ????????????????",
            "  - ????????????????",
            "  - ????????????????",
            "  - ????????????????",
            "",
            "Spell: '??????????????'",
            "",
            "n.b. This potion will not help in understanding legal-speak in user agreements."
          );
        }
        if (pageNr === 4) {
          g.text("", "Page 114. -- 'Sticky' door --", "");
          g.text(
            "You know the problem. You have a cellar door that seems stuck. You don't even know if it was simply locked or not. You just want the door opened.",
            "",
            "Level: Beginner",
            "",
            "Ingredients:",
            "  - 4 plants with thorny leaves",
            "  - 1 light blue toadstool",
            "  - 2 orange fungi",
            "  - 3 tufts of Moonmoss",
            "",
            "Spell: 'Hocus Pilates!'",
            ""
          );
        }
      });
      if (pageNr === 1) {
        g.text(
          "Hmm, it looks like something was spilled over the spell. It is no longer readable.",
          "You also notice that the list of ingredients is slightly different than what you collected.",
          "Maybe {b}[characters.witch.name]{/b} knows the spell?"
        );
      }
      if (pageNr === 3) {
        g.text(
          "Hmm, I think I will need something to make this page readable."
        );
      }
    };

    onEnter(() => {
      g.text("You open the book with the {b}recipes{/b}.");
      g.onState(hasCounter("page").equals(0), () => {
        recipePage(0);
      });
      g.onState(hasCounter("page").equals(1), () => {
        recipePage(1);
      });
      g.onState(hasCounter("page").equals(2), () => {
        recipePage(2);
      });
      g.onState(hasCounter("page").equals(3), () => {
        recipePage(3);
      });
      g.onState(hasCounter("page").equals(4), () => {
        recipePage(4);
      });
    });

    interaction("Previous bookmark", hasCounter("page").moreThan(0), () => {
      decreaseCounter("page", 1);

      g.onState(hasCounter("page").equals(0), () => {
        recipePage(0);
      })
        .else(hasCounter("page").equals(1), () => {
          recipePage(1);
        })
        .else(hasCounter("page").equals(2), () => {
          recipePage(2);
        })
        .else(hasCounter("page").equals(3), () => {
          recipePage(3);
        });
    });

    interaction("Next bookmark", hasCounter("page").lessThan(4), () => {
      increaseCounter("page", 1);

      g.onState(hasCounter("page").equals(1), () => {
        recipePage(1);
      })
        .else(hasCounter("page").equals(2), () => {
          recipePage(2);
        })
        .else(hasCounter("page").equals(3), () => {
          recipePage(3);
        })
        .else(hasCounter("page").equals(4), () => {
          recipePage(4);
        });
    });

    interaction("Keep the book open on this page", g.always(), () => {
      g.text("You are at some books that are lying on a workbench.");
      setFlag("open");

      closeOverlay();
    });

    interaction("Close book", g.always(), () => {
      g.text("You close the book with recipes.");
      g.text("You are at some books that are lying on a workbench.");
      setCounter("page", 0);
      clearFlag("open");

      closeOverlay();
    });
  }
);

g.defineOverlay(
  "ingredientBook",
  ({
    onEnter,
    interaction,
    closeOverlay,
    hasCounter,
    increaseCounter,
    decreaseCounter,
  }) => {
    const almanacPage = (pageNr: number) => {
      g.page(() => {
        if (pageNr === 0) {
          g.text("", "Page 42. -- Plants and herbs. --", "");
          g.text(
            "Tip no. 30: Which plants and herbs are dangerous?",
            "",
            "Check if the plant has diamond shaped leaves. If the plant has these, they will be very poisonous and dangerous! {b}{i}Do not touch them!{/i}{/b}",
            "",
            "Location: Herbs and plands grow well in a {b}swamp environment{/b}.",
            ""
          );
        }

        if (pageNr === 1) {
          g.text("", "Page 1012. -- Toadstools and other fungi. --", "");
          g.text(
            "Tip no. 45: Which toadstools are dangerous?",
            "",
            "These fungi are dangerous:",
            "  - Red toadstools with white spots, {b}{u}don't pick{/u}{/b}! These can be houses of dangerous forest gnomes!",
            "  - Black toadstool",
            "",
            "These fungi are not dangerous:",
            "  - Orange fungi, they ensure good adhesion of ingredients",
            "  - Light brown tree fungi, {i}delicious{/i} on a cheese sandwich",
            "  - Light blue toadstools, have healing properties",
            "",
            "Location: Toadstools and fungi grow well in {b}dark woods{/b}.",
            ""
          );
        }
        if (pageNr === 2) {
          g.text("", "Page 6510. -- Moss and grasses. --", "");
          g.text(
            "Tip no. 72: Which moss is poisonous or dangerous?",
            "",
            "These types of moss are dangerous:",
            "  - Atmoss",
            "  - Thundermoss",
            "",
            "These types of moss are harmless:",
            "  - Starmoss",
            "  - Moonmoss",
            "  - Cosmoss",
            "",
            "Location: Moss grows well in {b}green forests{/b}.",
            ""
          );
        }
      });

      if (pageNr === 0) {
        g.onState(g.not(g.character("player").hasFlag("herbKnowledge")), () => {
          g.text(
            "Nice! You now know everything you need to know about herbs and plants!"
          );
          g.character("player").setFlag("herbKnowledge");
        });
      }
      if (pageNr === 1) {
        g.onState(
          g.not(g.character("player").hasFlag("fungiKnowledge")),
          () => {
            g.text("Great! Now you know everything about fungi!");
            g.character("player").setFlag("fungiKnowledge");
          }
        );
      }
      if (pageNr === 2) {
        g.onState(g.not(g.character("player").hasFlag("mossKnowledge")), () => {
          g.text("Awesome! Now you know everything about moss!");
          g.character("player").setFlag("mossKnowledge");
        });
      }
    };

    onEnter(() => {
      g.text("You open the large almanac.");
      g.onState(hasCounter("page").equals(0), () => {
        almanacPage(0);
      });
    });

    interaction("Previous bookmark", hasCounter("page").moreThan(0), () => {
      decreaseCounter("page", 1);

      g.onState(hasCounter("page").equals(0), () => {
        almanacPage(0);
      }).else(hasCounter("page").equals(1), () => {
        almanacPage(1);
      });
    });

    interaction("Next bookmark", hasCounter("page").lessThan(2), () => {
      increaseCounter("page", 1);

      g.onState(hasCounter("page").equals(1), () => {
        almanacPage(1);
      }).else(hasCounter("page").equals(2), () => {
        almanacPage(2);
      });
    });

    interaction("Close book", g.always(), () => {
      g.text("You are at some books that are lying on a workbench.");
      closeOverlay();
    });
  }
);
