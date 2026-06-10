/* ==========================================================================
   1. ANIMACIÓN DE COMPORTAMIENTO DE FONDO MATRIX (CÁLIDO)
   ========================================================================== */
const canvas = document.getElementById('canvas-matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01❤️🔒✨🌾🍑🧡🌾".split("");
const fontSize = 15;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(21, 16, 10, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(240, 198, 140, 0.6)'; // Código color Ámbar
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 40);

window.addEventListener('resize', () => { 
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
});

/* ==========================================================================
   2. CONTROLADORES DE FLUJO DE LA APLICACIÓN
   ========================================================================== */
let savedName = "";
let chosenPlan = "";
const plans = ["Cine 🎬", "Helado 🍦", "Comida 🍔", "Shopping 🛍️", "Bolos 🎳", "Paseo 🌙"];

// Validar inicio de sesión
function validateLogin() {
    const input = document.getElementById('password-input');
    const errorBox = document.getElementById('error-box');
    const card = document.getElementById('card-1');

    if (input.value.trim().toLowerCase() === "lina") {
        savedName = input.value.trim();
        document.getElementById('display-name').innerText = savedName;
        card.classList.add('hidden');
        document.getElementById('card-2').classList.remove('hidden');
    } else {
        errorBox.style.display = "block";
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 400);
    }
}

// Escuchar tecla enter en el login
document.getElementById('password-input').addEventListener('keyup', (e) => { 
    if(e.key === 'Enter') validateLogin(); 
});

// Mecánica del casino giratorio
function startCasino() {
    const slotText = document.getElementById('casino-text');
    const btnAccept = document.getElementById('btn-accept');
    
    btnAccept.style.display = "none";
    slotText.className = "casino-strip active-spin";

    let timer = 0;
    const interval = setInterval(() => {
        slotText.innerText = plans[Math.floor(Math.random() * plans.length)];
        timer += 100;
        
        if (timer >= 2000) { 
            clearInterval(interval);
            chosenPlan = slotText.innerText;
            slotText.className = "casino-strip chosen-highlight";
            btnAccept.style.display = "inline-block";
        }
    }, 100);
}

// Avanzar a selección de horarios
function goToStep3() {
    document.getElementById('card-2').classList.add('hidden');
    document.getElementById('card-3').classList.remove('hidden');
}

// Generar pantalla final
function goToFinal() {
    const timeSelected = document.querySelector('input[name="time-pick"]:checked').value;
    const locationSelected = document.querySelector('input[name="location-pick"]:checked').value;
    
    document.getElementById('card-3').classList.add('hidden');
    
    document.getElementById('final-text').innerHTML = `Quedamos confirmados para ir a <b>${chosenPlan}</b> a las <b>${timeSelected}</b>.<br><br>Acordamos: <b>Pasaré a ${locationSelected}</b>.`;
    document.getElementById('card-4').classList.remove('hidden');
}