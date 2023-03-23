import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}

function Card (props) {
  const { id, text, index, moveCard, s } = props;
  // props do que compõem o card

  const ref = useRef(null)
  // useRef= é um gancho que permite criar uma referência ao elemento DOM no componente funcional. O useRef retorna um objeto ref mutável que nesse caso é vazio
  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
      // monitor = @TODO
      // ***handlerId= manipulador(que move), drop= quando é solto

    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // dragIndex = ponto inicial do card
      // hoverIndex = posição em que se encontra
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Executa o movimento apenas quando o mouse ultrapassar a metade da altura dos itens
      // Ao arrastar para baixo, move apenas quando o cursor estiver abaixo de 50%
      // Ao arrastar para cima, só move quando o cursor estiver acima de 50%
      // Arrastando para baixo
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // se a condicional for verdadeira, ele não executa nada
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // se a condicional for verdadeira, ele não executa nada
      // Time to actually perform the action
      
      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
      // console.log(moveCard(dragIndex, hoverIndex))
      // **função para mover os cards, que possui a posição do card e a movimentação dele 

    },
  })
  const [{ isDragging }, drag] = useDrag ({
    type: "card",
    item: () => {
      return { id, index }
    },
    // item retorna o id e posição do card
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  // isDraggin = retorna uma string que identifica o tipo do item arrastado atual. Retorna nulo se nenhum item estiver sendo arrastado

  // console.log(isDragging)
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
// Neste trecho o card fica com uma trasnparência enquanto está sendo movido 
// 0 : 1 = true ou false
// condicional só ocorre se isDraggin for true

  return (
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
      {text}
    </div>
  )
} 

export default Card