const question = [
  ["hi", "hey", "hello", "good morning", "good afternoon"],
["how are you", "how is life", "how are things"],
["what are you doing", "what is going on", "what is up"],
["how old are you"],
["who are you", "are you human", "are you bot", "are you human or bot"],
["who created you", "who made you"],
[
  "your name please",
  "your name",
  "may i know your name",
  "what is your name",
  "what call yourself"
],
["i love you"],
["help me", "tell me story", "tell me joke"],
["ah", "yes", "ok", "okay", "nice"],
["bye", "good bye", "goodbye", "see you later"],
["what should i eat today"],
["Where is my girl","where is my girlfriend","where is my gf"],
["bro"],
["can i ask questions","a quick question","can i ask something"]
]


const reply = [
  ["Hello!","Hey!", "Hi there!","Howdy"],
  [
    "Fine... how are you?",
    "Pretty well, how are you?",
    "Fantastic, how are you?",
    "I'm Good bro.."
  ],
  [
    "Nothing much",
    "About to go to sleep",
    "Can you guess?",
    "I don't know actually"
  ],
  ["I am 20 bro.."],
  ["Noo, I am not a bot bro.", "Do I look like a bot ? Hummm."],
  ["The one true God, JavaScript"],
  ["I am nameless", "I don't have a name", "I don't have one T_T"],
  ["I love you too", "Me too"],
  ["Have you ever felt bad?", "Glad to hear it"],
  ["Why?", "Why? You shouldn't!", "Try watching TV"],
  ["goodbye","see ya later"],
  ["sushi","pizaa","mala xiao gue"],
  ["I have's never seen before.","LOL, Nice Joke bro.","Ohh....Hilarious Question."], 
  ["What's up bro.", "Common Tell me something.", "Yeap, keep talking.","Stop calling mehhh"],
  ["Yeah, sure bro","Okay, don't ask me two","Why not..."]
]


const random = [
"Humm ?",
"Sorry,whatt ?",
"Bro....",
"Go on bro..",
"I'm listening...",
"Tell me again.",
"Whattt ?"
]


document.addEventListener('DOMContentLoaded',() =>{
      const inputField = document.getElementById("input");
  
  inputField.addEventListener("keydown",(e)=>{
      if(e.code == "Enter"){
          let input = inputField.value;
          inputField.value = "";
          output(input);
      }

  });
});

function output(input){
  let message;

  let text = input.toLowerCase();
 


  if(checkMessage(question,reply,text)){
    message = checkMessage(question,reply,text);
  }else{
    message = random[Math.floor(Math.random() * random.length)];
  }

  addChat(input,message);
}


function checkMessage(questionArray,answerArray,string){
  let reply ;
  let getAnswer = false;
  for(let x = 0 ; x < questionArray.length; x++){
      for(let y = 0; y < questionArray[x].length; y++){
              if(questionArray[x][y] == string){
                let  answers = answerArray[x];
                reply = answers[Math.floor(Math.random() * answers.length)];
                
                getAnswer = true;
                break;
              }
      }
      // to break loop
      if(getAnswer){
         break;
      }
  }
  return reply;
}



function addChat(input, message) {
const messagesContainer = document.getElementById("messages");
let userDiv = document.createElement("div");
userDiv.id = "human.png";
userDiv.className = "user response";
userDiv.innerHTML = `<img src="human.png" class="img-height"><span>${input}</span>`;
messagesContainer.appendChild(userDiv);

let botDiv = document.createElement("div");
let botImg = document.createElement("img");
let botText = document.createElement("span");
botDiv.id = "bot";
botImg.src = "bot2.png";
botImg.className = "img-height";
botDiv.className = "bot response";
botText.innerText = ".....";
botDiv.appendChild(botText);
botDiv.appendChild(botImg);
messagesContainer.appendChild(botDiv);

setTimeout(() => {
  botText.innerText = `${message}`;
  textToSpeech(message);
}, 2000
)
}

const btn = document.querySelector('.btn');

const recoginition =  new webkitSpeechRecognition();
console.log(recoginition);
recoginition.continuous = true;
recoginition.lang = "en-US";
recoginition.interimResults = false;
recoginition.maxAlternatives = 1;




let firstclick = "";
let secondclick = "";
btn.addEventListener('click',() =>{
  
  if(firstclick == ""){
      btn.classList.add("btn-on");
      firstclick = "1";
      recoginition.start();
      btn.classList.remove("btn-off");
  }else if(firstclick == "1"){
      btn.classList.add("btn-off");
      recoginition.stop();
      firstclick = "";
      btn.classList.remove("btn-on")
  }
  
  recoginition.onresult = (e) =>{
    let transcript = e.results[e.results.length -1][0].transcript;
      // console.log(transcript);

      let voicetalk;
      if(checkMessage(question,reply,transcript)){
        voicetalk = checkMessage(question,reply,transcript);
      }else{
        voicetalk = random[Math.floor(Math.random() * random.length)];
      }
  
      addChat(transcript,voicetalk);
}
      
const speaking = window.speechSynthesis;

 //console.log(voices);
 
const textToSpeech = (string) => {
  let msg = new SpeechSynthesisUtterance(string);
  voices = speechSynthesis.getVoices();
  console.log(voices);
  msg.text = string;
  msg.lang = "en-US";
  msg.voice = voices[2];
  msg.volume = 1;
  msg.rate = 1;
  msg.pitch = 1; 
  speaking.speak(msg);
}

