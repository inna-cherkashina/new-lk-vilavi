
//^ Карта START
function init() {
  myMap = new ymaps.Map('map', {
    center: [55.108939610806985, 82.97653836066765],
    zoom: 16
  }, {
    searchControlProvider: 'yandex#search'
  });

  var myPlacemark;

  //~ Слушаем клик на карте.
  myMap.events.add('click', function (e) {
    var coords = e.get('coords');
    let deliverySidebar = document.querySelector('.goods-delivery-point__container');
    let courierSidebar = document.querySelector('.goods-courier-point__container');

    deliverySidebar.classList.add('delivery-section--disactive');
    deliverySidebar.classList.remove('delivery-section--active');
    courierSidebar.classList.add('courier-section--active');
    courierSidebar.classList.remove('courier-section--disactive');

    //~ Если метка уже создана – просто передвигаем ее.
    if (myPlacemark) {
      myPlacemark.geometry.setCoordinates(coords);
    }
    //~ Если нет – создаем.
    else {
      myPlacemark = createPlacemark(coords);
      myMap.geoObjects.add(myPlacemark);
      //~ Слушаем событие окончания перетаскивания на метке.
      myPlacemark.events.add('dragend', function () {
        getAddress(myPlacemark.geometry.getCoordinates());
      });
    }
    getAddress(coords);
  });

  //~ Создание метки.
  function createPlacemark(coords) {
    return new ymaps.Placemark(coords, {
      iconCaption: 'поиск...'
    }, {
      preset: 'islands#violetDotIconWithCaption',
      draggable: true
    })
  }

  //~ Определяем адрес по координатам (обратное геокодирование).
  function getAddress(coords) {
    myPlacemark.properties.set('iconCaption', 'поиск...');
    ymaps.geocode(coords).then(function (res) {
      var firstGeoObject = res.geoObjects.get(0);

      myPlacemark.properties
        .set({
          //~ Формируем строку с данными об объекте.
          iconCaption: [
            //~ Название населенного пункта или вышестоящее административно-территориальное образование.
            firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
            //~ Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
          ].filter(Boolean).join(', '),
          //~ В качестве контента балуна задаем строку с адресом объекта.
          balloonContent: firstGeoObject.getAddressLine()
        });
    });
  }
}
ymaps.ready(init);

//^ Карта END

//^ Чёрная клизма, бегающая за курсором на карте START
mapBox = document.getElementById("map")
mapBox.onmousemove = function (e) {
  img = document.querySelector(".black-klizma");
  if (e.clientY + img.clientHeight <= mapBox.offsetTop + mapBox.clientHeight) {
    img.style.top = e.clientY - 50 + "px";
  }
  if (e.clientX + img.clientWidth <= mapBox.offsetLeft + mapBox.clientWidth) {
    img.style.left = e.clientX - 15 + "px";
  }
}
//^ Чёрная клизма, бегающая за курсором на карте END

//^Служба выдачи START
let servise = document.querySelector('.point-list');
let servisesArrow = document.querySelector('.point-list img');
let serviseList = document.querySelector('.point-list__scroll-box');
let serviseCross = document.querySelector('.cross-img');

servise.addEventListener('click', function (e) {
  e.preventDefault();
  servisesArrow.classList.add('rotaite');
  servise.classList.add('point-list--active');
  serviseList.classList.add('point-list__scroll-box--active');
});

serviseCross.addEventListener('click', function (e) {
  servisesArrow.classList.remove('rotaite');
  servise.classList.remove('point-list--active');
  serviseList.classList.remove('point-list__scroll-box--active');

});

let servisesItems = document.querySelectorAll('.goods-delivery-point__item');
servisesItems.forEach(function (servisItem) {
  servisItem.addEventListener('click', function (elem) {
    let target = elem.target;
    target.closest('.goods-delivery-point__item').querySelector('.description-more').classList.toggle('description-more--disactive');
    servisItem.classList.toggle('goods-delivery-point__item--active');
  })
});

//^ Служба выдачи END

//^ Адрес доставки курьером форма START

let labelForm = document.querySelectorAll('.lable-title');
let inputAdress = document.querySelectorAll('.input-adress');
inputAdress.forEach(function (inp) {
  inp.addEventListener('click', function (elem) {
  let target = elem.target;
  console.log(target);
  target.closest('.adress__container').querySelector('.lable-title').classList.add('active-adress');
})

})

//^ Адрес доставки курьером форма END