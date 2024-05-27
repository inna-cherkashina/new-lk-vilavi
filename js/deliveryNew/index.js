let basketCards = document.querySelectorAll('.basket-container');
let countContainers = document.querySelectorAll('[data-count]');

//! Открытие счётчика START
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
//! Открытие счётчика FINISH

//! Появление шапки при скролле страницы START
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
//! Появление шапки при скролле страницы FINISH

//! Открытие блока с корзиной товара START
let basketCLose = document.querySelector('.basket-close');
let basketContainer = document.querySelector('.basket-field-container');
let basketOpen = document.querySelectorAll('.icons-box svg');
let bodyPage = document.querySelector('body');

basketOpen.forEach(function (basket) {
  basket.addEventListener('click', function (e) {
    e.preventDefault();
    basketContainer.classList.remove('basket-container__disactive');
    basketContainer.classList.add('basket-container__active');
    bodyPage.classList.add('scroll-disactive');
  })
})
basketCLose.addEventListener('click', function (e) {
  e.preventDefault();
  basketContainer.classList.add('basket-container__disactive');
  basketContainer.classList.remove('basket-container__active');
  bodyPage.classList.remove('scroll-disactive');
})

//! Открытие блока с корзиной товара FINISH

