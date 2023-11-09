export function checkLetter() {
    const keyboard = document.querySelectorAll('.key');
    console.log("hier der queryselector");
    console.log(keyboard);
    console.log(keyboard.button);
    keyboard.forEach(key => { key.addEventListener("click", function(e) {
            const entry = [e.target.value, e.target.value.toLowerCase()];
        });    
    });
    
}