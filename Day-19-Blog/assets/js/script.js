
    const blogs = [

      {
        id:1,
        category:"Technology",
        title:"Top JavaScript Features Every Developer Should Know",
        desc:"Learn modern JavaScript concepts that improve your frontend development workflow and coding skills.",
        image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        author:"Meet Patel",
        authorImg:"https://i.pravatar.cc/100?img=1"
      },

      {
        id:2,
        category:"UI Design",
        title:"How To Create Beautiful Glassmorphism UI",
        desc:"Master glassmorphism design trends using CSS effects, blur backgrounds, shadows, and gradients.",
        image:"https://images.unsplash.com/photo-1558655146-d09347e92766",
        author:"Rahul Shah",
        authorImg:"https://i.pravatar.cc/100?img=2"
      },

      {
        id:3,
        category:"React",
        title:"Why React Is Popular In Frontend Development",
        desc:"Understand why React dominates modern frontend development and how components make UI scalable.",
        image:"https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        author:"Amit Verma",
        authorImg:"https://i.pravatar.cc/100?img=3"
      },

      {
        id:4,
        category:"Bootstrap",
        title:"Build Responsive Websites Faster Using Bootstrap",
        desc:"Bootstrap helps developers create responsive layouts quickly with prebuilt classes and utilities.",
        image:"https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
        author:"Priya Sharma",
        authorImg:"https://i.pravatar.cc/100?img=4"
      },

      {
        id:5,
        category:"Frontend",
        title:"Frontend Developer Roadmap 2026",
        desc:"A complete beginner roadmap to become a frontend developer with modern technologies and projects.",
        image:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        author:"Meet Patel",
        authorImg:"https://i.pravatar.cc/100?img=5"
      },

      {
        id:6,
        category:"Career",
        title:"Tips To Improve Coding Consistency Every Day",
        desc:"Small daily coding habits can massively improve your development skills and confidence.",
        image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        author:"Karan Mehta",
        authorImg:"https://i.pravatar.cc/100?img=6"
      }

    ];

    // Elements

    const blogContainer = document.getElementById("blogContainer");
    const searchInput = document.getElementById("searchInput");
    const emptyState = document.getElementById("emptyState");

    // Render Blogs

    function renderBlogs(items){

      blogContainer.innerHTML = "";

      if(items.length === 0){

        emptyState.style.display = "block";
        return;

      }

      emptyState.style.display = "none";

      items.forEach(blog => {

        blogContainer.innerHTML += `

          <div class="col-lg-4 col-md-6">

            <div class="blog-card">

              <div class="blog-img">
                <img src="${blog.image}" alt="">
              </div>

              <div class="blog-content">

                <span class="blog-category">
                  ${blog.category}
                </span>

                <h3 class="blog-title">
                  ${blog.title}
                </h3>

                <p class="blog-desc">
                  ${blog.desc}
                </p>

                <div class="blog-footer">

                  <div class="author">

                    <img src="${blog.authorImg}" alt="">

                    <div>
                      <h6 class="mb-0">${blog.author}</h6>
                    </div>

                  </div>

                  <button class="read-btn">
                    Read
                  </button>

                </div>

              </div>

            </div>

          </div>

        `;

      });

    }

    // Initial Render

    renderBlogs(blogs);

    // Search Functionality

    searchInput.addEventListener("keyup", () => {

      const value = searchInput.value.toLowerCase();

      const filteredBlogs = blogs.filter(blog =>

        blog.title.toLowerCase().includes(value) ||
        blog.category.toLowerCase().includes(value) ||
        blog.author.toLowerCase().includes(value)

      );

      renderBlogs(filteredBlogs);

    });