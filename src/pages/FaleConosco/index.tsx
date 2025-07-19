import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AppLayout } from '@/Layouts/app';
import { Mail, MapPin, PhoneCall } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

import Facebook from '@/../public/facebook.svg';
import Instagram from '@/../public/instagram.svg';
import Linkedin from '@/../public/linkedin.svg';

export function FaleConoscoPage() {
  return (
    <AppLayout>
      <Helmet>
        <title>Contato - Posto Tradição</title>
        <meta name="description" content="Fale com o Posto Tradição e tire suas dúvidas. Atendimento rápido e eficiente por telefone, WhatsApp ou e-mail. Estamos prontos para te atender!" />
      </Helmet>
      <section className=" bg-white w-full p-6 md:p-0 gap-24 m-auto justify-center flex items-center flex-col">
        <div className="flex flex-col gap-4 w-full items-center mt-24">
          <h1 className="font-bold text-black text-center md:text-start text-6xl">
            Contate nosso time
          </h1>
          <p className="text-xl text-gray-800 text-center">
            Deixe-nos ajudar você com qualquer necessidade.
          </p>
          <Separator />
        </div>

        <div className="flex flex-col md:flex-row gap-10 ">
          <Card className="border border-gray-300 w-[284px] h-[340px] p-6 flex flex-col gap-20">
            <Mail color="black" size={32} />
            <h2 className="text-black">Mande um e-mail</h2>
            <a
              href="mailto:contato@redetradicao.com.br"
              className="text-[#CB2A2D] underline flex-1 items-center flex "
            >
              contato@redetradicao.com.br
            </a>
          </Card>
          <Card className="border border-gray-300 w-[284px] h-[340px] p-6 flex flex-col gap-20">
            <PhoneCall color="black" size={32} />
            <h2 className="text-black">Faça uma chamada</h2>
            <a href="tel:+555431968351" className="text-[#CB2A2D] underline flex-1 items-center flex">
              (54) 3196-8351
            </a>
          </Card>
          <Card className="border border-gray-300 w-[284px] h-[340px] p-6 flex flex-col gap-20">
            <MapPin color="black" size={32} />
            <h2 className="text-black">Venha nos visitar</h2>
            <a
              href="https://www.google.com.br/maps/place/Rede+Tradi%C3%A7%C3%A3o+-+Centro+Administrativo/@-28.4475011,-52.2254259,17z/data=!3m1!4b1!4m6!3m5!1s0x94e29d8f30ca96e9:0xcb999e4ac7a5904d!8m2!3d-28.4475058!4d-52.2228456!16s%2Fg%2F11jv77_328?entry=ttu&g_ep=EgoyMDI1MDEyNi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noreferrer"
              className="text-[#CB2A2D] underline flex-1 items-center flex"
            >
              Rua Bento Gonçalves, 2410 Bairro Borges de Medeiros Marau/RS
            </a>
          </Card>
        </div>

        <div className="flex flex-col items-center gap-4 mb-20">
          <span className='text-gray-950 text-xl text-center'>
            Acesse nossas redes sociais e fique por dentro de todas as novidades!
          </span>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/redetradicao"
              target="_blank"
              rel="noopener noreferrer"
              className="flex text-slate-900 items-center justify-center w-12 h-12 rounded-full"
              aria-label="Facebook"
            >
              <img src={Facebook} alt="Acesse o Facebook" />
            </a>
            <a
              href="https://www.instagram.com/tradicaopostos"
              target="_blank"
              rel="noopener noreferrer"
              className="flex text-slate-900 items-center justify-center w-12 h-12 rounded-full"
              aria-label="Instagram"
            >
              <img src={Instagram} alt="Acesse o Instagram" />
            </a>
            <a
              href="https://www.linkedin.com/company/redetradicao"
              target="_blank"
              rel="noopener noreferrer"
              className="flex text-slate-900 items-center justify-center w-12 h-12 rounded-full"
              aria-label="LinkedIn"
            >
              <img src={Linkedin} alt="Acesse o LinkedIn" />
            </a>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
