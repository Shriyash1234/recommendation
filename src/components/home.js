import data from './output.json'
import productData from './X.json'
import productNames from './product_id_Name2.json'
import userData from './XTranspose.json'
import {useEffect, useState} from 'react'
import './home.css'
import Header from './header'
import { useLocation,useNavigate } from 'react-router-dom'
function home(){

    const location = useLocation()
    let navigate = useNavigate();

    const { index } = location.state 
    const { name } = location.state

    // function SetTheName(childData){
	// 	setNam(childData);
	// }
    // useEffect(() => {
    //     recommend()
    //   }, [name])
    // const { index } = location.state

    //Implementing using name of the user
    console.log(name)
    let ArrInd = [];
    for(let t =0;t<643;t++){
        if(userData[t].user_name == name)     //Check the naem of the user in the userData 
        {
            const properties = Object.keys(userData[t]);         //We are use object.keys as it we will can then iterate through JSON object by it's row number and not its name
            const len = properties.length
            for(let s = 1;s<len;s++){
                const value = userData[t][properties[s]];
                if(value != 0){                                  //If the value is not 0 means that the user has rated this product.
                    const productName = properties[s];
                    console.log(productName)                     // ID of the product       
                    for(let u=0;u<productData.length;u++){
                        if(productData[u].product_id === productName){   // Taking indices of the product from the producData 
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
            purchasedIDsArr.push(productData[ArrInd[j]].product_id)
        }
        console.log(purchasedIDsArr)

        //Taking only unique IDs
        let uniqueIDs = [...new Set(IDsArr)]
        let purchasedUniqueIDs = [...new Set(purchasedIDsArr)]
        console.log('UniqueIds=', purchasedUniqueIDs)

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
        console.log('Name=',purcahsedProductNameArr)

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

        //Returning thr values and accessing them by indices
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
    },[name]);
    return(
        <div className='home' >
            <Header/>
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
export default home

