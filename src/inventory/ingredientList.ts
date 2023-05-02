import g from "../game";

g.defineOverlay("ingredientList", ({ onEnter, closeOverlay, interaction }) => {
  onEnter(() => {
    g.descriptionText("You look at the list of ingredients:");

    g.note(() => {
      g.text(
        "Sweet {b}[characters.player.name]{/b}, I need the following items:",
        ""
      );
      g.onState(g.item("ingredientList").hasFlag("roundLeaves"), () => {
        g.text("{s}- 2 plants with round leaves{/s}");
      }).else(() => {
        g.text("- 2 plants with round leaves");
      });
      g.onState(g.item("ingredientList").hasFlag("toadstools"), () => {
        g.text("{s}- 2 lightblue toadstools{/s}");
      }).else(() => {
        g.text("- 2 lightblue toadstools");
      });

      g.onState(g.item("ingredientList").hasFlag("thornyLeaves"), () => {
        g.text("{s}- 3 plants with thorny leaves{/s}");
      }).else(() => {
        g.text("- 3 plants with thorny leaves");
      });
      g.text("- 1 tooth of a dragon");
    });

    g.onState(g.not(g.item("ingredientList").hasFlag("seen")), () => {
      g.character("player").say("What!? A tooth of a {b}dragon{/b}?");
      g.item("ingredientList").setFlag("seen");
    });
  });

  interaction("Put list back", g.always(), () => {
    closeOverlay();
  });
});
