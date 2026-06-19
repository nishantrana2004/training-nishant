import React, { useEffect, useState } from 'react'

function Home() {
    const [data,setData]= useState([]);

    useEffect(()=>{
        setData()
    },[])
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>s.no</th>
                    <th>id</th>
                    <th>f.name</th>
                    <th>l.name</th>
                    <th>age</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item,index)=>{
                        return(
                            <tr key={index}>
                                <td></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}
localStorage.setItem(key, value);

export default Home;
