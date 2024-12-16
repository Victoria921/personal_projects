let erreurs_commises = 0;
let victoires = 0;
let defaites = 0;
function startGame() {
    let tableWords;
    let divBegin = document.getElementById('id-beginGame');
    let divGen = document.getElementById('id-divGen');
    let divDivGen = document.getElementById('div-div-gen');
    let divLostModal = document.getElementById('id-lostModal');
    let divImg = document.getElementById('id-img');
    let divImgGain = document.getElementById('id-gainModal');
    divImgGain.style.display = 'none';
    divGen.style.display = 'none';
    divDivGen.style.display = 'none';
    divLostModal.style.display = 'none';
    const startButton = document.getElementById('id-buttonStart');
    startButton.addEventListener('click', () => {
        tableWords = checkDifficulty();
        let audio = new Audio('./assets/sounds/son-mer.mp3');
        audio.play();
        audio.loop = true;
        audio.volume = 0.1;
        alphabetArray(tableWords);
        divImg.style.visibility = 'visible';
        divBegin.style.display = 'none';
        divGen.style.display = 'block';
        divDivGen.style.display = 'block';
    })
}


function checkDifficulty() {
    let buttonEasy = document.getElementById('id-easy');

    let buttonMedium = document.getElementById('id-medium');

    let buttonHard = document.getElementById('id-hard');
    if (buttonEasy.checked === false && buttonMedium.checked === false && buttonHard.checked === false) {
        alert('Veuillez sélectionner une difficulté');
    } else if (buttonEasy.checked === true) {
        tableWords = easyWords;

    } else if (buttonMedium.checked === true) {
        tableWords = middleWords;
    } else if (buttonHard.checked === true) {
        tableWords = hardWords;
    }
    return tableWords;

}



function alphabetArray(tableWords) {
    let alphabet = [];
    for (i = 65; i < 91; i++) {
        let str = String.fromCharCode(i);
        alphabet.push(str);

    }
    for (let k = 0; k < alphabet.length; k++) {
        j = Math.floor(Math.random() * alphabet.length);
        temp = alphabet[j];
        alphabet[j] = alphabet[k];
        alphabet[k] = temp;

    }



    let randomNumber = Math.floor(Math.random() * tableWords.length);

    let findWord = tableWords[randomNumber].split();

    let mot_a_trouver = tableWords[randomNumber].split('');

    let trMotATrouver = document.getElementById('id-trMotATrouver');
    trMotATrouver.innerHTML = '';
    let tdMotATrouver;

    for (let k = 0; k < mot_a_trouver.length; k++) {
        tdMotATrouver = document.createElement('td');
        tdMotATrouver.className = "class-tdMotATrouver";

        trMotATrouver.appendChild(tdMotATrouver);
        tdMotATrouver.textContent = '_';
        tdMotATrouver.id = `id_tdMotATrouver${k}`;
    }
    let ecartRapport;
    ecartRapport = calculEcartRapport(mot_a_trouver);

    let divAlphabet = document.getElementById('id-divAlphabet');
    divAlphabet.innerHTML = '';
    let counter = 0;

    for (let j = 0; j < alphabet.length; j++) {

        let randomPositionX = Math.floor(Math.random() * (7 + 7) - 7);
        let randomPositionY = Math.floor(Math.random() * (7 + 7) - 7);
        let randomHeight = Math.floor(Math.random() * (60 - 40) + 40);

        let randomWidth = randomHeight;
        let randomFontSize = randomHeight - 20;
        let randomDuration = Math.floor(Math.random() * (6 - 4) + 4);

        let divLetter = document.createElement('div');
        divLetter.className = "class-divLetter";
        divLetter.style.setProperty('--randomPositionX', `${randomPositionX}px`);



        divLetter.style.setProperty('--randomPositionY', `${randomPositionY}px`);
        divLetter.style.setProperty('--randomHeight', `${randomHeight}px`);

        divLetter.style.setProperty('--randomWidth', `${randomWidth}px`);

        divLetter.style.setProperty('--randomFontSize', `${randomFontSize}px`);
        divLetter.style.setProperty('--randomDuration', `${randomDuration}s`);



        divAlphabet.appendChild(divLetter);

        divLetter.textContent = alphabet[j];
        let bool = true;

        divLetter.addEventListener('click', (e) => {
            if (bool === true) {
                divLetter.style.cursor = 'default';
                divLetter.classList.add('class-bubble-explose');
                playBubblePop();


                e.target.animate([
                    {
                        background: 'url(./assets/bubble1.png)',
                        backgroundSize: 'contain',

                    },
                    {
                        background: 'url(./assets/bubble2.png)',
                        backgroundSize: 'contain',
                    },
                    {
                        background: 'url(./assets/bubble3.png)',
                        backgroundSize: 'contain',
                    }
                ], {

                    duration: 100,
                    fill: "forwards",
                });
                setTimeout(() => {
                    divLetter.style.opacity = "0%";

                }, 100);

                let arrayLostAlphabet = [];
                arrayLostAlphabet.push(alphabet[j]);
                console.log('arrayLostAlphabet', arrayLostAlphabet);
                

                let test = false;

                for (let k = 0; k < mot_a_trouver.length; k++) {
                    if (arrayLostAlphabet[0] === mot_a_trouver[k]) {

                        counter++;
                        test = true;
                        let tdMotATrouverId = document.getElementById(`id_tdMotATrouver${k}`);
                        tdMotATrouverId.textContent = mot_a_trouver[k];
                        const audio = new Audio('./assets/sounds/bateau-avance.mp3');
                        audio.play();
                        audio.volume = 0.1;
                        moveBoat(ecartRapport, counter);
                    }

                    if (counter === mot_a_trouver.length) {
                        victoires++;
                        let divImgGain = document.getElementById('id-gainModal');
                        let divGame = document.getElementById('id-game');
                        let restartGainButton = document.getElementById('id-restartGainButton');

                        setTimeout(() => {
                            const audio = new Audio('./assets/sounds/winSound.mp3');
                            audio.play();
                            audio.volume = 0.1;
                            divGame.style.display = 'none';
                            // divLostModal.style.display = "block";
                            divImgGain.style.display = 'block';


                        }, 3300);
                        let divVictoires = document.getElementById('id-victoiresGain');
                        divVictoires.textContent = `Vous avez gagné ${victoires} parties.`;

                        let divDefaites = document.getElementById('id-defaitesGain');
                        divDefaites.textContent = `Vous avez perdu ${defaites} parties.`;

                        let divPour = document.getElementById('id-pourGain');
                        divPour.textContent = `Votre pourcentage de victoire est de ${Math.ceil((victoires / (victoires + defaites)) * 100)}% .`;
                        restartGainButton.addEventListener('click', () => {

                            restartGame(divLetter, mot_a_trouver, findWord);
                        });


                    }
                }

                if (!test) {
                    erreurs_commises++;
                    if (erreurs_commises == 10) {
                        defaites++;
                        const audio = new Audio('./assets/sounds/loseSound.mp3');
                        audio.play();
                        audio.volume = 0.1;
                        let divBoat = document.getElementById('id-boat');
                        let infoPositionBoat = divBoat.getBoundingClientRect();
                        divBoat.classList.add('class-lost-boat');
                        divBoat.animate([
                            {
                                transform: ` translate(${Math.floor(infoPositionBoat.x)}px) rotateX(0)`,
                                transformOrigin: 'bottom',

                            },
                            {
                                transform: `translate(${Math.floor(infoPositionBoat.x)}px) rotateX(-180deg)`,
                                transformOrigin: 'bottom',
                            },
                            {
                                transform: `translate(${Math.floor(infoPositionBoat.x)}px) rotateX(-180deg) translateY(-800px)`,
                            }
                        ], {

                            duration: 2000,
                            fill: "forwards",
                        });
                        let divGame = document.getElementById('id-game');
                        let divLostModal = document.getElementById('id-lostModal');
                        let divContentLostModal = document.getElementById('id-contentModal');
                        let restartLostButton = document.getElementById('id-restartLostButton');

                        setTimeout(() => {
                            divGame.style.display = 'none';
                            divLostModal.style.display = "block";


                        }, 2000);
                        let pLost = document.createElement('p');
                        divContentLostModal.prepend(pLost);
                        pLost.className = 'class-pLost';
                        pLost.textContent = `Perdu ! Le mot était ${findWord}`;

                        let divVictoires = document.getElementById('id-victoiresLost');
                        divVictoires.textContent = `Vous avez gagné ${victoires} parties.`;

                        let divDefaites = document.getElementById('id-defaitesLost');
                        divDefaites.textContent = `Vous avez perdu ${defaites} parties.`;

                        let divPour = document.getElementById('id-pourLost');
                        divPour.textContent = `Votre pourcentage de victoire est de ${Math.ceil((victoires / (victoires + defaites)) * 100)}% .`;


                        restartLostButton.addEventListener('click', () => {
                            pLost.remove();

                            restartGame(divLetter, mot_a_trouver, findWord);
                        });


                    }
                }
                bool = false;
                const pErreurs = document.getElementById('id-pErreurs');
                pErreurs.className = 'class-pErreurs';
                pErreurs.textContent = `Erreurs commises : ${erreurs_commises}/10`;
            }
        });
    }
}

