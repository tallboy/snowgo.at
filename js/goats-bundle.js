// Bundled goats data and browser logic
// This file combines the goats data with the browser logic to avoid import issues

// Helper function for template literals (from goats.js)
const html = (s) => s;
const img = (s) => `/img/goats/${s}`;

// Goats data (copied from goats.js)
const goatsData = [
  {
    name: "Aishma Raghu",
    image: img("aishma.jpeg"),
    description: html`
      Aishma (eye-schma) Raghu is a super awesome GOAT. She knows all about
      component stuff and client side performance stuff. Whenever she's on a
      team she makes the team better. Aishma doesn't eat meat just like a goat.
      She also really likes Womens Soccer and that's pretty neat.
    `,
  },
  {
    name: "Sierra Morehardt",
    image: img("sierra-morehardt.jpeg"),
    description: html`
      Sierra is the fastest SNOW goat around. Many call her a SNOW leopard. To
      Sierra, PR means personal record, and she just set one while running her
      most recent half marathon in under two hours. She writes clean code, gives
      the best playlist recommendations, and always remembers to mute herself on
      Zoom. She's cool under pressure, and even cooler at happy hour. Oh and
      she's also very humble.
    `,
  },
  {
    name: "Tony Nguyen",
    image: img("tony-nguyen.jpeg"),
    description: html`
      Tony is genuine, honest, and transparent. He prefers leading with the
      carrot and not the stick. Tony cares for his co-workers and wants to see
      everyone win. He has a great sense of humor and is super fun to work with.
      He's a great father, husband, friend and human.
    `,
  },
  {
    name: "Will Leingang",
    image: img("will-leingang.jpeg"),
    description: html`
      Will is an absolute legend! He's one of the only few people who know how
      Jelly works. He consistently goes out of his way to make sure our products
      work well for our customers. Will is basically Fred Luddy 2.0 and he cares
      about his team as well by always bringing treats into the office.
    `,
  },
  {
    name: "Tommy Ryan",
    image: img("tommy-ryan.jpeg"),
    description: html`
      When you are able to coin your name as a verb, that
      is a testament to your personality.

      <p class="beyonce-irreplaceable">
        <b>Tommyinaround</b> verb<br/>
        \\'tä-mē in ə-ˈrau̇nd\\
        <ol class="beyonce-irreplaceable">
          <li>
            To have conversations that are meaningless but warm your
            heart and fill your soul.
          </li>
          <li>
            To warmly welcome a colleague to the day, the team, or the
            inner-friend group
          </li>
          <li>
            To demonstrate master knowledge and have intelligent discourse about
            any topic whatsoever spanning from world politics to intergalactic
            planetary planetary intergalactic measurements of distances such as a
            <b>parsec</b>; all the while inserting a 'yo-momma' joke to
            diffuse any awkwardness from demonstrated superhuman intellect.
          </li>
        </ol>
      </p>
    `,
  },
  {
    name: "Elliott Sencan",
    image: img("eloite-sencan.jpeg"),
    description: html`
      One of the best developers and managers that ServiceNow has had! Elliott
      (don't forget the two t's!) Sencan is a brilliant and genuine individual
      who leads by example. He always has his team's best interests at heart and
      stands by his word, which makes Elliott a fantastic leader and certified
      SNOW GOAT!
      <br />
      <br />
      P.S. Elliott is an extremely humble, talented musician --
      <a
        class="darklink fw-bold"
        href="https://open.spotify.com/artist/6ldZGvFDjs6KafLouTBHJ9"
        target="_blank"
      >
        Check out Hollywood Principle!
      </a>
    `,
  },
  {
    name: "Rafael Santillan Jr.",
    image: img("rafael-santillan.jpeg"),
    description: html`
      Rafael Santillan Jr. is a wizard when it comes to programming and winning
      the hearts of others. This individual puts in a massive amount of
      high-quality work while easily maintaining a kind, positive attitude that
      inspires others to do the same. Oh, and his dog, Yoda, is ADORABLE!! There
      is no doubt that ServiceNow is fortunate to have Rafael among its staff --
      he is an absolute SNOW GOAT.
      <br />
      <small>Yes this was the best picture of Rafa we could find.</small>
    `,
  },
  {
    name: "Shane Brimer",
    image: img("shane-brimer.jpg"),
    description: html`
      Shane is easily the strongest person at ServiceNow and maybe all of San
      Diego county.<br />
      Shane never backs down from a challenge and isn't afraid of anything.
      Ever. <br />
      Shane is an outstanding father, husband, co-worker, and friend. <br />
      Shane is a stellar example of protein. <br />
      Shane can smell fear and coffee. <br />
      Shane is a SNOW GOAT. <br />
      Shane.
    `,
  },
  {
    name: "Chase Murphy",
    image: img("chase-murphy.png"),
    description: html`
      Chase is the goatiest goat of all goats. Don't believe me?
      <ul class="beyonce-irreplaceable">
        <li>
          Chase was using the &#x1F410; emoji long before this page ever
          existed.
        </li>
        <li>
          Chase can drink everyone under the table and still crank out code
          (that he doesn't remember writing)
        </li>
        <li>
          Chase regularly climbs up sheer cliff faces and eats vegetation.
        </li>
        <li>
          The origin of his name means &quot;goat&quot; in many languages and
          cultures.
        </li>
      </ul>
      Chase is gone but never forgotten and we still stumble on pull requests he
      created and we never looked at from time to time. Bye forever.
    `,
  },
  {
    name: "Tyler Paulo",
    image: img("tyler-paulo.jpg"),
    description: html`He's alright.`,
  },
  {
    name: "Default Snow Goat",
    image: img("goat-placeholder.png"),
    description: html`
      Have someone you'd like to nominate as a SNOW GOAT? Head over to GitHub
      and
      <a href="https://github.com/tallboy/snowgo.at">submit a Pull Request</a>.
    `,
  },
];

// Make goats data available globally
window.goatsData = goatsData;
console.log(`Loaded ${goatsData.length} goats`);

// Dispatch an event to notify that goats data is loaded
window.dispatchEvent(new CustomEvent('goatsDataLoaded', { detail: { goatsData } }));
