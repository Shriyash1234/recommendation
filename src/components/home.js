import data from './output.json'
import productData from './X.json'
import productNames from './product_id_Name2.json'
import {useEffect, useState} from 'react'
import './home.css'
import { useLocation,Link ,useParams } from 'react-router-dom'
function home(){

    
    const location = useLocation()
    // let {index} = useParams();
    const { index } = location.state 
    // const { index } = location.state
    // Product matrix imported from the data of ipynb file
    const productMatrix = data[index];
    // Array of indices whose value is greate than 5
    const [indArr, setIndArr] = useState([]);
    // Array for Corresponding IDs
    const[IDsArr,setIDsArr] = useState([]);
    // Array for Corresponding Images
    const[ImgsArr,setImgsArr] = useState([]);
    // Array for Corresponding product Links
    const[LinksArr,setLinksArr] = useState([]);


    // We will first Names, Images and Links in the following arrays then we will set their values by above arrays
    let productNameArr = []
    let productImgArr = []
    let productLinkArr = []

    function recommend(){
        //Array of indices
        let indArr = []   

        //Pushing values greater than 5. Using ParseFloat as they are strings
        for(let i =0;i<90;i++){
            if(parseFloat(productMatrix[i])>0.5){
                indArr.push(i)
            }
        }

        //Getting Corresponding IDs from the productData
        // let min = Math.min(5,indArr.length);
        for(let j =0;j<indArr.length;j++){
            // console.log(productData[j].product_id)
            IDsArr.push(productData[indArr[j]].product_id)
        }

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

        //Agsin taking unique names,images and links
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
        // let uniqueNames = [...new Set(productNameArr)]
        // const filteredList1 = productNameArr.filter((item, index) => uniqueNames.indexOf(item) === index);
        // const filteredList2 = productImgArr.filter((_, index) => uniqueNames.includes(productNameArr[index]));
        // const filteredList3 = productLinkArr.filter((_, index) => uniqueNames.includes(productNameArr[index]));
        // let uniqueImgs = [...new Set(productImgArr)]
        // let uniqueLinks = [...new Set(productLinkArr)]
        // console.log(uniqueNames.length)
        // console.log(uniqueName.length)
        // console.log(uniqueImg.length)
        // console.log(uniqueLink.length)

        //Returning three values and accessing them by indices
        return [uniqueNames,uniqueImgs,uniqueLinks];
    }
    useEffect(()=>{
        const newArr = recommend();
        setIndArr(newArr[0]);
        setImgsArr(newArr[1]);
        setLinksArr(newArr[2]);
    },[]);
    return(
        <div className='home' >
            <div className='header'>

            </div>
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

