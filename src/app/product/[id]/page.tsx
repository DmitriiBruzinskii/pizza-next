export default function ProductPage({ params: { id } }: { params: { id: string } }) {

  return (
    <h1>Product page{id}</h1>
  );
};