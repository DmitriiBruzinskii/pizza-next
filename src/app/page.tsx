import { Container } from '@/components/shared/Container';
import { Filters } from '@/components/shared/Filters';
import { ProductCard } from '@/components/shared/ProductCard';
import { Title } from '@/components/shared/Title';
import { TopBar } from '@/components/shared/TopBar';

const Home = () => {
  return (
    <>
      <Container className='mt-10'>
        <Title text='Все пиццы' size='lg' className='font-extrabold' />
      </Container>
      <TopBar />
      <Container className='pb-14 mt-10'>
        <div className='flex gap-[60px]'>
          <div className='w-[250px]'>
            <Filters />
          </div>
        </div>
      </Container>
    </>
  )
}

export default Home;