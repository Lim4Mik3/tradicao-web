import { AppLayout } from '@/Layouts/app';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Helmet } from 'react-helmet-async';
import { BannerBlogSection } from './slices/BannerBlog';

export function BlogPage() {
  return (
    <AppLayout>
      <Helmet>
        <title>Blog - Posto Tradição</title>
        <meta name="description" content="Acompanhe o blog do Posto Tradição e fique por dentro de dicas automotivas, economia de combustível, novidades do setor e muito mais!" />
      </Helmet>
      <BannerBlogSection />
      <section className="max-w-[1200px] m-auto mt-6 p-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-5xl">Últimos artigos</h2>
          <Separator className="bg-zinc-300" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          <Card className="border border-gray-300 w-[284px] h-[300px] p-6 flex flex-col gap-20">
            <h3>Artigo 1</h3>
            <p>Texto do artigo 1</p>
          </Card>
          <Card className="border border-gray-300 w-[284px] h-[300px] p-6 flex flex-col gap-20">
            <h3>Artigo 2</h3>
            <p>Texto do artigo 2</p>
          </Card>
          <Card className="border border-gray-300 w-[284px] h-[300px] p-6 flex flex-col gap-20">
            <h3>Artigo 3</h3>
            <p>Texto do artigo 3</p>
          </Card>
        </div>
      </section>
    </AppLayout>
  );
}
