const htmlElements = [
    {
        question: `
            <section class="game__question">
                <img src="../images/put.jpg" alt="Приключение в лесу" class="game__image">
                <p class="game__text">Во время путешествия по лесу вы потерялись и перед вами оказалось 3 пути, всё таки получилось прям как в мультике. По какому вы решите пойти?</p>
                <div class="game__items">
                    <button class="game__option" onclick="checkAnswer('a', 0)">A) Левый путь</button>
                    <button class="game__option" onclick="checkAnswer('b', 0)">B) Средний путь</button>
                    <button class="game__option" onclick="checkAnswer('c', 0)">C) правый путь</button>
                </div>
            </section>
        `,
        influence: { selfish: 1, curiosity: 0, destruction: 0 },
        correctAnswer: null
    },
    {
        question: `
            <section class="game__question">
                <img src="../images/moster.jpg" alt="Приключение в лесу" class="game__image">
                <p class="game__text">Как только вы выбрали путь, из кустов выпрыгнул монстр, что вы будете делать?</p>
                <div class="game__items">
                    <button class="game__option" onclick="checkAnswer('a', 1)">A) Бросится бежать</button>
                    <button class="game__option" onclick="checkAnswer('b', 1)">B) Попытаться заговорить</button>
                    <button class="game__option" onclick="checkAnswer('c', 1)">C) Напасть</button>
                </div>
            </section>
        `,
        influence: { selfish: 1, curiosity: 1, destruction: 0 },
        correctAnswer: null
    },
    {
        question: `
            <section class="game__question">
                <img src="../images/sword.jpg" alt="Приключение в лесу" class="game__image">
                <p class="game__text">Мостр решил не дожидаться вашего решения и убежал сам, вы пошли дальше по тропинке и нашли меч, что вы будете делать?</p>
                <div class="game__items">
                    <button class="game__option" onclick="checkAnswer('a', 2)">A) Взять меч</button>
                    <button class="game__option" onclick="checkAnswer('b', 2)">B) Осмотреть меч</button>
                    <button class="game__option" onclick="checkAnswer('c', 2)">C) Обойти стороной</button>
                </div>
            </section>
        `,
        influence: { selfish: 1, curiosity: 0, destruction: 1 },
        correctAnswer: null
    },
    {
        question: `
            <section class="game__question">
            <img src="../images/darksword.jpg" alt="Приключение в лесу" class="game__image">
                <p class="game__text">Вы чувствуете как меч пытается с вами заговорить у вас в голове, он спрашивает хотели бы вы изменить этот мир и рассказывает о том каким бы мир мог бы быть. Каков ваш выбор?</p>
                <div class="game__items">
                    <button class="game__option" onclick="checkAnswer('a', 3)">A) Изменить мир</button>
                    <button class="game__option" onclick="checkAnswer('b', 3)">B) Уничтожить артефакт</button>
                    <button class="game__option" onclick="checkAnswer('c', 3)">C) Оставить всё как есть</button>
                </div>
            </section>
        `,
        influence: { selfish: 0, curiosity: 1, destruction: 1 },
        correctAnswer: null
    },
    {
        question: `
            <section class="game__question">
            <img src="../images/swordlight.jpg" alt="Приключение в лесу" class="game__image">
                <p class="game__text">Вы чувствуете, что меч начинает менять вас. Его энергия проникает в ваше сознание, заполняя его мыслями о могуществе и опасности. Это ваш последний шанс принять решение. Что вы сделаете?</p>
                <div class="game__items">
                    <button class="game__option" onclick="checkAnswer('a', 4)">A) Использовать его силу</button>
                    <button class="game__option" onclick="checkAnswer('b', 4)">B) Разрушить его окончательно</button>
                    <button class="game__option" onclick="checkAnswer('c', 4)">C) Передать его другому</button>
                </div>
            </section>
        `,
        influence: { selfish: 1, curiosity: 0, destruction: 1 },
        correctAnswer: null
    }
];

let currentStep = 0;
let countSuccessAnswer = 0;
let countErrorAnswer = 0;

let answers = []

function setGame(step) {
    const headerElement = document.querySelector('.game__header');
    headerElement.classList.add('hidden');
    const mainElement = document.querySelector('.game__main');

    mainElement.innerHTML = htmlElements[step].question;
}

let influenceScores = { selfish: 0, curiosity: 0, destruction: 0 };

