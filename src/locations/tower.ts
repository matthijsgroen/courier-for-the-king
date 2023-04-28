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
      "",
      "Now and then you come by a window that lets in a shaft of light, so that it is not entirely pitch black.",
      "At the top of the stairs is a {b}door{/b}."
    );
    g.text("", "{b}{i}<GGRROOAAAAARRRRH!!!!!>{/i}{/b}", "");
    g.text(
      "Suddenly, underneath the sound of the loud roar, you also hear a women's voice.",
      "But you can not make out what she is saying.",
      "",
      "Would that be {b}[characters.daughter.name]{/b}? Is she still alive!?"
    );
    setState("atTop");
  });

  interaction("Open the door, and storm in", hasState("atTop"), () => {
    // "1=17;2=0;17=0;4=4", "*c2", "Met je zwaard in je hand zet je je schrap. Je duwt hard de deur open en stormt de kamer in. Je ziet een gigantische draak op de vloer liggen. Hij heeft een enorme staart, enorme vleugels en grote tanden."
    // "Aan de andere kant van de kamer zie je een jonge vrouw staan."
    // "", "*c13", "Bloem: 'He! Wie ben jij? En wat doe jij hier? Doe dat zwaard eens snel weg!"
    // "  Straks bezeer je nog iemand!'", "", "*c2", "Je staat perplex", "", "*c13"
    // "Bloem: 'Ja jij! Wat kom je doen? Het is al moeilijk genoeg zo!'"
    // "", "*c2", "Moeilijk genoeg? waar heeft ze het over?", "Je bergt je zwaard maar op."
    // "&17=1;4=0;5=0;7=2"
  });
  interaction("Open the door, and sneak in", hasState("atTop"), () => {
    // "1=17;2=0;17=0;4=5", "*c2", "Met je zwaard in je hand probeer je zo stil mogelijk de deur open te krijgen..."
    // "*s2", "Gelukkig, deze piept en kraakt niet!", "Je neemt voorzichtig een stap de kamer in."
    // "Je ziet een gigantische draak op de vloer liggen. Hij heeft een enorme staart, enorme vleugels en grote tanden."
    // "Aan de andere kant van de kamer zie je een jonge vrouw staan."
    // "", "*c14", "<kraaaaak!>", "", "*c2", "Nee! een losliggende plank!"
    // "&"
  });
});
