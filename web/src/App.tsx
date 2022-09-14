import './styles/main.css';
import logoImg from './assets/logo.png';

import {GAMES} from './utils/games';

function App() {
  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> esta aqui.
      </h1>
      <div className='grid grid-cols-6 gap-6'>
        {GAMES.map(game => 
        <a key={game.id} href='#' className='relative mt-16 rounded-lg overflow-hidden'>
          <img src={game.cover} alt={game.name} />
          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
            <strong className='font-bold text-white block'>{game.name}</strong>
            <span className='text-zinc-300 text-sm block mt-4'>{game.ads} anuncios</span>
          </div>
        </a>
        )}

      </div>
    </div>
  )
}

export default App
