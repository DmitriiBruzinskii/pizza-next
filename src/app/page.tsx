import { Container } from '@/components/shared/Container';
import { Filters } from '@/components/shared/Filters';
import { ProductsGroupList } from '@/components/shared/ProductsGroupList';
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
        <div className='flex gap-[90px]'>
          <div className='w-[250px]'>
            <Filters />
          </div>
          
          <div className='flex-1'>
            <div className='flex flex-col gap-16'>
              <ProductsGroupList title='Популярные' items={
                [
                  {
                    id: 1,
                    name: 'Пепперони',
                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif',
                    items: [{ price: 350 }],
                  },
                  {
                    id: 2,
                    name: 'Пепперони',
                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif',
                    items: [{ price: 350 }],
                  },
                  {
                    id: 3,
                    name: 'Пепперони',
                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif',
                    items: [{ price: 350 }],
                  },
                  {
                    id: 4,
                    name: 'Пепперони',
                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif',
                    items: [{ price: 350 }],
                  },
                  {
                    id: 5,
                    name: 'Пепперони',
                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif',
                    items: [{ price: 350 }],
                  },
                  {
                    id: 6,
                    name: 'Пепперони',
                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61BB2BD856BD5DFD71FB7D4210.avif',
                    items: [{ price: 350 }],
                  },
                ]} 
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Home;