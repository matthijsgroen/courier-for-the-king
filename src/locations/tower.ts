import g from "../game";

g.defineLocation("tower", ({ describe, interaction }) => {
  describe(() => {
    g.text("{b}[characters.player.name]{/b} walked to the base of the tower.");

    g.onState(g.character("horse").hasState("following"), () => {
      g.character("player").say(
        "{b}[characters.horse.name]{/b} I need to tie you up here, I hope to be back soon."
      );
      g.character("horse").setState("tower");
    });

    g.text(
      "To the {b}right side{/b} of the tower is a wooden elevator.",
      "At the {b}front{/b} of the tower a big heavy door."
    );
  });

  interaction("Take the elevator up", g.always(), () => {
    g.text(
      "You walk to the wooden elevator.",
      "It looks like the platform of the elevator is {b}at the top{/b} of the tower.",
      "You cannot get on from this side. You do not see a way to lower the elevator here.",
      "",
      "Behind the elevator you see a hatch towards a basement.",
      "But the hatch is {b}locked{/b}."
    );
  });

  interaction("Open the door", g.always(), () => {});
});
