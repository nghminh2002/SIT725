document.addEventListener("DOMContentLoaded", function () {
  M.AutoInit();
  getBlogs();
});

const getBlogs = () => {
  $.get("/api/blogs", (response) => {
    displayBlogs(response);
  });
};

const createBlog = () => {
  const title = document.getElementById("blogTitle").value;
  const content = document.getElementById("blogContent").value;

  if (!title || !content) {
    M.toast({ html: "Please fill in all fields!", classes: "red" });
    return;
  }

  $.ajax({
    url: "/api/blogs",
    type: "POST",
    data: JSON.stringify({ title, content }),
    contentType: "application/json",
    success: (result) => {
      document.getElementById("blogTitle").value = "";
      document.getElementById("blogContent").value = "";
      M.updateTextFields();
      M.toast({ html: "Blog posted successfully!", classes: "green" });
      getBlogs();
    },
    error: (error) => {
      M.toast({ html: "Error creating blog!", classes: "red" });
      console.error("Error creating blog:", error);
    },
  });
};

const displayBlogs = (blogs) => {
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
};

const generateLuckyNumber = () => {
  $.get("/api/lucky-number", (response) => {
    if (response.statusCode == 200) {
      document.getElementById("luckyNumber").textContent = response.number;
      if (response.message) {
        M.toast({
          html: response.message,
          classes: response.number > 80 ? "green" : "orange",
        });
      }
    }
  });
};

const socket = io();

socket.on("welcome", (message) => {
  showNotification("SOCKET: " + message);
});

socket.on("funMessage", (message) => {
  showNotification("SOCKET: " + message);
});

function showNotification(message) {
  const notifications = document.getElementById("notifications");
  const notification = document.createElement("div");
  notification.className = "notification purple lighten-4";
  notification.textContent = message;

  notifications.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      notifications.removeChild(notification);
    }, 500);
  }, 5000);
}
