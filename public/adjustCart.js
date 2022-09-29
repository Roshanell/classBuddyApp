const removeCartItemButton = document.getElementsByClassName('btn btn-error')
console.log(removeCartItemButton)
for (let i = 0; i<removeCartItemButton.length; i++){
  const button = removeCartItemButton[i]
  button.addEventListener('click', function(event){
    const buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
  })
}