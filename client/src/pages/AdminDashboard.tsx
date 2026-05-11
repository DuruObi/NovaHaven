import { useEffect, useState } from "react";
import API from "../api";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
}

function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comicsCount, setComicsCount] = useState(0);
  const [comicForm, setComicForm] = useState({
    chapterNumber: "",
    title: "",
    description: "",
    imageUrl: "",
  });

  // LOAD POSTS
  const fetchPosts = async () => {
    const res = await API.get("/forum");
    setPosts(res.data);
  };

  // LOAD COMICS COUNT
  const fetchComicsCount = async () => {
    const res = await API.get("/comics");
    setComicsCount(res.data.length);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchPosts();
      await fetchComicsCount();
    };

    loadData();
  }, []);

  // DELETE POST
  const deletePost = async (id: string) => {
    await API.delete(`/forum/${id}`);
    fetchPosts();
  };

  // CREATE COMIC CHAPTER
  const uploadComic = async (e) => {
    e.preventDefault();

    const payload = {
      chapterNumber: Number(comicForm.chapterNumber),
      title: comicForm.title,
      description: comicForm.description,
      pages: [
        {
          imageUrl: comicForm.imageUrl,
          pageNumber: 1,
        },
      ],
    };

    await API.post("/comics", payload);

    alert("Comic chapter uploaded!");

    setComicForm({
      chapterNumber: "",
      title: "",
      description: "",
      imageUrl: "",
    });

    fetchComicsCount();
  };

  return (
    <div className="admin-page">
      <h2>NovaHaven Admin Dashboard</h2>

      {/* ANALYTICS */}
      <section className="admin-stats">
        <div className="stat-card">
          <h3>{posts.length}</h3>
          <p>Forum Posts</p>
        </div>

        <div className="stat-card">
          <h3>{comicsCount}</h3>
          <p>Comic Chapters</p>
        </div>

        <div className="stat-card">
          <h3>245</h3>
          <p>Community Members</p>
        </div>
      </section>

      {/* COMIC UPLOAD */}
      <section className="admin-upload">
        <h3>Upload New Comic Chapter</h3>

        <form onSubmit={uploadComic}>
          <input
            placeholder="Chapter Number"
            value={comicForm.chapterNumber}
            onChange={(e) =>
              setComicForm({
                ...comicForm,
                chapterNumber: e.target.value,
              })
            }
          />

          <input
            placeholder="Chapter Title"
            value={comicForm.title}
            onChange={(e) =>
              setComicForm({
                ...comicForm,
                title: e.target.value,
              })
            }
          />

          <textarea
            placeholder="Description"
            value={comicForm.description}
            onChange={(e) =>
              setComicForm({
                ...comicForm,
                description: e.target.value,
              })
            }
          />

          <input
            placeholder="Comic Image URL"
            value={comicForm.imageUrl}
            onChange={(e) =>
              setComicForm({
                ...comicForm,
                imageUrl: e.target.value,
              })
            }
          />

          <button type="submit">Upload Chapter</button>
        </form>
      </section>

      {/* FORUM MODERATION */}
      <section className="admin-posts">
        <h3>Manage Forum Posts</h3>

        {posts.map((post) => (
          <div key={post._id} className="admin-post-card">
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <small>By {post.author}</small>

            <button onClick={() => deletePost(post._id)}>
              Delete Post
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default AdminDashboard;