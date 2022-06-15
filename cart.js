

let basket = JSON.parse(localStorage.getItem("data")) || [];
const cartvalue = document.getElementById("cart-value");
const cartItem= document.getElementById("cart-no")
const cartContainer= document.getElementById("cart-container")


const getAllProductItems=()=>{
    return(
        cartContainer.innerHTML= basket.map((x)=>{
            let{qty, id}= x
            const search = shoplist.find((y)=>id===y.id)
        return(
            `<div class="cart-card" id="cart-card">
            <div class="cart-left">
                <img src=${search.image} width=110 alt="${search.id}">
            </div>
            <div class="cart-right">
                <h3 class="cart-title">${search.title}</h3>
                <div class="price">$${search.rate}</div>
                <div class="quantity1">
                    <div class="cart-quantity">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id}>${qty}</div>
                        <i onclick="increment(${id})" class="bi bi-plus"></i>
                    </div>
                    <div id="total-item-price" class="total-item-price">total: ${qty* search.rate}/-</div>
                                                                                            
                </div>
                <i onclick="remove(${id})" class="bi bi-x-lg " ></i>
            </div>

        </div>`
        )
    })
)}

getAllProductItems()

cartItem.innerHTML = `No. Of products: ${basket.length}`
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
   totalAmount()
  console.log(basket)
  update(selectedItem.id)
  getAllProductItems()
  localStorage.setItem("data", JSON.stringify(basket))

}

// decrement function
const decrement =(id)=>{
   let selectedItem= id
   let itemFind2 = basket.find((x)=>x.id ===selectedItem.id)
try {
   if(itemFind2.qty=== undefined) return;
   else {
       itemFind2.qty -= 1
   }
   
} catch (error) {
   console.log("No qty is added!")
}
basket= basket.filter((x)=>x.qty!==0)

update(selectedItem.id)
cartItem.innerHTML = `No. Of products: ${basket.length}`
totalAmount()
getAllProductItems()
localStorage.setItem("data", JSON.stringify(basket))
}  

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

const remove=(ide)=>{
    basket= basket.filter((x)=>x.id!==ide.id)
    cartItem.innerHTML = `No. Of products: ${basket.length}`
    
    localStorage.setItem("data", JSON.stringify(basket))
    totalAmount()
    getAllProductItems()
}

const removeall=()=>{
    basket=[]
    cartItem.innerHTML = `No. Of products: ${basket.length}`
    
    localStorage.setItem("data", JSON.stringify(basket))
    
    getAllProductItems()
    totalAmount()

}

const totalAmount =()=>{
 
        let total = basket.map((x)=>{let{id, qty}= x;
            let search = shoplist.find((y)=>id===y.id) || []
            return qty*search.rate;

        }).reduce((x,y)=>x + y, 0)

        cartvalue.innerHTML= total
}
totalAmount()