document.addEventListener("DOMContentLoaded", function () {
  M.AutoInit();
  loadBlogs();
});

async function loadBlogs() {
  try {
    const response = await fetch("/api/blogs");
    const blogs = await response.json();
    displayBlogs(blogs);
  } catch (error) {
    M.toast({ html: "Error loading blogs!", classes: "red" });
    console.error("Error loading blogs:", error);
  }
}

async function createBlog() {
  const title = document.getElementById("blogTitle").value;
  const content = document.getElementById("blogContent").value;

  if (!title || !content) {
    M.toast({ html: "Please fill in all fields!", classes: "red" });
    return;
  }

  try {
    const response = await fetch("/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    const newBlog = await response.json();

    document.getElementById("blogTitle").value = "";
    document.getElementById("blogContent").value = "";
    M.updateTextFields();
    M.toast({ html: "Blog posted successfully!", classes: "green" });

    loadBlogs();
  } catch (error) {
    M.toast({ html: "Error creating blog!", classes: "red" });
    console.error("Error creating blog:", error);
  }
}

function displayBlogs(blogs) {
  const container = document.getElementById("blogContainer");
  container.innerHTML = "";

  blogs.reverse().forEach((blog) => {
    const blogElement = document.createElement("div");
    blogElement.className = "col s12 m6";
    blogElement.innerHTML = `
            <div class="card blog-post">
                <div class="card-content">
                    <span class="card-title">${blog.title}</span>
                    <div class="date">${blog.date}</div>
                    <p>${blog.content}</p>
                    <div class="blog-actions">
                        <i class="material-icons" title="Like">favorite_border</i>
                        <i class="material-icons" title="Share">share</i>
                        <i class="material-icons" title="Comment">comment</i>
                    </div>
                </div>
            </div>
        `;
    container.appendChild(blogElement);
  });
}

function generateLuckyNumber() {
  const number = Math.floor(Math.random() * 100) + 1;
  document.getElementById("luckyNumber").textContent = number;

  if (number > 80) {
    M.toast({ html: "Wow! That's a very lucky number!", classes: "green" });
  } else if (number < 20) {
    M.toast({
      html: "Don't worry, tomorrow will be better!",
      classes: "orange",
    });
  }
}
