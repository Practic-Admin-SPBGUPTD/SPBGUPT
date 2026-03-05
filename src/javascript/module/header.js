export function headerMob(){
    const MobileBurger = document.querySelector('.header_mobile')
    const ButtonOpenBurger = document.getElementById('checkbox')
    const header = document.querySelector('.headerfix') 
    let isvisible = false
    let lastScroll = 0

    function handleScroll() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop
        
        if (currentScroll > 50) {
            header.classList.add('headerfix')
        } else {
            header.classList.remove('headerfix')
        }
        
        lastScroll = currentScroll
    }
    
    ButtonOpenBurger.addEventListener('click', function() {
        if (isvisible) {
            MobileBurger.style.display = 'none' 
        } else {
            MobileBurger.style.display = 'block' 
        }
        isvisible = !isvisible
    })
    
    window.addEventListener('scroll', handleScroll)
    
    handleScroll()
}