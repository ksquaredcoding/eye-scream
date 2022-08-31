// #region DATA
const iceCreams = [{
  name: 'Cookie Dough',
  image: 'https://celebratingsweets.com/wp-content/uploads/2014/04/Cookie-Dough-Ice-Cream-1-5.jpg',
  price: 1,
  quantity: 0
}, {
  name: 'Vanilla',
  image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ultimate-vanilla-ice-cream-1628511695.jpg',
  price: 1,
  quantity: 0
}, {
  name: 'Strawberry',
  image: 'https://www.realfoodwithjessica.com/wp-content/uploads/2017/07/paleostrawberryicecream2.jpg',
  price: 2,
  quantity: 0
},
{
  name: 'Rocky Road',
  image: 'https://www.browneyedbaker.com/wp-content/uploads/2021/05/rocky-road-ice-cream-13-square.jpg',
  price: 3,
  quantity: 0
},
{
  name: 'Birthday Cake',
  image: 'https://www.mynameissnickerdoodle.com/wp-content/uploads/2018/07/Birthday-Cake-Ice-Cream-Recipe-Everything-Eats-4.jpg',
  price: 5,
  quantity: 0
}
]

const vessels = [{
  name: 'Waffle Cone',
  image: 'https://m.media-amazon.com/images/I/71VNjBMakfL._SL1500_.jpg',
  price: 2,
  quantity: 0
}, {
  name: 'Waffle Bowl',
  image: 'http://images.wbmason.com/350/L_JOY66050.jpg',
  price: 4,
  quantity: 0
}]

const toppings = [{
  name: 'Sprinkles',
  image: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Sprinkles2.jpg',
  price: 1,
  quantity: 0
}, {
  name: 'Choclate Chips',
  image: 'https://www.eatthis.com/wp-content/uploads/sites/4/2020/05/chocolate-chips.jpg?quality=82&strip=1&resize=640%2C360',
  price: 2,
  quantity: 0
}]
// #endregion

// #region DRAW THINGS
function drawCart() {
  let templateIceCream = ''
  let templateVessel = ''
  let templateTopping = ''

  iceCreams.forEach(iceCream => {
    if (iceCream.quantity > 0) {
      templateIceCream += `
      <div class="d-flex justify-content-between px-2">
      <i class="mdi mdi-delete text-danger mx-1" onclick="removeIceCream('${iceCream.name}')"></i>
              <p class="col-4">${iceCream.name}</p>
              <p class="col-4 text-center">${iceCream.quantity}</p>
              <p class="col-4 text-end px-3">$${iceCream.price * iceCream.quantity}.00</p>
            </div>`
    }
  })

  vessels.forEach(vessel => {
    if (vessel.quantity > 0) {
      templateVessel += `
      <div class="d-flex justify-content-between px-2">
      <i class="mdi mdi-delete text-danger mx-1" onclick="removeVessel('${vessel.name}')"></i>
              <p class="col-4">${vessel.name}</p>
              <p class="col-4 text-center">${vessel.quantity}</p>
              <p class="col-4 text-end px-3">$${vessel.price * vessel.quantity}.00</p>
            </div>`
    }
  })
  toppings.forEach(topping => {
    if (topping.quantity > 0) {
      templateTopping += `
      <div class="d-flex justify-content-between px-2">
      <i class="mdi mdi-delete text-danger mx-1" onclick="removeTopping('${topping.name}')"></i>
              <p class="col-4">${topping.name}</p>
              <p class="col-4 text-center">${topping.quantity}</p>
              <p class="col-4 text-end px-3">$${topping.price * topping.quantity}.00</p>
            </div>`
    }
  })

  document.getElementById('ic-cart').innerHTML = templateIceCream
  document.getElementById('v-cart').innerHTML = templateVessel
  document.getElementById('t-cart').innerHTML = templateTopping
  drawTotal()
}

