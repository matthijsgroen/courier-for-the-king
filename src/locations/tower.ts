import g from "../game";

g.defineLocation("tower", ({ describe, interaction, hasState, setState }) => {
  describe(() => {
    g.text("{b}[characters.player.name]{/b} walked to the base of the tower.");

    g.onState(g.character("horse").hasState("following"), () => {
      g.character("player").say(
        "{b}[characters.horse.name]{/b} I need to tie you up here, I hope to be back soon."
      );
      g.character("horse").setState("tower");
    });
    setState("firstVisit");

    g.text(
      "To the {b}right side{/b} of the tower is a wooden elevator.",
      "At the {b}front{/b} of the tower a big heavy door."
    );
  });

  interaction("Take the elevator up", hasState("firstVisit"), () => {
    g.text(
      "You walk to the wooden elevator.",
      "It looks like the platform of the elevator is {b}at the top{/b} of the tower.",
      "You cannot get on from this side. You do not see a way to lower the elevator here.",
      "",
      "Behind the elevator you see a hatch towards a basement.",
      "But the hatch is {b}locked{/b}."
    );
  });

  interaction("Open the door", hasState("firstVisit"), () => {
    g.text(
      "You push against the door. It squeaks and creaks terribly. The door starts to move.",
      "You open it just enough to squeeze through.",
      "",
      "You are now inside the tower. It is {i}really{/i} {b}dark{/b}."
    );
    g.text("", "{i}<Ggrrooaaaaarrrrh!!!!!>{/i}", "");
    g.text(
      "You startle and dive aside. That sound was really close. Still it seems to come from the top of the tower.",
      "For a moment you are lying still in the {b}darkness{/b} and decide to stand up.",
      "Your vision starts to adjust to the darkness. You can slowly make out a spiraling staircase leading upwards."
    );
    setState("inside");
  });

  interaction("Go up the stairs", hasState("inside"), () => {
    g.text(
      "You tremble with {i}fear{/i}. You have no idea what you are up against.",
      "The {b}monster{/b} does not sound friendly.",
      "",
      "You grip your sword tightly and slowly creep up the stairs, step by step.",
      "You try to peek into the darkness to make out your surroundings.",
      ""
    );
    g.travel("towerTop");
  });
});
