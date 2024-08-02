import { Container } from '@/components/shared/container';
import { Filters } from '@/components/shared/filters';
import { Title } from '@/components/shared/title';
import { TopBar } from '@/components/shared/topBar';

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