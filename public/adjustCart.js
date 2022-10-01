const removeCartItemButtons = document.getElementsByClassName('btn btn-error')
for (let i = 0; i<removeCartItemButtons.length; i++){
  const button = removeCartItemButtons[i]
  button.addEventListener('click', function(event){
    const buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
  })
}

function updateCartTotal(){
  const cartItemArea = document.getElementsByClassName('cart-items')[0]
  const cartRows = cartItemArea.getElementsByClassName('cart-row')
  const total = 0
  for (let i = 0; i < cartRows.length; i++){
    const cartRow = cartRows[i]
    const priceElement = cartRow.getElementsByClassName('cart-price')[0]
    const quantityElement =cartRow.getElementsByClassName('cart-quantity-input')[0]
    const price = priceElement.innerText
    const quantity = quantityElement.value
    console.log(quantity * price)
   
  }

}