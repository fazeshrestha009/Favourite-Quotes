import React, { useState, useEffect } from 'react';
import backgroundImage from '../bg.jpg'; 

function QuotesApp() {
 
  const [quotes, setQuotes] = useState(() => {
    const savedQuotes = localStorage.getItem('quotes');
    return savedQuotes ? JSON.parse(savedQuotes) : [];
  });

  const [newQuote, setNewQuote] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [editIndex, setEditIndex] = useState(-1); 
  useEffect(() => {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }, [quotes]);
  const addQuote = () => {
    if (newQuote.trim() && newAuthor.trim()) {
      if (editIndex >= 0) {
        const updatedQuotes = quotes.map((quoteObj, index) =>
          index === editIndex ? { quote: newQuote, author: newAuthor } : quoteObj
        );
        setQuotes(updatedQuotes);
        setEditIndex(-1); 
      } else {
        setQuotes([...quotes, { quote: newQuote, author: newAuthor }]);
      }
      setNewQuote(''); 
      setNewAuthor(''); 
    } else {
      alert("Please enter both a quote and an author."); 
    }
  };
  const deleteQuote = (index) => {
    setQuotes(quotes.filter((_, i) => i !== index));
  };
  const startEditing = (index) => {
    setNewQuote(quotes[index].quote); 
    setNewAuthor(quotes[index].author); 
    setEditIndex(index); 
  };
  return (
    <div 
      className="flex justify-center items-center min-h-screen" 
      style={{
        backgroundImage: `url(${backgroundImage})`, 
        backgroundPosition: 'center'
      }}
    >
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 opacity-90"> 
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Favorite Quotes
        </h1>
        
        <div className="flex flex-col space-y-4 mb-6">
          <input 
            type="text" 
            placeholder="Type your favorite quote..." 
            value={newQuote}
            onChange={(e) => setNewQuote(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input 
            type="text" 
            placeholder="Author's name..." 
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button 
            onClick={addQuote} 
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition duration-300">
            {editIndex >= 0 ? 'Update' : 'Add'} 
          </button>
        </div>
        <div className="space-y-4">
          {quotes.length === 0 ? (
            <p className="text-center text-gray-500">No quotes added yet. Add some of your favorites!</p>
          ) : (
            quotes.map((quoteObj, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-md bg-gray-50 hover:bg-gray-100 transition duration-200">
                {editIndex === index ? (
                  <div className="flex flex-col w-full">
                    <input 
                      type="text"
                      value={newQuote}
                      onChange={(e) => setNewQuote(e.target.value)}
                      className="mb-2 p-2 border border-gray-300 rounded-md"
                    />
                    <input 
                      type="text"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="mb-2 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                ) : (
                  <div className="flex-grow">
                    <span className="text-gray-700">{quoteObj.quote}</span>
                    <span className="text-gray-500 text-sm"> - {quoteObj.author}</span>
                  </div>
                )}
                <div className="flex space-x-2">
                  {editIndex === index ? (
                    <button 
                      onClick={() => {
                        addQuote(); 
                        setEditIndex(-1); 
                      }}
                      className="text-green-500 font-semibold hover:underline">
                      Save
                    </button>
                  ) : (
                    <button 
                      onClick={() => startEditing(index)} 
                      className="text-blue-500 font-semibold hover:underline">
                      Edit
                    </button>
                  )}
                  <button 
                    onClick={() => deleteQuote(index)} 
                    className="text-red-500 font-semibold hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default QuotesApp;
