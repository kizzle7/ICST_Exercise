import React, {useEffect, useState} from 'react'
import axios from 'axios'
export default function Form() {
    const [categoryDatas,setCetgoryDatas]  = useState([]);
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [display, setDisplay] = useState(false)
    const [required, setRequired] = useState(false)



    useEffect(() => {
        axios.get(`http://questence.tqfe.net/api/v1/categories`).then((res) => {
            if(res.data.success){
                setCetgoryDatas(res.data.data)
            }
        })
        
    }, [])



    const onChangeNameFunc = (e) => {
        setName(e.target.value);
        setDisplay(false)
    }

    const onChangeCatFunc = (e) => {
        setCategory(e.target.value)
        setDisplay(false)

    }

    const onSubmitFunc = (e) => {
        e.preventDefault();
        if(name && category){
        setDisplay(true)
        }
        else{
            setDisplay(false)
            setRequired(true)
            setTimeout(() => {
                setRequired(false)
            },1200)
        }
    }

    const categoriesSelection = categoryDatas.map((categories) => {
        return(
            <option key={categories.id} value={categories.name}>{categories.name}</option>
        )
    })
    return (
        <div>
            {categoryDatas.length !== 0 &&
            <div>
            <form>
                <div>
                <label>Name</label>
                <input type="text" onChange={onChangeNameFunc} value={name} />
                </div> <br />
                <div>
                <label>Select A Category</label>
                <select name="category" onChange={onChangeCatFunc}>
                    <option></option>
                    {categoriesSelection}
                    
                </select>

                </div>
                {required && <small style={{color:'red'}}>Name and Category are both required!</small>}

                <br />
                <div>
                 <button type="submit" onClick={onSubmitFunc} >Submit</button>
                </div>
               
            </form><br />
            {display &&
            <div>
                <h3>On Form Submit Result</h3>
                <div>
                    <p>Name Inputed: {name} </p>
                    <p>Category Selected: {category}</p>
                </div>
            </div>}
            </div>}
            
        </div>
    )
}
