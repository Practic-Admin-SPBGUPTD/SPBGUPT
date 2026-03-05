export class SliderManager {
    constructor() {
        this.sliders = new Map();
        this.init();
    }
    
    init() {
        document.querySelectorAll('.slider').forEach(slider => {
            const sliderId = slider.dataset.slider;
            const slides = slider.querySelectorAll('.slide');
            
            this.sliders.set(sliderId, {
                element: slider,
                track: slider.querySelector('.slider-track'),
                slides: slides,
                currentIndex: 0,
                slidesCount: slides.length,
                currentDisplay: slider.querySelector('.current-slide'),
                totalDisplay: slider.querySelector('.total-slides')
            });
            
            const sliderData = this.sliders.get(sliderId);
            if (sliderData.totalDisplay) {
                sliderData.totalDisplay.textContent = sliderData.slidesCount;
            }
        });
        
        this.bindEvents();
    }
    
    bindEvents() {
        document.querySelectorAll('.slider-nav').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const slider = e.target.closest('.slider');
                const sliderId = slider.dataset.slider;
                const direction = e.target.dataset.direction;
                
                this.handleSlider(sliderId, direction);
            });
        });
    }
    
    handleSlider(sliderId, direction) {
        const slider = this.sliders.get(sliderId);
        if (!slider) return;
        
        let newIndex = slider.currentIndex;
        
        if (direction === 'next' && slider.currentIndex < slider.slidesCount - 1) {
            newIndex++;
        } else if (direction === 'prev' && slider.currentIndex > 0) {
            newIndex--;
        }
        
        if (newIndex !== slider.currentIndex) {
            slider.currentIndex = newIndex;
            this.updateSlider(sliderId);
        }
    }
    
    updateSlider(sliderId) {
        const slider = this.sliders.get(sliderId);
        
        slider.track.style.transform = `translateX(-${slider.currentIndex * 100}%)`;
        
        if (slider.currentDisplay) {
            slider.currentDisplay.textContent = slider.currentIndex + 1;
        }
        
        this.updateButtonsState(sliderId);
    }
    
    updateButtonsState(sliderId) {
        const slider = this.sliders.get(sliderId);
        const prevBtn = slider.element.querySelector('[data-direction="prev"]');
        const nextBtn = slider.element.querySelector('[data-direction="next"]');

        if (prevBtn) {
            prevBtn.disabled = slider.currentIndex === 0;
        }
        
        if (nextBtn) {
            nextBtn.disabled = slider.currentIndex === slider.slidesCount - 1;
        }
    }
}

