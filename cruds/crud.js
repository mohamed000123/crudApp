var productName = document.getElementById("name");
var productPrice = document.getElementById("price");
var productImg = document.getElementById("img");
var productDesc = document.getElementById("desc");
var submitBtn = document.getElementById("addBtn");

submitBtn.addEventListener("click", addProduct);

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
}else
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

function display(List) {
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

  var productsContainer = document.getElementById("products");
  productsContainer.innerHTML = data;
}

function deleteProduct(index) {
  productsList.splice(index, 1);
  localStorage.setItem("productsList", JSON.stringify(productsList));
  display(productsList);
}

function editProduct(index) {
EditingMode = true
productName.value = productsList[index].name;
productPrice.value = productsList[index].price;
productDesc.value = productsList[index].desc;
NewName = productName.value;
NewPrice = productPrice.value;
newDesc = productDesc.value

}
