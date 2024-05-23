let basketCards = document.querySelectorAll('.basket-container');
let countContainers = document.querySelectorAll('[data-count]');

//! Открытие счётчика
basketCards.forEach(function (basket, B) {
  basket.addEventListener('click', function (e) {

    countContainers.forEach(function (countContainer, C) {
      let target = e.target;
      if (B == C) {
        countContainer.classList.remove('disactive');
        basket.classList.add('disactive');

      }
    })
  });
});

countContainers.forEach(function (countContainer) {
  countContainer.addEventListener('click', function (e) {
    let target = e.target;
    if (target.closest('.button-count')) {
      let resalt = parseInt(target.closest('.count-container').querySelector('input').value);
      if (target.closest('.plus')) {
        resalt++;
      } else {
        resalt--;
      }
      if (resalt <= 0) {
        resalt = 1;
        target.closest('.product-card').querySelector('.basket-container').classList.remove('disactive');
        target.closest('.product-card').querySelector('.count-container').classList.add('disactive');
      }
      target.closest('.count-container').querySelector('input').value = resalt;
    }

  })
});

//! Появление шапки при скролле страницы

let header = document.querySelector('.header-move');

window.addEventListener('scroll', function () {
  if (window.scrollY > 300) {
    header.classList.add('header-move__visible');
    header.classList.remove('header-move__hidden');
  }
  else {
    header.classList.remove('header-move__visible');
    header.classList.add('header-move__hidden');
  }
});

//! Открытие блока с корзиной товара