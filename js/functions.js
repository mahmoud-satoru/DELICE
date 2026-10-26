function slider_next(){
    sliders[0].classList.remove("active_slider");
    sliders[1].classList.remove("active_slider");
    sliders[2].classList.remove("active_slider");

    if(index_slider == 2){
        index_slider = 0;
    }
    else{
        index_slider = index_slider + 1;
    }

    sliders[index_slider].classList.add("active_slider");
    dot_pre();
}

function slider_pre(){
    sliders[0].classList.remove("active_slider");
    sliders[1].classList.remove("active_slider");
    sliders[2].classList.remove("active_slider");

    if(index_slider == 0){
        index_slider = 2;
    }
    else{
        index_slider = index_slider - 1;
    }

    sliders[index_slider].classList.add("active_slider");
    dot_next();
}

function play(){
    audio_camera.play();
}

function dot_next(){
    dots[0].classList.remove("active_span");
    dots[1].classList.remove("active_span");
    dots[2].classList.remove("active_span");

    if(index_dot == 2){
        index_dot = 0;
    }
    else{
        index_dot = index_dot + 1;
    }

    dots[index_dot].classList.add("active_span");
}

function dot_pre(){
    dots[0].classList.remove("active_span");
    dots[1].classList.remove("active_span");
    dots[2].classList.remove("active_span");

    if(index_dot == 0){
        index_dot = 2;
    }
    else{
        index_dot = index_dot - 1;
    }

    dots[index_dot].classList.add("active_span");
}

function new_slider_new_dot(){
    dots[0].classList.remove("active_span");
    dots[1].classList.remove("active_span");
    dots[2].classList.remove("active_span");

    sliders[0].classList.remove("active_slider");
    sliders[1].classList.remove("active_slider");
    sliders[2].classList.remove("active_slider");

    sliders[index_slider].classList.add("active_slider");
    dots[index_dot].classList.add("active_span");
}

function get_id(ele){
    if(Number(ele.id) === new_index){
        return;
    }

    new_index = Number(ele.id);
    index_dot = new_index;
    index_slider = new_index;

    new_slider_new_dot();
    play();
}

function copy_number(){
    navigator.clipboard.writeText("+20-102-108-0042");
}

function open_side_bar(){
    side_bar.classList.add("not_hide");

    setTimeout(function(){
        side_bar.classList.add("show_container");
    }, 1);

    setTimeout(function(){
        side_bar_transform.classList.add("side_bar_trans");
    }, 400);
}

function hide(){
    side_bar_transform.classList.remove("side_bar_trans");

    setTimeout(function(){
        side_bar.classList.remove("show_container");
    }, 500);

    setTimeout(function(){
        side_bar.classList.remove("not_hide");
    }, 1000);
}

function show_menu(type){

    menu_items.innerHTML = "";

    menu_links.forEach(function(link){
        link.classList.remove("active_menu");

        if(link.dataset.category == type){
            link.classList.add("active_menu");
        }
    });

    var selected_menu = allMenu.filter(function(item){
        return item.type == type;
    });

    selected_menu.forEach(function(item){

        menu_items.innerHTML += `
            <div class="col-lg-6 menu_food">
                <div class="food_img">
                    <img src="imgs/${item.images[0]}" alt="${item.name}">
                    <span onclick="show_food_popup(${item.id})">
                        <i class="fa-solid fa-utensils"></i>
                    </span>
                </div>

                <div class="text_food">
                    <h3>${item.name} <div></div> $${item.price.toFixed(2)}</h3>
                    <p>${item.miniDescription}</p>
                </div>
            </div>
        `;
    });

    var food_items = menu_items.querySelectorAll(".menu_food");

    food_items.forEach(function(item, index){
        item.animate(
            [
                {opacity: 0, transform: "translateY(20px)"},
                {opacity: 1, transform: "translateY(0)"}
            ],
            {
                duration: 500,
                delay: index * 100,
                fill: "both"
            }
        );
    });
}

