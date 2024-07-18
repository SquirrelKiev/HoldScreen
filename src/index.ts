import $ from "jquery";

const emoteMap: { [id: string]: string } = {
  ":chatting:":
    "https://cdn.discordapp.com/emojis/1089703903534264391.gif?size=4096&quality=lossless",
  ":gayge:":
    "https://cdn.discordapp.com/emojis/854955025737711627.webp?size=4096&quality=lossless",
  ":rickroll:":
    "https://cdn.discordapp.com/emojis/1089426002825986048.gif?size=4096&quality=lossless",
  ":clueless:":
    "https://cdn.discordapp.com/emojis/1210777994885472336.webp?size=4096&quality=lossless",
  ":shika:": "https://www.anime-shikanoko.jp/assets/img/common/shika_anim.png",
  ":COPIUM:":
    "https://cdn.discordapp.com/emojis/888554651367133204.webp?size=4096&quality=lossless",
  ":based:":
    "https://cdn.discordapp.com/emojis/1210761830931107851.webp?size=4096&quality=lossless",
  ":toobased:":
    "https://cdn.discordapp.com/emojis/888544186578653224.webp?size=4096&quality=lossless",
  ":akanechuu:":
    "https://cdn.discordapp.com/emojis/1113905883504717906.webp?size=4096&quality=lossless",
    ":pepehands:":
      "https://cdn.discordapp.com/emojis/929402021558227056.webp?size=4096&quality=lossless",

  ":question:":
    "https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/2753.svg",
  ":fire:":
    "https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/1f525.svg",
  ":speaking_head:":
    "https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/1f5e3.svg",
};

function updateText(text: string) {
  const delay = -0.05;

  let $quote = $("#quote");

  if ($quote.length === 0) {
    console.error("really bad");
    return;
  }

  Object.keys(emoteMap).forEach((emote) => {
    const imgTag = `<img src="${emoteMap[emote]}" class="emote" />`;
    text = text.replace(new RegExp(emote, "g"), imgTag);
  });

  text = text.replace("{textCount}", texts.length.toString());

  const parts = text
    .split(/(<img.*?\/>)/g)
    .map((part) => {
      if (part.startsWith("<img")) {
        return part; // its an image, just return that
      } else {
        return part.split(""); // not an image, split by character
      }
    })
    .flat();

  $quote.html(
    parts
      .map((part) => {
        if (part.startsWith("<img")) {
          return part; // its an image dont bother with the span
        } else {
          return `<span>${part}</span>`; // its a character, wrap it in a span so we can do cool effects with it
        }
      })
      .join("")
  );

  $quote.children().each(function (index) {
    $(this)
      .css("animation-delay", `${index * delay}s`)
      .addClass("wavy");
  });
}

async function changeTextWithFade(text: string, fadeOut: boolean) {
  const $quote = $("#quote");

  if (fadeOut) {
    $quote.addClass("fade-out");

    // wait for the fade-out to complete
    await new Promise((resolve) => setTimeout(resolve, 750));
  }

  updateText(text);

  $quote.removeClass("fade-out").addClass("fade-in");

  // wait for the fade-in transition to complete
  await new Promise((resolve) => setTimeout(resolve, 750));

  $quote.removeClass("fade-in");
}

// a random text that has not been seen before is chosen from here
// if we've ran out of texts we reset the seen list
const texts = [
  '"i am become... the oshi no ko"',
  '"nah. i\'d kill my father" - aqua probably',
  "hello groupwatchers",
  "akane > kana",
  ":gayge: :question:", // this gets replaced with the emotes
  ":rickroll:",
  "oshi no ko, sponsored by Door Chains™",
  "why did aqua not use his mind powers to banish that stalker guy is he stupid",
  '"i wonder whos at the door" - :clueless:',
  ":shika: shikanoko nokonoko koshitantan :shika:",
  "gee i sure hope the stream works :clueless:",
  "why do i keep adding to this waiting screen this is getting ridiculous",
  "whats gonna happen in this episode (wrong answers only)",
  "TRUST IN THE AKA PLAN :COPIUM:",
  '"is the episode out yet"',
  "this stream is an experiment to see how patient you guys are to see the next episode",
  "and ruby gets no screen time once again :fire: :fire: :fire:",
  'yknow i originally wrote "idol solos" here but the new op was so fkn good that i take it all back',
  "goddamn the new ending song is so good",
  '"I WILL BE YOUR OSHI NO KO" :speaking_head::fire::fire:',
  "send me quote ideas for this screen",
  "good things come to those who wait",
  "gunchap recommendation: read higurashi!",
  "yanii recommendation: read Your Forma!",
  "fenix recommendation: read ReLIFE!",
  "catge recommendation: read Asumi-chan!",
  "triangled recommendation: watch bunny girl senpai! (kiev note: :toobased:)",
  "kiev recommendation: watch the vtuber anime!",
  "kiev recommendation: watch made in abyss!",
  ":akanechuu:",
  "i should put music on this screen",
  '"Which part...? Well... The whole thing?" - abiko on what their favourite part of oshi no ko season 2 was',
  "ujdiklafnmaefrpl[;/wnjm",
  "nobody is watching dungeon people, its a good show guys i promise :pepehands:",
  "suisei hoshimachi",
  "are any of you guys watching any shows this season other than oshi no ko?",
  "I wanna stop watching isekai trash",
  ",claim multi all; t!daily; s?me; t!rank",
  "fun fact: there are {textCount} total splash texts that can appear here!",
];

let unseenIndices = [...Array(texts.length).keys()];
let lastIndex = -1;

function getRandomIndex() {
  if (unseenIndices.length === 0) {
    unseenIndices = [...Array(texts.length).keys()]; // we've seen every quote, reset
  }
  let randomIndex: number;
  do {
    randomIndex = Math.floor(Math.random() * unseenIndices.length);
  } while (
    unseenIndices[randomIndex] === lastIndex &&
    unseenIndices.length > 1
  );

  return unseenIndices.splice(randomIndex, 1)[0];
}

$(function () {
  async function loopTextChange(fadeOut: boolean) {
    const randomIndex = getRandomIndex();
    await changeTextWithFade(texts[randomIndex], fadeOut);
    await new Promise((resolve) => setTimeout(resolve, 15000));
    loopTextChange(true);
  }

  loopTextChange(false);
});
