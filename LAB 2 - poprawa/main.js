const box = document.querySelector('.box')
const dots = document.querySelectorAll('.dot')
let currentIndex = 0
let isPaused = false
let sliderInterval

const anim = () => 
{
  box.style.transform = `translateX(-${currentIndex * 800}px)`
  dots.forEach((dot, index) =>
    {
        dot.classList.toggle('active', index === currentIndex)
    })
}

document.querySelector('.Prev').addEventListener('click', () => 
{
    currentIndex = (currentIndex === 0) ? dots.length - 1 : currentIndex - 1
    anim()
})

document.querySelector('.Next').addEventListener('click', () => 
{
    currentIndex = (currentIndex === dots.length - 1) ? 0 : currentIndex + 1
    anim()
})

dots.forEach(dot => 
{
    dot.addEventListener('click', () => 
    {
        currentIndex = parseInt(dot.getAttribute('data-index'));
        anim()
    })
});

const startSlider = () => 
{
    sliderInterval = setInterval(() => 
    {
        currentIndex = (currentIndex === dots.length - 1) ? 0 : currentIndex + 1;
        anim()
    }, 3000)
}

const pauseSlider = () => 
{
    clearInterval(sliderInterval)
    document.querySelector('.Pause').style.display = 'none'
    document.querySelector('.Resume').style.display = 'inline'
};  

const resumeSlider = () => 
{
    document.querySelector('.Resume').style.display = 'none'
    document.querySelector('.Pause').style.display = 'inline'
    startSlider()
};

document.querySelector('.Pause').addEventListener('click', () => 
{
    isPaused = true
    pauseSlider()
});
  
document.querySelector('.Resume').addEventListener('click', () => 
{
    isPaused = false
    resumeSlider()
});

startSlider()
anim()