function active_links(){

    var current_section = 0;

    sections.forEach(function(section, index){
        if(section.getBoundingClientRect().top <= 200){
            current_section = index;
        }
    });

    nav_links.forEach(function(link, index){
        link.classList.remove("active_anchor");

        if(index == current_section){
            link.classList.add("active_anchor");
        }
    });

    side_links.forEach(function(link, index){
        link.classList.remove("active_sidebar");

        if(index == current_section){
            link.classList.add("active_sidebar");
        }
    });
}

function nav_bg(){
    if(window.scrollY == 0){
        document.querySelector("nav").style.backgroundColor = "transparent";
    }
    else{
        document.querySelector("nav").style.backgroundColor = "var(--third_color)";
    }
}

function hide_nav(){
    if(window.scrollY > last_scroll && window.scrollY > 100){
        nav.style.transform = "translateY(-100%)";
    }
    else{
        nav.style.transform = "translateY(0)";
    }

    last_scroll = window.scrollY;
}

function scroll_progress(){

    var scroll_top = window.scrollY;
    var page_height = document.documentElement.scrollHeight - window.innerHeight;
    var progress = page_height > 0 ? (scroll_top / page_height) * 100 : 0;

    var progress_element = document.querySelector(".scroll_progress");

    if(progress_element){
        progress_element.style.width = progress + "%";
    }
}

function go_to_section(event, index, sidebar = false){

    event.preventDefault();

    if(sidebar){
        hide();
    }

    sections[index].scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

var food_popup;
var food_disc;

var popup_food_name;
var popup_food_image;
var popup_food_description;
var popup_food_price;

var current_food_category = [];
var current_food_index = 0;
var food_popup_open = false;

function show_food_popup(id){

    food_popup = document.querySelector(".food_container");
    food_disc = document.querySelector(".food_disc");

    if(!food_popup || !food_disc){
        console.log("Popup container not found");
        return;
    }

    var selected_food = allMenu.find(function(item){
        return item.id == id;
    });

    if(!selected_food){
        console.log("Food not found");
        return;
    }

    current_food_category = allMenu.filter(function(item){
        return item.type == selected_food.type;
    });

    current_food_index = current_food_category.findIndex(function(item){
        return item.id == id;
    });

    update_food_popup();

    food_popup.style.display = "flex";

    setTimeout(function(){
        food_popup.style.opacity = "1";
        food_disc.style.transform = "translateY(0)";
    }, 10);

    food_popup_open = true;
}

function update_food_popup(){

    var food = current_food_category[current_food_index];

    if(!food){
        return;
    }

    popup_food_name = document.querySelector("#popup_food_name");
    popup_food_image = document.querySelector("#popup_food_image");
    popup_food_description = document.querySelector("#popup_food_description");
    popup_food_price = document.querySelector("#popup_food_price");

    if(!popup_food_name || !popup_food_image || !popup_food_description || !popup_food_price){
        console.log("Popup content elements not found");
        return;
    }

    popup_food_name.textContent = food.name;
    popup_food_image.src = "imgs/" + food.images[0];
    popup_food_image.alt = food.name;
    popup_food_description.textContent = food.description;
    popup_food_price.textContent = "$" + food.price.toFixed(2);
}

function change_popup_food(direction){

    current_food_index += direction;

    if(current_food_index >= current_food_category.length){
        current_food_index = 0;
    }

    if(current_food_index < 0){
        current_food_index = current_food_category.length - 1;
    }

    update_food_popup();
}

function close_food_popup(){

    if(!food_popup_open){
        return;
    }

    food_popup_open = false;

    food_popup.style.opacity = "0";
    food_disc.style.transform = "translateY(-100%)";

    setTimeout(function(){
        if(!food_popup_open){
            food_popup.style.display = "none";
        }
    }, 500);
}