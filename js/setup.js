'use strict';

var setup = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');


var WIZARDS_COUNT = 4;
var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

// Функция, для случайного выбора из списка элементов для персонажа
var getRandom = function (array) {
  var randomElement = Math.floor(Math.random() * array.length);
  return randomElement;
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


setup.classList.remove('hidden');
setup.querySelector('.setup-similar').classList.remove('hidden');


var getWizards = makeArrayWizards();
appendWizards(getWizards);
