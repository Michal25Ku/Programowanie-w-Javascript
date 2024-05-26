const box = document.querySelector('.box')
const dots = document.querySelectorAll('.dot')
let currentIndex = 0;

const anim = () => 
{
  box.style.transform = `translateX(-${currentIndex * 800}px)`
  dots.forEach((dot, index) =>
    {
        dot.classList.toggle('active'. index === currentIndex)
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

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        currentIndex = parseInt(dot.getAttribute('data-index'));
        anim();
    });
});

setInterval(() => {
    currentIndex = (currentIndex === dots.length - 1) ? 0 : currentIndex + 1;
    anim();
}, 3000);

anim();