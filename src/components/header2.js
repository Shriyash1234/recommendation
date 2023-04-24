import {Stack,Autocomplete,TextField} from '@mui/material'
import React, { useState,useEffect } from "react"
import names from '../components/data/names.json'
import { useNavigate } from 'react-router-dom'
function Header(props){
    const [ name, setName ] = useState("")
    
    let navigate = useNavigate();
    return(
        <div className="header">
        <Stack spacing={5} width='250px'>
            <Autocomplete
                options={names.sort((a, b) => -b[0].localeCompare(a[0]))}
                renderInput={(params) => <TextField {...params} label='Search by name'/>}
                groupBy={(name) => name[0]}
                value={name||null}
                getOptionLabel={(option) => option}
				onChange={(event, option) => {
					navigate('/recommendation/content-products',{state:{name: option}})
				}}
				
				/>
            </Stack>
        </div>
    )
}
export default Header