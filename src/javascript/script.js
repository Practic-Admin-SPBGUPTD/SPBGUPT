import { headerMob } from "./module/header.js";
import { initMap } from "./module/ymap.js";

document.addEventListener("DOMContentLoaded", function() {
    try {
        headerMob();
        initMap();
    } catch (error) {
        console.error(error);
    }
}
);