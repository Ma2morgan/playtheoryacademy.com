import React, { useState } from "react";
import "./style.css";

export default function App() {
  const books = [
    {
      title: "Pete the Cat",
      level: "Easy Reader",
      category: "Funny",
      image: "/images/Pete the cat.jpg",
      xp: 25,
      badge: "Cool Cat Badge",
      quiz: [
        {
          question: "Who is the main character?",
          options: ["Pete", "Biscuit", "Toad"],
          answer: "Pete",
        },
      ],
    },

    {
      title: "Biscuit",
      level: "Very Easy",
      category: "Animals",
      image: "/images/Biscuit.webp",
      xp: 25,
      badge: "Puppy Badge",
      quiz: [
        {
          question: "What kind of animal is Biscuit?",
          options: ["Dog", "Cat", "Bird"],
          answer: "Dog",
        },
      ],
    },

    {
      title: "Frog and Toad",
      level: "Growing Reader",
      category: "Friendship",
      image: "/images/Frog_and_Toad_Together.webp",
      xp: 50,
      badge: "Friendship Badge",
      quiz: [
        {
          question: "Who are best friends?",
          options: ["Frog and Toad", "Pete and Biscuit", "Jack and Annie"],
          answer: "Frog and Toad",
        },
      ],
    },

    {
      title: "Magic Tree House",
      level: "Chapter Starter",
      category: "Adventure",
      image: "/images/Magic Tree House.avif",
      xp: 75,
      badge: "Adventure Badge",
      quiz: [
        {
          question: "Who travels in the tree house?",
          options: ["Jack and Annie", "Frog and Toad", "Pete"],
          answer: "Jack and Annie",
        },
      ],
    },
  ];

  const [xp, setXp] = useState(0);
  const [completedBooks, setCompletedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const completeBook = (book) => {
    if (!completedBooks.includes(book.title)) {
      setCompletedBooks([...completedBooks, book.title]);
      setXp(xp + book.xp);
    }
  };

  const getLevelInfo = () => {
    if (xp >= 350) {
      return {
        level: "👑 Summer Legend",
        currentMin: 350,
        nextLevel: 350,
        nextLabel: "Max Level",
      };
    }
  
    if (xp >= 200) {
      return {
        level: "🏆 Reading Master",
        currentMin: 200,
        nextLevel: 350,
        nextLabel: "Summer Legend",
      };
    }
  
    if (xp >= 100) {
      return {
        level: "⭐ Badge Trainer",
        currentMin: 100,
        nextLevel: 200,
        nextLabel: "Reading Master",
      };
    }
  
    if (xp >= 50) {
      return {
        level: "📖 Story Explorer",
        currentMin: 50,
        nextLevel: 100,
        nextLabel: "Badge Trainer",
      };
    }
  
    return {
      level: "🌱 Rookie Reader",
      currentMin: 0,
      nextLevel: 50,
      nextLabel: "Story Explorer",
    };
  }
  const levelInfo = getLevelInfo();
const progressPercent =
  levelInfo.nextLevel === levelInfo.currentMin
    ? 100
    : ((xp - levelInfo.currentMin) /
        (levelInfo.nextLevel - levelInfo.currentMin)) *
      100;;

  const submitQuiz = (book) => {
    let correct = 0;

    book.quiz.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        correct++;
      }
    });

    if (correct === book.quiz.length) {
      alert("🎉 Quiz Passed! Badge Unlocked!");
      completeBook(book);
    } else {
      alert("❌ Try Again!");
    }
  };

  return (
    <div className="app">
      <header className="hero">
        <h1>📚 Play Theory Academy</h1>

        <h2>StoryQuest: Summer Reading Adventure</h2>

        <p>
          Read books. Earn XP. Unlock badges. Become a Summer Champion.
        </p>
      </header>

      <section className="stats">
        <div className="stat-card">
          <h3>⭐ XP</h3>
          <p>{xp}</p>
        </div>

        <div className="stat-card">
          <h3>📚 Books</h3>
          <p>{completedBooks.length}</p>
        </div>

        <div className="stat-card">
  <h3>🏆 Level</h3>
  <p>{levelInfo.level}</p>
</div>

      </section>
      <section className="xp-progress-box">
  <h2>⭐ XP Progress</h2>

  <p className="level-label">{levelInfo.level}</p>

  <div className="xp-bar">
    <div
      className="xp-fill"
      style={{ width: `${progressPercent}%` }}
    ></div>
  </div>

  <p className="xp-text">
    {xp} / {levelInfo.nextLevel} XP toward {levelInfo.nextLabel}
  </p>
</section>
      <section>
        <h2>Choose Your StoryQuest</h2>

        <div className="book-grid">
          {books.map((book, index) => (
            <div className="book-card" key={index}>
              <div className="category">{book.category}</div>
              <img
  src={book.image}
  alt={book.title}
  className="book-cover"
/>
              <h3>{book.title}</h3>

              <p>{book.level}</p>

              <p>XP Reward: {book.xp}</p>

              <p>Badge: {book.badge}</p>

              <button onClick={() => setSelectedBook(book)}>
                Start Quest
              </button>

              {completedBooks.includes(book.title) && (
                <div className="earned">✅ Badge Earned</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {selectedBook && (
        <section className="quiz-box">
          <h2>📝 {selectedBook.title} Quiz</h2>

          {selectedBook.quiz.map((q, index) => (
            <div key={index} className="question-box">
              <p>{q.question}</p>

              {q.options.map((option) => (
                <button
                  key={option}
                  className="option-btn"
                  onClick={() =>
                    setSelectedAnswers({
                      ...selectedAnswers,
                      [index]: option,
                    })
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          ))}

          <button
            className="submit-btn"
            onClick={() => submitQuiz(selectedBook)}
          >
            Submit Quiz
          </button>
        </section>
      )}

      <section className="badge-section">
        <h2>🏅 Badge Collection</h2>

        <div className="badges">
          {completedBooks.map((title, index) => {
            const book = books.find((b) => b.title === title);

            return (
              <div className="badge" key={index}>
                ⭐ {book.badge}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
