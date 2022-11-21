let counter = 1;
let canScroll = false;
let nextPage = null;
getData(0)
const ScrollLoader = document.querySelector('.ScrollLoader')

const option = {
    root: null,
    rootMargin: "20px",
    threshold: 0
};
const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && canScroll && nextPage) {
        getData(nextPage)
    }
};

const observer = new IntersectionObserver(handleObserver, option);
if (ScrollLoader) observer.observe(ScrollLoader);