function playBubblePop() {
    const audio = new Audio('./assets/sounds/bulle-eclate.mp3');
    audio.play();
}


function calculEcartRapport(mot_a_trouver) {
    let divBoat = document.getElementById('id-boat');
    let infoPositionBoat = divBoat.getBoundingClientRect();

    let divIle = document.getElementById('id-ile');
    let infoPositionIle = divIle.getBoundingClientRect();

    let ecartIleBoat = (infoPositionIle.x - infoPositionBoat.x);
    let nbLetters = mot_a_trouver.length;
    let ecartRapport = (ecartIleBoat / nbLetters);
    return ecartRapport;
}

function moveBoat(ecartRapport, counter) {

    let divBoat = document.getElementById('id-boat');

    let move = (ecartRapport * counter);
    divBoat.animate([
        { transform: `translateX(${Math.floor(move)}px)` }
    ], {
        duration: 3000,
        fill: "forwards",
    });
}
function restartGame(divLetter, mot_a_trouver, findWord) {
    let divLostModal = document.getElementById('id-lostModal');
    let divBegin = document.getElementById('id-beginGame');
    let divBoat = document.getElementById('id-boat');
    let divGame = document.getElementById('id-game');
    const pErreurs = document.getElementById('id-pErreurs');
    divLostModal.style.display = 'none';
    divGame.style.display = 'block';
    divBegin.style.display = 'block';
    pErreurs.textContent = 'Erreurs commises :'
    divBoat.animate([
        {
            transform: ` translateX(0px) translateY(0px) rotateX(0)`,
            transformOrigin: 'top',

        }
    ], {

        duration: 1000,
        fill: "forwards",
    });
    divBoat.classList.remove('class-lost-boat');
    divLetter.style.animation = '';
    erreurs_commises = 0;

    mot_a_trouver.length = 0;
    findWord.length = 0;
}
startGame();