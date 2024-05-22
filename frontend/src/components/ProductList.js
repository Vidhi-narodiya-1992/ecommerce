import React, {useState, useEffect} from "react";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5002/products');
        result = await result.json();
        setProducts(result);
    }
    console.warn("products", products);

    return(
        <div className="product-list">
            <h3>Product List</h3>
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>category</li>
            </ul>
            {
                products.map(()=>
                <ul>
                    <li>S. No</li>
                    <li>Name</li>
                    <li>Price</li>
                    <li>category</li>
                </ul>)
            }
        </div>
    )
}

export default ProductList;