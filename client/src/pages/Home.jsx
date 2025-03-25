import ProductCard from "../components/ProductCard"

const products = [
  { id: 1, name: "Jogo legal", shortDesc: "Um jogo muito legal", price: 20.30, image: "image.png"  },
  { id: 2, name: "Jogo legal", shortDesc: "Um jogo muito legal", price: 20.30, image: "image.png"  },
];

function Home(){
    return (
      <div className="container mt-5">
        <div className="row">
          {products.map((product, index)=> (
            <ProductCard key={index} product={product}/>
          ))}
        </div>
      </div>
    )
};

  
export default Home
