// მოცემული ფუნქცია გამოიყენება თამაშის თავიდან დაწყებისთვის, როდიესაც მომხმარებელი დაამთავრებს ყველა რაუნდს
function reset() {
    round = 0;
    blocks = [];

    parentContainer.children[0].remove();

    initialization();

    button.innerText = 'Play';
}

// მოცემული ფუნქცია ახდეს ყველა აუცილებელი ბლოკის ინიზიალიზაციას თამაშის დასაწყებად
function initialization() {
    for (let i = 0; i < 16; i++) {
        let block = document.createElement('div');

        block.classList.add('block');
        block.id = `block${i}`;

        if (i >= 0 && i < 4) {
            block.classList.add('group1');
        } else if (i >= 4 && i < 8) {
            block.classList.add('group2');
        } else if (i >= 8 && i < 12) {
            block.classList.add('group3');
        } else if (i >= 12 && i < 16) {
            block.classList.add('group4');
        }

        blocks.push(block);
        parentContainer.appendChild(block);
    }

    blocks[0].innerText = '1x0';
    blocks[1].innerText = '1x1';
    blocks[2].innerText = '1x2';
    blocks[3].innerText = '1x3';
    blocks[4].innerText = '2x0';
    blocks[5].innerText = '2x1';
    blocks[6].innerText = '2x2';
    blocks[7].innerText = '2x3';
    blocks[8].innerText = '3x0';
    blocks[9].innerText = '3x1';
    blocks[10].innerText = '3x2';
    blocks[11].innerText = '3x3';
    blocks[12].innerText = '4x0';
    blocks[13].innerText = '4x1';
    blocks[14].innerText = '4x2';
    blocks[15].innerText = '4x3';
}

// ეს ფუნქცია მართავს თამაშის მსვლელობას
function playRound() {
    switch (round) {
        case 0:
            shuffle();
            break;

        case 1:
            updateBlocksContainer(blocks.length-9, 8);
            shuffle();
            break;

        case 2:
            updateBlocksContainer(blocks.length-5, 4);
            shuffle();
            break;

        case 3:
            shuffleSemiFinal();
            break;

        case 4:
            finalResult();
            break;

        case 5:
            reset();
            break;
    }
}

// ეს ფუნქცია გამოიყენება ბლოკების ასარევად, როდესაც დარჩენილი გვაქვს 16 ან 8 ბლოკი
function shuffle() {
    for (let i = 1; i <= 48; i++) {
        let element1Index = Math.floor(Math.random() * blocks.length);
        let element2Index = Math.floor(Math.random() * blocks.length);

        let element1 = blocks[element1Index];
        let element2 = blocks[element2Index];


        if (element1.previousElementSibling !== null && element1.nextElementSibling !== null &&
            element2.previousElementSibling !== null && element2.nextElementSibling !== null)
        {
            if ((element1.previousElementSibling.classList[1] !== element2.classList[1] &&
                    element1.nextElementSibling.classList[1] !== element2.classList[1]) &&
                (element2.previousElementSibling.classList[1] !== element1.classList[1] &&
                    element2.nextElementSibling.classList[1] !== element1.classList[1]))
            {
                shuffleBlocks(element1, element1Index, element2, element2Index);
            }
        }

        else if (!element1.previousElementSibling && !element2.nextElementSibling)
        {
            if (element1.nextElementSibling.classList[1] !== element2.classList[1]  &&
                element2.previousElementSibling.classList[1] !== element1.classList[1])
            {
                shuffleBlocks(element1, element1Index, element2, element2Index);
            }
        }

        else if (!element1.nextElementSibling && !element2.previousElementSibling)
        {
            if (element1.previousElementSibling.classList[1] !== element2.classList[1] &&
                element2.nextElementSibling.classList[1] !== element1.classList[1])
            {
                shuffleBlocks(element1, element1Index, element2, element2Index);
            }
        }
    }

    round++;
}

// ეს ფუნქცია გამოიყენება მაშინ, როდესაც 4 ბლოკი გვაქვს ასარევი
function  shuffleSemiFinal() {
    let isPairFound = false;

    for (let i = 0; i < blocks.length; i++) {
        for (let j = i + 1; j < blocks.length; j++) {
            if (blocks[i].classList[1] === blocks[j].classList[1]) {
                console.log('works');

                blocks.splice(i, 1);
                blocks.splice(j-1, 1);

                parentContainer.replaceChildren(...blocks);

                isPairFound = true;
            }
        }
    }

    if (!isPairFound) {
        let randomIndex1 = Math.floor(Math.random() * blocks.length);
        blocks.splice(randomIndex1, 1);

        let randomIndex2 = Math.floor(Math.random() * blocks.length);
        blocks.splice(randomIndex2, 1);

        parentContainer.replaceChildren(...blocks);
    }

    round++;
}

// ეს ფუნქცია 2 დარჩენილი ბლოკიდან რანდომულად ირჩევს 1-ს და გამარჯვებულად აცხადებს.
function finalResult() {
    let randElementIndex = Math.floor(Math.random() * blocks.length);

    blocks.splice(randElementIndex, 1);
    parentContainer.replaceChildren(...blocks);

    alert(`Block ${blocks[0].innerText} is winner!`);

    button.innerText = 'Restart';

    round++;
}

// ეს არის დამხმარე ფუნქცია, რომელიც ორ ბლოკს ადგილებს უცვლის
function shuffleBlocks(element1, element1Index, element2, element2Index) {
    blocks[element1Index] = element2;
    blocks[element2Index] = element1;

    parentContainer.replaceChildren(...blocks);
}

// ეს არის დამხმარე ფუნქცია, რომელიც blocks მასივში startIndex-დან აშორებს deleteCount-ის ოდენობის ელემენტს,
// რომლის შემდგომ parentContainer კონტეინერი განახლდება ახალი blocks მასივით
function updateBlocksContainer(startIndex, deleteCount) {
    blocks.splice(startIndex, deleteCount);

    parentContainer.replaceChildren(...blocks);
}


const parentContainer = document.querySelector('.parentContainer');
const button = document.querySelector('button');
let blocks = [];

initialization();

let round = 0;

button.addEventListener("click", playRound);
