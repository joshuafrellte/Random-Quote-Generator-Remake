import { useState, useEffect } from 'react'

interface Quote {
  q: string
  a: string
}

// https://corsproxy.io/?https://zenquotes.io/api/quotes
function App() {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(() => {
    const saved = localStorage.getItem("lastQuote");
    return saved ? JSON.parse(saved) : null;
  })
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://corsproxy.io/?https://zenquotes.io/api/quotes")
      if (!response.ok) throw new Error(`response is not ok! : ${response.status}`)
      const data = await response.json();
      setCurrentQuote(data[Math.floor(Math.random() * data.length)]);
    } catch (error) {
        console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (currentQuote) localStorage.setItem("lastQuote", JSON.stringify(currentQuote))
  }, [currentQuote])
  
  useEffect(() => {
    if (!currentQuote) fetchQuote();
  }, [currentQuote])

  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-amber-300 h-[300px] w-[300px] p-5 flex flex-col ">
      <div className="flex flex-col justify-center grow">
        <p>{loading ? "Loading..." : currentQuote?.q}</p>
        <p>- {currentQuote?.a}</p>
      </div>
      <button disabled={loading} className="mt-auto bg-amber-500  px-5 py-1 cursor-pointer w-fit" onClick={fetchQuote}>Find Quote</button>
    </div>
  )
}

export default App
