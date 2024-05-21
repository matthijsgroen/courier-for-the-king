import g from "../game";

g.defineScene("cauldronResult", () => {
  const c = g.overlay("cauldron");
  g.onState(c.hasFlag("hasIngredients"), () => {
    // When failed:
    c.setCounter("failureOutcome", 1, 3);
    g.text("Failed state: [overlays.cauldron.counters.failureOutcome]");

    // Show failed cases
    g.onState(c.hasCounter("failureOutcome").equals(1), () => {
      // "2=0;1=12;12=3;6=1;59=2", "*c2"
      // "Het water in de ketel gaat dansen. Buiten lijken ineens allerlei wolken zich samen te pakken."
      // "Het begint ineens erg hard te bliksemen buiten."
      // "Je voelt je raar. Je bent iets kleiner en je botten lijken pijn te doen.", ""
      // "&"
      // "2=0;1=12;12=3;6=1;59=2;0=1", "Als je in de spiegel kijkt, zie je dat je veranderd bent in een hele oude man.", "&"
      // "2=0;1=12;12=3;6=1;59=2;0=2", "Als je in de spiegel kijkt, zie je dat je veranderd bent in een hele oude vrouw.", "&"
      // "2=0;1=12;12=3;6=1;59=2"
      // "Oh nee, je bent ineens heel erg oud geworden!"
      // "*c7", "", "...Tien minuten later...", "", "*s3", "*c2", "Je voelt jezelf ineens weer jonger worden."
      // "Oef, je hebt geluk!", "&"

      g.text("The cauldron makes a hissing sound.");
    })
      .else(c.hasCounter("failureOutcome").equals(2), () => {
        g.text(
          "The cauldron starts to boil. Small eddies are appearing in the cauldron.",
          "The liquid starts to dance. Everything around you appears to be swirling.",
          "You close your eyes. The swirling stopped, but you are {b}freezing{/b}.",
          "You open your eyes.",
          "",
          "Everywhere around you is ice and snow. In the distance you see penguins walking."
        );
        g.character("player").say("Where... ...am I?");
        // TODO: Change text color here
        g.text("{i}... Ten minutes later ...{/i}", "");
        // TODO: Add some delay here

        g.text(
          "You are suddenly back in the cabin.",
          "Oof! You got lucky!",
          ""
        );
      })
      .else(c.hasCounter("failureOutcome").equals(3), () => {
        g.text(
          "The cauldron starts to boil. The liquid starts to shift colors rapidly.",
          "Beams of light in different colors start to shoot out of the cauldron.",
          "You feel weird. You get the urge to say something."
        );
        g.character("player").say("Bââââh");
        g.text("You walk towards the mirror.");
        g.text("Oh no! You've changed into {b}a goat{/b}!");
        // TODO: Change text color here
        g.text("{i}... Ten minutes later ...{/i}", "");
        // TODO: Add some delay here
        g.text("You changed back again!", "Oof! You got lucky!", "");
      })
      .else(c.hasCounter("failureOutcome").equals(4), () => {
        g.text("The cauldron starts to boil. Colors are shifting ever faster.");
        g.text("Purple fumes starts to emerge from the liquid.");
        g.text(
          "Everything around you suddenly starts to become bigger and bigger."
        );
        g.character("player").say("Oh no! I'm shrinking!");
        g.text(
          "You try to climb on the workbench to reach the cauldron, but the legs of the table are to smooth for climbing."
        );
        // TODO: Change text color here
        g.text("", "{i}... Ten minutes later ...{/i}", "");
        // TODO: Add some delay here
        g.text("You are growing again!", "Oof! You got lucky!", "");
      });

    g.text(
      "The cauldron has reset its contents, so you can brew something new again."
    );

    // Reset cauldron
    // reset special ingredients
    c.setState("unknown");
    c.clearFlag("hasIngredients");
    // plants
    c.setCounter("roundLeaves", 0);
    c.setCounter("thornyLeaves", 0);
    c.setCounter("heartLeaves", 0);
    // fungi
    c.setCounter("lightBrownFungi", 0);
    c.setCounter("orangeFungi", 0);
    c.setCounter("lightBlueMushrooms", 0);
    // mosses
    c.setCounter("cosmoss", 0);
    c.setCounter("moonmoss", 0);
    c.setCounter("starmoss", 0);
  }).else(() => {
    g.text("Nothing happens...", "Maybe you need to add some ingredients?");
    c.setState("unknown");
  });
});

