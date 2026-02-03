let arrOfImg = []
for(let i=1;i<= 49;i++) {
arrOfImg.push(`./upload/products-img/File${i}.jpg`)
}
let landing = document.querySelector(".landing")
if(landing) {
setInterval(() => {
    let random = Math.floor(Math.random() * arrOfImg.length)
    landing.style.backgroundImage = `url(${arrOfImg[random]})`
}, 10000);
}
let out = document.querySelector(".out")
let up = document.querySelector(".out .up")
let a = document.querySelectorAll("header .container .links ul li a")
if(a.length === 3) {
a[0].addEventListener("click", function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 750 }, 'slow');
})
a[1].addEventListener("click", function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 1300 }, 'slow');
})
a[2].addEventListener("click", function(e) {
    e.preventDefault();
    window.location = `./html/end.html`
})
}else if (a.length === 2) {
    a[0].addEventListener("click", function(e) {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                alert("No previous page found.");
            }
    })
    a[1].addEventListener("click", function(e) {
        e.preventDefault();
        window.location = `../html/end.html`
    })
}else if(a.length === 1) {
    a[0].addEventListener("click", function(e) {
window.location = `../index.html`
})
}
if(up) {
up.addEventListener("click", () => {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
});
window.addEventListener("scroll" , function (e) {
    if(scrollY >= 400) {
        out.classList.remove("hidden")
    }else {
        out.classList.add("hidden")

    }
})
}
function loadProducts(selector , count , path , pathImg , pathBut) {
let containerCards = document.querySelector(selector)
fetch(path).then(r => r.json()).then(data => {
    if(count == 4) {
    let random = Math.floor(Math.random() * Math.abs(data.products.length))
    if (random + 4 > data.products.length) {
        random = data.products.length - 4;
    }
    for (let i = random ;i < random + 4;i++){
        // create
        let card = document.createElement("div")
        let img  = document.createElement("img")
        let divImg  = document.createElement("div")
        let info  = document.createElement("div")
        let p  = document.createElement("p")
        let span1  = document.createElement("span")
        let span2  = document.createElement("span")
        let but  = document.createElement("button")
        // class
        divImg.className = "img"
        if(pathImg === 1 ) {
            img.src = data.products[i].img 
        }else {
            img.src = `.${data.products[i].img}` 

        }
        info.className = "info"
        card.className = "card"
        but.addEventListener("click", function() {
            if(pathBut === 1) {
                window.location = `./html/cart.html?id=${data.products[i].id}`
            }else {
                window.location = `cart.html?id=${data.products[i].id}`
            }
        });
        // innnerHTml
        p.innerHTML = data.products[i].name
        span1.innerHTML = `${data.products[i].price} ج`
        if(data.products[i].available == true) {
            span2.innerHTML = "متاح"
        } else {
            card.classList.add("not-available")
            span2.innerHTML = "غير متاح"
        }
        but.innerHTML = `شوف المنتج`
        // append
        divImg.appendChild(img)
        info.appendChild(p)
        info.appendChild(span1)
        info.appendChild(span2)
        info.appendChild(but)
        card.appendChild(divImg)
        card.appendChild(info)
        containerCards.appendChild(card)
    }
    }else if (count == "all") {
   for (let i =0 ;i < data.products.length;i++){
        // create
        let card = document.createElement("div")
        let img  = document.createElement("img")
        let divImg  = document.createElement("div")
        let info  = document.createElement("div")
        let p  = document.createElement("p")
        let span1  = document.createElement("span")
        let span2  = document.createElement("span")
        let but  = document.createElement("button")
        // class
        divImg.className = "img"
        img.src = `.${data.products[i].img}`
        info.className = "info"
        card.className = "card"
        // innnerHTml
        p.innerHTML = data.products[i].name
        span1.innerHTML = `${data.products[i].price} ج`
        if(data.products[i].available == true) {
            span2.innerHTML = "متاح"
        } else {
            card.classList.add("not-available")
            span2.innerHTML = "غير متاح"
            card.disabled = true
            but.disabled = true
        }
        but.innerHTML = `شوف المنتج`
        but.addEventListener("click", function() {
            if(pathBut === 1) {
                window.location = `./html/cart.html?id=${data.products[i].id}`
            }else {
                window.location = `cart.html?id=${data.products[i].id}`
            }
        });
        // append
        divImg.appendChild(img)
        info.appendChild(p)
        info.appendChild(span1)
        info.appendChild(span2)
        info.appendChild(but)
        card.appendChild(divImg)
        card.appendChild(info)
        containerCards.appendChild(card)
    }
    }
    }
    )
}
if(document.querySelector(".prouducts")) {
    loadProducts(".prouducts .container .container-cards", 4 , "./product.json" , 1 , 1)
}
if(document.querySelector(".cart")) {
    loadProducts(".cart .container .container-cards", 4 , "../product.json", 2 , 2)
}
if(document.querySelector(".prouductAll")) {
    loadProducts(".prouductAll .container .container-cards", "all" , "../product.json", 2, 2)
}
const parames = new URLSearchParams(window.location.search)
let  Id ;
if(new URLSearchParams(window.location.search)) {
    Id = parames.get("id")
}
 let productsArr = []
