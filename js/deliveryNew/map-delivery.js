
let labelForm = document.querySelectorAll('.lable-title');
let inputAdress = document.querySelectorAll('.input-adress');
let courierClose = document.querySelector('.courier-close');
let courierSidebar = document.querySelector('.goods-courier-point__container');
let deliverySidebar = document.querySelector('.goods-delivery-point__container');
let servise = document.querySelector('.point-list');
let servisesArrow = document.querySelector('.point-list img');
let serviseList = document.querySelector('.point-list__scroll-box');
let serviseCross = document.querySelector('.cross-img');

//^ Карта START
function init() {
  myMap = new ymaps.Map('map', {
    center: [55.082379, 82.967663],
    zoom: 11
  }, {
    searchControlProvider: 'yandex#search'
  });

  var myPlacemark;

  //~ Слушаем клик на карте.
  myMap.events.add('click', function (e) {

    var coords = e.get('coords');
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
      iconCaption: 'поиск...',
      balloonContent: ''
    }, {
      preset: 'islands#violetDotIconWithCaption',
      draggable: true
    });

  }

  let inputCourierAdress = document.querySelector('.adress-street__text');
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
      inputCourierAdress.value = firstGeoObject.getAddressLine();
      labelForm.forEach(function (elem) {
        elem.classList.add('active-adress');
      })
    });
    //Удаление розовой клизмы по клику на крестик в курьерской доставке
    courierClose.addEventListener('click', function () {
      myMap.geoObjects.remove(myPlacemark);
    });
    //Возвращение розовой клизмы по клику на карту
    myMap.events.add("click", function (e) {
      myMap.geoObjects.add(myPlacemark);
    })
  }

  //Вывод всех меток пвз на карту
  (async () => {
    let response = await fetch('./../js/deliveryNew/backoffice_dev_dbo_DeliveryCityPoints.json');
    let categories = await response.json();
    categories.forEach(function (elem) {
      let mark = new ymaps.Placemark([elem.Latitude, elem.Longitude], {
        hintContent: elem.WorkTime,
        // balloonContent: 'Это красивая метка'
      }, {
        iconLayout: 'default#image',
        iconImageHref: `./../images/DeliveryNew/icon-map/${elem.DeliveryCompany}.svg`,
        iconImageSize: [30, 42],
      }
      );
      myMap.geoObjects.add(mark);

      //Изменение размера метки при наведении на неё
      mark.events.add('mouseenter', function (e) {
        e.get('target').options.set('iconImageSize', [40, 42])
      })
        .add('mouseleave', function (e) {
          e.get('target').options.unset('iconImageSize', [30, 42]);
        });
      //Удаление розовой клизмы по клику на ПВЗ в курьерской доставке  
      mark.events.add('click', function (e) {
        myMap.geoObjects.remove(myPlacemark);
        courierSidebar.classList.remove('courier-section--active');
        courierSidebar.classList.add('courier-section--disactive');
        deliverySidebar.classList.remove('courier-section--disactive');
        deliverySidebar.classList.add('courier-section--active');
        console.log(mark);
      });
      createDeliveryPoint(elem.DeliveryCompany, elem.Street, elem.House, elem.City, elem.DeliveryCost, elem.WorkTime);
    });
  })()
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

//^ Создание блока с информацией о ПВЗ START
let scrollContainer = document.querySelector('.scroll-delivery__container');
function createDeliveryPoint(imgPVZ, streetPVZ, housePVZ, cityPVZ, deliveryCostVPZ, workTimePVZ) {
  let containerItem = document.createElement('div');
  containerItem.className = "goods-delivery-point__item";
  containerItem.innerHTML = `
          <div class="flag">забрать сегодня</div>
            <div class="center-sidebar">
              <div class="delivery-point__box">
                <div class="point-logo">
                  <img src="./images/DeliveryNew/delivery-point/${imgPVZ}.svg" alt="logo">
                </div>
                <div class="point-adress">
                  ${streetPVZ} ${housePVZ}</br>
                  ${cityPVZ}
                </div>
                <div class="point-cost">стоимость — от ${deliveryCostVPZ} ₽</div>
                <div class="point-data-delivery">
                  дата доставки — <span class="day-week">сегодня</span>, <span class="data">16 мая</span>
                </div>
                <div class="description-more description-more--disactive">
                  <div class="point-description__container">
                    <div class="point-description__title">
                      режим работы
                    </div>
                    <div class="point-description__text">
                      ${workTimePVZ} <br>
                    </div>
                  </div>
                  <div class="point-description__container">
                    <div class="point-description__title">
                      контактный телефон
                    </div>
                    <div class="point-description__text">
                      8-800-234-80-00
                    </div>
                  </div>
                  <div class="point-description__container">
                    <div class="point-description__title">
                      как добраться
                    </div>
                    <div class="point-description__text">
                      метро - березовая роща. какой выход из метро - второй. остановка - красина. примерное расстояние
                      от остановки до отделения - 100 м. 5-этажный жилой дом. 1 этаж. вход со двора. сервисный центр
                      фотон.
                    </div>
                  </div>
                  <div class="point-description__container">
                    <a href="./delivery.html" class="point-description__button">Заберу отсюда</a>
                  </div>
                </div>
              </div>
            </div>`;
  scrollContainer.append(containerItem);
}
//^ Создание блока с информацией о ПВЗ END
document.addEventListener("DOMContentLoaded", () => {
  let servisesItems = document.querySelectorAll('.goods-delivery-point__item');
  console.log(servisesItems);
  servisesItems.forEach(function (servisItem) {
    //воткнуть этот элемент в функцию createDeliveryPoint
    servisItem.addEventListener('click', function (elem) {
      let target = elem.target;
      target.closest('.goods-delivery-point__item').querySelector('.description-more').classList.toggle('description-more--disactive');
      servisItem.classList.toggle('goods-delivery-point__item--active');
    })
  });
});
//^ Служба выдачи END

//^ Адрес доставки курьером форма START
inputAdress.forEach(function (inp) {
  inp.addEventListener('click', function (elem) {
    let target = elem.target;
    console.log(target);
    target.closest('.adress__container').querySelector('.lable-title').classList.add('active-adress');
  });
});

courierClose.addEventListener('click', function () {
  courierSidebar.classList.remove('courier-section--active');
  courierSidebar.classList.add('courier-section--disactive');
  deliverySidebar.classList.remove('courier-section--disactive');
  deliverySidebar.classList.add('courier-section--active');
});

//^ Адрес доставки курьером форма END


