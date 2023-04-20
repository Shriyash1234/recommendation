import data from './output.json'
import productData from './X.json'
import productNames from './product_id_Name2.json'
import userData from './XTranspose.json'
import {useEffect, useState} from 'react'
import './home.css'
import { useLocation,Link ,useParams } from 'react-router-dom'
function home(){

    
    const location = useLocation()
    // let {index} = useParams();
    const { index } = location.state 
    const { name } = location.state
    // const { index } = location.state

    // const rowIndex = 1; // since Ashu is the second object in the array (index 1)
    // const properties = Object.keys(data[rowIndex]);
    // const value = data[rowIndex][properties[0]];

    // console.log(userData[0])
    console.log(name)
    let ArrInd = [];
    for(let t =0;t<643;t++){
        if(userData[t].user_name == name)
        {
            const properties = Object.keys(userData[t]);
            const len = properties.length
            for(let s = 1;s<len;s++){
                const value = userData[t][properties[s]];
                if(value != 0){
                    const productName = properties[s];
                    console.log(productName)
                    for(let u=0;u<productData.length;u++){
                        if(productData[u].product_id === productName){
                            ArrInd.push(u);
                        }
                    }
                }
            }
        }
    }
    // Product matrix imported from the data of ipynb file
    // const productMatrix = data[0];
    // console.log(ArrInd)
    // const arr3 = [];
    // // console.log(productMatrix)
    // for(let y=0;y<ArrInd.length;y++){
    //     arr3 = arr3 + data[ArrInd[y]]
    // }
    // console.log(arr3)
    // Array of indices whose value is greate than 5
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

    function recommend(){
        //Array of indices
        let indArr = []   

        //Pushing values greater than 5. Using ParseFloat as they are strings
        for(let y=0;y<ArrInd.length;y++){
            const productMatrix = data[ArrInd[y]]
            for(let i =0;i<90;i++){
                if(parseFloat(productMatrix[i])>0.5){
                    indArr.push(i)
                }
            }
        }

        //Getting Corresponding IDs from the productData
        // let min = Math.min(5,indArr.length);
        for(let j =0;j<indArr.length;j++){
            // console.log(productData[j].product_id)
            IDsArr.push(productData[indArr[j]].product_id)
        }

        //Getting Corresponding IDs from the purchasesd products
        for(let j =0;j<ArrInd.length;j++){
            // console.log(productData[j].product_id)
            purchasedIDsArr.push(productData[indArr[j]].product_id)
        }
        console.log(purchasedIDsArr)

        //Taking only unique IDs
        let uniqueIDs = [...new Set(IDsArr)]

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

        for(let r = 0;r<purchasedIDsArr.length;r++){
            for(let k = 0;k<productNames.length;k++){
                if(productNames[k].product_id === purchasedIDsArr[r]){
                    purcahsedProductNameArr.push(productNames[k].product_name)
                    purcahsedProductImgArr.push(productNames[k].img_link)
                    purcahsedProductLinkArr.push(productNames[k].product_link)
                }
            }
        }

        //Agsin taking unique names,images and links
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
        for(let l =0;l<purcahsedProductNameArr.length;l++){
            if(uniquepurchasedNames.includes(purcahsedProductNameArr[l])===false){
                uniquepurchasedNames.push(productNameArr[l])
                uniquepurchasedImgs.push(productImgArr[l])
                uniquepurchasedLinks.push(productLinkArr[l])
            }
        }

        //Returning three values and accessing them by indices
        return [uniqueNames,uniqueImgs,uniqueLinks,uniquepurchasedNames,uniquepurchasedImgs,uniquepurchasedLinks];
    }
    useEffect(()=>{
        const newArr = recommend();
        setIndArr(newArr[0]);
        setImgsArr(newArr[1]);
        setLinksArr(newArr[2]);
        setpurchasedIndArr(newArr[3]);
        setpurchasedImgsArr(newArr[4]);
        setpurchasedLinksArr(newArr[5]);
    },[]);
    return(
        <div className='home' >
            <div className='header'>

            </div>
            <p>User Name: {name}</p>
            <h1>Purchased products</h1>
            <div className='purchased-products products-display'>
               {
                purchasedIndArr.map((name)=>{
                    return (
                        <div className='product'>
                            <div className='product-name' key={name}>{name}</div>
                            <a target='_blank' href={purchasedLinksArr[indArr.indexOf(name)]}><img className='product-image' src={purchasedImgsArr[indArr.indexOf(name)]}></img></a>
                        </div>
                    )
                })
               }
            </div>
            <h1>Recommended products</h1>
            <div className='products-display'>
            {
                indArr.map((name)=>{
                    return (
                        <div className='product'>
                            <div className='product-name' key={name}>{name}</div>
                            <a target='_blank' href={LinksArr[indArr.indexOf(name)]}><img className='product-image' src={ImgsArr[indArr.indexOf(name)]}></img></a>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}
export default home

