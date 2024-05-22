let basketCards = document.querySelectorAll('.basket-container');
let countContainers = document.querySelectorAll('.count-container');
let minuses = document.querySelectorAll('.minus');
let pluses = document.querySelectorAll('.plus');
let countes = document.querySelectorAll('.count');

//! Открытие счётчика
let i = 0;
basketCards.forEach(function (basket, indexBasket) {
  basket.addEventListener('click', function (elem) {
    elem.preventDefault();

    countContainers.forEach(function (countContainer, indexCount) {
      if (indexCount == indexBasket) {
        countContainer.classList.remove('disactive');
        basket.classList.add('disactive');
      }
    });

    pluses.forEach(function (plus, indexPlus) {
      if (indexPlus == indexBasket) {
        plus.addEventListener('click', function (elem) {
          i++;
          countes.forEach(function (count, indexCount) {
            if (indexCount == indexBasket) {
              count.innerHTML = `${i}`;
            }
          });
        });
      }
    });
    minuses.forEach(function (minus, indexMinus) {
      if (indexMinus == indexBasket) {
        minus.addEventListener('click', function (elem) {
          elem.preventDefault();
          i--;
          countes.forEach(function (count, indexCount) {
            if (indexCount == indexBasket) {
              count.innerHTML = `${i}`;
              if (i <= 0) {
                i = 0;
              }
            }
          });
        });
      }
    });
  })
})