let testimonials = [
	{
		author: "Andhika Chandra Gulpa",
		rating: 5,
		description: "Lorem ipsum dolor sit",
		image: "web-version.jpg",
	},
	{
		author: "Testimonial Name 2",
		rating: 5,
		description: "Lorem ipsum dolor sit",
		image: "web-version.jpg",
	},
	{
		author: "Testimonial Name 3",
		rating: 4,
		description: "Lorem ipsum dolor sit",
		image: "web-version.jpg",
	},
	{
		author: "Testimonial Name 4",
		rating: 4,
		description: "Lorem ipsum dolor sit",
		image: "web-version.jpg",
	},
	{
		author: "Testimonial Name 5",
		rating: 2,
		description: "Lorem ipsum dolor sit",
		image: "web-version.jpg",
	},
];

const testimonialsContainer = document.getElementById("testimonialList");

const testimonialsHTML = (array) => {
	return array
		.map(
			(testimonial) => `
        <article>
            <img src="assets/img/${testimonial.image}" alt="" />
            <p class="testimonial-item-caption">${testimonial.description}</p>
            <p style="text-align: right">${testimonial.author}</p>
            <p style="text-align: right; font-weight: bold">${testimonial.rating}★</p>
        </article>`
		)
		.join("");
};

function showAllTestimonial() {
	testimonialsContainer.innerHTML = testimonialsHTML(testimonials);
}

showAllTestimonial();

function filterTestimonialByStar(rating) {
    const filteredTestimonials = testimonials.filter(
        (testimonial) => testimonial.rating === rating
    );
    testimonialsContainer.innerHTML = testimonialsHTML(filteredTestimonials);
}
