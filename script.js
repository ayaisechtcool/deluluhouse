let currentCharacter = "";


/* SCREENS */

function startGame() {
  document.getElementById("welcomeScreen").classList.add("hidden");
  document.getElementById("creatorScreen").classList.remove("hidden");
}

function goHome() {
  document.getElementById("creatorScreen").classList.add("hidden");
  document.getElementById("welcomeScreen").classList.remove("hidden");
}

function enterHouse() {
  const nameInput = document.getElementById("playerName");
  const name = nameInput.value.trim() || "Main Character";

  document.getElementById("displayName").textContent = name;

  document.getElementById("creatorScreen").classList.add("hidden");
  document.getElementById("houseScreen").classList.remove("hidden");
}


/* CHARACTER CREATOR */

function changeSkin(color) {
  document.getElementById("avatarFace").style.background = color;
}

function changeHair(style) {
  const hair = document.getElementById("avatarHair");

  hair.className = "hair hair-style-" + style;
}

function changeHairColor(color) {
  document.getElementById("avatarHair").style.background = color;
}

function changeOutfit(style) {
  const outfit = document.getElementById("avatarOutfit");

  outfit.className = "outfit outfit-" + style;
}


/* CHARACTERS

You can change these names into your own private crush list.
For a public version, original fictional characters are safer!
*/

const characters = [
  {
    name: "The Quarterback",
    vibe: "confident & protective",
    message: "There you are. I was wondering when you'd show up."
  },

  {
    name: "The Actor",
    vibe: "charming & mysterious",
    message: "You always make an entrance, don't you?"
  },

  {
    name: "The Football Star",
    vibe: "funny & chaotic",
    message: "Okay, important question: are you joining my team or not?"
  },

  {
    name: "The Model",
    vibe: "smooth & confident",
    message: "I saved you a seat. Don't make me regret it."
  },

  {
    name: "The Dark-Haired Heartthrob",
    vibe: "sarcastic & flirty",
    message: "Well, well... look who finally decided to join us."
  },

  {
    name: "The Brazilian Star",
    vibe: "playful & energetic",
    message: "Come on! We're having fun without you."
  }
];


const rooms = {

  living: {
    name: "Living Room",
    emoji: "🛋️",
    text: "Music is playing and everyone suddenly looks at you when you walk in.",
    people: [0, 1, 3]
  },

  pool: {
    name: "Pool Area",
    emoji: "🏊",
    text: "The sun is shining. Someone waves at you from the other side of the pool.",
    people: [2, 5]
  },

  game: {
    name: "Game Room",
    emoji: "🎮",
    text: "A very serious competition is happening. You might be recruited.",
    people: [0, 2, 4]
  },

  cinema: {
    name: "Cinema Room",
    emoji: "🎬",
    text: "There's a movie playing... and suspiciously only one seat left.",
    people: [1, 3, 4]
  },

  rooftop: {
    name: "Rooftop",
    emoji: "🌙",
    text: "The city lights are glowing. Someone is already waiting up here.",
    people: [1, 4]
  },

  bedroom: {
    name: "Your Room",
    emoji: "👗",
    text: "Your room is your safe space. Time to pick an outfit and plan your next move.",
    people: []
  }
};


/* OPEN ROOMS */

function openRoom(roomId) {

  const room = rooms[roomId];

  document.getElementById("roomName").textContent = room.name;
  document.getElementById("roomText").textContent = room.text;
  document.getElementById("roomScene").textContent = room.emoji;

  const characterList = document.getElementById("characters");
  characterList.innerHTML = "";

  if (room.people.length === 0) {
    characterList.innerHTML = "<p>Just you and your main character energy. 💅</p>";
  }

  room.people.forEach(index => {

    const person = characters[index];

    const button = document.createElement("button");

    button.className = "character-button";
    button.textContent = person.name + " 💗";

    button.onclick = () => openChat(index);

    characterList.appendChild(button);
  });

  document.getElementById("roomModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("roomModal").classList.add("hidden");
}


/* CHAT */

function openChat(index) {

  currentCharacter = index;

  const person = characters[index];

  document.getElementById("chatName").textContent = person.name;

  const messages = document.getElementById("chatMessages");

  messages.innerHTML = `
    <div class="message">
      ${person.message}
    </div>
  `;

  const choices = document.getElementById("chatChoices");

  choices.innerHTML = "";

  const responses = [
    "I was looking for you 👀",
    "Maybe I made you wait on purpose.",
    "What's going on here?"
  ];

  responses.forEach(response => {

    const button = document.createElement("button");

    button.textContent = response;

    button.onclick = () => sendResponse(response);

    choices.appendChild(button);
  });

  document.getElementById("chatModal").classList.remove("hidden");
}

function sendResponse(response) {

  const messages = document.getElementById("chatMessages");
  const person = characters[currentCharacter];

  messages.innerHTML += `
    <div class="message you">
      ${response}
    </div>
  `;

  setTimeout(() => {

    const replies = [
      "Oh? Interesting answer. 😏",
      "You're trouble, you know that?",
      "Okay, now you've got my attention.",
      "I had a feeling you'd say that."
    ];

    const reply =
      replies[Math.floor(Math.random() * replies.length)];

    messages.innerHTML += `
      <div class="message">
        ${reply}
      </div>
    `;

    messages.scrollTop = messages.scrollHeight;

  }, 700);
}

function closeChat() {
  document.getElementById("chatModal").classList.add("hidden");
}


/* SPIN THE CRUSH */

function spinCrush() {

  const randomPerson =
    characters[Math.floor(Math.random() * characters.length)];

  document.getElementById("spinName").textContent =
    randomPerson.name + " 💗";

  document.getElementById("spinText").textContent =
    `${randomPerson.name} wants to hang out with you. The universe clearly has a plan. 👀`;

  document.getElementById("spinModal").classList.remove("hidden");
}

function closeSpin() {
  document.getElementById("spinModal").classList.add("hidden");
}