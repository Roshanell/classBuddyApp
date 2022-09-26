let add = document.querySelector("#add");
let subtract = document.querySelector("#subtract");

add.addEventListener("click", async function () {
  // let output = document.querySelector("#output");
  // let result = Number(output.innerText) + 1;

  // if (result > 100) {
  //   result = 0;
  // }

  // output.innerText = result;
 
});

subtract.addEventListener("click", function () {
  let output = document.querySelector("#output");
  let result = Number(output.innerText) - 1;

  if (result < 0) {
    result = 0;
  }

  output.innerText = result;
  
});

async function incrementQuantity(itemId){
  const response = await fetch('/cart',{
    method: 'PUT',
    body: {itemId, direction:1}
  }) 

}