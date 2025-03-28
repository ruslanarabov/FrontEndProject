let slideIndex = 0;
  showSlides();

  function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].style.display = "block";
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }
    dots[slideIndex - 1].classList.add("active");
    setTimeout(showSlides, 4000); 
  }

  function currentSlide(n) {
    slideIndex = n - 1;
    showSlides();
  }




  document.addEventListener("DOMContentLoaded", function () {
    const productImages = document.getElementById("productImages");

    async function fetchData() {
        try {
            const response = await fetch("data.json");
            const images = await response.json();
            return images;
        } catch (error) {
            console.error("Error loading data.json", error);
            return null;
        }
    }

    async function updateImages(category) {
        const images = await fetchData();
        if (!images) return;
        
        productImages.innerHTML = "";
        images[category].forEach(item => {
            const img = document.createElement("img");
            img.src = item.src;
            img.alt = item.alt;
            img.style.width = "150px"; 
            img.style.margin = "10px";
            productImages.appendChild(img);
        });
    }

    document.querySelectorAll(".ourProBtn").forEach(button => {
        button.addEventListener("click", function () {
            const category = this.textContent.toLowerCase();
            updateImages(category);
        });
    });
});
