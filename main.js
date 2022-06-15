
shopitems = document.getElementById("shop-items");


  let basket = JSON.parse(localStorage.getItem("data")) || [ ]


 const getShopItems = () => {    
    return (
        shopitems.innerHTML=
        shoplist.map((x) => {
            let allData = basket.find((check)=>check.id === x.id) || [] 
            return (
                `<div class="card col-4" key=${x.id}>
                    <div class="image">
                        <img src="${x.image}" width=200 alt=${x.id}>
                    </div>
                    <div class="card-info">
                        <div class="card-title">
                            ${x.title}
                        </div>
                        <div class="desc">
                            ${x.description}
                        </div>
                        <div class="quantity-rate">
                            <div class="rate">$${x.rate}</div>
                            <div class="qty">
                                <i  onclick="increment(${x.id})" class="bi bi-plus"></i>
                                <div id=${x.id}>${(allData.qty=== undefined)? 0 : allData.qty}</div>
                                <i onclick="decrement(${x.id})" class="bi bi-dash-lg"></i>
                            </div>
                        </div>
                        <!--<div class="btn-container">
                        <button id="btn" onclick="addCartItemNo(${x.id})" class="btn">Add to cart</button>
                        </div>-->
                    </div>
                </div>`
            )            
        }).join("")
    )
}

getShopItems()

//increment function
const increment =(id)=>{
     let selectedItem= id
    let itemFind = basket.find((x)=>x.id===selectedItem.id)
    

    if(itemFind === undefined){
        basket.push({
            id: selectedItem.id,
            qty: 1
        })
    }else{
        itemFind.qty += 1;
    }

   console.log(basket)
   update(selectedItem.id)

   localStorage.setItem("data", JSON.stringify(basket))

}

// decrement function
const decrement =(id)=>{
    let selectedItem= id
    let itemFind2 = basket.find((x)=>x.id ===selectedItem.id)
try {
    if(itemFind2.qty=== 1) {
        basket.pop(itemFind2)
    }
    else {
        itemFind2.qty -= 1
    }
    
} catch (error) {
    console.log("No qty is added!")
}
console.log(basket)
update(selectedItem.id)

localStorage.setItem("data", JSON.stringify(basket))
}   

//updating the div with increment and decrement function

const update =(id)=>{
    let itemFind3= basket.find((x)=>x.id===id);
try {
    
    document.getElementById(id).innerHTML= itemFind3.qty    
} catch (error) {
    document.getElementById(id).innerHTML= 0  
}
cartItemNo()
}

const cartItemNo =()=>{
  
    cartNo = document.getElementById("quantity")
    cartNo.innerHTML=( basket.map((x)=>x.qty).reduce((x, y)=>x+y, 0))
}
cartItemNo()

