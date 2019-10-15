import React, {useState, useEffect} from 'react';

const App = () => {
  const SNIPPETS = [
    "Bears, beets, battlestar galactica",
    "What's Forrest Gump's password? 1Forrest1",
    "Where do programmers like to hangout? The Foo Bar"
  ];

  const initialGameState = {victory: false, startTime: null, endTime: null}

  const [snippet, setSnippet] = useState('')
  const [userText, setUserText] = useState('');
  const [gameState, setGameState] = useState(initialGameState)

  useEffect(() => {
    if(gameState.victory) document.title = "Victory!";
  });
  
  const updateUserText = (event) => {
    event.preventDefault();

    setUserText(event.target.value);
    console.log('current userText', userText);

    if (event.target.value === snippet) {
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date().getTime() - gameState.startTime
      });
    }
  }

  const chooseSnippet = snippetIndex => () => {
    console.log('setSnippet', snippetIndex);
    setSnippet(SNIPPETS[snippetIndex]);
    setGameState({...gameState, startTime: new Date().getTime() });
  };

  const startGame = () => {
    setSnippet('')
    setUserText('')
    setGameState(initialGameState)
  }
  
    return (
      <div>
        <h2>Type Race</h2>
        <hr />
        <h3>Snippet</h3>
        {snippet}
        <h4>{gameState.victory ? `Done! 🎉 Time: ${gameState.endTime}ms` : null}</h4>
        <input value={userText} onChange={updateUserText} />
        <br/>
        <br/>
        <button onClick={startGame()}>Start a new race!</button>
        <br/>
        <hr />
        {
          SNIPPETS.map((SNIPPET, index) => (
            <button onClick={chooseSnippet(index)} key={index}>
              {SNIPPET.substring(0, 10)}...
            </button>
          ))
        }
      </div>
    )
  }


export default App;
