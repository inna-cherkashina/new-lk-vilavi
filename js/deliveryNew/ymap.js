let categoryesData = {
  category1: [{
    lat: "55.0326309649162",
    long: "82.91308840668484",
    name: "Метка 1 - Категория 1",
    img: "dpd-pink.svg"
  },
  {
    lat: "55.03348136876809",
    long: "82.913120593193",
    name: "Метка 2 - Категория 1",
    img: "dpd-pink.svg"
  },
  {
    lat: "55.03390040168021",
    long: "82.91568478501124",
    name: "Метка 3 - Категория 1",
    img: "dpd-pink.svg"
  }
  ],
  category2: [{
    lat: "55.03355566564136",
    long: "82.91328822053127",
    name: "Метка 1 - Категория 2",
    img: "dpd-pink.svg"
  },
  {
    lat: "55.03439988764291",
    long: "82.91403923905547",
    name: "Метка 2 - Категория 2",
    img: "v-pink.svg"
  },
  {
    lat: "55.03468950713334",
    long: "82.91593824303798",
    name: "Метка 3 - Категория 2",
    img: "dpd-pink.svg"
  }
  ],
  category3: [{
    lat: "55.03350636745414",
    long: "82.91372810280974",
    name: "Метка 1 - Категория 3",
    img: "v-pink.svg"
  },
  {
    lat: "55.03353101655535",
    long: "82.91315947449858",
    name: "Метка 2 - Категория 3",
    img: "v-pink.svg"
  },
  {
    lat: "55.03305651868144",
    long: "82.91380320466216",
    name: "Метка 3 - Категория 3",
    img: "dpd-pink.svg"
  }
  ]

}

let init = () => {
  let map = new ymaps.Map('map-test', {
    center: [55.0326309649162, 82.91308840668484],
    zoom: 15
  });

  let activeCategory = "category1";

  let showCategory = (category) => {
    map.geoObjects.removeAll(); //удаляем все маркеры на карте


    categoryesData[category].forEach((item) => {
      let plasemark = new ymaps.Placemark([item.lat, item.long], {
        hintContent: item.name,
        balloonContent: item.name

      }, {
        // iconLayout: 'default#imageWithContent',
        // iconImageHref: `../../images/DwliveryNew/icon-map/${item.img}`,
        // iconImageSize: [55, 36]
      });

      map.geoObjects.add(plasemark);
    });
    activeCategory = category;
  }

  let buttons = document.querySelectorAll('.button');
  buttons.forEach((button) => {
    button.addEventListener('click', function (el) {

      let category = el.currentTarget.dataset.category;
      showCategory(category);
    })
  })

  showCategory(activeCategory)
}

ymaps.ready(init);