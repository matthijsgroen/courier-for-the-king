import g from "../game";

g.defineOverlay("travel", ({ onEnter, interaction, closeOverlay }) => {
  onEnter(() => {
    g.text("You check your map");
  });

  interaction("Dismount horse", g.always(), () => {
    closeOverlay();
  });
});

g.globalInteraction(
  "Jump on horse",
  "t",
  g.and(
    g.character("horse").hasState("following"),
    g.character("horse").hasFlag("hooves"),
    g.not(g.isOverlayOpen()),
    g.not(g.character("horse").hasFlag("cart")),
    g.not(g.or(g.isLocation("smithy"), g.isLocation("bakery")))
  ),
  () => {
    g.openOverlay("travel");
  }
);
