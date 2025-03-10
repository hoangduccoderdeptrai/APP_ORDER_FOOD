import React, { useState, useEffect, useRef } from 'react'
import { useChatStore } from '~/stores/useChatStore'
import user from '~/apis/user'
import { Typing } from './Typing'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [input, setInput] = useState('')
  const { messages, addMessage } = useChatStore()
  const [isBotTyping, setIsBotTyping] = useState(false)
  const chatRef = useRef(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, isOpen])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  const handleSend = async () => {
    if (input.trim() === '') return

    setIsBotTyping(true)
    const history = messages.slice(-6).map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }))

    const payload = {
      history,
      question: input,
    }
    setInput('')

    addMessage({ role: 'user', text: input })
    try {
      const res = await user.chatBot(payload)

      addMessage({ role: 'model', text: res?.answer })
    } catch (error) {
      addMessage({ role: 'model', text: 'Đã có lỗi xảy ra, thử lại sau ...' })
    } finally {
      setIsBotTyping(false)
    }
  }

  return (
    <div className='fixed bottom-4 right-4 z-50'>
      {!isOpen && (
        <button
          className='bg-primary text-white p-3 rounded-3xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]'
          onClick={() => setIsOpen(true)}
        >
          Mở <strong className='text-secondary'>Yummy</strong> chatbot
        </button>
      )}

      {/* Khung Chatbot */}
      {isOpen && (
        <div className='w-80 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg overflow-hidden z-50'>
          {/* Header */}
          <div className='bg-primary text-white p-3 flex justify-between items-center'>
            <span>Chatbot</span>
            <button className='text-white hover:text-gray-200' onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          {/* Message Area */}
          <div
            ref={chatRef}
            className='p-4 h-64 overflow-y-auto scrollbar-hide'
            style={{
              boxShadow:
                'inset 0px 10px 10px -10px rgba(0, 0, 0, 0.5), inset 0px -10px 10px -10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className={`text-left max-w-[92%] mb-2`}>
              <span
                className={`inline-block px-3 py-2 rounded-2xl min-w-[15%] max-w-[92%] bg-gray-200 text-black`}
              >
                Xin chào, mình là trợ lý ảo của <strong className='text-secondary'>Yummy</strong>,
                mình sẵn sàng trả lời bất kì câu hỏi nào của bạn ^_^!
              </span>
            </div>

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-2xl min-w-[15%] max-w-[92%] ${
                    msg.role === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-black'
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}

            {isBotTyping && (
              <div className={`text-left max-w-[92%]`}>
                <span className={`inline-block rounded-2xl bg-gray-200 text-black`}>
                  <Typing />
                </span>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className='p-3 border-t border-gray-300 flex'>
            <input
              type='text'
              className='flex-grow p-2 border border-gray-300 focus:outline-none rounded-xl'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isBotTyping ? 'Đang chờ bot trả lời...' : 'Nhập tin nhắn...'}
              disabled={isBotTyping}
              onKeyDown={handleKeyDown}
            />
            <button
              className={`ml-2 px-3 rounded-xl ${
                isBotTyping
                  ? 'bg-primary/80 text-gray-200 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary/80'
              }`}
              onClick={handleSend}
              disabled={isBotTyping}
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chatbot
