// blog.js
let blogs = []

function addBlog(event) {
    event.preventDefault()

    let title = document.getElementById('title').value;
    let content = document.getElementById('content').value;
    let image = document.getElementById('image')

    let imageFileName = URL.createObjectURL(image.files[0])

    let blog = {
        title: title,
        content: content,
        image: imageFileName,
        author: "Leo G"
    }

    blogs.push(blog)

    console.log(blogs)

    renderBlog()
}

function renderBlog() {
    let blogListElement = document.getElementById('blogList')

    blogListElement.innerHTML = firstBlogContent()

    for (let index = 0; index < blogs.length; index++) {
        console.log(blogs[index])

        blogListElement.innerHTML += `
            <article class="blog-item">
                <div class="blog-item-img">
                    <img src="${blogs[index].image}" alt="">
                </div>
                <div class="blog-item-text">
                    <div class="blog-item-buttons">
                        <button class="blog-edit-button">Edit Blog</button>
                        <button class="blog-post-button">Post Blog</button>
                    </div>
                    <h1>${blogs[index].title}</h1>
                    <p>30 Jan 2025 11:22 WIB | ${blogs[index].author}</p>
                    <p>${blogs[index].content}</p>
                </div>
            </article>
        `
    }
}

function firstBlogContent() {
    return `
        <article class="blog-item">
            <div class="blog-item-img">
                <img src="assets/img/blog-img.png" alt="">
            </div>
            <div class="blog-item-text">
                <div class="blog-item-buttons">
                    <button class="blog-edit-button">Edit Blog</button>
                    <button class="blog-post-button">Post Blog</button>
                </div>
                <h1>Pasar Coding di Indonesia</h1>
                <p>30 Jan 2025 11:22 WIB | Alex Josua</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam nostrum assumenda, voluptates maiores sequi quisquam pariatur voluptatem non consequuntur dolor architecto, unde magni enim itaque. Nostrum quod veniam quaerat modi ducimus accusamus dolorem, repellat iusto, autem, ex in nesciunt eos mollitia quo numquam deserunt pariatur aut fugiat id maiores enim.</p>
            </div>
        </article>
    `
}