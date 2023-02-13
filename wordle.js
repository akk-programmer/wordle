game = {
    line: 1,
    word: '',

    checkList: function(list) {
        for (var i = 0; i < list.length; i++) {
            if (list[i] !== 'true') {
                return false;
            }
        }
    },

    check: function(word, id) {
        var wordToCheck = word;
        var input = id;
        fetch('words.txt')
        .then(response => response.text())
        .then(function(data) {
            if (data.includes(wordToCheck)) {
                results = [];

                for (var i = 0; i < wordToCheck.length; i++) {
                    if (wordToCheck[i] === game.word[i]) {
                        results.push('true');
                    } else if (game.word.indexOf(wordToCheck[i]) !== -1) {
                        results.push('placement');
                    } else if (game.word.indexOf(wordToCheck[i]) === -1 && wordToCheck[i] !== game.word[i]) {
                        results.push('false');
                    }
                }
    
                for (var i = 0; i < results.length; i++) {
                    if (results[i] === 'false') {
                        document.getElementById(input.id[0] + String(i + 1)).className = 'grey';
                    } else if (results[i] === 'true') {
                        document.getElementById(input.id[0] + String(i + 1)).className = 'green';
                    } else if (results[i] === 'placement') {
                        document.getElementById(input.id[0] + String(i + 1)).className = 'yellow';
                    }
                }

                first.readOnly = true;
                second.readOnly = true;
                third.readOnly = true;
                fourth.readOnly = true;
                input.readOnly = true;

                if (game.line === 6 || game.checkList(results) !== false) {
                    document.querySelectorAll('input[type="text"]').forEach(input => {
                        input.readOnly = true;
                    });

                    if (game.line === 6) {
                        setTimeout(() => {
                            alert(`The word was ${game.word}!`)
                        }, 1500)
                    }
                } else {
                    elementToFocus = [String(Number(input.id[0]) + 1), 1];
                    document.getElementById(elementToFocus.join('')).focus();
                    game.line++;
                }

            } else {
                alert('Oops. This is not a word. Enter a different one...')
            }
        });
    },
}

document.querySelectorAll('input[type=text]').forEach(input => {
    input.onkeyup = (event) => {
        onEnter(event, input);
    }
});

function onEnter(event, input) {
    if (input.id[1].indexOf('5') === -1 && 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(event.key) !== -1) {
        elementToFocus = [String(input.id[0]), String(Number(input.id[1]) + 1)];
        document.getElementById(elementToFocus.join('')).focus();
    }

    if (event.keyCode === 8 && input.id[1] !== '1') {
        elementToFocus = [String(input.id[0]), String(Number(input.id[1]) - 1)];
        document.getElementById(elementToFocus.join('')).focus();
    }

    if (event.keyCode === 13) {
        if (input.id[1] == 5) {
            first = document.getElementById(input.id[0] + '1')
            second = document.getElementById(input.id[0] + '2')
            third = document.getElementById(input.id[0] + '3')
            fourth = document.getElementById(input.id[0] + '4')
            if (first.value && second.value && third.value && fourth.value && input.value) {

                inputWord = first.value + second.value + third.value + fourth.value + input.value;

                inputWord.toLowerCase();

                game.check(inputWord, input);
            }
        }
    }
}

function startGame() {
    fetch('words.txt')
    .then(response => response.text())
    .then(function(data) {
        listOfWords =  data.split('\n');
        randomNum = Math.floor(Math.random() * listOfWords.length);
        game.word = listOfWords[randomNum];
    })
}

window.onload = startGame;
document.querySelector('#mode').onclick = function() {
    if (this.innerHTML === 'Dark') {
        this.innerHTML = 'Light';
        document.body.style.backgroundColor = 'rgb(65, 65, 65)';
        document.getElementById('header').style.color = "white";
    } else if (this.innerHTML === 'Light') {
        this.innerHTML = 'Dark';
        document.body.style.backgroundColor = 'white';
        document.getElementById('header').style.color = "black";
    }
}

document.querySelector('#again').onclick = function() {
    document.querySelectorAll('input[type=text]').forEach(input => {
        input.readOnly = false;
        input.value = '';
        input.className = '';
        document.getElementById('11').focus();
    });

    game.line = 1;
    fetch('words.txt')
        .then(response => response.text())
        .then(function(data) {
            listOfWords =  data.split('\n');
            randomNum = Math.floor(Math.random() * listOfWords.length);
            game.word = listOfWords[randomNum];
        }
    )
}