let total = 0;
if(document.querySelector(".details .info .counter input")) {
fetch("../product.json").then(r => r.json()).then(data => {
    // show data
    let price;
    for(let i = 0; i < data.products.length;i++) {
        if(data.products[i].id == Number(Id)) {
            document.querySelector(".details .info .title span").innerHTML = data.products[i].name
            document.querySelector(".details .img img").src =`.${data.products[i].img}`
            document.querySelector(".details .info .price span").innerHTML = `ج${data.products[i].price}`
            price = data.products[i].price
        }
    }
let x = document.querySelector(".details .info .price span")
let coun =1;
let inp = document.querySelector(".details .info .counter input")
inp.value = coun
let spans = document.querySelectorAll(".details .info .counter span")
spans[0].addEventListener("click" , () => {
    coun--
    inp.value = coun
    x.innerHTML = `ج${Number(x.innerHTML.split("").slice(1).join("")) - price}`
    if(inp.value <= 0 ) {
        inp.value = coun
    }
    inp.value = coun
})
spans[1].addEventListener("click" , () => {
    coun++
    inp.value = coun
    x.innerHTML = `ج${price * coun}`
    })
    // add to card
     let add = document.querySelector(".details .info a")
     if(add) {
         add.setAttribute("data-id", Number(Id))
         add.addEventListener("click" , () => {
             const stored = JSON.parse(window.localStorage.getItem("Products-local") || "[]")
             productsArr = Array.isArray(stored) ? stored : [];
             const product = data.products.find(p => p.id === Number(add.getAttribute("data-id")))
             if(product){
                 productsArr.push(product) 
                 window.localStorage.setItem("Products-local" , JSON.stringify(productsArr))
             }
             window.location = `./end.html`
         })
     }
})
}
if(window.localStorage.getItem("Products-local") && document.querySelector("table tbody")) {
    let arr = JSON.parse(window.localStorage.getItem("Products-local"))
    let tbody = document.querySelector("table tbody")
    for (let i = 0; i < arr.length; i++) {
        // create
        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        let close = document.createElement("span")
        let inp = document.createElement("input")
        let td4 = document.createElement("td")
        let span = document.createElement("span")
        let img = document.createElement("img")
        // class & value
        tr.setAttribute("id", arr[i].id)
        tr.setAttribute("class", `s${arr[i].id}`)
        close.innerHTML = "x"
        close.className = "close"
        img.src = `.${arr[i].img}`
        inp.type = "number"
        inp.value = "1"
        inp.maxLength = "1"
        td4.className = "Subtotal"
        td2.className = "price"
        td2.innerText = `ج${arr[i].price}`
        span.className = "title"
        td3.className = "Quantity"
        span.innerHTML = arr[i].name
        td1.className = "flex"
        td4.innerHTML = `ج${arr[i].price}`

        // append
        td1.appendChild(close)
        td3.appendChild(inp)
        td1.appendChild(img)
        td1.appendChild(span)
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tbody.appendChild(tr)
        // event
        inp.addEventListener("input", (e) => {
            let x = tr.getAttribute("class")
            let subtotals = document.querySelector(`table tbody tr.${x} td.Subtotal`).innerHTML = `$${Number(e.target.value) * arr[i].price}`
        })
        close.addEventListener("click", () => {
            // select id
            let Id = tr.getAttribute("id")
            let values = JSON.parse(window.localStorage.getItem("Products-local"))
            console.log(values)
            // recalc total price from remaining Subtotal cells
            let x = tr.getAttribute("class")
            let subtotals = document.querySelector(`table tbody tr.${x} td.Subtotal`).innerHTML
            let value = Number(subtotals.split("").slice(1).join(""))
            document.querySelector(".table .container .box div .price").innerText = `ج${totle - value}`
            totle= totle - value
            // remove by id
             values = values.filter(e => e.id !== Number(Id))
            window.localStorage.setItem("Products-local" ,JSON.stringify(values))
            tr.remove()
        })

    }
}
if(document.querySelector(".table .container .box div span.price")) {
    window.addEventListener("load", () => {
    let prices = document.querySelectorAll("table tbody tr td.Subtotal")
    totle = 0
    prices.forEach(e => {
        let value = Number(e.innerHTML.split("ج")[1])
        totle += value
    })
    document.querySelector(".table .container .box div .price").innerText = `ج${totle}`
})
}
let done = document.querySelector(".table .container .box a.done")
if(done) {
    done.addEventListener("click", () => {
        if(document.querySelectorAll("table tbody tr").length === 0) {
            alert("انت لم تقم باختيار أي منتج")
} else {
 const phoneNumber = "2001147053373"; 
 let value = JSON.parse(window.localStorage.getItem("Products-local"))
 let tot = 0
 let masseg = []
 for(let i =0 ;i<value.length;i++) {
    let name  = value[i].name
    let price = value[i].price
    tot += price
    masseg.push(`المنتج: ${name}  السعر: ${price} ج |`)
 }
 window.localStorage.clear()
 window.location.href = `https://wa.me/${phoneNumber}?text= ${masseg.join("\n")} | ${tot}  السعر الكلي ج`
}
})
}