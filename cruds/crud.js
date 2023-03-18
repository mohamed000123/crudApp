var productName = document.getElementById("name");
var productPrice = document.getElementById("price");
var productImg = document.getElementById("img");
var productDesc = document.getElementById("desc");
var submitBtn = document.getElementById("addBtn");
var submitEditBtn = document.getElementById("editSubmit"); 
submitBtn.addEventListener("click", addProduct);
submitEditBtn.addEventListener("click", submitEditProduct);

var productsList = [];
if (localStorage.getItem("productsList") != null) {
  productsList = JSON.parse(localStorage.getItem("productsList"));
  display(productsList);
}

function addProduct() {
if (
  !productName.value ||
  !productPrice.value ||
  !productImg.value ||
  !productDesc.value
) {
  document.getElementById("alert").classList.remove("hide");
  document.getElementById("alert").classList.add("show");
}else{
  document.getElementById("alert").classList.add("hide");
  document.getElementById("alert").classList.remove("show");
  var img = productImg.files[0];
  var ImgSrc = `${URL.createObjectURL(img)}`;
  var product = {
    name: productName.value,
    price: productPrice.value,
    desc: productDesc.value,
    img: ImgSrc,
  };
  productsList.push(product);
  localStorage.setItem("productsList", JSON.stringify(productsList));
  display(productsList);
}
clear()
}

function display(List) {
  var productsContainer = document.getElementById("products");
  var productsContainer = document.getElementById("products");
  if (List.length == 0) {
    productsContainer.innerHTML = `<img src="./notfound.png" style="height: 400px;width:400px;margin:auto"></img>`;
  } else {
  var data = "";
  for (let i = 0; i < List.length; i++) {
    data += `
      <div class="productContainer">
        <div class="product">
          <div class="productBody">
            <p>${List[i].name}</p>
            <p>
              ${List[i].price}
              <span style="color: blue"> EGP</span>
            </p>
            <img id="myImg" src="${List[i].img}" />
          </div>
          <div class="productDesc">
            <p>${List[i].desc}</p>
            <button id=deleteBtn onClick="deleteProduct(${i})">delete </button>
            <a href="#form" ><button id=editBtn onClick="editProduct(${i})">edit </button></a>
          </div>
        </div>
      </div>
  `;
  }
  productsContainer.innerHTML = data;
}
}

function deleteProduct(index) {
  productsList.splice(index, 1);
  localStorage.setItem("productsList", JSON.stringify(productsList));
  display(productsList);
}

var Pindex ;
function editProduct(index) {
Pindex = index;
submitBtn.classList.add("hide")
submitEditBtn.classList.replace("hide","show");
productName.value = productsList[index].name;
productPrice.value = productsList[index].price;
productDesc.value = productsList[index].desc;
}

function submitEditProduct() {
var NewName = productName.value;
var NewPrice = productPrice.value;
var newDesc = productDesc.value;
var newImg = productImg.files[0];
var newImgSrc = `${URL.createObjectURL(newImg)}`;
  productsList = JSON.parse(localStorage.getItem("productsList"));
  productsList[Pindex] = {
    name: NewName,
    price: NewPrice,
    desc: newDesc,
    img: newImgSrc,
  };
  display(productsList);

  localStorage.setItem("productsList", JSON.stringify(productsList));
  submitBtn.classList.remove("hide");
  submitEditBtn.classList.replace("show", "hide");
  clear()
}


function search() {
  let search = document.getElementById("search").value;
  var searched = [];
  for (var i = 0; i < productsList.length; i++){
    if (productsList[i].name.toUpperCase().includes(search.toUpperCase())) {
      searched.push(productsList[i]);
      display(searched);
    }else{
      display([]);
    }
  }
}

function clear() {
  productName.value = "";
  productPrice.value = "";
  productDesc.value = "";
  productCat.value = "";
}
