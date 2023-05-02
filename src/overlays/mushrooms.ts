import g from "../game";

g.defineOverlay("mushrooms", ({ onEnter, interaction, closeOverlay }) => {
  onEnter(() => {
    g.text(
      "Je gaat op zoek naar paddestoelen. Na een tijdje zie je allerlei verschillende soorten staan.",
      "Je ziet rode paddenstoelen met witte stippen, ",
      "lichtbruine boomzwammen, lichtblauwe paddenstoelen en oranje zwammen."
    );
  });
});
