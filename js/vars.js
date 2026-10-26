let sliders = document.querySelectorAll(".slider"),
index_dot = 0,
index_slider = 0,
audio_camera = new Audio("../recordes/camer_shutter.mp3"),
dots = document.querySelectorAll(".dots_box span"),
new_index,
side_bar = document.querySelector(".side_bar_container"),
side_bar_transform = document.querySelector(".side_bar");
var menu_items = document.querySelector("#menu_items");
var menu_links = document.querySelectorAll(".sec_5 .menu a");
var nav_links = document.querySelectorAll("nav .links a");
var side_links = document.querySelectorAll(".side_bar .text_container a");
var sections = [
    document.querySelector("main"),
    document.querySelector(".sec_2"),
    document.querySelector(".sec_3"),
    document.querySelector(".sec_4"),
    document.querySelector(".sec_5"),
    document.querySelector(".sec_6"),
    document.querySelector(".sec_7")
];
var last_scroll = 0;
var nav = document.querySelector("nav");
window.addEventListener("scroll", scroll_progress);
window.addEventListener("load", scroll_progress);

var food_popup = document.querySelector(".food_container");
var food_disc = document.querySelector(".food_disc");

var popup_food_name;
var popup_food_image;
var popup_food_description;
var popup_food_price;

var current_food_category = [];
var current_food_index = 0;
var food_popup_open = false;

var menu_items = document.querySelector("#menu_items");
var menu_links = document.querySelectorAll(".sec_5 .menu a");