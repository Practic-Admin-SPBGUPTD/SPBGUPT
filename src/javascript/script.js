import { headerMob } from "./modules/header.js";
import { SliderManager } from "./modules/slider.js";
import { initMap } from "./modules/ymap.js";

document.addEventListener("DOMContentLoaded", function() {
    try {
        headerMob();
        initMap();
        new SliderManager();
    } catch (error) {
        console.error(error);
    }
}
);