import { Categories } from "@/components/shared/categories";
import { Container } from "@/components/shared/container";
import { Title } from "@/components/shared/title";

const Home = () => {
  return (
    <>
      <Container className='mt-10'>
        <Title text='Все пиццы' size='lg' className='font-extrabold' />
        <Categories />
      </Container>
    </>
  )
}

export default Home;