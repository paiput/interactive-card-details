interface CardData {
  cardholder?: string
  cardNumber?: string
  expMonth?: string
  expYear?: string
  cvc?: string
}

function FrontCard({ data }: { data: CardData }) {
  return (
    <div className='relative font-spaceGrotesk text-white max-w-[400px] w-full md:w-[400px]'>
      <img src='src/assets/images/bg-card-front.png' alt='Card front'></img>
      <div className='absolute top-0 left-0 w-full flex flex-col justify-between h-full p-4 sm:p-6'>
        <img src='src/assets/images/card-logo.svg' alt='Card logo' className='w-[20%] max-w-[84px]'></img>
        <div>
          <p className='[font-size:_clamp(0.8em,4vw,1.75em)] tracking-wider mb-2 md:mb-4'>{data.cardNumber?.replace(/(\d{4})/g, '$1 ') || '0000 0000 0000 0000'}</p>
          <div className='[font-size:_clamp(0.25em,2.5vw,1em)] flex justify-between w-full text-lightGrayishViolet'>
            <p className='uppercase'>{data.cardholder || 'Jane Appleseed'}</p>
            <p>{data.expMonth || '00'}/{data.expYear || '00'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function BackCard({ data }: { data: CardData }) {
  return (
    <div className='relative font-spaceGrotesk text-white max-w-[400px] w-full'>
      <img src='src/assets/images/bg-card-back.png' alt='Card back'></img>
      <span className="absolute top-[44%] left-[80%] [font-size:_clamp(0.35em,3vw,1em)] tracking-wider">{data.cvc || '000'}</span>
    </div>
  )
}

function Card({ data }: { data: CardData }) {
  return (
    <div className="relative flex flex-col md:flex-col-reverse md:gap-8">
      <div className='translate-x-[10%] md:translate-x-0'>
        <BackCard data={data} />
      </div>
      <div className='absolute top-[57%] md:top-0 md:relative lg:-translate-x-[17%] md:translate-y-0 -translate-x-[10%] md:translate-x-0'>
        <FrontCard data={data} />
      </div>
    </div>
  )
}

export default Card