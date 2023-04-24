import '../components/CSS/home.css'
import {useNavigate } from 'react-router-dom'
function Entrypage(){
    let navigate = useNavigate();
    const pclick = ()=>{
        navigate('/recommendation/popular-products')
    }
    const cclick = ()=>{
        navigate('/recommendation/products',{state:{name:''}})
    }
    const cbclick = ()=>{
        navigate('/recommendation/content-products',{state:{name:''}})
    }
    return(
        <div className="home entry-page">
            <p className='heading'>Amazon electronic products recommedation system</p>
            <div className='rect-box'>
                <p className='choose'>Choose one of the following recommedation system</p>
                <p className='recommedation button' onClick={pclick}>Popularity based filtering</p>
                <p className='recommedation button' onClick={cclick}>Collaboartive filtering</p>
                <p className='recommedation button' onClick={cbclick}>Content based filtering</p>
                {/* <button className="button"> Button </button> */}
            </div>
        </div>
    )

}
export default Entrypage