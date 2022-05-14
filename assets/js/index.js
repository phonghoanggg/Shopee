

//  Chọn ảnh sản phẩm xuất hình ảnh tương ứng
const imgPro = document.querySelectorAll(".product-img")
const proItem = document.querySelectorAll(".container--product__img__list-item")
const collorPro = document.querySelectorAll('.btn__product__infor--color')


proItem.forEach(function(item,index) {

    const img = imgPro[index];
    
    return item.onclick = function() {
        var itemActive = document.querySelector(".container--product__img__list-item.active")
        itemActive.classList.remove('active')
        this.classList.add('active')

        var imgActive = document.querySelector(".product-img.active")
        imgActive.classList.remove('active')
        img.classList.add('active')
    }
})

collorPro.forEach(function(collor, index) {
    // 5 số lượng ảnh miêu tả nhưng chưa đc TỐI ƯU
    const img = imgPro[index + 5]
    return collor.onclick = function() {
        var collorActive = document.querySelector(".btn__product__infor--color.active")
        var message = document.querySelector("#show_message--infor--color")

        this.classList.add("active")
        collorActive.classList.remove("active")

        if(this.value == "Gold") {
            message.innerHTML = "Sản phẩm còn 99 chiếc"
        }else if(this.value == "Rose Pink") {
            message.innerHTML = "Sản phẩm còn 50 chiếc"
        }else if(this.value == "Mint Gree") {
            message.innerHTML = "Sản phẩm còn 88 chiếc"
        }

        var imgActive = document.querySelector(".product-img.active")
        imgActive.classList.remove('active')
        img.classList.add('active')
    }
})

// Tăng giảm số lượng sản phẩm
var decreasePro = document.querySelector('.product__infor--amount-number-minus')
var increasePro = document.querySelector('.product__infor--amount-number-plus')
var quatityPro = document.querySelector('.product__infor--amount-number-count');




function increase() {
    var check = quatityPro.value;
    quatityPro.value =  parseInt(check)+ 1
}
function decrease() {
    var check = quatityPro.value;
    if(parseInt(check) > 1) {
        quatityPro.value  = parseInt(check)- 1
    }
}

//Loading

    function Loading() {
    var  loading = setTimeout(showPage,0)
    }
    function showPage() {
      document.querySelector('.loader').style.display = 'none';
      document.querySelector('.app').style.display = 'block';
    }
// Rule By Product
    function checkBy() {
        var chosseProduct = document.querySelector(".btn__product__infor--color")
        var ruleBy = document.querySelector(".rule_by")
        var valueColor = chosseProduct.value
        if(valueColor == "") {
            ruleBy.innerHTML = "Ban hay chon day du thong tin"
        }
    }