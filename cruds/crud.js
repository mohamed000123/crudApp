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
  var img = productImg.files[0];
  var ImgSrc = `${URL.createObjectURL(img)}`;
  console.log(ImgSrc);
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
            <a href="./productDetails.html"><button id=detailsBtn onClick="detailsPageNavigation()">product details</button></a>
          </div>
        </div>
      </div>
  `;
  }

  var productsContainer = document.getElementById("products");
  productsContainer.innerHTML = data;
}