function checkAnswer(option, step) {
    const influences = htmlElements[step].influence;

    switch (option) {
        case 'a':
            influenceScores.selfish += influences.selfish;
            influenceScores.curiosity += influences.curiosity;
            influenceScores.destruction += influences.destruction;
            break;
        case 'b':
            influenceScores.selfish += influences.selfish;
            influenceScores.curiosity += influences.curiosity;
            influenceScores.destruction += influences.destruction;
            break;
        case 'c':
            influenceScores.selfish += influences.selfish;
            influenceScores.curiosity += influences.curiosity;
            influenceScores.destruction += influences.destruction;
            break;
        default:
            break;
    }

    answers.push(option);
    nextStep(option);

}

function nextStep(option) {
    currentStep++;
    if (currentStep == 4 && option == 'b'){
        showFinalScreen("v");
        return
    }
    if (currentStep < htmlElements.length) {
        setGame(currentStep);
    } else {
        showFinalScreen(option);
    }
}
function restartGame() {
    currentStep = 0;
    influenceScores = { selfish: 0, curiosity: 0, destruction: 0 };
    answers = [];

    const headerElement = document.querySelector('.game__header');
    headerElement.classList.remove('hidden');

    const mainElement = document.querySelector('.game__main');
    setGame(currentStep);
}

function logInfluenceScores() {
    console.log("Текущие категории влияния и их значения:");

    for (const category in influenceScores) {
        console.log(`${category}: ${influenceScores[category]}`);
    }

    console.log("Конец списка категорий.");
}

function showFinalScreen(option) {
    const mainElement = document.querySelector('.game__main');
    let finalText;
    switch (option) {
        case 'a':
            finalText = 'Решив использовать силу меча, вы почувствовали, как его энергия вливается в ваше тело. Каждая клетка вашего существа наполнилась мощью, выходящей за рамки человеческого понимания.\nСила, которую вы обрели, оказалась бесконечной, но вместе с ней пришло и неизбежное проклятие. Ваш разум начал медленно растворяться в потоках чужих мыслей и желаний, оставленных теми, кто владел артефактом до вас.\nВы обрели контроль над миром, но потеряли контроль над собой. Теперь вы существуете как бессмертный страж артефакта, который питает свои силы за счёт вашей души. Каждый ваш шаг меняет реальность, но истинного счастья вы больше никогда не почувствуете.';
            break;
        case 'b':
            finalText = 'Вы собрали всю свою волю, чтобы разрушить меч. Ваше сердце сжалось от осознания того, какую мощь вы уничтожаете. В момент удара артефакт вспыхнул ослепительным светом, и вы почувствовали, как его энергия поглощает всё вокруг.\nКогда свет исчез, вы оказались на месте, где всё стало тихим и пустым. Мир вернулся в равновесие, но следы силы артефакта остались в вашем теле. Люди будут помнить вас как героя, принесшего жертву ради общего блага, но вы останетесь с ощущением потери чего-то великого.';
            break;
        case 'c':
            finalText = 'Вы посмотрели на меч в последний раз и передали его другому. Вы выбрали путь доверия, решив, что кто-то ещё сможет использовать эту силу более разумно.\nОтдавая артефакт, вы почувствовали, как тяжесть его силы покидает вас. Ваша душа вновь стала свободной, но вопрос «правильно ли вы поступили?» будет преследовать вас до конца ваших дней.\nВозможно, тот, кому вы передали артефакт, сможет найти способ изменить мир. Или же он станет жертвой той силы, от которой вы отказались. Это останется тайной, но вы будете жить, зная, что ваш выбор был гуманным.';
            break;
        case 'v':
            finalText = 'Меч отомстил за вашу дерзость\nСжав меч в руках, вы приняли решительное решение уничтожить его. Ваша сила воли боролась с его древней энергией, но артефакт был не просто объектом.\nВ тот момент, когда вы нанесли решающий удар, пространство вокруг вас замерло. Казалось, время остановилось, и мир погрузился в абсолютную тишину.';
            break;
        default:
            finalText = 'Ваш выбор не определён. Что-то пошло не так.';
    }

    mainElement.innerHTML = `
        <section class="game__final">
            <h2 class="game__text">${finalText}</h2>
            <button class="game__option" onclick="restartGame()">Начать заново</button>
        </section>
    `;
}