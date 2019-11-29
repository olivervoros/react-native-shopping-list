import React from "react";

export const API_ENDPOINT = 'http://api.sancusprojects.com:3000/api';

// converts to mm dd yy TO dd/mm/yy
export function convertJSToUserDate(date) {
    let JSDate = new Date(date);
    return  JSDate.getDate() + "/" + (JSDate.getMonth()+1) + "/" + JSDate.getFullYear();
}

export function capitaliseString(string) {
    return  (string.charAt(0).toUpperCase() + string.slice(1));
}

export function getVeggiesAndFruitsArray() {
    return { "apples": "Apples", "pear": "Pear", "lemon": "Lemon", "peach": "Peach", "strawberries" :
            "Strawberries", "plums" : "Plums", "banana" : "Bananas", "onion" : "Onion", "garlic" : "Garlic", 'tomatoes' : "Tomatoes",
            "paprika" : "Paprika", "cucumber" : "Cucumber", "corn_in_tin" : "Corn in Tin",
            "mushrooms" : "Mushrooms", "soup_vegetables" : "Soup Veggies", "potatoes" : "Potatoes"};
}

export function getDrinksArray() {
    return { "water": "Water", "beer": "Beer", "kubus": "Kubus", "wine": "Wine",
        "fruit_juice" : "Fruit Juice", "coffee_capsules" : "Coffee Capsules", "tea" : "Tea", "other_drinks" : "Other Drinks"};
}

export function getDairyProductsArray() {
    return { "milk": "Milk", "joghurt": "Joghurt", "white_Cheese": "White Cheese", "cream": "Cream",
        "butter" : "Butter", "cheese" : "Cheese", "chocolate" : "Chocolate", "coffee_whitener" : "Coffee Whitener"};
}

export function getMeatArray() {
    return { "chicken_wings": "Chicken Wings", "chicken_leg_full": "Full Chicken Leg", "chicken_breast": "Chicken Breast",
        "pork_loins": "Pork Loin Slices", "beef" : "Beef", 'fish_fingers' : "Fish Fingers", "frozen_seafood" : "Frozen Seafood",
        "salami" : "Salami", "ham" : "Ham", "sausage" : "Sausage", "fish_in_tin" : "Fish in Tin", "tuna" : "Tuna"};
}

export function getBakeryProductsArray() {
    return { "bread": "Bread", "kakaos_csiga": "Kakaos Csiga", "turos_batyu": "Túrós Bukta", "kifli": "Kifli",
            "sweet_bun" : "Sweet Bun", "csoki_maci" : "Csoki Maci", "vanilias_karika" : "Vaniliás Karika"};
}

export function getHomeProductsArray() {
    return { "toilet_paper": "Toilet Paper", "washing_up_liquid": "Washing Up Liquid", "washing_liquid": "Washing Liquid", "paper_roll":
            "Paper Roll", "liquid_soap" : "Liquid Soap", "shower_gel" : "Shower Gel", 'shampoo' : "Shampoo", 'toothpaste' : "Toothpaste",
            "cleaning_wipes" : "Cleaning wipes", 'rubbish_bin' : "Rubbish Bibs", "baking_paper" : "Baking Paper",
            "deodorant" : "Deodorant", "pantiliner" : "Pantiliner", "toilet_duck" : "Toilet Duck",
            "shaving_foam" : "Shaving Foam", "shaving_razors" : "Shaving Razors"};
}

export function getBasicProductsArray() {
    return { "flour" : "Flour", "sugar" : "Sugar", "cooking_oil" : "Cooking Oil", "salt" : "Salt", "eggs" : "Eggs",
        "rice" : "Rice", "pasta" : "Pasta"};
}

export function getExtraProductsArray() {
    return { "extra1" : "Extra Product 1", "extra2" : "Extra Product 2", "extra3" : "Extra Product 3",
        "extra4" : "Extra Product 4", "extra5" : "Extra Product 5" }
}

