export function initMap() {
    const container = document.getElementById("map");
    if (!container) return;
    if (container.dataset.ymapInited === "1") return;

    if (typeof window === "undefined" || typeof window.ymaps === "undefined") {
        console.error("Yandex Maps API");
        return;
    }

    container.dataset.ymapInited = "1";

    window.ymaps.ready(() => {
        const myMap = new window.ymaps.Map("map", {
            center: [59.934862, 30.316218],
            zoom: 19,
            controls: ["zoomControl"],
            suppressMapOpenBlock: true,
        });
        myMap.copyrights.add(
            "<style>.ymaps-2-1-79-copyrights-pane { display: none !important; }</style>"
        );

        const firstPlacemark = new window.ymaps.Placemark(
            [59.934862, 30.316218],
            {},
            {
                iconLayout: "default#image",
                iconImageHref: "src/assests/svg/map_mark.svg",
                iconImageSize: [60, 137],
                iconImageOffset: [-15, -39],
            }
        );

        firstPlacemark.events.add("click", (e) => {
            window.open(
                "https://yandex.com/maps/2/saint-petersburg/house/bolshaya_morskaya_ulitsa_18/Z0kYdQZmS0QPQFtjfXVydXRlZg==/?ll=30.316219%2C59.934862&z=16.82",
                "_blank"
            );
            e.stopPropagation();
        });

        myMap.geoObjects.add(firstPlacemark);
    });
}