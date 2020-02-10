'use strict';

var setup = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');


var WIZARDS_COUNT = 4;
var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// Функция, для случайного выбора из списка элементов для персонажа
var getRandom = function (array) {
  return Math.floor(Math.random() * array.length);
};


// Функция, для создания массива состоящий из 4-х сгенерированных JS объектов, которые будут описывать похожих персонажей.
var makeArrayWizards = function () {
  var wizardsArray = [];

  for (var i = 0; i < WIZARDS_COUNT; i++) {
    wizardsArray[i] = {
      name: WIZARDS_NAMES[getRandom(WIZARDS_NAMES)],
      surname: WIZARDS_SURNAMES[getRandom(WIZARDS_SURNAMES)],
      coatColor: COAT_COLORS[getRandom(COAT_COLORS)],
      eyeColor: EYE_COLORS[getRandom(EYE_COLORS)],
    };
  }
  return wizardsArray;
};

// Функция для изменения характеристик персонажа
var renderWizard = function (wizard, nodeElement) {
  nodeElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  nodeElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  nodeElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;
  return nodeElement;
};

// Добавление в DOM
var appendWizards = function (wizArr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement = renderWizard(wizArr[i], wizardElement);
    fragment.appendChild(wizardElement);
  }
  similarListElement.appendChild(fragment);
};


// setup.classList.remove('hidden');
setup.querySelector('.setup-similar').classList.remove('hidden');


var getWizards = makeArrayWizards();
appendWizards(getWizards);


// module4-task1

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};


var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};


setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

// Изменение настроек персонажа(цвет мантии, цвет глаз, фаербола
var setupPlayer = document.querySelector('.setup-player');
var inputSetup = setupPlayer.querySelectorAll('input');


var getInput = function (inputName) {
  for (var i = 0; i < inputSetup.length; i++) {
    if (inputSetup[i].name === inputName) {
      return inputSetup[i];
    }
  }
};

// var changeHandler = function (evt) {
//   var ss = evt.target;
//   console.log(ss);
//   ss.style.fill = COAT_COLORS[getRandom(COAT_COLORS)];
// }
//
// setupPlayer.addEventListener('click', changeHandler);


var setupCoatWizardColor = document.querySelector('.wizard-coat');
setupCoatWizardColor.addEventListener('click', function () {
  setupCoatWizardColor.style.fill = COAT_COLORS[getRandom(COAT_COLORS)];
  var inputCoat = getInput('coat-color');
  inputCoat.value = setupCoatWizardColor.style.fill;
});

var setupEyesWizardColor = document.querySelector('.wizard-eyes');
setupEyesWizardColor.addEventListener('click', function () {
  setupEyesWizardColor.style.fill = EYE_COLORS[getRandom(EYE_COLORS)];
  var inputEyes = getInput('eyes-color');
  inputEyes.value = setupEyesWizardColor.style.fill;
});

var setupFireballColor = document.querySelector('.setup-fireball-wrap');
setupFireballColor.addEventListener('click', function () {
  setupFireballColor.style.backgroundColor = FIREBALL_COLOR[getRandom(FIREBALL_COLOR)];
  var inputFireball = getInput('fireball-color');
  inputFireball.value = setupFireballColor.style.backgroundColor;
});


