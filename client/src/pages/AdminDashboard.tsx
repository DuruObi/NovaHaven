import { useEffect, useState } from "react";
import API from "../api";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [comicForm, setComicForm] = useState({
    chapterNumber: "",
    title: "",
    description: "",
  });

  // LOAD POSTS
  const fetchPosts = async () => {
    try {
      const res = await API.get("/forum");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // DELETE POST
  const deletePost = async (id: string) => {
    try {
      await API.delete(`/forum/${id}`);
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  // UPLOAD COMIC CHAPTER WITH CLOUDINARY IMAGE
  const uploadComic = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!selectedFile) {
        alert("Please select a comic image first");
        return;
      }

      // STEP 1: Upload image to Cloudinary through backend
      const formData = new FormData();
      formData.append("image", selectedFile);

      const uploadRes = await API.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const uploadedImageUrl = uploadRes.data.imageUrl;

      // STEP 2: Create comic chapter using uploaded image URL
      const payload = {
        chapterNumber: Number(comicForm.chapterNumber),
        title: comicForm.title,
        description: comicForm.description,
        pages: [
          {
            imageUrl: uploadedImageUrl,
            pageNumber: 1,
          },
        ],
      };

      await API.post("/comics", payload);

      alert("Comic chapter uploaded successfully!");

      // RESET FORM
      setComicForm({
        chapterNumber: "",
        title: "",
        description: "",
      });

      setSelectedFile(null);
    } catch (error) {
      console.log(error);
      alert("Upload failed");
    }
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
          <h3>12</h3>
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
            type="number"
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
            type="text"
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
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setSelectedFile(e.target.files[0]);
              }
            }}
          />

          <button type="submit">Upload Chapter</button>
        </form>
      </section>

      {/* FORUM MODERATION */}
      <section className="admin-posts">
        <h3>Manage Forum Posts</h3>

        {posts.map((post: any) => (
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
};

export default AdminDashboard;
