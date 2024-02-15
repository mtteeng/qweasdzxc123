let products = [
    {id: 1, title: 'Product 1', description: 'Descriprtion1', price: 100},
    {id: 2, title: 'Product 2', description: 'Descriprtion2', price: 200},
    {id: 3, title: 'Product 3', description: 'Descriprtion3', price: 300},
    {id: 4, title: 'Product 4', description: 'Descriprtion4', price: 400},
    {id: 5, title: 'Product 5', description: 'Descriprtion5', price: 500},
    {id: 6, title: 'Product 6', description: 'Descriprtion6', price: 600},
    {id: 7, title: 'Product 7', description: 'Descriprtion7', price: 700},
    {id: 8, title: 'Product 8', description: 'Descriprtion8', price: 800},
    {id: 9, title: 'Product 9', description: 'Descriprtion9', price: 900},
    {id: 10, title: 'Product 10', description: 'Descriprtion10', price: 1000},
]

let users = [
    {id:1, login: 'user1', password: '123', email: 'user1@email.ru'},
    {id:2, login: 'user2', password: '123', email: 'user2@email.ru'},
    {id:3, login: 'user3', password: '123', email: 'user3@email.ru'},
]

let carts = [
    {id:1, 
    user_id: 1, 
    product: {id: 8, title: 'Product8', description: 'Descriprtion8', price: 800}, 
    total_price: 300}
]

let isAuth = false;
let user_id = null;

let wrap = document.querySelector('.wrap')

document.addEventListener('DOMContentLoaded',()=>{

})
let header = document.createElement('header')
document.body.prepend(header)
let menu = document.createElement('ul');
menu.classList.add('menu');
header.prepend(menu)

let li_login = document.createElement('li'),
    li_reg = document.createElement('li'),
    li_cart = document.createElement('li'),
    li_logout = document.createElement('li'),
    li_home = document.createElement('li');

function checkAuth(){
    if (isAuth){
        li_home.remove();
        li_reg.remove();
        li_login.remove();
        menu.append(li_home);
        menu.append(li_cart);
        menu.append(li_logout);
    }else{
        li_home.remove();
        li_cart.remove();
        li_logout.remove();
        menu.append(li_home);
        menu.append(li_reg);
        menu.append(li_login);  
    }
    
}

checkAuth();

li_login.innerHTML = `<a href='/login' class='menu__item' onclick='logFunc(event)'>Login</a>`;
li_reg.innerHTML = `<a href='/registration' class='menu__item' onclick='regis(event)'>Registration</a>`;
li_home.innerHTML = `<a href='/' class='menu__item' onclick='showHome(event)'>Home</a>`;
li_logout.innerHTML = `<a href='/' class='menu__item' onclick='logout(event)'>Login Out</a>`;
li_cart.innerHTML = `<a href='/cart' class='menu__item' onclick='showCart(event)'>Cart</a>`;


// Login Out
function logout(event){
    event.preventDefault();
    isAuth = false
    user_id = null;
    checkAuth();
}

// Show products for Auth
function showHome(event){
    event.preventDefault();
    wrap.innerHTML = '';
    let row = document.createElement('div');
    row.classList.add('row');
    wrap.append(row)

    let productsShow = products.map(product => {
        if (isAuth){
        return row.insertAdjacentHTML('beforeend',
        `<div class='product__card'>
            <h4 class='title'>${product.title}</h4>
            <p class='description'>${product.description}</p>
            <p class='price'>${product.price} Rub</p>
            <button class='btn'>Add to card</button>
        </div>`
        )} else{
            return row.insertAdjacentHTML('beforeend',
        `<div class='product__card'>
            <h4 class='title'>${product.title}</h4>
            <p class='description'>${product.description}</p>
            <p class='price'>${product.price} Rub</p>
        </div>`
        )
        }
    })
    user_id = 1
    let btns = row.querySelectorAll('.btn')
    console.log(btns)
    for (let i = 0;i<btns.length;i++){
        let btn = btns[i];
        btn.addEventListener('click',()=>{
            console.log(btn)
            if(user_id){
                let cart = {
                    id: carts.length + 1,
                    user_id: user_id,
                    product: products[i],
                    total_price: products[i].price
                };
                console.log(cart)
                carts.push(cart)
            }
            console.log(carts)
            // {id:1, login: 'user1', password: '123', email: 'user1@email.ru'},
        })
    }
}

