let products = [];
   
function addProduct() {
  let addProductNameInput = document.getElementById('addProductNameInput');

  if (addProductNameInput.value !== '') {
    products.push({
      productName: addProductNameInput.value,
    });
        addProductNameInput.value = '';
    displayProducts();
    document.getElementById("addProductNameInput").focus();  
  }  
}

function deleteProduct(position) {
    products.splice(position, 1);
    displayProducts();
}

toggleFiltered: function toggleFiltered () {
  let input = document.getElementById('filterInput');
      filter = input.value.toUpperCase();
      ul = document.querySelector('ul');
      li = ul.getElementsByTagName('li');
  for (let i = 0, liLength = li.length; i < liLength; i++) {
    if (li[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
}

function displayProducts() {
  let elementFilter = document.querySelector('.filterProduct');
      elementPrint = document.querySelector('.printButton');   
      productsul = document.querySelector('ul');
  productsul.innerHTML = '';
  
  products.forEach(function(product, position) {
    let productLi = document.createElement('li');
    productLi.textContent = product.productName;
    productLi.appendChild(createDeleteButton())
    productsul.appendChild(productLi);
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
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteButton hide show';
    return deleteButton;
}

function printList() {
    let hideElement = document.querySelectorAll('.hide');  
        hidePrintButton = document.querySelector('.printButton');
        showElement = document.querySelectorAll('.show');  
        showPrintButton = document.querySelector('.printButton');
    hidePrintButton.style.visibility = 'hidden';
    for (let i = 0, length = hideElement.length; i < length; i++) {
      hideElement[i].style.display = 'none';
    } 
  
    window.print();
    
    showPrintButton.style.visibility = 'visible';
    for (let i = 0, length = showElement.length; i < length; i++) {
      showElement[i].style.display = 'inline';
    }
  }

  document.getElementById("addProductNameInput")
  .addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      document.getElementById("add").click();
    }
  });
  
  document.getElementById("add")
  .addEventListener("click", function (event) {
    addProduct();
  });
  
  document.getElementById("filterInput")
  .addEventListener("keyup", function (event) {
    toggleFiltered();
  });
  document.querySelector('ul').addEventListener('click', function(event) {
    let elementClicked = event.target;
      if (elementClicked.className === 'deleteButton hide show') {
        deleteProduct(parseInt(elementClicked.parentNode.id));
      }
  });  