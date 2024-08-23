import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick, searchWord }) => {
  return (
      <div className='mt-16 prompt_layout'>
          {data.map(post => (
              <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} searchWord={searchWord} />
          ))}
    </div>
  )
}

export default PromptCardList