// Show products for not Auth

function showCart(event){
    event.preventDefault();
    wrap.innerHTML = '';
    let total = 0;
    let row = document.createElement('div');
    row.classList.add('cart__row');
    wrap.append(row)
    carts.forEach(cart => {
        row.insertAdjacentHTML('beforeend',
        `<div class='cart__card'>
            <h4 class='cart__title'>${cart.product.title}</h4>
            <p class='cart__price'>${cart.product.price} Rub</p>
         </div>
        `)
        total += cart.product.price;
    })
    wrap.insertAdjacentHTML('afterend',
    `
    <div class='total__price'>
        <h4> Total price: </h4>
        <p> ${total} Rub </p>
    </div>
    `)
}

// Registration
async function regis(event){
    event.preventDefault();
    wrap.innerHTML = '';
    let row = await document.createElement('div');
    row.classList.add('regform__row');
    wrap.append(row)
    row.insertAdjacentHTML('beforeend',
    `<div class='container'>
        <form class='regform'>
            <h1 class='reg__title'>Registration</h1>
            
            <div class='input'>   
            <label for="login"> Login</label>
            <input type='text' id='login'>
            </div>
            <div class=' login__error'></div>
            <div class='input'>    
            <label for="email"> E-mail</label>
            <input type='email' id='email'>
            <div class='email__error'></div>
            </div>
            <div class='input'>    
            <label for="pass"> Password</label>
            <input type='text' id='pass'>
            <div class='pass__error'></div>
            </div>
            <div class='input'>
            <label for="pass2">again Password</label>
            <input type='text' id='pass2'>
            <div class='pass2__error'></div>
            </div>
            <button class='btn__reg' onclick='registrationFFF(event)'>Send</button>
        </form>
    </div>
    `)
    let formReg = await document.querySelector('.regform')
    console.log(formReg[0].value)
    let login = formReg[0]
    login.addEventListener('focusin',()=> {
        document.querySelector('.login__error').innerHTML=''
    })
    login.addEventListener('focusout',()=> {
       if (login.value.length < 8){
        document.querySelector('.login__error').innerHTML='Малое количество символов'
       }
    })
    let email = formReg[1]
    email.addEventListener('focusin',()=> {
        document.querySelector('.email__error').innerHTML=''
    })
    email.addEventListener('focusout',()=> {
       if (!email.value.includes('@')){
            document.querySelector('.email__error').innerHTML='Отсутствует необходимый символ @'
       }
    })
    let pass = formReg[2]
    pass.addEventListener('focusin',()=> {
        document.querySelector('.pass__error').innerHTML=''
    })
    pass.addEventListener('focusout',()=> {
       if (pass.value.length < 8){
            document.querySelector('.pass__error').innerHTML='Мало символов'
       }
    })
    let pass2 = formReg[3]
    pass2.addEventListener('focusin',()=> {
        document.querySelector('.pass__error').innerHTML=''
    })
    pass2.addEventListener('focusout',()=> {
       if (pass2.value != pass.value){
            document.querySelector('.pass2__error').innerHTML='Введенный пароль не совпадает'
       }
    })
    

}

function registrationFFF(event){
    event.preventDefault();
    let user = {
        id: users.length + 1,
        login: login.value,
        password: pass.value,
        email: email.value
    }
    users.push(user)
    console.log(users)

}

// Login

async function logFunc(event){
    event.preventDefault();
    wrap.innerHTML = '';
    let row = document.createElement('div');
    row.classList.add('loginform__row');
    wrap.append(row)
    row.insertAdjacentHTML('beforeend',
    `<div class='container'>
        <form class='login_form'>
            <h1 class='login__title'>Authorisation</h1>
            <div class='input'>   
            <label for="login"> Login</label>
            <input type='text' id='login'>
            </div>
            <div class=' login__error'></div>
            <div class='input'>    
            <label for="pass"> Password</label>
            <input type='text' id='pass'>
            <div class='pass__error'></div>
            </div>
            <button class='btn__login' onclick='logInInIn(event)'>Send</button>
        </form>
    </div>
    `)
    
}


async function logInInIn(event){
    event.preventDefault();
    let loginform = await document.querySelector('.login_form')
    users.forEach(user => {
        if (user.login === loginform[0].value && user.password === loginform[1].value){
            isAuth = true;
            user_id = user.id;
            checkAuth();
            alert('Succesful!')
        }
    });
}