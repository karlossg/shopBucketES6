const products = [];
   
function addProduct() {
  let addProductNameInput = document.getElementById('addProductNameInput');

  if (addProductNameInput.value) {
    products.push({
      productName: addProductNameInput.value,
    });
    addProductNameInput.value = '';
    displayProducts();
    addProductNameInput.focus();  
  }  
}

function deleteProduct(position) {
    products.splice(position, 1);
    displayProducts();
}

function toggleFiltered () { 
  const filter = document.getElementById('filterInput').value.toUpperCase();
  const li = document.querySelector('ul').getElementsByTagName('li');
  for (let value of li) {
    value.style.display = value.innerHTML.toUpperCase().indexOf(filter) > -1 ? '' : 'none'
  }
}

function displayProducts() {
  const elementFilter = document.querySelector('.filterProduct');
  const elementPrint = document.querySelector('.printButton');   
  const productsUl = document.querySelector('ul');
  productsUl.innerHTML = '';
  
  products.forEach(function(product, position) {
    const productLi = document.createElement('li');
    productLi.textContent = product.productName;
    productLi.appendChild(createDeleteButton())
    productsUl.appendChild(productLi);
  })

  if (products.length) {
    elementFilter.style.visibility = 'visible';
    elementPrint.style.visibility = 'visible';
  } else {
    elementFilter.style.visibility = 'hidden';
    elementPrint.style.visibility = 'hidden';
  }
}

function createDeleteButton() {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.className = 'deleteButton hide show';
  return deleteButton;
}

function printList() {
  const hideElement = document.querySelectorAll('.hide');  
  const hidePrintButton = document.querySelector('.printButton');
  const showElement = document.querySelectorAll('.show');  
  const showPrintButton = document.querySelector('.printButton');
  hidePrintButton.style.visibility = 'hidden';

    for (let value of hideElement) {
      value.style.display = 'none';
    } 

    window.print();
    showPrintButton.style.visibility = 'visible';

    for (let value of showElement) {
      value.style.display = 'inline';
    }
  }

  document.getElementById("addProductNameInput")
  .addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      document.getElementById("add").click();
    }
  })
  
  document.getElementById("add")
  .addEventListener("click", () => addProduct())

  document.getElementById("filterInput")
  .addEventListener('keyup', () => toggleFiltered())

  document.querySelector('ul').addEventListener('click', function(event) {
    const elementClicked = event.target;
      if (elementClicked.className === 'deleteButton hide show') {
        deleteProduct(parseInt(elementClicked.parentNode.id));
      }
  })
