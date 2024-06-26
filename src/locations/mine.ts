import g from "../game";

g.defineLocation("mine", ({ describe, interaction, onLeave }) => {
  onLeave("hills", () => {
    g.text("You walk back towards the road.");
  });

  describe(() => {
    g.onState(g.character("dwarf").hasState("happy"), () => {
      g.text(
        "You are at the mine entrance.",
        "A mining cart lies on its side. [characters.dwarf.name] is working in the mine."
      );
      g.text("He looks happy.");
    })
      .else(g.character("dwarf").hasFlag("nameKnown"), () => {
        g.text(
          "You are at the mine entrance.",
          "A mining cart lies on its side. [characters.dwarf.defaultName] is sitting at the entrance."
        );
        g.text("He looks grumpy.");
      })
      .else(() => {
        g.character("dwarf").setTranslatableName("Dwarf");

        g.text(
          "You are at the mine entrance.",
          "A mining cart lies on its side. A dwarf is sitting at the entrance."
        );
        g.text("He looks grumpy.");
      });

    g.onState(g.item("gemstone").hasState("chopped"), () => {
      g.descriptionText("A {b}gemstone{/b} lies at your feet.");
    });

    g.location("mine").setFlag("visited");
  });

  interaction("Talk to the dwarf", g.always(), () => {
    g.overlay("dwarfConversation").open();
  });

  interaction(
    "Pick up gemstone",
    g.item("gemstone").hasState("chopped"),
    () => {
      g.text(
        "You pick up the {b}gemstone{/b}. It is sparkling in the sunlight"
      );
      g.item("gemstone").setState("possession");
      g.list("inventory").add("gem");
    }
  );

  interaction("Leave the mine", g.always(), () => {
    g.location("hills").travel();
  });
});
