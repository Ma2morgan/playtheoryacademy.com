import React, { useState } from "react";
import "./style.css";

export default function App() {
  const books = [
    {
      title: "Pete the Cat",
      level: "Easy Reader",
      reward: "Cool Cat Badge",
      quiz: [
        "Who is the main character?",
        "What color shoes did Pete wear?",
        "Was Pete sad or happy?",
      ],
    },
    {
      title: "Biscuit",
      level: "Very Easy",
      reward: "Puppy Badge",
      quiz: [
        "What kind of animal is Biscuit?",
        "Who takes care of Biscuit?",
        "What does Biscuit like to do?",
      ],
    },
    {
      title: "Frog and Toad",
      level: "Growing Reader",
      reward: "Friendship Badge",
      quiz: [
        "Who are the two friends?",
        "How do Frog and Toad help each other?",
        "What is one kind thing they do?",
      ],
    },
    {
      title: "Magic Tree House",
      level: "Chapter Starter",
      reward: "Adventure Badge",
      quiz: [
        "Where does the tree house take Jack and Annie?",
        "What do they discover?",
        "How do they get home?",
      ],
    },
  ];

  const [completedBooks, setCompletedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const completeBook = (book) => {
    if (!completedBooks.includes(book.title)) {
      setCompletedBooks([...completedBooks, book.title]);
    }
  };

  const getPrize = () => {
    if (completedBooks.length >= 12) return "🎉 LARGE PRIZE: Big Adventure Day!";
    if (completedBooks.length >= 8) return "⭐ MEDIUM PRIZE: Ice Cream or Target Trip!";
    if (completedBooks.length >= 4) return "✨ SMALL PRIZE: Pokémon Cards!";
    return "Keep reading to unlock your first prize!";
  };

  return (
    <div className="app">
      <header className="hero">
        <h1>📚 Amelia's Summer Reading Quest</h1>
        <p>Read books. Take quizzes. Earn badges. Unlock rewards.</p>
      </header>

      <section className="progress-box">
        <h2>🏆 Reading Progress</h2>
        <p className="big-number">{completedBooks.length}</p>
        <p>Books Completed</p>
        <h3>{getPrize()}</h3>
      </section>

      <section>
        <h2>📖 Choose a Book</h2>

        <div className="book-grid">
          {books.map((book, index) => (
            <div className="book-card" key={index}>
              <h2>{book.title}</h2>
              <p>Level: {book.level}</p>
              <p>Badge: {book.reward}</p>

              <button onClick={() => setSelectedBook(book)}>
                Take Quiz
              </button>

              {completedBooks.includes(book.title) ? (
                <button className="completed-btn">Badge Earned ✅</button>
              ) : (
                <button onClick={() => completeBook(book)}>
                  Mark Complete
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {selectedBook && (
        <section className="quiz-box">
          <h2>📝 Quiz: {selectedBook.title}</h2>
          <p>Answer these with Mom or Dad:</p>

          {selectedBook.quiz.map((question, index) => (
            <div className="question" key={index}>
              <strong>{index + 1}. {question}</strong>
              <input placeholder="Type answer here..." />
            </div>
          ))}

          <button onClick={() => completeBook(selectedBook)}>
            Submit Quiz + Earn Badge
          </button>
        </section>
      )}

      <section className="badge-box">
        <h2>🏅 Badge Collection</h2>

        {completedBooks.length === 0 ? (
          <p>No badges yet. Start reading!</p>
        ) : (
          <div className="badges">
            {completedBooks.map((title, index) => {
              const book = books.find((b) => b.title === title);
              return (
                <div className="badge" key={index}>
                  ⭐ {book.reward}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}