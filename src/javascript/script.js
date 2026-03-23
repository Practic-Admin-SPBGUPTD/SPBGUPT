import { headerMob } from "./modules/header.js";
import { SliderManager } from "./modules/slider.js";
import { initMap } from "./modules/ymap.js";
import { initLeadForm } from "./modules/form.js";

document.addEventListener("DOMContentLoaded", function() {
    try {
        headerMob();
        initMap();
        new SliderManager();
        initLeadForm();
    } catch (error) {
        console.error(error);
    }
}
);