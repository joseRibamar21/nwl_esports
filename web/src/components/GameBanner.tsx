interface GameBannerProps{
    id: string
    bannerUrl: string,
    title: string,
    adsCount: number
}

export function GameBanner({id, bannerUrl, title, adsCount}: GameBannerProps){
    return(
        <a key={id} href='#' className='relative mt-16 rounded-lg overflow-hidden'>
            <img src={bannerUrl} alt={title} />
            <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
              <strong className='font-bold text-white block'>{title}</strong>
              <span className='text-zinc-300 text-sm block mt-4'>{adsCount} anuncios</span>
            </div>
          </a>
    )
}