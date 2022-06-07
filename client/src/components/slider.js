import React from 'react';




import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const img1 = "https://media.istockphoto.com/photos/deer-fawn-picture-id472096009?b=1&k=20&m=472096009&s=170667a&w=0&h=Y_7nEaSTmz0gCnoOs2l7iDqyFo4j1FSWmtXQR7v5SG4="
const img2 ="https://media.istockphoto.com/photos/shebear-and-cubs-picture-id1064136288?b=1&k=20&m=1064136288&s=170667a&w=0&h=apjizpJzyt0VEzvU7JbMWFbcF9VYbfNhMvZ3jAOow-o=";
const img3 = "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YW5pbWFsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60";
const Slider =()=>{
    
    return(<>
          
          <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" style={{height:'200x'}}>
    <div class="carousel-item active" data-bs-interval="10000">
      <img src={img1} class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="2000">
      <img src={img2} class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src={img3} class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    </>)
}
export default Slider;