var productName = document.getElementsByClassName("inputField")[0];
var productPrice = document.getElementsByClassName("inputField")[1];
var productDescription = document.querySelector("textarea");
var productImg = document.getElementById("img");
var addProductBtn = document.getElementById("addProduct");
var productsContainer = document.getElementsByClassName("products")[0];
var searchInput = document.getElementById("search");
var warning = document.getElementById("warning");
var up = document.getElementById("up");
var scrollUP = document.getElementById("scrollUP");
var uploadTitle = document.getElementById("upload");

addProductBtn.addEventListener("click", addProduct);
var products = [];

if (JSON.parse(localStorage.getItem("productsList")) != null) {
  products = JSON.parse(localStorage.getItem("productsList"));
  displayProducts(products);
}

checkScroll();

function addProduct() {
  if (
    !productName.value ||
    !productPrice.value ||
    !productDescription.value ||
    !productImg.value
  ) {
    warning.style.display = "block";
  } else {
    warning.style.display = "none";
    var img = productImg.files[0];
    var pName = productName.value;
    var pPrice = productPrice.value;
    var pDesc = productDescription.value;
    const fr = new FileReader();
    fr.readAsDataURL(img);
    fr.addEventListener("load", () => {
      var ImgSrc = fr.result;
      var product = {
        pId: products.length == 0 ? 0 : products.length,
        pName,
        pPrice,
        pDesc,
        img: ImgSrc,
      };
      products.push(product);
      localStorage.setItem("productsList", JSON.stringify(products));
      displayProducts(products);
    });
    clearData();
    goDown(document.body.scrollHeight);
    checkScroll();
  }
}

function displayProducts(list) {
  if (list.length == 0) {
    productsContainer.innerHTML = ` <img src="./notfound.png" style="width:500px;height:500px;margin:auto">`;
  } else {
    var productsData = ``;
    for (var i = 0; i < list.length; i++) {
      productsData += `
     <div class="product">
        <div class="productContainer">
            <div class="head">
              <div class="title">
                <h3 id="productName">${list[i].pName}</h3>
                <p id="productPrice">${list[i].pPrice} EGP</p>
              </div>
               <img id="myImg" src="${list[i].img}" />
              </div>
            <div class="body">
             <p id="productDesc">${list[i].pDesc}</p>
             <button id="delete"  onclick="deleteProduct(${list[i].pId})">delete</button>
             <button id="edit" onclick="editProduct(${list[i].pId})">edit</button>
            </div>
        </div>
     </div>

`;
    }

    productsContainer.innerHTML = productsData;
  }
}

function deleteProduct(id) {
  var pIndex = products.findIndex(function (item) {
    return id == item.pId;
  });

  products.splice(pIndex, 1);
  localStorage.setItem("productsList", JSON.stringify(products));
  displayProducts(products);
  checkScroll();
}

function productSearch() {
  var searchWord = searchInput.value;
  var searchResult = [];
  for (var i = 0; i < products.length; i++) {
    if (products[i].pName.toLowerCase().includes(searchWord.toLowerCase())) {
      searchResult.push(products[i]);
      displayProducts(searchResult);
    } else if (searchResult.length == 0) {
      displayProducts([]);
    }
  }
}

var pIndex;
var pId;
var pHeight;
var editProductBtn = document.getElementById("editProduct");
function editProduct(pId) {
  pHeight = window.scrollY;
  pId = pId;
  pIndex = products.findIndex(function (item) {
    return pId == item.pId;
  });
  productName.value = products[pIndex].pName;
  productPrice.value = products[pIndex].pPrice;
  productDescription.value = products[pIndex].pDesc;
  goUp();
  editProductBtn.style.display = "block";
}

editProductBtn.addEventListener("click", submitEditProduct);

function submitEditProduct() {
  if (!productName.value || !productPrice.value || !productDescription.value) {
    warning.style.display = "block";
  } else {
    warning.style.display = "none";
    var newImg = productImg.files[0];
    var pName = productName.value;
    var pPrice = productPrice.value;
    var pDesc = productDescription.value;

    const fr = new FileReader();
    fr.readAsDataURL(newImg);
    fr.addEventListener("load", () => {
      var ImgSrc = fr.result;
      var updatedProduct = {
        pId: pId,
        pName,
        pPrice,
        pDesc,
        img: ImgSrc,
      };
      products[pIndex] = updatedProduct;
      localStorage.setItem("productsList", JSON.stringify(products));
      displayProducts(products);
    });

    editProductBtn.style.display = "none";
    clearData();
    goDown(pHeight);
  }
}

function clearData() {
  productName.value = "";
  productPrice.value = "";
  productDescription.value = "";
}

function goUp() {
  scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

function goDown(pHeight) {
  scrollTo({
    top: pHeight,
    left: 0,
    behavior: "smooth",
  });
}

up.addEventListener("click", goUp);
function checkScroll() {
  if (products.length > 4) {
    up.style.display = "block";
  } else {
    up.style.display = "none";
  }
}

var delBtns = document.querySelectorAll("#delete");
var editBtns = document.querySelectorAll("#edit");
var moon = document.getElementById("moon");
moon.addEventListener("click", dark);
function dark() {
  document.body.style.backgroundColor = "black";
  document.body.style.color = "gold";
  scrollUP.style.backgroundColor = "gold";
  productName.style.border = "3px solid blue";
  productPrice.style.border = "3px solid blue";
  productDescription.style.border = "3px solid blue";
  searchInput.style.border = "3px solid blue";
  for (var i = 0; i < delBtns.length; i++) {
    delBtns[i].style.border = "1px solid gold";
  }
  for (var i = 0; i < editBtns.length; i++) {
    editBtns[i].style.border = "1px solid gold";
  }
}
var sun = document.getElementById("sun");
sun.addEventListener("click", light);
function light() {
  document.body.style.backgroundColor = "white";
  document.body.style.color = "black";
  scrollUP.style.backgroundColor = "grey";
  productName.style.border = "1px solid #ced4da";
  productPrice.style.border = "1px solid #ced4da";
  productDescription.style.border = "1px solid #ced4da";
  searchInput.style.border = "1px solid #ced4da";
  for (var i = 0; i < delBtns.length; i++) {
    delBtns[i].style.border = "1px solid navy";
  }
  for (var i = 0; i < editBtns.length; i++) {
    editBtns[i].style.border = "1px solid navy";
  }
}
