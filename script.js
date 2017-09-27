const products = [];
   
function addProduct() {
  const addProductNameInput = document.getElementById('addProductNameInput');

  if (addProductNameInput.value) {
    products.push({
      productName: addProductNameInput.value,
    });
    addProductNameInput.value = '';
    displayProducts();
    addProductNameInput.focus();  
  }  
}

function deconsteProduct(position) {
    products.splice(position, 1);
    displayProducts();
}

function toggleFiltered () { 
  const filter = document.getElementById('filterInput').value.toUpperCase();
  const li = document.querySelector('ul').getElementsByTagName('li');
  for (const value of li) {
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
    productLi.appendChild(createDeconsteButton())
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

function createDeconsteButton() {
  const deconsteButton = document.createElement('button');
  deconsteButton.textContent = 'X';
  deconsteButton.className = 'deconsteButton hide show';
  return deconsteButton;
}

function printList() {
  const hideElement = document.querySelectorAll('.hide');  
  const hidePrintButton = document.querySelector('.printButton');
  const showElement = document.querySelectorAll('.show');  
  const showPrintButton = document.querySelector('.printButton');
  hidePrintButton.style.visibility = 'hidden';

    for (const value of hideElement) {
      value.style.display = 'none';
    } 

    window.print();
    showPrintButton.style.visibility = 'visible';

    for (const value of showElement) {
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
      if (elementClicked.className === 'deconsteButton hide show') {
        deconsteProduct(parseInt(elementClicked.parentNode.id));
      }
  })
