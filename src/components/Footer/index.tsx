import LogoPosto from '@/assets/Logos-Parceiros/Rede_Tradicao.png';

export function Footer() {
  const fullYear = new Date().getFullYear();

  return (
    <footer className="w-full p-6 md:p-0 flex-col  bg-[#FFFAFA] border-t border-gray-300 text-center">
      <div className='md:max-w-[1200px] md:flex-row m-auto justify-center flex-col flex items-center h-[500px]'>
        <div className="flex mt-10 gap-4 md:mt-0 items-center md:w-1/2 flex-col md:gap-11 md:items-start p-4 justify-center md:max-w-[573px]">
          <img src={LogoPosto} alt="logo" className='w-[200px] h-[50px]' />
          <span className='text-2xl text-black md:text-justify'>
            Respeito, confiança, crescimento contínuo, inovação, atuação
            sustentável e compromisso com a responsabilidade social.
          </span>
        </div>
        <div className="flex md:w-1/2 items-start justify-center gap-32">
          <div className="flex gap-6 flex-col md:items-end ">
            <h1 className='text-2xl text-black'>Contato</h1>
            <span className='md:text-end'>Fale conosco</span>
            <span className='md:text-end'>E-mail</span>
          </div>
          <div className="flex gap-6 mb-16 md:mb-0 flex-col md:items-end">
            <h1 className='text-2xl text-black'>Empresa</h1>
            <span>Trabalhe conosco</span>
            <span>Posto próximo</span>
            <span>Institucional</span>
            <span>Blog</span>
          </div>
        </div>
      </div>
      <div className="flex w-full p-4 items-center justify-center border-t border-gray-300">
        <p className="text-center text-gray-500 text-foreground">
          Rede de Postos Tradição - Todos os direitos reservados - Copyright {fullYear}
        </p>
      </div>
    </footer>
  );
}
