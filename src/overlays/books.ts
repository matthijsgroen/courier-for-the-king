import g from "../game";

g.defineOverlay("books", ({ onEnter, onLeave, closeOverlay, interaction }) => {
  onEnter(() => {
    g.text("There is a thick almanac called:", "");
    g.text(
      "{b}'100 things you always wanted to know about moss, herbs and toadstools, but never dared to ask'{/b}",
      ""
    );
    g.text("And there is an opened book, called:", "");
    g.text("{b}'Potion recipes 101. For starters to master witches'{/b}", "");
    g.text("Each book has some bookmarks.");

    //
    // "2=0;1=12;12=3;4=0;6=2", "*c2", "Je bent bij aantal boeken die op de werktafel liggen."
    // "Er ligt een dikke almanak genaamd:", "&"
    // "2=0;1=12;12=3;4=2;6=0", "*c2", "Je loopt naar een aantal boeken die op de werktafel liggen."
    // "Er ligt een dikke almanak genaamd:", "&6=2;4=0"
    // "2=0;1=12;12=3;4=0;6=2", "", "*c6"
    // "  '100 dingen die je altijd al wilde weten over mossen, kruiden en paddenstoelen, maar nooit durfde te vragen'", ""
    // "*c2", "en een opengeslagen boek, genaamd:", "*c6", ""
    // "  'Toverdrankrecepten 101. Voor beginners tot meesterheksen'"
    // "*c2", "", "In elk boek zijn boekenleggers gestoken."
    // "&20=0"
  });

  onLeave(() => {});

  interaction("Read the almanac", g.always(), () => {
    g.openOverlay("ingredientBook");
  });

  interaction("Read the recipes", g.always(), () => {
    g.openOverlay("recipeBook");
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
  }) => {
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
            "  - 1 tuft of star moss",
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
          // "2=0;1=12;12=3;6=4;4=0;51=4", "*c6", "Bladzijde 114. -- De deur 'klemt' --"
          // "", "Je kent het wel. Je kelderdeur klemt ontzettend. Je weet niet eens of hij nu op slot zat of niet. Je wil gewoon die deur openkrijgen.", ""
          // "Niveau: Beginner", ""
          // "Benodigdheden:"
          // "  - 4 planten met stekelige bladeren"
          // "  - 1 lichtblauwe paddenstoel"
          // "  - 2 oranje zwammen"
          // "  - 3 plukken Maanmos"
          // "", "Spreuk: 'Hocus pilates!'"
          // "&50=4"
          g.text("", "Page 114. -- 'sticky' door --", "");
          g.text(
            "You know the problem. You have a cellardoor that seems stuck. You don't even know if it was simply locked or not. You just want the door opened.",
            "",
            "Level: Beginner",
            "",
            "Ingredients:",
            "  - 4 plants with thorny leaves",
            "  - 1 light blue toadstool",
            "  - 2 orange fungi",
            "  - 3 tufts of Moon moss",
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

    interaction("Close book", g.always(), () => {
      g.text("You close the book with recipes.");
      g.text("You are at some books that are lying on a workbench.");
      setCounter("page", 0);

      closeOverlay();
    });
  }
);

g.defineOverlay("ingredientBook", ({ onEnter, interaction, closeOverlay }) => {
  onEnter(() => {
    g.text("stuff -- almanac");
  });

  interaction("close book", g.always(), () => {
    g.text("You are at some books that are lying on a workbench.");
    closeOverlay();
  });
});