function drawTotal() {
  let total = 0
  iceCreams.forEach(iceCream => {
    total += iceCream.price * iceCream.quantity
  })
  vessels.forEach(vessel => {
    total += vessel.price * vessel.quantity
  })
  toppings.forEach(topping => {
    total += topping.price * topping.quantity
  })
  document.getElementById('sub-total').innerText = 'Subtotal: ' + total.toFixed(2)
  document.getElementById('actual-total').innerText = 'Total: ' + (total * 1.06).toFixed(2)
}

function drawIceCreamMenu() {
  let template = ''

  iceCreams.forEach(iceCream => {
    template += `
      <div class="row justify-content-evenly menu-item align-items-center mb-2 mx-1 p-1">
              <img src="${iceCream.image}" alt="${iceCream.name} image not available" class="ic-img ic-bgrd img-fluid cursor-only" onclick="addIceCreamToCart('${iceCream.name}')">
              <div class="justify-content-evenly p-1 d-inline-flex text-light item-bg mt-2 text-center fs-5 cursor-only" onclick="addIceCreamToCart('${iceCream.name}')">
              <p class="my-2">${iceCream.name}</p>
              <p class="my-2">$${iceCream.price}.00</p>
              </div>
            </div>`
  })
  document.getElementById('ic-menu').innerHTML = template
}

function drawVesselMenu() {
  let template = ''

  vessels.forEach(vessel => {
    template += `
      <div class="row justify-content-evenly menu-item align-items-center mb-2 mx-1 p-1">
      <img src="${vessel.image}" alt="${vessel.name} image not available" class="ic-img ic-bgrd img-fluid cursor-only" onclick="addVesselToCart('${vessel.name}')">
      <div class="justify-content-evenly p-1 d-inline-flex text-light item-bg mt-2 text-center fs-5 cursor-only" onclick="addVesselToCart('${vessel.name}')">
              <p class="my-2">${vessel.name}</p>
              <p class="my-2">$${vessel.price}.00</p>
              </div>
            </div>`
  })
  document.getElementById('v-menu').innerHTML = template
}

function drawToppingMenu() {
  let template = ''

  toppings.forEach(topping => {
    template += `
      <div class="row justify-content-evenly menu-item align-items-center mx-1 p-1">
      <img src="${topping.image}" alt="${topping.name} image not available" class="ic-img ic-bgrd img-fluid cursor-only" onclick="addToppingToCart('${topping.name}')">
      <div class="justify-content-evenly p-1 d-inline-flex text-light item-bg mt-2 text-center fs-5 cursor-only" onclick="addToppingToCart('${topping.name}')">
              <p class="my-2">${topping.name}</p>
              <p class="my-2">$${topping.price}.00</p>
              </div>
            </div>`
  })
  document.getElementById('t-menu').innerHTML = template
}
//#endregion

// #region FUNCTIONALITY
function addIceCreamToCart(flavor) {
  let dessert = iceCreams.find(iceCream => iceCream.name == flavor)
  dessert.quantity++
  drawCart()
}

function addVesselToCart(type) {
  let dessert = vessels.find(vessel => vessel.name == type)
  dessert.quantity++
  drawCart()
}

function addToppingToCart(type) {
  let dessert = toppings.find(topping => topping.name == type)
  dessert.quantity++
  drawCart()
}

function checkout() {
  if (window.confirm("Are you ready to checkout?")) {
    iceCreams.forEach(iceCream => {
      iceCream.quantity = 0
    })
    toppings.forEach(topping => {
      topping.quantity = 0
    })
    vessels.forEach(vessel => {
      vessel.quantity = 0
    })
    drawCart()
  }
}

function removeIceCream(name) {
  let iceCream = iceCreams.find(iceCream => iceCream.name == name)
  iceCream.quantity--
  drawCart()
}

function removeVessel(name) {
  let vessel = vessels.find(vessel => vessel.name == name)
  vessel.quantity--
  drawCart()
}

function removeTopping(name) {
  let topping = toppings.find(topping => topping.name == name)
  topping.quantity--
  drawCart()
}
// #endregion

drawIceCreamMenu()
drawVesselMenu()
drawToppingMenu()