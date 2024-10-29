import { Container } from '@/components/shared/Container';
import { Filters } from '@/components/shared/Filters';
import { ProductsGroupList } from '@/components/shared/ProductsGroupList';
import { Title } from '@/components/shared/Title';
import { TopBar } from '@/components/shared/TopBar';
import { prisma } from '../../prisma/prisma-client';

const Home = async () => {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          items: true,
        }
      }
    }
  });

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
              {
                categories.map((category) => (
                  <ProductsGroupList 
                    key={category.id}
                    title={category.name}
                    categoryId={category.id}
                    items={category.products}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Home;