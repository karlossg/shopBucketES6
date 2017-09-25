const products = [];
   
function addProduct() {
  if (document.getElementById('addProductNameInput').value) {
    products.push({
      productName: document.getElementById('addProductNameInput').value,
    });
    document.getElementById('addProductNameInput').value = '';
    displayProducts();
    document.getElementById("addProductNameInput").focus();  
  }  
}

function deleteProduct(position) {
    products.splice(position, 1);
    displayProducts();
}

function toggleFiltered () { 
  let filter = document.getElementById('filterInput').value.toUpperCase();
      li = document.querySelector('ul').getElementsByTagName('li');
  for (let value of li) {
    value.style.display = value.innerHTML.toUpperCase().indexOf(filter) > -1 ? '' : 'none'
  }
}

function displayProducts() {
  document.querySelector('ul').innerHTML = '';
  
  products.forEach(function(product, position) {
    let productLi = document.createElement('li');
    productLi.textContent = product.productName;
    productLi.appendChild(createDeleteButton())
    document.querySelector('ul').appendChild(productLi);
  })

  if (products.length) {
    document.querySelector('.filterProduct').style.visibility = 'visible';
    document.querySelector('.printButton').style.visibility = 'visible';
  } else {
    document.querySelector('.filterProduct').style.visibility = 'hidden';
    document.querySelector('.printButton').style.visibility = 'hidden';
  }
}

function createDeleteButton() {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteButton hide show';
    return deleteButton;
}

function printList() {
    document.querySelector('.printButton').style.visibility = 'hidden';

    for (let value of document.querySelectorAll('.hide')) {
      value.style.display = 'none';
    } 

    window.print();
    document.querySelector('.printButton').style.visibility = 'visible';

    for (let value of document.querySelectorAll('.show')) {
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
    let elementClicked = event.target;
      if (elementClicked.className === 'deleteButton hide show') {
        deleteProduct(parseInt(elementClicked.parentNode.id));
      }
  })
