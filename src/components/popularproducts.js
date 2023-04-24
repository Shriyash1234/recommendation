import React, { useState,useEffect } from "react"
import productNames from '../components/data/product_id_Name2.json'
import '../components/CSS/home.css'
function PopularProducts(){

    const [indArr, setIndArr] = useState([]);
    // Array for Corresponding Images
    const[ImgsArr,setImgsArr] = useState([]);
    // Array for Corresponding product Links
    const[LinksArr,setLinksArr] = useState([]);

    let productNameArr = []
    let productImgArr = []
    let productLinkArr = []
    function recommend(){
    //Taking only unique IDs
    let uniqueIDs = ['B01GGKYKQM','B07JW9H4J1','B07XLCFSSN','B082T6V3DT','B083342NKJ','B085DTN6R2','B08CF3D7QR','B08DDRGWTJ','B08HDJ86NZ','B098NS6PVG']


    //Taking corresponding names, links and images.
    for(let r = 0;r<uniqueIDs.length;r++){
        for(let k = 0;k<productNames.length;k++){
            if(productNames[k].product_id === uniqueIDs[r]){
                productNameArr.push(productNames[k].product_name)
                productImgArr.push(productNames[k].img_link)
                productLinkArr.push(productNames[k].product_link)
            }
        }
    }
    
    //Again taking unique names,images and links
    let uniqueNames = [];
    let uniqueImgs = [];
    let uniqueLinks= [];
 
    for(let l =0;l<productNameArr.length;l++){
        if(uniqueNames.includes(productNameArr[l])===false){
            uniqueNames.push(productNameArr[l])
            uniqueImgs.push(productImgArr[l])
            uniqueLinks.push(productLinkArr[l])
        }
    }
    return [uniqueNames,uniqueImgs,uniqueLinks];
   }
    useEffect(()=>{
        const newArr = recommend();
        setIndArr(newArr[0]);
        setImgsArr(newArr[1]);
        setLinksArr(newArr[2]);
    },[]);
    
    return(
        <div className="home">
        <p className='User-name popular'>Popular Products</p>
        <div className='purchased-products products-display'>
        {
                indArr.map((name)=>{
                    return (
                        <div className='product'>
                            <div className='product-name'>{name}</div>
                            <a target='_blank' href={LinksArr[indArr.indexOf(name)]}><img className='product-image' src={ImgsArr[indArr.indexOf(name)]}></img></a>
                        </div>
                    )
                })
            }
        </div>
        </div>
    )
}
export default PopularProducts