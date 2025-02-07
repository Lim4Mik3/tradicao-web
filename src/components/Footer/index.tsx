import LogoPosto from '@/assets/Logos-Parceiros/Rede_Tradicao.png';

export function Footer() {
  const fullYear = new Date().getFullYear();

  return (
    <footer className="w-full flex-col bg-[#FFFAFA] border-t border-gray-300 text-center">
      <div className='max-w-[1200px] m-auto justify-center flex items-center h-[300px]'>
        <div className="flex w-1/2 flex-col gap-11 items-start p-4 justify-center max-w-[573px]">
          <img src={LogoPosto} alt="logo" width={200} height={50} />
          <span className='text-2xl text-black text-justify'>
            Respeito, confiança, crescimento contínuo, inovação, atuação
            sustentável e compromisso com a responsabilidade social.
          </span>
        </div>
        <div className="flex w-1/2 items-start justify-center gap-32">
          <div className="flex gap-6 flex-col items-end ">
            <h1 className='text-2xl text-black'>Contato</h1>
            <span className='text-end'>Fale conosco</span>
            <span className='text-end'>E-mail</span>
          </div>
          <div className="flex gap-6 flex-col items-end">
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
