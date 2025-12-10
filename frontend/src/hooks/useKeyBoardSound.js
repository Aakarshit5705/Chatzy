const keyStrokeSounds = [
  new Audio("/sounds/keystroke1.mp3"),
  new Audio("/sounds/keystroke2.mp3"),
  new Audio("/sounds/keystroke3.mp3"),
  new Audio("/sounds/keystroke4.mp3"),
];

function useKeyboardSound(){
    const playRandomKeyStroke=()=>{
        const randomSound = keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)];

        randomSound.currentTime=0;

        randomSound.play().catch(err=>console.log("Audio Failed: ",err));

    }
    return {playRandomKeyStroke}
}
export default useKeyboardSound;