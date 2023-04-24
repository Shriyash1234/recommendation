import './CSS/home.css'
import Names from './data/names.json'
import productData from './data/X.json'
import ProductIDs from './data/content_fitering.json'
import productNames from '../components/data/product_id_Name2.json'
import userData from './data/XTranspose.json'
import { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom'
import Header2 from './header2'
function Content(){

    const location = useLocation()

    const { name } = location.state==null?'Manav':location.state
    const [products,setProducts] = useState([])

    const [indArr, setIndArr] = useState([]);
    const [purchasedIndArr,setpurchasedIndArr] = useState([]);
    // Array for Corresponding IDs
    const[IDsArr,setIDsArr] = useState([]);
    const[purchasedIDsArr,setpurchasedIDsArr] = useState([]);
    // Array for Corresponding Images
    const[ImgsArr,setImgsArr] = useState([]);
    const[purchasedImgsArr,setpurchasedImgsArr] = useState([]);
    // Array for Corresponding product Links
    const[LinksArr,setLinksArr] = useState([]);
    const[purchasedLinksArr,setpurchasedLinksArr] = useState([]);

     // We will first Names, Images and Links in the following arrays then we will set their values by above arrays
     let productNameArr = []
     let productImgArr = []
     let productLinkArr = []
 
     let purcahsedProductNameArr = []
     let purcahsedProductImgArr = []
     let purcahsedProductLinkArr = []


    let ArrInd = [];
    for(let t =0;t<643;t++){
        if(userData[t].user_name == name)     //Check the name of the user in the userData 
        {
            const properties = Object.keys(userData[t]);         //We are use object.keys as it we will can then iterate through JSON object by it's row number and not its name
            const len = properties.length
            for(let s = 1;s<len;s++){
                const value = userData[t][properties[s]];
                if(value != 0){                                  //If the value is not 0 means that the user has rated this product.
                    const productName = properties[s];
                    // console.log(productName)                     // ID of the product       
                    for(let u=0;u<productData.length;u++){
                        if(productData[u].product_id === productName){   // Taking indices of the product from the producData 
                            ArrInd.push(u);
                        }
                    }
                }
            }
        }
    }

    function GetUserRecommedation(){
        let index = Names.indexOf(name)-1;

        let uniqueIDs = []
        for(let i=0;i<10;i++){
            console.log(ProductIDs[0][0])
            console.log(index)
            uniqueIDs.push(ProductIDs[i][index])
        }
        console.log(uniqueIDs)
        
        //Getting Corresponding IDs from the purchasesd products
        for(let j =0;j<ArrInd.length;j++){
            // console.log(productData[j].product_id)
            purchasedIDsArr.push(productData[ArrInd[j]].product_id)
        }
        // console.log(purchasedIDsArr)
        let purchasedUniqueIDs = [...new Set(purchasedIDsArr)]



        for(let r = 0;r<uniqueIDs.length;r++){
            for(let k = 0;k<productNames.length;k++){
                if(productNames[k].product_id === uniqueIDs[r]){
                    productNameArr.push(productNames[k].product_name)
                    productImgArr.push(productNames[k].img_link)
                    productLinkArr.push(productNames[k].product_link)
                }
            }
        }

        //Taking corresponding names, links and images for rated products.
        for(let w = 0;w<purchasedUniqueIDs.length;w++){
            for(let q = 0;q<productNames.length;q++){
                if(productNames[q].product_id === purchasedUniqueIDs[w]){
                    purcahsedProductNameArr.push(productNames[q].product_name)
                    purcahsedProductImgArr.push(productNames[q].img_link)
                    purcahsedProductLinkArr.push(productNames[q].product_link)
                }
            }
        }
        
        //Again taking unique names,images and links
        let uniqueNames = [];
        let uniqueImgs = [];
        let uniqueLinks= [];
        let uniquepurchasedNames = [];
        let uniquepurchasedImgs = [];
        let uniquepurchasedLinks= [];
        for(let l =0;l<productNameArr.length;l++){
            if(uniqueNames.includes(productNameArr[l])===false){
                uniqueNames.push(productNameArr[l])
                uniqueImgs.push(productImgArr[l])
                uniqueLinks.push(productLinkArr[l])
            }
        }
        //Again taking unique names,images and links of rated products
        for(let c =0;c<purcahsedProductNameArr.length;c++){
            if(uniquepurchasedNames.includes(purcahsedProductNameArr[c])===false){
                uniquepurchasedNames.push(purcahsedProductNameArr[c])
                uniquepurchasedImgs.push(purcahsedProductImgArr[c])
                uniquepurchasedLinks.push(purcahsedProductLinkArr[c])
            }
        }
        return [uniqueNames,uniqueImgs,uniqueLinks,uniquepurchasedNames,uniquepurchasedImgs,uniquepurchasedLinks];
    }
    useEffect(()=>{
        const newArr = GetUserRecommedation()
        setIndArr(newArr[0]);
        setImgsArr(newArr[1]);
        setLinksArr(newArr[2]);
        setpurchasedIndArr(newArr[3]);
        setpurchasedImgsArr(newArr[4]);
        setpurchasedLinksArr(newArr[5]);
    },[name])
    return(
        <div className='home' >
        <Header2/>
            <p className='User-name'>User Name: {name}</p>
            <p className='products-heading'>Rated products</p>
            <div className='purchased-products products-display'>
               {
                purchasedIndArr.map((name)=>{
                    return (
                        <div className='product'>
                            <div className='product-name'>{name}</div>
                            <a target='_blank' href={purchasedLinksArr[purchasedIndArr.indexOf(name)]}><img className='product-image' src={purchasedImgsArr[purchasedIndArr.indexOf(name)]}></img></a>
                        </div>
                    )
                })
               }
            </div>  
            <p className='products-heading'>Recommended products</p>
            <div className='products-display'>
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
export default Content