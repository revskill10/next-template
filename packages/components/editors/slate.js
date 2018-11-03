import {useState} from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'

function CodeNode(props) {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

// Define a React component to render bold text with.
function BoldMark(props) {
  return <strong>{props.children}</strong>
}

const useCodeEditor = (initialText) => {
  const initialState = Value.fromJSON({
    document: {
      nodes: [
        {
          object: 'block',
          type: 'paragraph',
          nodes: [
            {
              object: 'text',
              leaves: [
                {
                  text: initialText,
                },
              ],
            },
          ],
        },
      ],
    },
  })
  const [value, setValue] = useState(initialState)

  const onChange = ({ value }) => {
    setValue(value)
  }

  const renderNode = (props, editor, next) => {
    switch (props.node.type) {
      case 'code':
        return <CodeNode {...props} />
      default:
        return next()
    }
  }

  const renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />
      default:
        return next()
    }
  }
  
  const onKeyDown = (event, editor, next) => {
    if (!event.ctrlKey) return next()
    // Decide what to do based on the key code...
    switch (event.key) {
      // When "B" is pressed, add a "bold" mark to the text.
      case 'b': {
        event.preventDefault()
        editor.addMark('bold')
      }
      // When "`" is pressed, keep our existing code block logic.
      case '`': {
        const isCode = editor.value.blocks.some(block => block.type == 'code')
        event.preventDefault()
        editor.setBlocks(isCode ? 'paragraph' : 'code')
      }
      // Otherwise, let other plugins handle it.
      default: {
        return next()
      }
    }
  }
  
  return {
    value,
    onChange,
    renderNode,
    renderMark,
    onKeyDown,
  }
}

const SlateEditor = ({initialText = ''}) => {
  const {
    value,
    onChange,
    renderMark,
    renderNode,
    onKeyDown,
  } = useCodeEditor(initialText)
   
  return (
    <Editor 
        value={value} 
        onChange={onChange} 
        onKeyDown={onKeyDown}
        renderNode={renderNode}
        renderMark={renderMark}
      />
  )
}

export default SlateEditor