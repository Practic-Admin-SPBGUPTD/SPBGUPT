export function headerMob(){
    const MobileBurger = document.querySelector('.header_mobile')
    const ButtonOpenBurger = document.getElementById('checkbox')
    let isvisible = false
    ButtonOpenBurger.addEventListener('click', function() {
        if (isvisible) {
            MobileBurger.style.display = 'none' 
        } else {
            MobileBurger.style.display = 'block' 
        }
        isvisible = !isvisible
    })
}