g.defineScene("cauldronEffect", () => {
  const { setFlag, setCounter, hasCounter } = g.overlay("cauldron");
  setFlag("hasIngredients");
  setCounter("addIngredientEffect", 0, 4);

  g.onState(hasCounter("addIngredientEffect").equals(0), () => {
    g.text("The cauldron makes a hissing sound.");
  })
    .else(hasCounter("addIngredientEffect").equals(1), () => {
      g.text("The cauldron shifts in color a bit.");
    })
    .else(hasCounter("addIngredientEffect").equals(2), () => {
      g.text("The liquid in the cauldron stirs for a short while.");
    })
    .else(hasCounter("addIngredientEffect").equals(3), () => {
      g.text("Bubbles are appearing all around, and then disappear again.");
    })
    .else(hasCounter("addIngredientEffect").equals(4), () => {
      g.text("Ugh, that produced a really funky smell.");
    });
});

g.defineOverlay(
  "cauldron",
  ({
    onEnter,
    interaction,
    closeOverlay,
    hasFlag,
    hasState,
    setState,
    setCounter,
    increaseCounter,
    setPrompt,
  }) => {
    setPrompt(
      "What will you say:",
      g.or(
        hasState("saySpell"),
        hasState("sayAbra"),
        hasState("sayHocus"),
        hasState("saySimSala")
      )
    );

    setPrompt("What will you add:", hasState("addIngredient"));

    onEnter(() => {
      g.text("You walk to the cauldron in the center of the cabin.", "");

      g.onState(hasFlag("hasIngredients"), () => {
        g.text(
          "The potion in the cauldron is dull, but constantly shifting in hue.",
          "There is clearly some sort of brew in here."
        );
      }).else(() => {
        g.text(
          "The potion in the cauldron is clear and transparent.",
          "The cauldron looks ready for some brewing."
        );
      });
    });

    interaction("Add ingredient", hasState("unknown"), () => {
      g.text(
        "You are standing at the large {b}cauldron{/b}, and you open your bag."
      );

      g.onState(g.overlay("recipeBook").hasFlag("open"), () => {
        g.text(
          "From the corner of your eye you can still peek into the {b}recipe book{/b} on the workbench."
        );

        const page = g.overlay("recipeBook").hasCounter("page");

        g.onState(page.equals(0), () => {
          // Intro page
          g.character("player").say(
            "Hmm, the book is open on its introduction page, that won't help me with adding ingredients."
          );
        })
          .else(page.equals(1), () => {
            g.text(
              "  - 1 plant with round leaves",
              "  - 2 lightblue toadstools",
              "  - 4 plants with thorny leaves",
              "  - 1 tooth of a dragon"
            );
          })
          .else(page.equals(2), () => {
            g.text(
              "  - 4 plants with heart-shaped leaves",
              "  - 2 light brown tree fungi",
              "  - 1 tuft of Starmoss",
              "  - 1 cup of red wine",
              "",
              "Spell: 'Adacadabra hastaclap'"
            );
          })
          .else(page.equals(3), () => {
            g.text(
              "  - ????????????????",
              "  - ????????????????",
              "  - ????????????????",
              "  - ????????????????",
              "",
              "Spell: '??????????????'"
            );
          })
          .else(page.equals(4), () => {
            g.text(
              "  - 4 plants with thorny leaves",
              "  - 1 light blue toadstool",
              "  - 2 orange fungi",
              "  - 3 tufts of Moonmoss",
              "",
              "Spell: 'Hocus Pilates!'"
            );
          });
      });
      setState("addIngredient");
    });

    // "2=3;51=1", "*c2", "Vanuit een ooghoek gluur je naar het receptenboek:", "", "*c6"
    // "  - 1 plant met ronde bladeren"
    // "  - 2 lichtblauwe paddenstoelen"
    // "  - 4 planten met stekelige bladeren"
    // "  - 1 tand van een draak"
    // "&"

    // "2=3;51=4", "*c2", "Vanuit een ooghoek gluur je naar het receptenboek:", "", "*c6"
    // "Benodigdheden:"
    // "  - 4 planten met stekelige bladeren"
    // "  - 1 lichtblauwe paddenstoel"
    // "  - 2 oranje zwammen"
    // "  - 3 plukken Maanmos"
    // "", "Spreuk: 'Hocus pilates!'"
    // "&"

    // "2=3;51=2", "*c2", "Vanuit een ooghoek gluur je naar het receptenboek:", "", "*c6"
    // "Benodigdheden:"
    // "  - 4 planten met hartvormige bladeren"
    // "  - 2 lichtbruine boomzwammen"
    // "  - 1 pluk Sterrenmos"
    // "  - 1 beker rode wijn"
    // "", "Spreuk: 'Abracadabra hastaklap'"
    // "&"

    // "2=3;51=3;38!2", "*c2", "Vanuit een ooghoek gluur je naar het receptenboek:", "", "*c6"
    // "Benodigdheden:"
    // "  - ??????????"
    // "  - ??????????"
    // "  - ??????????"
    // "  - ??????????"
    // "", "Spreuk: ??????????"
    // "&"

    // "2=3;51=3;38=2", "*c2", "Vanuit een ooghoek gluur je naar het receptenboek:", "", "*c6"
    // "Benodigdheden:"
    // "  - 1 plant met hartvormige bladeren"
    // "  - 1 pluk Maanmos"
    // "  - 2 plukken Sterrenmos"
    // "  - 1 Maansteen"
    // "", "Spreuk: 'Sim sala baklava!'"
    // "&"

    interaction(
      "Plant with round leaves ([items.plants.counters.roundLeaves] left)",
      g.and(
        hasState("addIngredient"),
        g.item("plants").hasCounter("roundLeaves").moreThan(0)
      ),
      () => {
        g.text("You add a plant with round leaves to the cauldron.");
        g.playScene("cauldronEffect");

        increaseCounter("roundLeaves");
        g.item("plants").decreaseCounter("roundLeaves");
        g.onState(g.item("plants").hasCounter("roundLeaves").equals(0), () => {
          g.list("inventory").remove("roundLeaves");
        });
      }
    );

    interaction(
      "Plant with thorny leaves ([items.plants.counters.thornyLeaves] left)",
      g.and(
        hasState("addIngredient"),
        g.item("plants").hasCounter("thornyLeaves").moreThan(0)
      ),
      () => {
        g.text("You add a plant with thorny leaves to the cauldron.");
        g.playScene("cauldronEffect");

        increaseCounter("thornyLeaves");
        g.item("plants").decreaseCounter("thornyLeaves");
        g.onState(g.item("plants").hasCounter("thornyLeaves").equals(0), () => {
          g.list("inventory").remove("thornyLeaves");
        });
      }
    );

    interaction(
      "Plant with heart-shaped leaves ([items.plants.counters.heartLeaves] left)",
      g.and(
        hasState("addIngredient"),
        g.item("plants").hasCounter("heartLeaves").moreThan(0)
      ),
      () => {
        g.text("You add a plant with heart-shaped leaves to the cauldron.");
        g.playScene("cauldronEffect");

        increaseCounter("heartLeaves");
        g.item("plants").decreaseCounter("heartLeaves");
        g.onState(g.item("plants").hasCounter("heartLeaves").equals(0), () => {
          g.list("inventory").remove("heartLeaves");
        });
      }
    );

    interaction(
      "Tuft of Starmoss ([items.moss.counters.starmoss] left)",
      g.and(
        hasState("addIngredient"),
        g.item("moss").hasCounter("starmoss").moreThan(0)
      ),
      () => {
        g.text("You drop a tuft of Starmoss into the cauldron.");
        g.playScene("cauldronEffect");

        increaseCounter("starmoss");
        g.item("moss").decreaseCounter("starmoss");
        g.onState(g.item("moss").hasCounter("starmoss").equals(0), () => {
          g.list("inventory").remove("starmoss");
        });
      }
    );

    interaction(
      "Tuft of Moonmoss ([items.moss.counters.moonmoss] left)",
      g.and(
        hasState("addIngredient"),
        g.item("moss").hasCounter("moonmoss").moreThan(0)
      ),
      () => {
        g.text("You drop a tuft of Moonmoss into the cauldron.");
        g.playScene("cauldronEffect");

        increaseCounter("moonmoss");
        g.item("moss").decreaseCounter("moonmoss");
        g.onState(g.item("moss").hasCounter("moonmoss").equals(0), () => {
          g.list("inventory").remove("moonmoss");
        });
      }
    );

    interaction(
      "Tuft of Cosmoss ([items.moss.counters.cosmoss] left)",
      g.and(
        hasState("addIngredient"),
        g.item("moss").hasCounter("cosmoss").moreThan(0)
      ),
      () => {
        g.text("You drop a tuft of Cosmoss into the cauldron.");
        g.playScene("cauldronEffect");

        increaseCounter("cosmoss");
        g.item("moss").decreaseCounter("cosmoss");
        g.onState(g.item("moss").hasCounter("cosmoss").equals(0), () => {
          g.list("inventory").remove("cosmoss");
        });
      }
    );

    interaction(
      "Light blue toadstool ([items.mushrooms.counters.lightblue] left)",
      g.and(
        hasState("addIngredient"),
        g.item("mushrooms").hasCounter("lightblue").moreThan(0)
      ),
      () => {
        g.text("You add a light blue toadstool to the cauldron.");
        g.playScene("cauldronEffect");

        increaseCounter("lightBlueMushrooms");
        g.item("mushrooms").decreaseCounter("lightblue");
        g.onState(g.item("mushrooms").hasCounter("lightblue").equals(0), () => {
          g.list("inventory").remove("lightblueMushrooms");
        });
      }
    );

    interaction(
      "Orange fungus ([items.mushrooms.counters.orange] left)",
      g.and(
        hasState("addIngredient"),
        g.item("mushrooms").hasCounter("orange").moreThan(0)
      ),
      () => {
        g.text("You add a orange fungus to the cauldron.");
        g.playScene("cauldronEffect");

        increaseCounter("orangeFungi");
        g.item("mushrooms").decreaseCounter("orange");
        g.onState(g.item("mushrooms").hasCounter("orange").equals(0), () => {
          g.list("inventory").remove("orangeFungi");
        });
      }
    );

    interaction(
      "Light brown tree fungus ([items.mushrooms.counters.brown] left)",
      g.and(
        hasState("addIngredient"),
        g.item("mushrooms").hasCounter("brown").moreThan(0)
      ),
      () => {
        g.text("You add a light brown tree fungus to the cauldron.");
        g.playScene("cauldronEffect");

        increaseCounter("lightBrownFungi");
        g.item("mushrooms").decreaseCounter("brown");
        g.onState(g.item("mushrooms").hasCounter("brown").equals(0), () => {
          g.list("inventory").remove("lightBrownFungi");
        });
      }
    );

    // "2=3;4=1", "*c2", "Je voegt een plant met ronde bladeren toe aan de ketel", "", "&40-1;60+1;59=1"
    // "2=3;4=2", "*c2", "Je voegt een plant met stekelige bladeren toe aan de ketel", "", "&41-1;61+1;59=1"
    // "2=3;4=3", "*c2", "Je voegt een plant met hartvormige bladeren toe aan de ketel", "", "&57-1;67+1;59=1"
    // "2=3;4=4", "*c2", "Je voegt een pluk Sterrenmos toe aan de ketel", "", "&64-1;70+1;59=1"
    // "2=3;4=5", "*c2", "Je voegt een pluk Maanmos toe aan de ketel", "", "&65-1;71+1;59=1"
    // "2=3;4=6", "*c2", "Je voegt een pluk Kosmos toe aan de ketel", "", "&66-1;72+1;59=1"

    // "2=3;4=7", "*c2", "Je voegt een lichtblauwe paddenstoel toe aan de ketel", "", "&42-1;62+1;59=1"
    // "2=3;4=8", "*c2", "Je voegt een oranje zwam toe aan de ketel", "", "&58-1;68+1;59=1"
    // "2=3;4=9", "*c2", "Je voegt een lichtbruine boomzwam toe aan de ketel", "", "&63-1;69+1;59=1"

    // "2=3;4=10", "*c2", "Je voegt de maansteen toe aan de ketel", "", "&36=3;59=1"
    // "2=3;4=11", "*c2", "Je voegt een beker wijn toe aan de ketel", "", "&48=3;59=1"
    // "2=3;4=12", "*c2", "Je voegt de tand van de draak toe aan de ketel", "", "&45=4;59=1"

    // "2=3;40>0", "Plant met ronde bladeren (nog #40)", "4=1"
    // "2=3;41>0", "Plant met stekelige bladeren (nog #41)", "4=2"
    // "2=3;57>0", "Plant met hartvormige bladeren (nog #57)", "4=3"
    // "2=3;64>0", "Pluk sterrenmos (nog #64)", "4=4"
    // "2=3;65>0", "Pluk maanmos (nog #65)", "4=5"
    // "2=3;66>0", "Pluk kosmos (nog #66)", "4=6"

    // "2=3;42>0", "Lichtblauwe paddenstoel (nog #42)", "4=7"
    // "2=3;58>0", "Oranje zwam (nog #58)", "4=8"
    // "2=3;63>0", "Lichtbruine boomzwam (nog #63)", "4=9"
    // "2=3;36=2", "Maansteen", "4=10"
    // "2=3;48=2", "Wijn", "4=11"
    // "2=3;45=2", "Tand van de draak", "4=12"

    interaction("Enough ingredients for now", hasState("addIngredient"), () => {
      g.text("You decide to stop adding ingredients for now.", "");
      g.onState(hasFlag("hasIngredients"), () => {
        g.text(
          "The potion in the cauldron is dull, but constantly shifting in hue.",
          "There is clearly some sort of brew in here."
        );
      }).else(() => {
        g.text(
          "The potion in the cauldron is clear and transparent.",
          "The cauldron looks ready for some brewing."
        );
      });
      setState("unknown");
    });

    interaction("Say spell", hasState("unknown"), () => {
      g.text("You raise your arms high into the sky...");
      g.text("...and you clear your throat.");
      setState("saySpell");
    });

    interaction("Sim sala...", hasState("saySpell"), () => {
      g.character("player").say("Sim sala...");
      setState("saySimSala");
    });

    interaction("...Bim!", hasState("saySimSala"), () => {
      g.character("player").say("...Bim!");
      setCounter("spellPart2", 1);
      // cauldronResult();
      g.playScene("cauldronResult");
    });

    interaction("...Bam!", hasState("saySimSala"), () => {
      g.character("player").say("...Bam!");
      setCounter("spellPart2", 2);
      // cauldronResult();
      g.playScene("cauldronResult");
    });
    // ' Sim sala...
    // "2=0;1=12;12=3;6=1;4=3;50>3;47=0", "Zeg: `...baklava!'", "4=6"

    interaction("...Bom!", hasState("saySimSala"), () => {
      g.character("player").say("...Bom!");
      setCounter("spellPart2", 3);
      // cauldronResult();
      g.playScene("cauldronResult");
    });

    interaction("Hocus...", hasState("saySpell"), () => {
      g.character("player").say("Hocus...");
      setState("sayHocus");
    });

    interaction("...Pocus!", hasState("sayHocus"), () => {
      g.character("player").say("...Pocus!");
      setCounter("spellPart2", 1);
      // cauldronResult();
      g.playScene("cauldronResult");
    });

    interaction("...Poof!", hasState("sayHocus"), () => {
      g.character("player").say("...Poof!");
      setCounter("spellPart2", 2);
      // cauldronResult();
      g.playScene("cauldronResult");
    });

    // "2=0;1=12;12=3;6=1;4=3;50>3;47=0", "Zeg: `...pilates!'", "4=6"

    interaction("...Crocus!", hasState("sayHocus"), () => {
      g.character("player").say("...Crocus!");
      setCounter("spellPart2", 3);
      // cauldronResult();
      g.playScene("cauldronResult");
    });

    interaction("Abracadabra...", hasState("saySpell"), () => {
      g.character("player").say("Abracadabra...");
      setState("sayAbra");
    });

    interaction("...Poof!", hasState("sayAbra"), () => {
      g.character("player").say("...Poof!");
      setCounter("spellPart2", 1);
      // cauldronResult();
      g.playScene("cauldronResult");
    });

    interaction("...Pop!", hasState("sayAbra"), () => {
      g.character("player").say("...Pop!");
      setCounter("spellPart2", 2);
      // cauldronResult();
      g.playScene("cauldronResult");
    });

    interaction("...Clang!", hasState("sayAbra"), () => {
      g.character("player").say("...Clang!");
      setCounter("spellPart2", 2);
      // cauldronResult();
      g.playScene("cauldronResult");
    });

    // "2=0;1=12;12=3;6=1;4=4;50>3;26<6", "Zeg: `...hastaklap!'", "4=7"

    interaction("...Hodgepodge!", hasState("sayAbra"), () => {
      g.character("player").say("...Hodgepodge!");
      setCounter("spellPart2", 3);
      // cauldronResult();
      g.playScene("cauldronResult");
    });

    // "2=0;1=12;12=3;4=0;6=1;59=0", "*c2", "De drank in de ketel heeft een heldere doorzichtige kleur.", ""
    // "Het lijkt erop alsof de ketel klaar is om een drankje in te brouwen.", "&"

    // "2=0;1=12;12=3;4=0;6=1;59=1", "*c2", "De drank in de ketel heeft een doffe kleur, die van tint wisselt.", ""
    // "Er zit duidelijk een brouwsel in.", "&"

    // ' Oplosdrank
    // "2=0;1=12;12=3;4=6;6=1;59=1;61=4;62=1;68=2;71=3", "*c2"
    // "De ketel begint te borrelen. Er ontstaan kleine draaikolken in de ketel."
    // "Opeens wordt het rustig en verandert de kleur van de vloeistof in helder blauw."
    // "Je pakt een flesje van een schap en vult het met de inhoud van de ketel."
    // ""
    // "Je hebt net het flesje vol en dan zie je ineens de hele ketel weer verkleuren naar helder doorzichtig."
    // "Je plakt er maar het labeltje 'deur klemt' op."
    // "&47=1;59=10"

    // ' Wakker wordt drank
    // "2=0;1=12;12=3;4=7;6=1;59=1;67=4;69=2;70=1;48=3", "*c2"
    // "De drank in de ketel verschiet snel van kleur. In de ketel begint een grote draaikolk te ontstaan."
    // "Stralen vloeistof beginnen als fonteinen omhoog te schieten."
    // "Ineens wordt de drank rustig en krijgt een roze kleur."
    // "Je pakt een flesje van een schap en vult het met de inhoud van de ketel."
    // ""
    // "Je hebt net het flesje vol en dan zie je ineens de hele ketel weer verkleuren naar helder doorzichtig."
    // "Je plakt er maar het labeltje 'wakker worden' op."
    // "&26=6;59=10"

    // ' Praat drank
    // "2=0;1=12;12=3;4=8;6=1;59=1;36=3;70=2;67=1;71=1", "*c2"
    // "Het water in de ketel gaat dansen. Buiten lijken ineens allerlei wolken zich samen te pakken."
    // "Het begint ineens erg hard te regenen buiten."
    // "Opeens klaart het weer op en verandert de kleur van de vloeistof in helder geel."
    // "Je pakt een flesje van een schap en vult het met de inhoud van de ketel."
    // ""
    // "Je hebt net het flesje vol en dan zie je ineens de hele ketel weer verkleuren naar helder doorzichtig."
    // "Je plakt er maar het labeltje 'vertaler' op."
    // "&33=4;59=10;36=5"

    // ' Medicijn
    // "2=0;1=12;12=3;4=9;6=1;59=1;60=1;62=2;61=4;45=4", "*c2"
    // "Het water in de ketel bruist! Er komen ineens allemaal rare geluiden uit de ketel. Het lijkt wel muziek!"
    // "Opeens wordt het stil en verandert de kleur van de vloeistof in helder paars."
    // "Je pakt een flesje van een schap en vult het met de inhoud van de ketel."
    // ""
    // "Je hebt net het flesje vol en dan zie je ineens de hele ketel weer verkleuren naar helder doorzichtig."
    // "Je plakt er het labeltje 'medicijn' op."
    // "&45=5;59=10;26=9"

    // ' Mislukt!
    // "2=0;1=12;12=3;4>4;4<10;6=1;59=1", "&59r4;59+1"

    // ' Ketel reset
    // "2=0;1=12;12=3;4>4;4<10;6=1;59>0", "&60=0;61=0;67=0;70=0;71=0;72=0;68=0;62=0;69=0"
    // "59=10", "&59=0;4=0;6=0;20=1"

    // "2=0;1=12;12=3;6=1;59=2", "*c2"
    // "Het water in de ketel gaat dansen. Buiten lijken ineens allerlei wolken zich samen te pakken."
    // "Het begint ineens erg hard te bliksemen buiten."
    // "Je voelt je raar. Je bent iets kleiner en je botten lijken pijn te doen.", ""
    // "&"
    // "2=0;1=12;12=3;6=1;59=2;0=1", "Als je in de spiegel kijkt, zie je dat je veranderd bent in een hele oude man.", "&"
    // "2=0;1=12;12=3;6=1;59=2;0=2", "Als je in de spiegel kijkt, zie je dat je veranderd bent in een hele oude vrouw.", "&"
    // "2=0;1=12;12=3;6=1;59=2"
    // "Oh nee, je bent ineens heel erg oud geworden!"
    // "*c7", "", "...Tien minuten later...", "", "*s3", "*c2", "Je voelt jezelf ineens weer jonger worden."
    // "Oef, je hebt geluk!", "&"

    // "2=0;1=12;12=3;6=1;59=3", "*c2"
    // "De ketel begint te borrelen. Er ontstaan kleine draaikolken in de ketel."
    // "Het water lijkt te gaan dansen. Alles om je heen lijkt te draaien."
    // "Je doet je ogen dicht. Opeens lijkt het draaien te stoppen, maar heb je het heel erg koud."
    // "Je doet je ogen weer open."
    // "", "Overal om je heen zie je sneeuw en ijs. Op enige afstand lopen pinguïns."
    // "Waar ben je nu weer beland?"
    // "*c7", "", "...Tien minuten later...", "", "*s3", "*c2", "Je staat ineens weer in de hut."
    // "Oef, je hebt geluk!", "&"

    // "2=0;1=12;12=3;6=1;59=4", "*c2"
    // "De ketel begint te borrelen. De kleuren in de ketel wisselen elkaar steeds sneller af."
    // "Er schieten allerlei stralen licht in alle kleuren uit de ketel."
    // "Je voelt je ineens heel raar. Je wilt wat zeggen.", "", "*c3"
    // "$n: 'Bêêêh'", "", "*c2", "Je loopt naar een spiegel. Oh, nee!! Je bent in een geit veranderd!"
    // "*c7", "", "...Tien minuten later...", "", "*s3", "*c2", "Je verandert weer in een mens."
    // "Oef, je hebt geluk!", "&"

    // "2=0;1=12;12=3;6=1;59=5", "*c2"
    // "De ketel begint te borrelen. De kleuren in de ketel verschieten steeds sneller."
    // "Er komen paarse dampen uit de ketel."
    // "Ineens begint alles om je heen heel groot te worden.", ""
    // "*c3", "$n: 'Oh nee! Ik ben aan het krimpen!'", "*c2", ""
    // "Je probeert de tafel op te klimmen richting de ketel, maar de poten van de tafel"
    // "zijn te glad om tegenop te klimmen."
    // "*c7", "", "...Tien minuten later...", "", "*s3", "*c2", "Je verandert weer naar normale lengte."
    // "Oef, je hebt geluk!", "&"

    // "2=0;1=12;12=3;4>4;4<10;6=1;59>0;36=3", "", "De maansteen springt ineens uit de ketel en landt op tafel.", "&36=4"
    // "2=0;1=12;12=3;4>4;4<10;6=1;59>0;45=4", "", "De tand van de draak springt ineens uit de ketel en landt op tafel.", "&45=3"

    // ' Reset wijn
    // "2=0;1=12;12=3;4>4;4<10;6=1;59>0;48=3", "&48=0"
    // "2=0;1=12;12=3;4>4;4<10;6=1;59>0", "&59=0;4=0;6=0;20=1"

    // "2=0;1=12;12=3;4=2;6=2", "*c2", "Je slaat de hele dikke almanak open.", "", "&6=3;4=0"
    // "2=0;1=12;12=3;4=3;6=2;51=0", "*c2", "Je slaat het receptenboek open.", "", "&6=4;4=0"
    // "2=0;1=12;12=3;4=3;6=2;51>0", "*c2", "Je kijkt in het receptenboek, dat open op de werkbank ligt.", "", "&6=4;4=0"

    // "2=0;1=12;12=3;6=4;4=0;51=0", "*c6", "Bladzijde 1. -- Introductie --"
    // "", "Heb je een Toverketel 3000 aangeschaft, maar je weet niet wat je er mee kunt?"
    // "Dankzij dit boek wordt het maken van een toverdrank kinderlijk eenvoudig."
    // "Alle recepten werken als volgt:", ""
    // "  - Plaats alle ingrediënten beschreven in het recept in de ketel. De volgorde doet er niet toe."
    // "  - Zodra alle ingrediënten erin zitten, steek je beide handen hoog in de lucht."
    // "  - Met een geheimzinnige stem zeg je dan hardop de toverspreuk die bij het recept hoort."
    // "  - Indien het recept gelukt is, dan is de ketel gevuld met de toverdrank."
    // "  - Indien de spreuk mislukt omdat de ingrediënten niet kloppen, wordt de ketel automatisch"
    // "    schoongemaakt en kun je het nog eens proberen."
    // "  - Voor de 'meesterheks'-recepten is een runesteen nodig om de ingrediënten toonbaar te maken."
    // "", "Veel plezier!", "&"

    // "2=0;1=12;12=3;6=4;4=0;51=1", "*c6", "Bladzijde 10. -- Alleshelende medicinale drank --"
    // "", "Last van ochtendhumeur? Pukkeltjes? Ben je een ernstig zieke koning?"
    // "Deze drank is niet alleen erg leuk om te maken, hij helpt ook nog eens tegen alle kwaaltjes!", ""
    // "Niveau: Gemiddeld", ""
    // "Benodigdheden:"
    // "  - 1 plant met ronde bladeren"
    // "  - 2 lichtblauwe paddenstoelen"
    // "  - 4 planten met stekelige bladeren"
    // "  - 1 tand van een draak"
    // "", "Spreuk: &##%$#@"
    // "", "*c2", "Hmm, er zit een vlek over de spreuk. Het valt je ook op dat de lijst ingrediënten anders is dan Eucalypta je had gegeven."
    // "Maar misschien weet Eucalypta wel de spreuk?", "&"

    // "2=0;1=12;12=3;6=4;4=0;51=2", "*c6", "Bladzijde 37. -- Wakker worden na een feestnacht --"
    // "", "Iets te lang wezen feesten? Je kan maar niet je bed uit komen? Dit drankje maakt je zo wakker!", ""
    // "Niveau: Beginner", ""
    // "Benodigdheden:"
    // "  - 4 planten met hartvormige bladeren"
    // "  - 2 lichtbruine boomzwammen"
    // "  - 1 pluk Sterrenmos"
    // "  - 1 beker rode wijn"
    // "", "Spreuk: 'Abracadabra hastaklap'"
    // "&"

    // "2=0;1=12;12=3;6=4;4=1;51=3;38!2", "*c2", "Je legt de runesteen op de bladzijde. Op een magische wijze veranderen alle onleesbare tekens in leesbare letters.", "", "&38=2;4=0"

    // "2=0;1=12;12=3;6=4;4=0;51=3;38!2", "*c6", "Bladzijde 85. -- Vreemde talenvertaler --"
    // "", "Op vakantie in Limburg of Friesland? Praat iemand in drieletterige afkortingen?"
    // "Laat diegene deze drank drinken en je kan hem/haar verstaan!", ""
    // "Niveau: Meesterheks", ""
    // "Benodigdheden:"
    // "  - ??????????"
    // "  - ??????????"
    // "  - ??????????"
    // "  - ??????????"
    // "", "Spreuk: ??????????"
    // "", "p.s. De drank helpt niet voor juridisch taalgebruik in gebruikersovereenkomsten."
    // "", "*c2", "Hmm, ik denk dat ik iets nodig heb om deze bladzijde leesbaar te maken.", "&"

    // "2=0;1=12;12=3;6=4;4=0;51=3;38=2", "*c6", "Bladzijde 85. -- Vreemde talen vertaler --"
    // "", "Op vakantie in Limburg of Friesland? Praat iemand in drieletterige afkortingen?"
    // "Met deze drank kan je iedereen verstaan!", ""
    // "Niveau: Meesterheks", ""
    // "Benodigdheden:"
    // "  - 1 plant met hartvormige bladeren"
    // "  - 1 pluk Maanmos"
    // "  - 2 plukken Sterrenmos"
    // "  - 1 Maansteen"
    // "", "Spreuk: 'Sim sala baklava!'"
    // "", "p.s. De drank helpt niet voor wetterlijk taalgebruik in gebruikersovereenkomsten.", "&"

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

    // "2=0;1=12;12=3;6=1;4=0", "Voeg ingrediënt toe aan ketel", "4=10"
    // "2=0;1=12;12=3;6=1;4=0", "Zeg: `Sim sala...'", "4=2"
    // "2=0;1=12;12=3;6=1;4=0", "Zeg: `Hocus...'", "4=3"
    // "2=0;1=12;12=3;6=1;4=0", "Zeg: `Abracadabra...'", "4=4"
    // "2=0;1=12;12=3;6=1;4=0", "Stap weg bij de ketel", "4=1"

    // "2=3", "Genoeg ingrediënten voor nu", "4=0;6=1;2=0"

    interaction("Step away from cauldron", hasState("unknown"), () => {
      g.text("You step away from the cauldron.");
      closeOverlay();
    });
  }
);
