function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}
window.onload = () => {
  const removeCartItemButtons =
    document.getElementsByClassName("btn btn-error");
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    const button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  const quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (let i = 0; i < quantityInputs.length; i++) {
    input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  const addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (let i = 0; i < addToCartButtons.length; i++) {
    const button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }
  document.getElementsByClassName("rounded-full")[0].addEventListener('click', purchaseClicked)
};

function purchaseClicked(){
  alert('Thank you for your purchase!')
  const cartItems = document.getElementsByClassName('cart-items')[0]
  while (cartItems.hasChildNodes()){
    cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}

function quantityChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  const addToCartButton = event.target;
  const shopItem = addToCartButton.parentElement;
  const title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  const price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  const imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  console.log(title, price, imageSrc);
  addItemToCart(title, price, imageSrc);
  updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
  const cartRow = document.createElement("tr");
  cartRow.classList.add('cart-row')
  const cartItems = document.getElementsByClassName("cart-items")[0];
  const cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for (let i = 0; i < cartItemNames.length; i++){
      if(cartItemNames[i].innerText == title){
        alert('This item is already added to your cart.')
        return
      }
  }
  // function is not working. Needs to alert something when there is multiple items added to cart. 
  const cartRowContents = `
  <td class="cart-items">
    <div class="flex items-center space-x-3">
      <div class="item-image cart-item-image">
        <div class="mask mask-squircle w-12 h-12">
          <img src="${imageSrc}" alt="Item Image Tailwind CSS Component" />
        </div>
      </div>
      <div>
        <div class="cart-item-title font-bold">${title}</div>
      </div>
    </div>
  </td>
  <td>
    <div class="cart-price text-sm opacity-50">${price}</div>
  </td>
  <td>
    <input class="cart-quantity-input" type="number" value="1">
  </td>
  <td>
    <button class="btn btn-error">Delete</button>
  </td>
</tr>`;
cartRow.innerHTML = cartRowContents
cartItems.append(cartRow)
cartRow.getElementsByClassName('btn-error')[0].addEventListener('click', removeCartItem)
cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}
// fix formatting

function updateCartTotal() {
  const cartItemArea = document.getElementsByClassName("cart-items")[0];
  const cartRows = cartItemArea.getElementsByClassName("cart-row");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i];
    const priceElement = cartRow.getElementsByClassName("cart-price")[0];
    const quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    const price = priceElement.textContent;
    // const price = parseFloat(priceElement.innerText.replace('', 'points'))
    const quantity = quantityElement.value;
    total = total + (price * quantity);
    console.log(price)
  }
  document.getElementsByClassName(
    "cart-total-price"
  )[0].textContent = `${total} points`;
}


