import { Link } from "react-router-dom"

function ProductCard({ product }){
  const {name, shortDest, price, image} = product 

  const formattedPrice = `R$ ${price.toFixed(2).replace('.', ',')}`;
  const formattedImage = "./public/images/products/" + image

  return (
    <Link to="/" className="text-decoration-none col-md-4 mb-4">
      <div className="card" style={{width:"100%"}}>
        <img src={formattedImage} className="card-img-top"/>
        <div className="card-body">
          <h1 className="card-title">{name}</h1>
          <p>{shortDest}</p>
          <p className="text-primary tw-bolder fs-3">{formattedPrice}</p>
        </div>
      </div>
    </Link>
  )
};

  
export default ProductCard
