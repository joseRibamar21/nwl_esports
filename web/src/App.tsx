import { useState, useEffect } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';

import './styles/main.css';
import logoImg from './assets/logo.png';

import { GameBanner } from './components/GameBanner';
import CreatAdBanner from './components/CreatAdBanner';
import { Check, GameController } from "phosphor-react";
import { Input } from "./components/Form/Input";

interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/games').then(response => response.json()).then(
      data => setGames(data)
    )
  }, [])

  return (
    <div className='max-w-[1344px] m-10 flex flex-col items-center my-20 '>
      <img src={logoImg} alt="" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> esta aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game =>
          <GameBanner key={game.id}
            title={game.title}
            adsCount={game._count.ads}
            bannerUrl={game.bannerUrl}
            id={game.id} />
        )}

      </div>
      <Dialog.Root>
        <CreatAdBanner />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/80 inset-0 fixed">
            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
              <Dialog.Title className="text-3xl text-white font-black">
                Publique um anúncio
              </Dialog.Title>

              <form className="mt-8 flex flex-col gap-4 ">
                <div className="flex flex-col gap-2">
                  <label htmlFor="game" className="font-semibold">Qual o game?</label>
                  <select className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                   id="game">
                    <option  selected value="">Selecione o game que deseja jogar</option>
                    <option value=""></option>
                   </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Seu nickname?</label>
                  <Input id="name" placeholder="Como te chamam dentro do game?" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                    <Input id="yearsPlaying" placeholder="Tudo bem ser ZERO" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="discord">Qual o seu Discord?</label>
                    <Input id="discord" placeholder="Usuario#0000" />
                  </div>

                  <div className="fex gap-6">
                    <div className="flex flex-col gap-2 ">
                      <label htmlFor="weekDays">Quando costuma jogar?</label>

                      <div className="grid grid-cols-4 gap-2">
                        <button
                          className="w-10 h-8 rounded bg-zinc-900 " title="Domingo">D</button>
                        <button
                          className="w-10 h-8 rounded bg-zinc-900 " title="Segunda">S</button>
                        <button
                          className="w-10 h-8 rounded bg-zinc-900 " title="Terça">T</button>
                        <button
                          className="w-10 h-8 rounded bg-zinc-900 " title="Quarta">Q</button>
                        <button
                          className="w-10 h-8 rounded bg-zinc-900 " title="Quinta">Q</button>
                        <button
                          className="w-10 h-8 rounded bg-zinc-900 " title="Sexta">S</button>
                        <button
                          className="w-10 h-8 rounded bg-zinc-900 " title="Sábado">S</button>
                      </div>

                    </div>

                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hoursStart">Qual seu horário do dia?</label>

                    <div className="grid grid-cols-2 gap-2">
                      <Input id="hoursStart" type="time" placeholder="De" />
                      <Input id="hoursEnd" type="time" placeholder="Até" />
                    </div>
                  </div>
                </div>


                <div className="mt-2 items-end flex gap-2 text-sm">
                  <Checkbox.Root className="w-6 h-6 p-1  text-sm bg-zinc-900">
                    <Checkbox.Indicator>
                      <Check className="w-4 h-4 text-emerald-400 "/>
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  Costumo me conectar ao chat de voz
                  
                </div>

                <footer className="mt-4 flex justify-end gap-4">
                  <Dialog.Close type="button"
                    className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                    Cancelar
                  </Dialog.Close>
                  <button className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                    type="submit">
                    <GameController size={24} />
                    Encontrar duo
                  </button>
                </footer>
              </form>
            </Dialog.Content>


          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App;