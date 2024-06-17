let labelForm = document.querySelectorAll('.lable-title');
let inputAdress = document.querySelectorAll('.input-adress');
let courierClose = document.querySelector('.courier-close');
let courierSidebar = document.querySelector('.goods-courier-point__container');
let deliverySidebar = document.querySelector('.goods-delivery-point__container');

//^ Карта START
function init() {
  myMap = new ymaps.Map('map', {
    center: [55.761737880243935, 37.76766184765625],
    zoom: 11
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
      console.log(firstGeoObject.getAddressLine());
      inputCourierAdress.value = firstGeoObject.getAddressLine();
      labelForm.forEach(function (elem) {
        elem.classList.add('active-adress');
      })

    });

  }

  //Вывод всех меток пвз на карту
  (async () => {
    let response = await fetch('./../js/deliveryNew/data.json');
    let categories = await response.json();
    let itemPVZ = categories['features'];
    itemPVZ.forEach(function (elem) {
      let mark = new ymaps.Placemark(elem.geometry.coordinates, {
        hintContent: 'Собственный значок метки',
        // balloonContent: 'Это красивая метка'
      }, {
        iconLayout: 'default#image',
        iconImageHref: `./../images/DeliveryNew/icon-map/${elem.img}`,
        iconImageSize: [30, 42],
      }
      );
      myMap.geoObjects.add(mark);

      //Изменение размера метки при наведении на неё
      mark.events.add('mouseenter', function (e) {
        e.get('target').options.set('iconImageSize', [40, 42])
      })
        .add('mouseleave', function (e) {
          e.get('target').options.unset('iconImageSize');
        });;
      // console.log(mark.options._baseItem._context._options.iconImageHref)
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
})


//^ Адрес доставки курьером форма END
