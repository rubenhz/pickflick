import { useContext } from 'react';
import './App.css';
import Header from './components/Header';
import PromptForm from './components/PromptForm';
import ResultsOverlay from './components/ResultsOverlay';
import SimpleCard from './components/SimpleCard';
import { Context } from './context';

function App() {

  const {movieObjects, overlayUp} = useContext(Context)

  return (
    <div className="App">
      {overlayUp && <ResultsOverlay 
        movies={movieObjects}
        />
        }
      <Header />
      <main>
        <h1 className='main-title'>
          Explore new movies with PickFlick's 
          AI-powered recommendations
        </h1>
        <div className='section'>
          <h2 className='section-title'>Features</h2>
          <div className='card-row'>
            <SimpleCard>
              "Movie Detective": Find the movie you're 
              thinking of by describing details about it.
            </SimpleCard>
            <SimpleCard>
              "Movie Matchmaker" feature: Movie 
              recommendations based on your preferences
            </SimpleCard>
            <SimpleCard>
              "Similar Movies" feature: Discover more movies 
              like your favorite.
            </SimpleCard>
          </div>
        </div>
        <div className='section'>
          <h2 className='section-title'>Examples</h2>
          <div className='card-row'>
            <SimpleCard>
              "What was the name of the horror movie with a clown?"
            </SimpleCard>
            <SimpleCard>
              "I'm in the mood for a comedy. Recommend me a movie."
            </SimpleCard>
            <SimpleCard>
              "The Godfather is my all-time favorite. What else should I watch?"
            </SimpleCard>
          </div>
        </div>
      </main>
      <div className='App--prompt-form-container'>
        <PromptForm/>
      </div>
      
    </div>
  );
}

export default App;
