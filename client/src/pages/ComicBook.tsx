import { useEffect, useState } from "react";
import API from "../api";

interface Chapter {
  _id: string;
  chapterNumber: number;
  title: string;
  description: string;
  pages: { imageUrl: string }[];
}

function ComicBook() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // LOAD ALL CHAPTERS
  const fetchChapters = async () => {
    const res = await API.get("/comics");
    setChapters(res.data);

    if (res.data.length > 0) {
      setSelectedChapter(res.data[0]);
    }
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  const nextPage = () => {
    if (
      selectedChapter &&
      currentPage < selectedChapter.pages.length - 1
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const chooseChapter = (chapter) => {
    setSelectedChapter(chapter);
    setCurrentPage(0);
  };

  return (
    <div className="comic-page">
      <h2>NovaHaven Comic Reader</h2>

      <div className="comic-layout">

        {/* CHAPTER LIST */}
        <aside className="chapter-sidebar">
          <h3>Chapters</h3>

          {chapters.map((chapter) => (
            <div
              key={chapter._id}
              className="chapter-item"
              onClick={() => chooseChapter(chapter)}
            >
              Chapter {chapter.chapterNumber} — {chapter.title}
            </div>
          ))}
        </aside>

        {/* READER */}
        <main className="reader-area">
          {selectedChapter ? (
            <>
              <h3>
                Chapter {selectedChapter.chapterNumber} — {selectedChapter.title}
              </h3>

              <p>{selectedChapter.description}</p>

              <div className="comic-image-box">
                {selectedChapter.pages.length > 0 ? (
                  <img
                    src={selectedChapter.pages[currentPage].imageUrl}
                    alt="Comic Page"
                  />
                ) : (
                  <p>No pages uploaded yet</p>
                )}
              </div>

              <div className="reader-controls">
                <button onClick={prevPage}>Previous</button>
                <span>
                  Page {currentPage + 1} / {selectedChapter.pages.length}
                </span>
                <button onClick={nextPage}>Next</button>
              </div>
            </>
          ) : (
            <p>No chapters available</p>
          )}
        </main>

      </div>
    </div>
  );
}

export default ComicBook;