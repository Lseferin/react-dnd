import React, {useState, useCallback} from "react";
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import update from "immutability-helper";

import Card from "./components/card"

function App() {
  const [cards, setCards] = useState([
    // cards= estados, setCards= valor setado nos campos, useState= manageState| manupulador de estado
    {
      id: 1,
      text: 'Write a cool JS library',
    },
    {
      id: 2,
      text: 'Make it generic enough',
    },
    {
      id: 3,
      text: 'Write README',
    },
    {
      id: 4,
      text: 'Create some examples',
    },
    {
      id: 5,
      text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
    },
    {
      id: 6,
      text: 'lorem ipsum',
    },
    {
      id: 7,
      text: 'PROFIT',
    },
  ])
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    // @TODO
    setCards((prevCards) =>
    // seta o valor ou posição dos cards
      update(prevCards, {
        // atualiza a posição dos cards
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      }),
    )
  } , []) 
  const renderCard = useCallback((card, index) => {
    // renderCard recebe um callback com o valor do card e a posição inicial dele
    return (
      <Card
        key={card.id}
        index={index}
        id={card.id}
        text={card.text}
        moveCard={moveCard}
        s={cards}
      />
      // recebe o componente card e props que o compõem
    )
  }, [])

  return (
    <>
    <button onClick={() => console.log(cards)}>POST</button>
    <DndProvider backend={HTML5Backend}>
      {/* @TODO */}
      <div>{cards.map((card, i) => renderCard(card, i))}</div>
      {/* percorre a posição dos cards */}
    </DndProvider>
    </>
    // cada vez que o card movimentar, o button post clicado serve para alterar o state para a nova ordenação
  )
}

export default App;