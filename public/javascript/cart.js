const cart = (() => {
  // vars
  let list = JSON.parse(localStorage.getItem("cart")) ?? [];
  const badge = $(".cart .badge");
  const noItems = `<li class="item no-items">
      <p>you haven't bought any items</p>
    </li>`;
  const listDom = $(".cart .list ul");
  const stripePublicKey =
    "pk_live_51J5EMMJMk6rOGvzyYUtHGSO32l7lHBhRy3bu25QY1uR16I24LwVDtIHH55bq6UwAQKsn3p7URy1cbRDYeP2P8hnQ00NKy90LWd";
  var stripeHandler = StripeCheckout.configure({
    key: stripePublicKey,
    locale: "auto",
    token: function (token) {
      fetch("http://localhost:5000/api/product/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          stripeToken: token.id,
          currency: "usd",
          cart: list,
        }),
      })
        .then(function (res) {
          console.log(res.json());
          clear();
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  });

  // helpers
  const checkoutComp = () => `<li class="item checkout">
      <button class="checkout" onclick="cart.checkout()">
        checkout
      </button>
    </li>`;
  const itemComp = (name) => `<li class="item">
      <p>${name}</p>
      <button class='remove' onclick='cart.remove(this)'>X</button>
    </li>`;

  // functions
  const add = (item) => {
    if (!list.includes(item)) {
      $(".no-items").remove();
      // add it to vars
      list.push(item);
      localStorage.setItem("cart", JSON.stringify(list));

      // update badge
      badge[0].innerText = list.length;

      // update listdom
      listDom.prepend(itemComp(item));

      // checkout button
      if (list.length === 1) {
        listDom.append(checkoutComp());
      }
    } else {
      alert("this product already on cart");
    }
  };
  const clear = () => {
    list = [];
    localStorage.clear();
  };

  const remove = (e) => {
    let domItem = e.closest(".item");
    let name = domItem.querySelector("p").innerText;
    list = list.filter((itemname) => itemname !== name);
    localStorage.setItem("cart", JSON.stringify(list));

    // update badge
    badge[0].innerText = list.length ? list.length : "";
    // update listdom
    domItem.remove();

    // checkout button
    if (list.length === 0) {
      $("li.checkout").remove();
    }
  };
  const show = () => {
    let cartList = $(".cart .list")[0];
    cartList.classList.toggle("show");
  };
  const checkout = () => {
    if (list.length !== 0) stripeHandler.open();
    else alert("your cart is empty");
  };

  // setup
  if (list.length === 0) {
    // setup no items list
    listDom.prepend(noItems);
  } else {
    badge[0].innerText = list.length;
    // setup listdom
    list.forEach((item) => {
      listDom.prepend(itemComp(item));
    });
  }

  return {
    add,
    list,
    clear,
    remove,
    show,
    checkout,
  };
})();
