import g from "../game";

g.defineOverlay("daughterConversation", ({ onEnter, interaction }) => {
  onEnter(() => {
    g.character("daughter").say(
      "Hey! Who are you? What are you doing here? Put that sword away!",
      "You might hurt someone!"
    );
    g.text("You are perplexed.");
    g.character("daughter").say(
      "Yes you! What are you doing here? It is difficult enough as it is already!"
    );

    g.text(
      "Difficult enough? What is she talking about?",
      "You decide to put away your sword."
    );
  });

  interaction("Are you [characters.daughter.name]?", g.always(), () => {
    // "1=17;2=0;17=1;4=1", "*c3", "$n: 'Ben jij Bloem? De dochter van de bakker?'"
    // "", "*c13", "Bloem: 'Ja dat ben ik. En wie ben jij?'", "*c3", "", "$n: 'Ik ben $n, ik kom je redden!'", ""
    // "*c13", "Bloem: 'Mij redden? Waarom? Ik hoef niet gered te worden. Ik ben hier zelf naar toe gegaan. We moeten de draak redden!'", "&"
  });
  interaction("Look out! There is a dragon over there!", g.always(), () => {
    // "1=17;2=0;17=1;4=2", "*c3", "$n: 'Kijk uit! Er zit daar een draak!'"
    // "", "*c13", "Bloem: 'Ha, dat weet ik ook wel, ik ben zelf naar hem toegegaan. Hij is echt niet gevaarlijk hoor. Wie ben jij eigenlijk?'"
    // "", "*c3", "$n: 'Ik ben $n. Ik kom je redden!'", ""
    // "*c13", "Bloem: 'Mij redden? Waarom? Ik hoef niet gered te worden. We moeten de draak redden!'", "&"
  });
  interaction("I'm coming to save you!", g.always(), () => {
    // "1=17;2=0;17=1;4=3", "*c3", "$n: 'Ik kom je redden!'"
    // "", "*c13", "Bloem: 'Mij redden? Ha! Ik red mijzelf wel hoor! Wie ben jij eigenlijk?"
    // "", "*c3", "$n: 'Ik ben $n.'", "", "*c13"
    // "Bloem: 'Als je iemand hier wil komen redden, dan kan je me mooi helpen met het redden van deze draak!'", "&"
  });
});
