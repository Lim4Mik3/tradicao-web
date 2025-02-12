import BannerBlog from '@/assets/Banners/banner-blog.jpeg';
import { Button } from "@/components/Button";

export function BannerBlogSection() {
  return (
    <main className='bg-[#ED0909]'>
      <section className='max-w-[1200px] p-6 md:p-0 gap-24 m-auto justify-center flex items-center flex-col'>
        <div className='grid md:grid-cols-2 gap-24 md:mt-20 p-10'>
          <div className='flex  flex-col items-center justify-center gap-6 md:gap-24 md:items-start md:justify-start'>
            <div className='flex flex-col gap-6'>
              <h1 className='font-bold text-white text-center text-5xl md:text-start md:text-5xl'>Uma boa gasolina, faz toda a diferença!</h1>
              <p className='text-white text-center md:text-start text-[16px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla...</p>
            </div>
            <Button className='bg-white text-zinc-800'>Ver mais</Button>
          </div>
          <div className='flex  '>
            <img src={BannerBlog} alt="Banner Blog" className='w-[590px] h-[400px] object-cover rounded-lg' />
          </div>
        </div>
      </section>
    </main>
  );
}