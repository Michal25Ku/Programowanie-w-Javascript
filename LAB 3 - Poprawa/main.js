const sounds = 
{
    'q': document.querySelector('#s1'),
    'w': document.querySelector('#s2'),
    'e': document.querySelector('#s3'),
    'r': document.querySelector('#s4'),
    't': document.querySelector('#s5'),
    'y': document.querySelector('#s6'),
    'u': document.querySelector('#s7'),
    'i': document.querySelector('#s8'),
    'o': document.querySelector('#s9'),
}

addEventListener('keypress',(ev)=>
{
    const key = ev.key

    const sound = sounds[key]
    sound.currentTime= 0
    sound.play()

    if (currentChannel !== null) 
    {
        channels[currentChannel].push({ soundToPlay: sound, time: Date.now() - startTime });
    }
})

const channels = [[], [], [], []];
let currentChannel = null;
let startTime = 0;

document.getElementById('record-channel-1').addEventListener('click', () => startRecording(0));
document.getElementById('record-channel-2').addEventListener('click', () => startRecording(1));
document.getElementById('record-channel-3').addEventListener('click', () => startRecording(2));
document.getElementById('record-channel-4').addEventListener('click', () => startRecording(3));

document.getElementById('play-channel-1').addEventListener('click', () => playChannel(0));
document.getElementById('play-channel-2').addEventListener('click', () => playChannel(1));
document.getElementById('play-channel-3').addEventListener('click', () => playChannel(2));
document.getElementById('play-channel-4').addEventListener('click', () => playChannel(3));
document.getElementById('play-channels').addEventListener('click', playSelectedChannels);
//document.getElementById('play-all').addEventListener('click', playAllChannels);

function startRecording(channel) 
{
    currentChannel = channel;
    channels[channel] = [];
    startTime = Date.now();
}

function playChannel(channel) 
{
    channels[channel].forEach(note => 
    {
        setTimeout(() => note.soundToPlay.play(), note.time);
    });
}

function playSelectedChannels() 
{
    const selectedChannels = []
    if(document.getElementById('channel1-checkbox').checked)
        selectedChannels.push(channels[0])

    if(document.getElementById('channel2-checkbox').checked)
        selectedChannels.push(channels[1])

    if(document.getElementById('channel3-checkbox').checked)
        selectedChannels.push(channels[2])

    if(document.getElementById('channel4-checkbox').checked)
        selectedChannels.push(channels[3])

    selectedChannels.forEach(channel => 
    {
        channel.forEach(note =>
        {
            setTimeout(() => note.soundToPlay.play(), note.time)
        })
    })
}

let metronomeInterval = null
let isMetronomeOn = false
let metronomeSound = new Audio("./sounds/boom.wav") // jakiś przykładowy dźwięk z istniejącej puli

document.getElementById('metronome-on-off').addEventListener('click', OnOffMetronome)

function OnOffMetronome() 
{
    if (isMetronomeOn) 
    {
        clearInterval(metronomeInterval)
        isMetronomeOn = false
    } 
    else 
    {
        const bpm = document.getElementById('bpm').value
        const interval = 60000 / bpm
        isMetronomeOn = true
        metronomeInterval = setInterval(() => 
        {
            metronomeSound.currentTime = 0
            metronomeSound.play()
        }, interval)
    }
}
