import g from "../game";

g.defineOverlay(
  "travel",
  ({ onEnter, interaction, closeOverlay, setPrompt }) => {
    setPrompt("Where do you want to go:");

    onEnter(() => {
      g.descriptionText(
        "You jump on your horse. You can quickly travel to a destination you've been before."
      );
    });

    interaction(
      "Farm",
      g.and(g.location("farm").hasFlag("visited"), g.not(g.isLocation("farm"))),
      () => {
        closeOverlay();
        g.descriptionText(
          "{b}[characters.horse.name]{/b} quickly brings you to the {b}farm{/b}.",
          ""
        );
        g.location("farm").travel();
      }
    );

    interaction(
      "Mine",
      g.and(g.location("mine").hasFlag("visited"), g.not(g.isLocation("mine"))),
      () => {
        closeOverlay();
        g.descriptionText(
          "{b}[characters.horse.name]{/b} quickly brings you to the {b}mine{/b}.",
          ""
        );
        g.location("mine").travel();
      }
    );

    interaction(
      "Smithy",
      g.and(
        g.location("smithy").hasFlag("visited"),
        g.not(g.isLocation("village"))
      ),
      () => {
        closeOverlay();
        g.descriptionText(
          "{b}[characters.horse.name]{/b} quickly brings you to the {b}smithy{/b}.",
          "You tie {b}[characters.horse.name]{/b} to a pole just outside of the shop.",
          "You enter the smithy.",
          ""
        );
        g.location("smithy").travel();
      }
    );

    interaction(
      "Bakery",
      g.and(
        g.location("bakery").hasFlag("visited"),
        g.not(g.isLocation("village"))
      ),
      () => {
        closeOverlay();
        g.descriptionText(
          "{b}[characters.horse.name]{/b} quickly brings you to the {b}bakery{/b}.",
          "You tie {b}[characters.horse.name]{/b} to a pole just outside of the shop.",
          "You enter the bakery.",
          ""
        );
        g.location("bakery").travel();
      }
    );

    interaction(
      "Cabin of the witch",
      g.and(
        g.location("cabin").hasFlag("visited"),
        g.not(g.isLocation("cabin"))
      ),
      () => {
        closeOverlay();
        g.descriptionText(
          "{b}[characters.horse.name]{/b} quickly brings you to the {b}cabin in the swamp{/b}.",
          "The last part you had to walk next to him, to make sure you didn't sink too much into the wet surface.",
          ""
        );
        g.location("cabin").travel();
      }
    );

    interaction(
      "Mill",
      g.and(g.location("mill").hasFlag("visited"), g.not(g.isLocation("mill"))),
      () => {
        closeOverlay();
        g.descriptionText(
          "{b}[characters.horse.name]{/b} quickly brings you to the {b}mill{/b}.",
          ""
        );
        g.location("mill").travel();
      }
    );

    interaction(
      "Tower",
      g.and(
        g.location("tower").hasState("visited"),
        g.not(g.isLocation("tower"))
      ),
      () => {
        closeOverlay();
        g.descriptionText(
          "{b}[characters.horse.name]{/b} quickly brings you to the {b}tower{/b}.",
          ""
        );
        g.location("tower").travel();
      }
    );

    interaction("Dismount horse", g.always(), () => {
      closeOverlay();
    });
  }
);

g.globalInteraction(
  "Jump on horse",
  "t",
  g.and(
    g.character("horse").hasState("following"),
    g.character("horse").hasFlag("hooves"),
    g.not(g.isOverlayOpen()),
    g.not(g.character("horse").hasFlag("cart")),
    g.not(
      g.or(
        g.isLocation("smithy"),
        g.isLocation("bakery"),
        g.isLocation("cabinInside"),
        g.and(
          g.isLocation("tower"),
          g.not(g.location("tower").hasState("visited"))
        ),
        g.isLocation("towerTop"),
        g.isLocation("towerTopElevator")
      )
    )
  ),
  () => {
    g.overlay("travel").open();
  }
);
