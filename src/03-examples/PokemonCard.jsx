import React, { useLayoutEffect, useRef, useState } from 'react'

export const PokemonCard = ({ id , name , sprites = [] }) => {

  const h2Ref = useRef()

  const [boxSide, setBoxSide] = useState({width:0, height:0})

  //tambien se puede usar el useEffect

  useLayoutEffect(() => {
    const { width , height } = h2Ref.current.getBoundingClientRect();
    setBoxSide({width, height});

  }, [name])



  return (
    <>
    <section style={{ height:200 }} >
        <h2 ref={ h2Ref } style={{ display:'inline ' }} >#{ id } - { name }</h2>   
        {/* Image */}
        <div>
            {
                sprites.map( sprite => (
                    <img key={ sprite } src={ sprite } alt={ name }/>
                ))
            }
        </div>
    </section>
    <code>{JSON.stringify(boxSide)}</code>
    </>
  )
}
