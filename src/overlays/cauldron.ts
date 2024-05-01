import g from "../game";

g.defineOverlay(
  "cauldron",
  ({
    onEnter,
    interaction,
    closeOverlay,
    hasFlag,
    hasState,
    setState,
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

    onEnter(() => {
      g.text("You walk to the cauldron in the center of the cabin.", "");

      g.text(
        "The potion in the cauldron is clear and transparent.",
        "The cauldron looks ready for some brewing."
      );
    });

    const cauldronResult = (_spell: string) => {
      g.onState(hasFlag("hasIngredients"), () => {}).else(() => {
        g.text("Nothing happens...");
        setState("unknown");
      });
    };

    interaction("Add ingredient", hasState("unknown"), () => {
      //
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
      cauldronResult("simsala-bim");
    });

    interaction("...Bam!", hasState("saySimSala"), () => {
      g.character("player").say("...Bam!");
      cauldronResult("simsala-bam");
    });
    // ' Sim sala...
    // "2=0;1=12;12=3;6=1;4=3;50>3;47=0", "Zeg: `...baklava!'", "4=6"

    interaction("...Bom!", hasState("saySimSala"), () => {
      g.character("player").say("...Bom!");
      cauldronResult("simsalab-om");
    });

    interaction("Hocus...", hasState("saySpell"), () => {
      g.character("player").say("Hocus...");
      setState("sayHocus");
    });

    interaction("...Pocus!", hasState("sayHocus"), () => {
      g.character("player").say("...Pocus!");
      cauldronResult("hocus-pocus");
    });

    interaction("...Poof!", hasState("sayHocus"), () => {
      g.character("player").say("...Poof!");
      cauldronResult("hocus-poof");
    });

    // "2=0;1=12;12=3;6=1;4=3;50>3;47=0", "Zeg: `...pilates!'", "4=6"

    interaction("...Crocus!", hasState("sayHocus"), () => {
      g.character("player").say("...Crocus!");
      cauldronResult("hocus-crocus");
    });

    interaction("Abracadabra...", hasState("saySpell"), () => {
      g.character("player").say("Abracadabra...");
      setState("sayAbra");
    });

    interaction("...Poof!", hasState("sayAbra"), () => {
      g.character("player").say("...Poof!");
      cauldronResult("abracadabra-poof");
    });

    interaction("...Pop!", hasState("sayAbra"), () => {
      g.character("player").say("...Pop!");
      cauldronResult("abracadabra-pop");
    });

    interaction("...Clang!", hasState("sayAbra"), () => {
      g.character("player").say("...Clang!");
      cauldronResult("abracadabra-clang");
    });

    // "2=0;1=12;12=3;6=1;4=4;50>3;26<6", "Zeg: `...hastaklap!'", "4=7"

    interaction("...Hodgepodge!", hasState("sayAbra"), () => {
      g.character("player").say("...Hodgepodge!");
      cauldronResult("abracadabra-hodgepodge");
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
    // "2=3", "Genoeg ingrediënten voor nu", "4=0;6=1;2=0"

    interaction("Step away from cauldron", hasState("unknown"), () => {
      g.text("You step away from the cauldron.");
      closeOverlay();
    });
  }
);
