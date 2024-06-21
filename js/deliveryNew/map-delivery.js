
let labelForm = document.querySelectorAll('.lable-title');
let inputAdress = document.querySelectorAll('.input-adress');
let courierClose = document.querySelector('.courier-close');
let courierSidebar = document.querySelector('.goods-courier-point__container');
let deliverySidebar = document.querySelector('.goods-delivery-point__container');
let servise = document.querySelector('.point-list');
let servisesArrow = document.querySelector('.point-list img');
let serviseList = document.querySelector('.point-list__scroll-box');
let serviseCross = document.querySelector('.cross-img');
let quikText = document.querySelector('.quik-text');
let cheapText = document.querySelector('.cheap-text');
let switchElement = document.querySelector('.switch-element');

//^ Создание блока с информацией о ПВЗ START
let scrollContainer = document.querySelector('.scroll-delivery__container');
function createDeliveryPoint(imgPVZ, streetPVZ, housePVZ, cityPVZ, deliveryCostPVZ, deliveryTimePVZ, workTimePVZ) {
  let data = new Date();
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
                <div class="point-cost">стоимость — от ${deliveryCostPVZ} ₽</div>
                <div class="point-data-delivery">
                  дата доставки — <span class="day-week">${data.getDate() + deliveryTimePVZ}.${data.getMonth() + 1}.${data.getFullYear()}</span>
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

function createOpenInfoDeliveryPoint(imgPVZ, streetPVZ, housePVZ, cityPVZ, deliveryCostPVZ, deliveryTimePVZ, workTimePVZ) {
  let data = new Date();
  let containerItem = document.createElement('div');
  containerItem.className = "goods-delivery-point__item high-info-block goods-delivery-point__item--active";
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
                <div class="point-cost">стоимость — от ${deliveryCostPVZ} ₽</div>
                <div class="point-data-delivery">
                  дата доставки — <span class="day-week">${data.getDate() + deliveryTimePVZ}.${data.getMonth() + 1}.${data.getFullYear()}</span>
                </div>
                <div class="description-more description-more--active">
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
  scrollContainer.prepend(containerItem);
}
//^ Создание блока с информацией о ПВЗ END

//^ Карта START
function init() {
  myMap = new ymaps.Map('map', {
    center: [55.02988088, 83.01854063],
    zoom: 12
  }, {
    searchControlProvider: 'yandex#search'
  });

  //^ Создаём кластеры START 
  // clusterer = new ymaps.Clusterer({})
  //^ Создаём кластеры END 


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
    let response = await fetch('https://inna-cherkashina.github.io/new-lk-vilavi/js/deliveryNew/backoffice_dev_dbo_DeliveryCityPoints.json');
    let categories = await response.json();
    categories.forEach(function (elem) {
      let mark = new ymaps.Placemark([elem.Latitude, elem.Longitude], {
        hintContent: elem.WorkTime,
        // balloonContent: 'Это красивая метка'
      }, {
        iconLayout: 'default#image',
        iconImageHref: `./images/DeliveryNew/icon-map/${elem.DeliveryCompany}.svg`,
        iconImageSize: [38, 24],
        iconImageOffset: [-19, -12]
      }
      );
      myMap.geoObjects.add(mark);

      let clickMarker = false;
      //Изменение размера метки при наведении на неё
      mark.events.add('mouseenter', function (e) {
        e.get('target').options.set('iconImageSize', [54, 35]);
        e.get('target').options.set('iconImageOffset', [-27, -17]);
        e.get('target').options.set('iconImageHref', `./images/DeliveryNew/icon-map/${elem.DeliveryCompany}-coral.svg`);
      })
        .add('mouseleave', function (e) {
          if (clickMarker == false) {
            e.get('target').options.set('iconImageSize', [38, 24]);
            e.get('target').options.set('iconImageOffset', [-19, -12]);
            e.get('target').options.set('iconImageHref', `./images/DeliveryNew/icon-map/${elem.DeliveryCompany}.svg`);
            console.log(clickMarker);
          }
          else {
            e.get('target').options.set('iconImageSize', [54, 35]);
            e.get('target').options.set('iconImageHref', `./images/DeliveryNew/icon-map/${elem.DeliveryCompany}-coral.svg`);
            console.log(clickMarker);
          }
        });
      // let markIconImgHref = mark.options._options.iconImageHref;
      mark.events.add('click', function (e) {
        clickMarker = true;
        e.get('target').options.set('iconImageSize', [54, 35]);
        e.get('target').options.set('iconImageOffset', [-27, -17]);
        e.get('target').options.set('iconImageHref', `./images/DeliveryNew/icon-map/${elem.DeliveryCompany}-coral.svg`);
        console.log(clickMarker);
      });

      quikText.addEventListener('click', function () {
        mark.options.set('iconImageHref', `./images/DeliveryNew/icon-map/${elem.DeliveryCompany}.svg`);
        switchElement.classList.add('quik-active');
        switchElement.classList.remove('cheap-active');
        if (elem.DeliveryTime < 5) {
          mark.options.set('iconImageHref', `./images/DeliveryNew/icon-map/${elem.DeliveryCompany}-blue.svg`);
        }
        else {
          mark.options.set('iconImageHref', `./images/DeliveryNew/icon-map/${elem.DeliveryCompany}.svg`);
        }

      })
      cheapText.addEventListener('click', function () {
        mark.options.set('iconImageHref', `./images/DeliveryNew/icon-map/${elem.DeliveryCompany}.svg`);
        switchElement.classList.remove('quik-active');
        switchElement.classList.add('cheap-active');
        console.log(elem);
        if (elem.DeliveryCost <= 200) {
          mark.options.set('iconImageHref', `./images/DeliveryNew/icon-map/${elem.DeliveryCompany}-blue.svg`);
        }
        else {
          mark.options.set('iconImageHref', `./images/DeliveryNew/icon-map/${elem.DeliveryCompany}.svg`);
        }

      })

      //Удаление розовой клизмы по клику на ПВЗ в курьерской доставке  
      mark.events.add('click', function (e) {
        myMap.geoObjects.remove(myPlacemark);
        courierSidebar.classList.remove('courier-section--active');
        courierSidebar.classList.add('courier-section--disactive');
        deliverySidebar.classList.remove('courier-section--disactive');
        deliverySidebar.classList.add('courier-section--active');
      });

      //Вывод  списка ПВЗ
      createDeliveryPoint(elem.DeliveryCompany, elem.Street, elem.House, elem.City, elem.DeliveryCost, elem.DeliveryTime, elem.WorkTime);
      //^ Если доставка не сегодня, то флаг "забрать сегодня" не отсвечивает START 
      let flags = document.querySelectorAll('.flag');
      if (elem.DeliveryTime != 0) {
        flags.forEach(function (elem) {
          elem.style.display = "none"
        });
      }
      //^ Если доставка не сегодня, то флаг "забрать сегодня" не отсвечивает END 


      //^ Возникновение блока с информацией о ПВЗ по клику на маркер на карте START 
      mark.events.add('click', function () {
        let deleteBlock = document.querySelectorAll('.goods-delivery-point__item');
        deleteBlock.forEach(function (item) {
          if (item.classList.contains('high-info-block')) {
            item.remove();
          }
        })
        createOpenInfoDeliveryPoint(elem.DeliveryCompany, elem.Street, elem.House, elem.City, elem.DeliveryCost, elem.DeliveryTime, elem.WorkTime);
        let flags = document.querySelectorAll('.flag');
        let infoBlock = document.querySelector('.high-info-block');
        if (elem.DeliveryTime != 0) {
          flags.forEach(function (flag) {
            flag.style.display = "none"
          });
        }
        infoBlock.addEventListener('click', function () {
          infoBlock.remove();
        })
      })
      //^ Возникновение блока с информацией о ПВЗ по клику на маркер на карте END  
    });


    //^Служба выдачи START
    let servisesItems = document.querySelectorAll('.goods-delivery-point__item');
    servisesItems.forEach(function (servisItem) {
      servisItem.addEventListener('click', function (elem) {
        let target = elem.target;
        target.closest('.goods-delivery-point__item').querySelector('.description-more').classList.toggle('description-more--disactive');
        servisItem.classList.toggle('goods-delivery-point__item--active');
      })
    });
    //^Служба выдачи END
  })();
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
//^ Служба выдачи END

//^ Адрес доставки курьером форма START
inputAdress.forEach(function (inp) {
  inp.addEventListener('click', function (elem) {
    let target = elem.target;
    target.closest('.adress__container').querySelector('.lable-title').classList.add('active-adress');
  });
});

courierClose.addEventListener('click', function () {
  courierSidebar.classList.remove('courier-section--active');
  courierSidebar.classList.add('courier-section--disactive');
  deliverySidebar.classList.remove('courier-section--disactive');
  deliverySidebar.classList.add('courier-section--active');
});


let svgElementCourier = document.querySelectorAll('.svg-element-courier');
let courierDeliveryItems = document.querySelectorAll('.goods-courier-point__item');
courierDeliveryItems.forEach(function (item) {
  item.addEventListener('click', function (elem) {
    disabledNav(svgElementCourier);
    let target = elem.target;
    target.closest('.goods-courier-point__item').querySelector('.svg-element-courier').classList.toggle('svg-element-courier--active')
  })
});

//Сброс стилей у неактивных табов при клике
function disabledNav(blocks) {
  blocks.forEach(function (el) {
    el.classList.remove('svg-element-courier--active');
  });
}


//^ Адрес доставки курьером форма END




