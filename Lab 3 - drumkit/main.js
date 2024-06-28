const sounds = {
    81: 'boom',
    87: 'clap',
    69: 'hihat',
    82: 'kick',
    84: 'openhat',
    89: 'ride',
    85: 'snare',
    73: 'tink',
    79: 'tom'
};

const channels = [[], [], [], []];
let currentChannel = null;
let startTime = 0;

document.addEventListener('keydown', playSound);
document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => playSound({ keyCode: key.dataset.key }));
});

document.getElementById('record-channel-1').addEventListener('click', () => startRecording(0));
document.getElementById('record-channel-2').addEventListener('click', () => startRecording(1));
document.getElementById('record-channel-3').addEventListener('click', () => startRecording(2));
document.getElementById('record-channel-4').addEventListener('click', () => startRecording(3));

document.getElementById('play-channel-1').addEventListener('click', () => playChannel(0));
document.getElementById('play-channel-2').addEventListener('click', () => playChannel(1));
document.getElementById('play-channel-3').addEventListener('click', () => playChannel(2));
document.getElementById('play-channel-4').addEventListener('click', () => playChannel(3));
document.getElementById('play-all').addEventListener('click', playAllChannels);

function playSound(e) {
    const sound = sounds[e.keyCode];
    if (!sound) return;

    const audio = new Audio(`sounds/${sound}.wav`);
    audio.currentTime = 0;
    audio.play();

    if (currentChannel !== null) {
        channels[currentChannel].push({ keyCode: e.keyCode, time: Date.now() - startTime });
    }
}

function startRecording(channel) {
    currentChannel = channel;
    channels[channel] = [];
    startTime = Date.now();
}

function playChannel(channel) {
    channels[channel].forEach(note => {
        setTimeout(() => {
            playSound({ keyCode: note.keyCode });
        }, note.time);
    });
}

function playAllChannels() {
    channels.forEach((channel, index) => {
        playChannel(index);
    });
}