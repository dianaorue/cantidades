const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");
const productDescriptionElement = document.getElementById("product"); // Obtener el elemento del producto y su descripción
let purchases = [];

function add() {
  const price = parseInt(priceElement.value);
  const number = parseInt(numberElement.value);
  const description = productDescriptionElement.options[productDescriptionElement.selectedIndex].text; // Obtener la descripción del producto seleccionado
  
  // Verificar si la tarifa ya ha sido agregada
  const existingPurchase = purchases.find(purchase => purchase.description === description && purchase.price === price);
  
  if(existingPurchase) {
    existingPurchase.number += number; // Actualizar la cantidad si la tarifa ya existe
  } else {
    let purchase = {
      price: price,
      number: number,
      description: description // Guardar la descripción del producto en la compra
    };
    purchases.push(purchase);
  }

  window.alert(`${display()}\n小計${subtotal()}円`);
}

function display() {
  let string = "";
  for(let i=0; i<purchases.length; i++){
    string += `${purchases[i].description}: ${purchases[i].price}円が${purchases[i].number}点\n`;
  }
  return string;
}

function subtotal() {
  let sum = 0;
  for(let i=0; i<purchases.length; i++){
    sum += purchases[i].price * purchases[i].number;
  }
  return sum;
}

function calc() {
  const sum = subtotal();
  const postage = calcPostageFromPurchase(sum);
  window.alert(`小計は${sum}円、送料は${postage}円です。合計は${sum + postage}円です`);
  purchases = [];
  priceElement.value= "";
  numberElement.value = "";
}

function calcPostageFromPurchase(sum) {
  if (sum == 0 || sum >= 3000) {
    return 0;
  } else if (sum < 2000){
   return 500;
  } else {
   return 250;
  }
}
